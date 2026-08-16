import { Link } from "react-router-dom";
import { masteryPath, followPaths, learningModules } from "@/data/index";

export default function StartHere() {
  const snapshots = learningModules.filter((m) => m.track === "SNAPSHOT").sort((a, b) => a.order - b.order);

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
        <h2>Short on time?</h2>
        <ol className="path-list">
          {snapshots.map((m) => (
            <li key={m.id}>
              <Link to={`/learning/${m.id}`} className="path-item">
                <span className="path-order">⌛</span>
                <span className="path-body">
                  <span className="path-title">{m.title}</span>
                  <span className="path-summary">{m.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
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
