import { Link } from "react-router-dom";
import { beginnerGuide } from "@/data/beginnerGuide";
import Markdown from "@/components/Markdown";
import type { GuideBlock } from "@/data/beginnerGuide";

function Terms({ items }: { items: { term: string; simple: string; example: string; why: string }[] }) {
  return (
    <div className="guide-terms">
      {items.map((t) => (
        <div key={t.term} className="guide-term">
          <div className="guide-term-head">{t.term}</div>
          <div className="guide-term-line">
            <span className="guide-term-k">In plain words</span>
            <span className="guide-term-v">{t.simple}</span>
          </div>
          <div className="guide-term-line">
            <span className="guide-term-k">Example</span>
            <span className="guide-term-v">{t.example}</span>
          </div>
          <div className="guide-term-line">
            <span className="guide-term-k">Why it matters</span>
            <span className="guide-term-v">{t.why}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.kind) {
    case "prose":
      return <Markdown text={block.text} />;
    case "terms":
      return <Terms items={block.items} />;
    case "table":
      return (
        <div className="guide-table-wrap">
          <table className="guide-table">
            {block.table.caption && <caption>{block.table.caption}</caption>}
            <thead>
              <tr>
                {block.table.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "steps":
      return (
        <ol className="guide-steps">
          {block.items.map((s) => (
            <li key={s.title}>
              <span className="guide-step-num" aria-hidden="true" />
              <span className="guide-step-body">
                <span className="guide-step-title">{s.title}. </span>
                <span className="guide-step-text">{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="callout">
          <div className="callout-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <div className="callout-body">
            <p className="callout-title">{block.title}</p>
            <Markdown text={block.text} />
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function BeginnerGuide() {
  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Learn · The Beginner's Guide</span>
        <h1 className="page-hero-title">{beginnerGuide.title}</h1>
        <p className="page-hero-lede">{beginnerGuide.lede}</p>
      </header>

      <nav className="guide-toc" aria-label="On this page">
        <div className="guide-toc-label">On this page</div>
        <div className="guide-toc-list">
          {beginnerGuide.sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="guide-toc-link">
              {s.title}
            </a>
          ))}
          <a href="#summary" className="guide-toc-link">
            What you should understand so far
          </a>
        </div>
      </nav>

      {beginnerGuide.sections.map((s) => (
        <section key={s.id} id={s.id} className="section">
          <div className="section-head">
            <span className="eyebrow">{s.eyebrow}</span>
            <h2>{s.title}</h2>
          </div>
          {s.blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </section>
      ))}

      <section id="summary" className="section">
        <div className="section-head">
          <span className="eyebrow">Wrap-up</span>
          <h2>What you should understand so far</h2>
        </div>

        <h3>Ten takeaways</h3>
        <ol className="guide-takeaways">
          {beginnerGuide.takeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>

        <h3>Explain it in 60 seconds</h3>
        <div className="callout">
          <div className="callout-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2v6" />
              <path d="M12 8l4-2" />
              <circle cx="12" cy="15" r="7" />
              <path d="M12 12v3" />
              <path d="M12 18h.01" />
            </svg>
          </div>
          <div className="callout-body">
            <p className="callout-title">The 60-second explanation</p>
            <Markdown text={beginnerGuide.sixtySecond} />
          </div>
        </div>

        <p className="muted">
          Ready to go deeper? Continue to the{" "}
          <Link to="/regtech">RegTech domain hub</Link> or the ten-level{" "}
          <Link to="/start">mastery path</Link>.
        </p>
      </section>
    </div>
  );
}
