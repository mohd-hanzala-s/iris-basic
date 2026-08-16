import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { knowledgeBase } from "@/data/index";
import type { Source } from "@/data/types";

const TYPE_LABEL: Record<Source["type"], string> = {
  COMPANY_WEBSITE: "Company website",
  PRESS_RELEASE: "Press release",
  REGULATORY_FILING: "Regulatory filing",
  STOCK_EXCHANGE: "Stock exchange",
  NEWS: "News",
  ANALYST_REPORT: "Analyst report",
  STANDARD_BODY: "Standards body",
  GOVERNMENT: "Government",
  THIRD_PARTY: "Third party",
  OTHER: "Other",
};

/** Collect all source ids cited across the knowledge base, and what cites them. */
function buildUsage() {
  const usage = new Map<string, string[]>();
  const record = (id: string, by: string) => {
    if (!usage.has(id)) usage.set(id, []);
    if (!usage.get(id)!.includes(by)) usage.get(id)!.push(by);
  };

  const all = [
    ...knowledgeBase.companies,
    ...knowledgeBase.products,
    ...knowledgeBase.regulators,
    ...knowledgeBase.regulations,
    ...knowledgeBase.technologies,
    ...knowledgeBase.markets,
    ...knowledgeBase.useCases,
    ...knowledgeBase.glossary,
  ];
  for (const e of all) for (const s of e.sources) record(s, e.name);

  for (const r of knowledgeBase.relations) for (const s of r.sources) record(s, `relation: ${r.id}`);
  for (const m of knowledgeBase.learningModules) for (const s of m.sources) record(s, `module: ${m.title}`);
  for (const f of knowledgeBase.flashcards) for (const s of f.sources ?? []) record(s, `flashcard: ${f.front}`);
  for (const q of knowledgeBase.quizzes) for (const qq of q.questions) for (const s of qq.sources ?? []) record(s, `quiz: ${q.title}`);

  return usage;
}

export default function Sources() {
  const sources = knowledgeBase.sources;
  const usage = buildUsage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Explore · Sources</span>
        <h1 className="page-hero-title">Sources</h1>
        <p className="page-hero-lede">
          The source registry. Every claim in this system cites one or more sources here;
          each entry below lists what it backs.
        </p>
      </header>

      <section className="section">
        <div className="source-entries">
          {sources.map((s) => (
            <div key={s.id} id={s.id} className="source-entry">
              <h3>{s.title}</h3>
              <dl className="meta-grid">
                <div className="meta-item">
                  <dt>Publisher</dt>
                  <dd>{s.publisher}</dd>
                </div>
                <div className="meta-item">
                  <dt>Type</dt>
                  <dd>{TYPE_LABEL[s.type]}</dd>
                </div>
                <div className="meta-item">
                  <dt>Accessed</dt>
                  <dd>{s.accessedAt}</dd>
                </div>
                {s.publishedAt && (
                  <div className="meta-item">
                    <dt>Published</dt>
                    <dd>{s.publishedAt}</dd>
                  </div>
                )}
              </dl>
              {s.url && (
                <p>
                  <a href={s.url} target="_blank" rel="noreferrer" className="source-ext">
                    {s.url}
                  </a>
                </p>
              )}
              {s.notes && <p className="muted">{s.notes}</p>}
              <div className="source-cited">
                Cited by:{" "}
                {(usage.get(s.id) ?? []).length > 0 ? (
                  usage.get(s.id)!.join(" · ")
                ) : (
                  <em>not yet cited</em>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
