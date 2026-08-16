import { useState } from "react";
import { Link } from "react-router-dom";
import { learningModules, masteryPath } from "@/data/index";
import { FAST_TRACKS } from "@/lib/learningUtils";
import { useProgress } from "@/lib/progress";

export default function Learning() {
  const progress = useProgress();
  const [activeTab, setActiveTab] = useState<"paths" | "tracks" | "snapshots">("paths");

  const snapshots = learningModules
    .filter((m) => m.track === "SNAPSHOT")
    .sort((a, b) => a.order - b.order);

  const completedLevels = masteryPath.levels.filter((lvl) =>
    progress.modules.includes(lvl.moduleId)
  ).length;

  const totalLevels = masteryPath.levels.length;
  const progressPercent = Math.round((completedLevels / totalLevels) * 100);

  // Find next unfinished level
  const nextUnfinished = masteryPath.levels.find(
    (lvl) => !progress.modules.includes(lvl.moduleId)
  );

  return (
    <div className="page learning-hub-page">
      {/* Hero Header */}
      <header className="page-hero">
        <span className="eyebrow">Curriculum · Domain Mastery</span>
        <h1 className="page-hero-title">Master RegTech &amp; IRIS</h1>
        <p className="page-hero-lede">
          Structured, high-efficiency learning pathways. Pick a speed track for rapid onboarding
          or conquer the full 10-level domain curriculum.
        </p>

        {/* Global Progress Card */}
        <div className="learning-progress-banner">
          <div className="progress-banner-info">
            <div className="progress-banner-text">
              <span className="progress-stat-highlight">
                {completedLevels} of {totalLevels} Levels Completed ({progressPercent}%)
              </span>
              <p className="muted" style={{ margin: "0.25rem 0 0" }}>
                {completedLevels === totalLevels
                  ? "🎉 You have completed the entire 10-level mastery path!"
                  : `Next up: Level ${nextUnfinished?.level} · ${nextUnfinished?.title}`}
              </p>
            </div>
            {nextUnfinished && (
              <Link
                to={`/learning/${nextUnfinished.moduleId}`}
                className="btn btn-primary progress-continue-btn"
              >
                Continue Learning →
              </Link>
            )}
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
        </div>
      </header>

      {/* Track Selection Tabs */}
      <div className="learning-tabs">
        <button
          type="button"
          className={`learning-tab ${activeTab === "paths" ? "active" : ""}`}
          onClick={() => setActiveTab("paths")}
        >
          🏆 10-Level Curriculum
        </button>
        <button
          type="button"
          className={`learning-tab ${activeTab === "tracks" ? "active" : ""}`}
          onClick={() => setActiveTab("tracks")}
        >
          ⚡ Fast Tracks &amp; Roles
        </button>
        <button
          type="button"
          className={`learning-tab ${activeTab === "snapshots" ? "active" : ""}`}
          onClick={() => setActiveTab("snapshots")}
        >
          ⏱️ Time-Boxed Snapshots
        </button>
      </div>

      {/* TAB 1: 10-LEVEL PATH */}
      {activeTab === "paths" && (
        <section className="section">
          <div className="section-head">
            <h2>The 10-Level Mastery Curriculum</h2>
            <p className="muted">
              Progressive mastery from zero baseline to advanced competitive and strategic intelligence.
            </p>
          </div>
          <ol className="path-list enhanced-path-list">
            {masteryPath.levels.map((lvl, idx) => {
              const done = progress.modules.includes(lvl.moduleId);
              const isCurrent = !done && (!lvl.level || lvl.level === 1 || progress.modules.includes(masteryPath.levels[idx - 1]?.moduleId));

              return (
                <li key={lvl.level}>
                  <Link
                    to={`/learning/${lvl.moduleId}`}
                    className={`path-item enhanced-path-item ${done ? "path-done" : ""} ${
                      isCurrent ? "path-current" : ""
                    }`}
                  >
                    <span className="path-order">
                      {done ? "✓" : lvl.level}
                    </span>
                    <div className="path-body">
                      <div className="path-title-row">
                        <span className="path-level-tag">LEVEL {lvl.level}</span>
                        <span className="path-title">{lvl.title}</span>
                        <span className="path-read-time">~3-5 min read</span>
                      </div>
                      <p className="path-summary">{lvl.summary}</p>
                    </div>
                    <span className="path-arrow">→</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {/* TAB 2: FAST TRACKS */}
      {activeTab === "tracks" && (
        <section className="section">
          <div className="section-head">
            <h2>Role-Based Fast Tracks</h2>
            <p className="muted">Tailored learning sprints based on your available time and goals.</p>
          </div>
          <div className="grid-3 fast-tracks-grid">
            {FAST_TRACKS.map((track) => (
              <div key={track.id} className="fast-track-card info-card">
                <div className="fast-track-badge">{track.badge}</div>
                <div className="fast-track-duration">⏱️ {track.duration}</div>
                <h3>{track.title}</h3>
                <p className="fast-track-desc">{track.description}</p>
                <div className="fast-track-target">
                  <strong>Audience:</strong> {track.targetAudience}
                </div>
                <div className="fast-track-modules">
                  <span className="fast-track-count">
                    {track.moduleIds.length} Modules included
                  </span>
                  <Link
                    to={`/learning/${track.moduleIds[0]}`}
                    className="btn btn-primary btn-sm"
                    style={{ width: "100%", marginTop: "0.75rem", textAlign: "center" }}
                  >
                    Start Track →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: TIME-BOXED SNAPSHOTS */}
      {activeTab === "snapshots" && (
        <section className="section">
          <div className="section-head">
            <h2>Time-Boxed IRIS Snapshots</h2>
            <p className="muted">
              Short on time? Choose a snapshot tailored specifically to how much time you have right now.
            </p>
          </div>
          <div className="grid-2">
            {snapshots.map((m) => {
              const done = progress.modules.includes(m.id);
              return (
                <Link
                  key={m.id}
                  to={`/learning/${m.id}`}
                  className={`info-card snapshot-card ${done ? "card-completed" : ""}`}
                >
                  <div className="snapshot-card-top">
                    <span className="snapshot-icon">⌛</span>
                    <span className="chip">{done ? "✓ Completed" : "Snapshot"}</span>
                  </div>
                  <h3>{m.title}</h3>
                  <p className="muted">{m.summary}</p>
                  <span className="entry-cta" style={{ marginTop: "0.5rem" }}>
                    Read snapshot →
                  </span>
                </Link>
              );
            })}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <h3>Interactive Guided Traversal</h3>
            <div className="grid-2" style={{ marginTop: "1rem" }}>
              <Link to="/follow/data" className="info-card mode-card">
                <h3>Follow the Data</h3>
                <p>Trace a single fact from an enterprise system through validation to regulatory analytics.</p>
              </Link>
              <Link to="/follow/regulation" className="info-card mode-card">
                <h3>Follow the Regulation</h3>
                <p>Trace an ESEF or DORA mandate from initial policy to XBRL taxonomy and software tools.</p>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
