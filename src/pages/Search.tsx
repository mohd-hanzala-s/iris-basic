import { useSearchParams, Link } from "react-router-dom";
import { search, TYPE_LABEL } from "@/lib/search";
import type { SearchHit } from "@/lib/search";

const GROUP_ORDER: SearchHit["type"][] = [
  "product",
  "company",
  "regulation",
  "regulator",
  "technology",
  "market",
  "concept",
  "glossary",
  "learning",
  "quiz",
  "flashcard",
  "useCase",
];

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const results = search(q);

  const groups = GROUP_ORDER.map((type) => ({
    type,
    label: TYPE_LABEL[type],
    hits: results.filter((r) => r.type === type),
  })).filter((g) => g.hits.length > 0);

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Search</span>
        <h1 className="page-hero-title">Search</h1>
        <p className="page-hero-lede">
          {q ? (
            <>
              {results.length} result{results.length === 1 ? "" : "s"} for{" "}
              <strong>"{q}"</strong>
            </>
          ) : (
            "Search the entire knowledge base — companies, products, regulations, technology, glossary and more."
          )}
        </p>
      </header>

      {q &&
        (results.length === 0 ? (
          <p className="muted">No results. Try a broader term.</p>
        ) : (
          groups.map((group) => (
            <section key={group.type} className="section">
              <h2>{group.label}</h2>
              <ul className="search-results-list">
                {group.hits.map((r) => (
                  <li key={`${r.type}:${r.id}`}>
                    <Link to={r.href} className="search-result-full">
                      <span className="search-result-title">{r.title}</span>
                      <span className="search-result-subtitle">{r.subtitle}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))
        ))}
    </div>
  );
}
