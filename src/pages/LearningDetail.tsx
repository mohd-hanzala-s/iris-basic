import { useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { knowledgeBase, resolveRef, masteryPath } from "@/data/index";
import Markdown from "@/components/Markdown";
import CertaintyTag from "@/components/CertaintyTag";
import SourceList from "@/components/SourceList";
import ModuleSummaryCard from "@/components/ModuleSummaryCard";
import QuickCheck from "@/components/QuickCheck";
import LessonToc from "@/components/LessonToc";
import LessonGlossaryDrawer from "@/components/LessonGlossaryDrawer";
import { getQuickCheckForModule } from "@/lib/learningUtils";
import { useProgress, completeModule, uncompleteModule } from "@/lib/progress";

export default function LearningDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mod = knowledgeBase.learningModules.find((m) => m.id === id);
  const progress = useProgress();

  // Find index in mastery path or snapshots
  const allPathModules = masteryPath.levels;
  const pathIndex = allPathModules.findIndex((l) => l.moduleId === id);
  const isPathLevel = pathIndex !== -1;

  const prevModule = isPathLevel && pathIndex > 0 ? allPathModules[pathIndex - 1] : null;
  const nextModule =
    isPathLevel && pathIndex < allPathModules.length - 1 ? allPathModules[pathIndex + 1] : null;

  const done = mod ? progress.modules.includes(mod.id) : false;
  const level = mod?.level;

  // Keyboard navigation shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if ((e.key === "ArrowRight" || e.key.toLowerCase() === "j") && nextModule) {
        navigate(`/learning/${nextModule.moduleId}`);
      } else if ((e.key === "ArrowLeft" || e.key.toLowerCase() === "k") && prevModule) {
        navigate(`/learning/${prevModule.moduleId}`);
      } else if (e.key.toLowerCase() === "c" && mod) {
        if (done) uncompleteModule(mod.id);
        else completeModule(mod.id);
      }
    },
    [nextModule, prevModule, done, mod, navigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!mod) {
    return (
      <div className="page">
        <nav className="breadcrumb">
          <Link to="/learning">← All modules</Link>
        </nav>
        <p className="muted">Module not found.</p>
      </div>
    );
  }

  const quickQuestions = getQuickCheckForModule(mod.id);

  function handleCompleteAndNext() {
    if (!done) completeModule(mod!.id);
    if (nextModule) {
      navigate(`/learning/${nextModule.moduleId}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="page learning-detail-page">
      {/* Floating Side Glossary Drawer */}
      <LessonGlossaryDrawer entityRefs={mod.entityRefs} />

      {/* Top Navigation & Breadcrumbs */}
      <nav className="breadcrumb flex-between">
        <Link to="/learning">← All Learning Modules</Link>
        {isPathLevel && (
          <span className="lesson-progress-indicator">
            Level {pathIndex + 1} of {allPathModules.length} ·{" "}
            {Math.round(((pathIndex + (done ? 1 : 0)) / allPathModules.length) * 100)}% Path Complete
          </span>
        )}
      </nav>

      {/* Hero Header */}
      <header className="lesson-hero">
        <div className="lesson-title-row">
          <h1>{mod.title}</h1>
          <button
            type="button"
            className={`btn ${done ? "btn-completed" : "btn-primary"} mark-complete-toggle`}
            onClick={() => (done ? uncompleteModule(mod.id) : completeModule(mod.id))}
          >
            {done ? "✓ Completed" : "Mark Complete [C]"}
          </button>
        </div>
        <p className="lede">{mod.summary}</p>
      </header>

      {/* Speed Summary / 60-Second Takeaways Card */}
      <ModuleSummaryCard
        level={level}
        track={mod.track}
        summary={mod.summary}
        sections={mod.sections}
        entityRefs={mod.entityRefs}
      />

      {/* Two Column Layout: Main Content + Sticky Outline */}
      <div className="lesson-content-layout">
        {/* Left / Main Column */}
        <div className="lesson-main-column">
          {/* Detailed Lesson Sections */}
          <div className="lesson-body-sections">
            {mod.sections.map((s, idx) => (
              <section key={s.heading} className="section lesson-section">
                <div className="lesson-section-head">
                  <span className="lesson-section-num">0{idx + 1}</span>
                  <h2>{s.heading}</h2>
                  {s.certainty && <CertaintyTag certainty={s.certainty} />}
                </div>
                <div className="lesson-section-content">
                  <Markdown text={s.body} />
                </div>
                {s.sources && s.sources.length > 0 && (
                  <div className="lesson-section-sources">
                    <SourceList sourceIds={s.sources} />
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Quick Knowledge Check / Active Recall */}
          {quickQuestions.length > 0 && (
            <section className="section inline-quiz-section">
              <QuickCheck
                questions={quickQuestions}
                onComplete={() => {
                  if (!done) completeModule(mod.id);
                }}
              />
            </section>
          )}

          {/* Related Entities Knowledge Graph Bridge */}
          {mod.entityRefs.length > 0 && (
            <section className="section related-entities-section">
              <h3>Connected Knowledge Graph</h3>
              <p className="muted" style={{ marginBottom: "0.75rem" }}>
                Hover or click any tag for instant preview, or open in graph:
              </p>
              <div className="tag-row">
                {mod.entityRefs.map((refStr) => {
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
            </section>
          )}
        </div>

        {/* Right Sticky Column (Outline + Quick Reference) */}
        <aside className="lesson-sidebar-column">
          <div className="lesson-sidebar-sticky">
            <LessonToc sections={mod.sections} />

            <div className="lesson-sidebar-card">
              <span className="sidebar-card-title">💡 Smart Navigation Tip</span>
              <p className="sidebar-card-text">
                Hover over any highlighted term in the text to see its instant definition without leaving the page!
              </p>
              <button
                type="button"
                className="btn btn-sm btn-outline-full"
                onClick={() => {
                  const btn = document.querySelector(".floating-glossary-btn") as HTMLButtonElement;
                  if (btn) btn.click();
                }}
              >
                📖 Open Lesson Glossary ({mod.entityRefs.length})
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Sticky Action Bar */}
      <footer className="lesson-bottom-nav">
        <div className="bottom-nav-inner">
          {prevModule ? (
            <Link to={`/learning/${prevModule.moduleId}`} className="btn btn-nav-prev">
              ← Prev: Level {prevModule.level}
            </Link>
          ) : (
            <Link to="/learning" className="btn btn-nav-prev">
              ← Course Overview
            </Link>
          )}

          <div className="bottom-nav-shortcuts">
            <span className="kbd-hint">Shortcuts: [J] Next · [K] Prev · [C] Done</span>
          </div>

          {nextModule ? (
            <button
              type="button"
              className="btn btn-primary btn-nav-next"
              onClick={handleCompleteAndNext}
            >
              {done ? `Next: Level ${nextModule.level} →` : `Complete & Next Level → [J]`}
            </button>
          ) : (
            <Link to="/dashboard" className="btn btn-primary btn-nav-next">
              🎓 View Mastery Dashboard →
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}
