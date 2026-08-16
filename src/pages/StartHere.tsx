import { Link } from "react-router-dom";
import { masteryPath, followPaths } from "@/data/index";

export default function StartHere() {

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Learn · Start here</span>
        <h1 className="page-hero-title">Start Here</h1>
        <p className="page-hero-lede">
          A guided route from "I know very little about RegTech and IRIS" to genuine
          domain expertise. The goal is an interconnected mental model, not
          memorisation — anything important always links through to the things it
          depends on.
        </p>
      </header>

      <section className="section">
        <h2>The ten-level mastery path</h2>
        <ol className="path-list">
          {masteryPath.levels.map((lvl) => (
            <li key={lvl.level}>
              <Link to={`/learning/${lvl.moduleId}`} className="path-item">
                <span className="path-order">{lvl.level}</span>
                <span className="path-body">
                  <span className="path-title">
                    LEVEL {lvl.level} · {lvl.title}
                  </span>
                  <span className="path-summary">{lvl.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <h2>Short on time? Pick a Fast Track</h2>
        <div className="grid-3" style={{ marginBottom: "1.5rem" }}>
          <div className="info-card">
            <span className="badge-pill badge-time" style={{ marginBottom: "0.5rem" }}>⚡ 15 Mins</span>
            <h3>Executive Briefing</h3>
            <p className="muted">Rapid orientation on RegTech, IRIS positioning, and core reporting standards.</p>
            <Link to="/learning/snapshot-5-minute-iris" className="entry-cta" style={{ marginTop: "0.5rem" }}>
              Start 15-min track →
            </Link>
          </div>
          <div className="info-card">
            <span className="badge-pill badge-time" style={{ marginBottom: "0.5rem" }}>📊 45-60 Mins</span>
            <h3>Commercial Kit</h3>
            <p className="muted">Deep dive into IRIS products (CARBON, iDEAS), competitors, and market landscape.</p>
            <Link to="/learning/level-4-iris-company" className="entry-cta" style={{ marginTop: "0.5rem" }}>
              Start commercial track →
            </Link>
          </div>
          <div className="info-card">
            <span className="badge-pill badge-diff-mastery" style={{ marginBottom: "0.5rem" }}>🏆 10 Levels</span>
            <h3>Full Mastery Path</h3>
            <p className="muted">Complete end-to-end curriculum from foundational principles to advanced strategy.</p>
            <Link to="/learning/regtech-from-zero" className="entry-cta" style={{ marginTop: "0.5rem" }}>
              Start Level 1 →
            </Link>
          </div>
        </div>

        <h3>Guided Traversal Modes</h3>
        <div className="grid-2">
          {followPaths.map((fp) => (
            <Link key={fp.mode} to={`/follow/${fp.mode}`} className="info-card mode-card">
              <h3>{fp.title}</h3>
              <p>{fp.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Recommended route</h2>
        <ol className="route">
          <li>
            <Link to="/guide">The Beginner's Guide</Link> — read the orientation
            handbook if you are brand new to banking, regulators or RegTech.
          </li>
          <li>
            <Link to="/regtech">RegTech</Link> — understand the domain and the problem
            RegTech solves.
          </li>
          <li>
            <Link to="/iris">IRIS</Link> — meet the company, its segments and history.
          </li>
          <li>
            <Link to="/products">Products</Link> — learn the product portfolio, each with
            its own <Link to="/graph">relationship map</Link>.
          </li>
          <li>
            <Link to="/regulations">Regulations</Link> and{" "}
            <Link to="/technology">Technology</Link> — the ecosystem products live in.
          </li>
          <li>
            <Link to="/customers">Customers</Link>,{" "}
            <Link to="/competitors">Competitors</Link> and{" "}
            <Link to="/markets">Markets</Link> — the commercial landscape.
          </li>
          <li>
            <Link to="/strategy">Strategy</Link> — tie it together at the strategic level.
          </li>
          <li>
            Reinforce with <Link to="/flashcards">Flashcards</Link> and{" "}
            <Link to="/quizzes">Quizzes</Link>, then track it all on the{" "}
            <Link to="/dashboard">dashboard</Link>.
          </li>
        </ol>
      </section>

      <section className="section">
        <h2>How to read the evidence labels</h2>
        <p>
          This system never presents speculation as fact. Every claim carries one of:
        </p>
        <ul>
          <li><strong>Fact</strong> — independently verifiable, widely accepted.</li>
          <li><strong>Company claim</strong> — stated by IRIS (or another company) about itself.</li>
          <li><strong>Customer / user opinion</strong> — stated by a customer or user.</li>
          <li><strong>Analyst view</strong> — stated by an analyst or journalist.</li>
          <li><strong>Inference</strong> — a reasoned conclusion, not established fact.</li>
          <li><strong>Unknown</strong> — not yet verifiable.</li>
        </ul>
      </section>
    </div>
  );
}
