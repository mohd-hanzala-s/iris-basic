import { useState } from "react";
import { Link } from "react-router-dom";
import { knowledgeBase } from "@/data/index";
import EntityCard from "@/components/EntityCard";

export default function Glossary() {
  const [q, setQ] = useState("");
  const terms = [...knowledgeBase.glossary].sort((a, b) => a.name.localeCompare(b.name));
  const filtered = q.trim()
    ? terms.filter((t) =>
        [t.name, t.acronymOf, t.summary, ...(t.tags ?? [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q.trim().toLowerCase())
      )
    : terms;

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Explore · Glossary</span>
        <h1 className="page-hero-title">Glossary</h1>
        <p className="page-hero-lede">
          Domain vocabulary for RegTech, SupTech, XBRL and compliance. {terms.length}{" "}
          terms defined so far.
        </p>
      </header>

      <div className="glossary-search">
        <input
          type="search"
          placeholder="Filter terms…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <section className="section">
        <div className="glossary-index">
          {filtered.map((t) => (
            <Link key={t.id} to={`/glossary/${t.id}`} className="glossary-term">
              <span className="glossary-term-name">{t.name}</span>
              {t.acronymOf && <span className="glossary-term-acronym">{t.acronymOf}</span>}
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Definitions</h2>
        {filtered.length === 0 ? (
          <p className="muted">No terms match "{q}".</p>
        ) : (
          <div className="entity-grid">
            {filtered.map((t) => (
              <EntityCard key={t.id} entity={t} href={`/glossary/${t.id}`} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
