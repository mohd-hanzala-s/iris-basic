import { Link } from "react-router-dom";
import { knowledgeBase } from "@/data/index";
import EntityCard from "@/components/EntityCard";

export default function Concepts() {
  const concepts = knowledgeBase.concepts;
  const groups = [...new Set(concepts.map((c) => c.group))];

  return (
    <div className="page">
      <nav className="breadcrumb">
        <Link to="/regtech">← RegTech domain</Link>
      </nav>
      <header className="page-hero">
        <span className="eyebrow">Explore · Knowledge base</span>
        <h1 className="page-hero-title">Concept Library</h1>
        <p className="page-hero-lede">
          Every core RegTech concept, explained from simple intuition to
          professional depth — {concepts.length} concepts across {groups.length} groups.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group} className="section">
          <h2>{group}</h2>
          <div className="entity-grid">
            {concepts
              .filter((c) => c.group === group)
              .map((c) => (
                <EntityCard key={c.id} entity={c} href={`/concept/${c.id}`} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
