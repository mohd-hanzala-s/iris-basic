import { Link } from "react-router-dom";
import { knowledgeBase } from "@/data/index";
import EcosystemMap from "@/components/EcosystemMap";
import EntityCard from "@/components/EntityCard";

export default function RegTech() {
  const concepts = knowledgeBase.concepts;
  const groups = [...new Set(concepts.map((c) => c.group))];
  const paths = [...knowledgeBase.learningModules].sort((a, b) => a.order - b.order);

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Learn · The domain</span>
        <h1 className="page-hero-title">RegTech — the domain</h1>
        <p className="page-hero-lede">
          The industry IRIS operates in. Master the concepts, standards and data
          flows of regulatory technology before studying IRIS itself.
        </p>
      </header>

      <section className="section">
        <h2>The RegTech ecosystem map</h2>
        <p className="muted">
          The end-to-end flow from regulation to supervision. Each stage is a link
          in the chain where cost, risk and value concentrate.
        </p>
        <EcosystemMap />
      </section>

      <section className="section">
        <h2>Learning paths</h2>
        <div className="grid-2">
          {paths.map((m) => (
            <Link key={m.id} to={`/learning/${m.id}`} className="info-card">
              <h3>{m.title}</h3>
              <p>{m.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Concept library</h2>
        <p className="muted">
          Every core concept, from simple explanation to professional depth.{" "}
          <Link to="/concepts">Open the full library →</Link>
        </p>
        {groups.map((group) => (
          <div key={group} className="category-block">
            <h3>{group}</h3>
            <div className="entity-grid">
              {concepts
                .filter((c) => c.group === group)
                .map((c) => (
                  <EntityCard key={c.id} entity={c} href={`/concept/${c.id}`} />
                ))}
            </div>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>How to read the evidence labels</h2>
        <p>
          This system never presents speculation as fact. Every claim carries one
          of: <strong>Fact</strong>, <strong>Company claim</strong>,{" "}
          <strong>Customer / user opinion</strong>, <strong>Analyst view</strong>,{" "}
          <strong>Inference</strong> or <strong>Unknown</strong> — and cites its
          source in the <Link to="/sources">source registry</Link>.
        </p>
      </section>
    </div>
  );
}
