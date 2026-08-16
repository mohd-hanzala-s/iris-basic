import { useParams, Link } from "react-router-dom";
import { knowledgeBase } from "@/data/index";
import Markdown from "@/components/Markdown";
import CertaintyTag from "@/components/CertaintyTag";
import SourceList from "@/components/SourceList";
import RelationList from "@/components/RelationList";

/**
 * Multi-level concept explainer. Renders the ordered sections (simple →
 * professional → example → why…) plus the overall description, certainty,
 * sources and any recorded relationships.
 */
export default function ConceptDetail() {
  const { id } = useParams();
  const concept = knowledgeBase.concepts.find((c) => c.id === id);
  if (!concept) return <div className="page"><p className="muted">Concept not found.</p></div>;

  return (
    <div className="page">
      <nav className="breadcrumb">
        <Link to="/regtech">← RegTech domain</Link> ·{" "}
        <Link to="/concepts">All concepts</Link>
      </nav>
      <header className="entity-detail-header">
        <h1>{concept.name}</h1>
        <CertaintyTag certainty={concept.certainty} />
      </header>
      <p className="entity-summary">{concept.summary}</p>
      <p className="muted" style={{ fontSize: "0.8rem" }}>
        Group: {concept.group}
      </p>

      {concept.description && (
        <section className="section">
          <Markdown text={concept.description} />
        </section>
      )}

      {concept.sections.map((s, i) => (
        <section key={s.heading} className="concept-section">
          <div className="concept-section-head">
            <span className="concept-section-num">{i + 1}</span>
            <h2>{s.heading}</h2>
            {s.certainty && <CertaintyTag certainty={s.certainty} />}
          </div>
          <Markdown text={s.body} />
          {s.sources && s.sources.length > 0 && <SourceList sourceIds={s.sources} />}
        </section>
      ))}

      <section className="section">
        <h2>Relationships</h2>
        <RelationList entityRef={{ type: "concept", id: concept.id }} />
      </section>

      {concept.tags && concept.tags.length > 0 && (
        <div className="tag-row">
          {concept.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}
