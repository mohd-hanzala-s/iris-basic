import { useSyncExternalStore } from "react";

/**
 * Learning-progress store. Persists to localStorage and exposes a React hook
 * so the dashboard and study pages stay in sync. Progress is local to the
 * browser (no backend) — a personal knowledge system.
 */

export interface QuizResult {
  quizId: string;
  score: number;
  total: number;
  passed: boolean;
  at: string;
}

interface ProgressState {
  modules: string[];
  flashcards: string[];
  quizzes: Record<string, QuizResult>;
}

const KEY = "iris-mastery-progress-v1";

const EMPTY: ProgressState = { modules: [], flashcards: [], quizzes: {} };

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      modules: Array.isArray(parsed.modules) ? parsed.modules : [],
      flashcards: Array.isArray(parsed.flashcards) ? parsed.flashcards : [],
      quizzes: parsed.quizzes && typeof parsed.quizzes === "object" ? parsed.quizzes : {},
    };
  } catch {
    return EMPTY;
  }
}

let state: ProgressState = load();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore quota / private-mode errors — progress just won't persist
  }
}

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribeProgress(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getProgress(): ProgressState {
  return state;
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribeProgress, getProgress, getProgress);
}

function mutate(next: ProgressState) {
  state = next;
  persist();
  emit();
}

export function isModuleComplete(id: string): boolean {
  return state.modules.includes(id);
}

export function completeModule(id: string) {
  if (state.modules.includes(id)) return;
  mutate({ ...state, modules: [...state.modules, id] });
}

export function uncompleteModule(id: string) {
  if (!state.modules.includes(id)) return;
  mutate({ ...state, modules: state.modules.filter((m) => m !== id) });
}

export function isCardMastered(id: string): boolean {
  return state.flashcards.includes(id);
}

export function masterCard(id: string) {
  if (state.flashcards.includes(id)) return;
  mutate({ ...state, flashcards: [...state.flashcards, id] });
}

export function unmasterCard(id: string) {
  if (!state.flashcards.includes(id)) return;
  mutate({ ...state, flashcards: state.flashcards.filter((f) => f !== id) });
}

export function recordQuizResult(quizId: string, score: number, total: number) {
  const passed = total > 0 && score / total >= 0.7;
  const prev = state.quizzes[quizId];
  const better = !prev || score >= prev.score;
  if (!better) return;
  mutate({
    ...state,
    quizzes: {
      ...state.quizzes,
      [quizId]: { quizId, score, total, passed, at: new Date().toISOString() },
    },
  });
}

export function resetProgress() {
  mutate({ modules: [], flashcards: [], quizzes: {} });
}
