import { Link, useParams } from "react-router-dom";
import { knowledgeBase } from "@/data/index";
import Markdown from "@/components/Markdown";
import CertaintyTag from "@/components/CertaintyTag";
import SourceList from "@/components/SourceList";
import RelationList from "@/components/RelationList";
import DocStatusTag from "@/components/DocStatusTag";

export default function TechnologyDetail() {
  const { id } = useParams();
  const tech = knowledgeBase.technologies.find((t) => t.id === id);
  if (!tech) return <div className="page"><p className="muted">Technology not found.</p></div>;

  return (
    <div className="page">
      <article className="entity-detail">
        <nav className="breadcrumb">
          <Link to="/technology">← Back to technology</Link>
        </nav>
        <header className="entity-detail-header">
          <h1>{tech.name}</h1>
          <CertaintyTag certainty={tech.certainty} />
          <DocStatusTag docStatus={tech.docStatus} />
        </header>

        <dl className="meta-grid">
          <div className="meta-item"><dt>Category</dt><dd>{tech.category.join(" · ")}</dd></div>
          <div className="meta-item"><dt>Standard of</dt><dd>{tech.standardOf ?? "—"}</dd></div>
          <div className="meta-item"><dt>Documentation</dt><dd>{tech.docStatus.replace(/_/g, " ").toLowerCase()}</dd></div>
        </dl>

        <p className="entity-summary">{tech.summary}</p>

        {tech.details && (
          <section>
            <h2>How it works</h2>
            {Object.entries(tech.details).map(([heading, body]) => (
              <div key={heading} className="framework-item">
                <h3>{heading}</h3>
                <Markdown text={body} />
              </div>
            ))}
          </section>
        )}

        <section>
          <h2>Relationships</h2>
          <RelationList entityRef={{ type: "technology", id: tech.id }} />
        </section>

        <section>
          <h2>Sources</h2>
          {tech.sources.length > 0 ? (
            <SourceList sourceIds={tech.sources} />
          ) : (
            <p className="muted">No sources recorded yet.</p>
          )}
        </section>
      </article>
    </div>
  );
}
