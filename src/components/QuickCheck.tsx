import { useState } from "react";
import { Link } from "react-router-dom";
import { resolveRef } from "@/data/index";

export interface QuickQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  entityRefs?: string[];
}

interface QuickCheckProps {
  questions: QuickQuestion[];
  onComplete?: () => void;
}

export default function QuickCheck({ questions, onComplete }: QuickCheckProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  if (!questions || questions.length === 0) return null;

  function selectOption(qId: string, optionIdx: number) {
    if (revealed[qId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    setRevealed((prev) => ({ ...prev, [qId]: true }));
    if (onComplete) {
      onComplete();
    }
  }

  function resetQuestion(qId: string) {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
    setRevealed((prev) => ({ ...prev, [qId]: false }));
  }

  return (
    <div className="quick-check-container">
      <div className="quick-check-header">
        <span className="quick-check-badge">⚡ Quick Knowledge Check</span>
        <h3 className="quick-check-title">Test your understanding before continuing</h3>
      </div>

      <div className="quick-check-list">
        {questions.map((q, qIndex) => {
          const selected = selectedAnswers[q.id];
          const isRevealed = revealed[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div key={q.id} className="quick-check-card">
              <p className="quick-check-prompt">
                <strong>Q{qIndex + 1}:</strong> {q.prompt}
              </p>

              <div className="quick-check-options">
                {q.options.map((opt, optIdx) => {
                  let optClass = "quick-check-opt";
                  if (isRevealed) {
                    if (optIdx === q.correctIndex) {
                      optClass += " opt-correct";
                    } else if (optIdx === selected) {
                      optClass += " opt-incorrect";
                    } else {
                      optClass += " opt-dimmed";
                    }
                  } else if (selected === optIdx) {
                    optClass += " opt-selected";
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      className={optClass}
                      onClick={() => selectOption(q.id, optIdx)}
                      disabled={isRevealed}
                    >
                      <span className="opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                      <span className="opt-text">{opt}</span>
                      {isRevealed && optIdx === q.correctIndex && <span className="opt-icon">✓</span>}
                      {isRevealed && optIdx === selected && !isCorrect && <span className="opt-icon">✕</span>}
                    </button>
                  );
                })}
              </div>

              {isRevealed && (
                <div className={`quick-check-feedback ${isCorrect ? "feedback-success" : "feedback-warning"}`}>
                  <div className="feedback-content">
                    <p>
                      <strong>{isCorrect ? "🎯 Spot on!" : "💡 Key Insight:"}</strong> {q.explanation}
                    </p>
                    {q.entityRefs && q.entityRefs.length > 0 && (
                      <div className="tag-row" style={{ marginTop: "0.5rem" }}>
                        {q.entityRefs.map((refStr) => {
                          const e = resolveRef(refStr);
                          if (!e) return null;
                          const [type, rid] = refStr.split(":");
                          return (
                            <Link key={refStr} to={`/${type}/${rid}`} className="tag tag-link">
                              {e.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  {!isCorrect && (
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => resetQuestion(q.id)}
                      style={{ marginTop: "0.5rem" }}
                    >
                      Try Again
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
