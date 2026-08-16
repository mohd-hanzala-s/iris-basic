import { Link } from "react-router-dom";
import type { EntityBase } from "@/data/types";
import CertaintyTag from "./CertaintyTag";
import SourceList from "./SourceList";
import Markdown from "./Markdown";

/**
 * Generic detail renderer shared by all entity detail pages (company, product,
 * regulation, technology, market, glossary, regulator). Metadata rows are
 * type-specific; the description, details, sources and tags are uniform.
 */
export default function EntityDetail({
  entity,
  meta,
  backTo,
  children,
}: {
  entity: EntityBase;
  meta?: { label: string; value: string }[];
  backTo: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="entity-detail">
      <nav className="breadcrumb">
        <Link to={backTo}>← Back</Link>
      </nav>
      <header className="entity-detail-header">
        <h1>{entity.name}</h1>
        <CertaintyTag certainty={entity.certainty} />
      </header>

      {meta && meta.length > 0 && (
        <dl className="meta-grid">
          {meta.map((m) => (
            <div key={m.label} className="meta-item">
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {entity.aliases && entity.aliases.length > 0 && (
        <p className="aliases">
          Also known as: {entity.aliases.join(", ")}
        </p>
      )}

      <p className="entity-summary">{entity.summary}</p>

      {entity.description && (
        <section>
          <h2>Overview</h2>
          <Markdown text={entity.description} />
        </section>
      )}

      {entity.details &&
        Object.entries(entity.details).map(([heading, body]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <Markdown text={body} />
          </section>
        ))}

      {children}

      {entity.tags && entity.tags.length > 0 && (
        <div className="tag-row">
          {entity.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      )}

      <section>
        <h2>Sources</h2>
        {entity.sources.length > 0 ? (
          <SourceList sourceIds={entity.sources} />
        ) : (
          <p className="muted">No sources recorded yet.</p>
        )}
      </section>
    </article>
  );
}
