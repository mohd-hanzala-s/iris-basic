import { Link } from "react-router-dom";
import { learningModules, masteryPath } from "@/data/index";
import { useProgress } from "@/lib/progress";

export default function Learning() {
  const progress = useProgress();
  const snapshots = learningModules.filter((m) => m.track === "SNAPSHOT").sort((a, b) => a.order - b.order);

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Learn · Mastery path</span>
        <h1 className="page-hero-title">Domain Mastery Path</h1>
        <p className="page-hero-lede">
          A progressive ten-level curriculum, time-boxed IRIS snapshots, and guided
          traversal modes. Each level builds on the last; every lesson links into the
          connected knowledge graph.
        </p>
      </header>

      <section className="section">
        <h2>The ten levels</h2>
        <ol className="path-list">
          {masteryPath.levels.map((lvl) => {
            const done = progress.modules.includes(lvl.moduleId);
            return (
              <li key={lvl.level}>
                <Link to={`/learning/${lvl.moduleId}`} className={`path-item ${done ? "path-done" : ""}`}>
                  <span className="path-order">{done ? "✓" : lvl.level}</span>
                  <span className="path-body">
                    <span className="path-title">LEVEL {lvl.level} · {lvl.title}</span>
                    <span className="path-summary">{lvl.summary}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="section">
        <h2>IRIS snapshots (time-boxed)</h2>
        <ol className="path-list">
          {snapshots.map((m) => {
            const done = progress.modules.includes(m.id);
            return (
              <li key={m.id}>
                <Link to={`/learning/${m.id}`} className={`path-item ${done ? "path-done" : ""}`}>
                  <span className="path-order">{done ? "✓" : "⌛"}</span>
                  <span className="path-body">
                    <span className="path-title">{m.title}</span>
                    <span className="path-summary">{m.summary}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="section">
        <h2>Guided modes</h2>
        <div className="grid-2">
          <Link to="/follow/data" className="info-card mode-card">
            <h3>Follow the Data</h3>
            <p>Trace a single fact from a company's systems to regulatory supervision.</p>
          </Link>
          <Link to="/follow/regulation" className="info-card mode-card">
            <h3>Follow the Regulation</h3>
            <p>Trace a mandate (ESEF) from the rule to the taxonomies, filers, products and rivals.</p>
          </Link>
        </div>
        <p className="muted">
          Track your progress on the <Link to="/dashboard">learning dashboard</Link>.
        </p>
      </section>
    </div>
  );
}
