import { Link } from "react-router-dom";
import type { EntityBase } from "@/data/types";
import CertaintyTag from "./CertaintyTag";

/**
 * Compact card for listing entities in an index page.
 */
export default function EntityCard({
  entity,
  href,
  meta,
  badge,
}: {
  entity: EntityBase;
  href: string;
  meta?: string;
  badge?: React.ReactNode;
}) {
  return (
    <Link to={href} className="entity-card">
      <div className="entity-card-head">
        <h3 className="entity-card-title">{entity.name}</h3>
        {badge}
        <CertaintyTag certainty={entity.certainty} />
      </div>
      {meta && <div className="entity-card-meta">{meta}</div>}
      <p className="entity-card-summary">{entity.summary}</p>
    </Link>
  );
}
