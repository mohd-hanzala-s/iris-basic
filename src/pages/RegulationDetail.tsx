import { Link, useParams } from "react-router-dom";
import { knowledgeBase } from "@/data/index";
import Markdown from "@/components/Markdown";
import CertaintyTag from "@/components/CertaintyTag";
import SourceList from "@/components/SourceList";
import RelationList from "@/components/RelationList";

export default function RegulationDetail() {
  const { id } = useParams();
  const reg = knowledgeBase.regulations.find((r) => r.id === id);
  if (!reg) return <div className="page"><p className="muted">Regulation not found.</p></div>;

  const regulators = reg.regulatorIds
    .map((rid) => knowledgeBase.regulators.find((x) => x.id === rid))
    .filter(Boolean);

  return (
    <div className="page">
      <article className="entity-detail">
        <nav className="breadcrumb">
          <Link to="/regulations">← Back to regulations</Link>
        </nav>
        <header className="entity-detail-header">
          <h1>{reg.name}</h1>
          <CertaintyTag certainty={reg.certainty} />
        </header>

        <dl className="meta-grid">
          <div className="meta-item"><dt>Jurisdiction</dt><dd>{reg.jurisdiction.join(" · ")}</dd></div>
          <div className="meta-item"><dt>Status</dt><dd>{reg.status ?? "Unknown"}</dd></div>
          <div className="meta-item"><dt>First issued</dt><dd>{reg.firstIssued ? String(reg.firstIssued) : "—"}</dd></div>
        </dl>

        <p className="entity-summary">{reg.summary}</p>

        {regulators.length > 0 && (
          <section>
            <h2>Issued / enforced by</h2>
            <div className="entity-grid">
              {regulators.map((r) => (
                <Link key={r!.id} to={`/regulator/${r!.id}`} className="entity-card">
                  <div className="entity-card-head">
                    <h3 className="entity-card-title">{r!.name}</h3>
                    <CertaintyTag certainty={r!.certainty} />
                  </div>
                  <p className="entity-card-summary">{r!.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {reg.details && (
          <section>
            <h2>Framework profile</h2>
            <div className="framework-profile">
              {Object.entries(reg.details).map(([heading, body]) => (
                <div key={heading} className="framework-item">
                  <h3>{heading}</h3>
                  <Markdown text={body} />
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2>Relationships</h2>
          <RelationList entityRef={{ type: "regulation", id: reg.id }} />
        </section>

        <section>
          <h2>Sources</h2>
          {reg.sources.length > 0 ? (
            <SourceList sourceIds={reg.sources} />
          ) : (
            <p className="muted">No sources recorded yet.</p>
          )}
        </section>
      </article>
    </div>
  );
}
