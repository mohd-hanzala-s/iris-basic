import { Link } from "react-router-dom";
import { relationsFor, getEntityName } from "@/data/index";
import type { EntityRef, RelationKind } from "@/data/types";
import CertaintyTag from "./CertaintyTag";

const KIND_LABEL: Record<RelationKind, string> = {
  serves: "serves",
  competesWith: "competes with",
  makes: "makes",
  compliesWith: "complies with",
  enforces: "enforces",
  builtWith: "built with",
  operatesIn: "operates in",
  uses: "uses",
  supports: "supports",
  relatedTo: "related to",
  partnerOf: "partner of",
  owns: "owns",
  divestedTo: "divested to",
};

export function hrefFor(ref: EntityRef): string {
  switch (ref.type) {
    case "company":
      return `/company/${ref.id}`;
    case "product":
      return `/product/${ref.id}`;
    case "regulator":
      return `/regulator/${ref.id}`;
    case "regulation":
      return `/regulation/${ref.id}`;
    case "technology":
      return `/technology/${ref.id}`;
    case "market":
      return `/market/${ref.id}`;
    case "useCase":
      return "/customers";
    case "glossary":
      return `/glossary/${ref.id}`;
    case "concept":
      return `/concept/${ref.id}`;
    default:
      return "/";
  }
}

/**
 * Lists all entities related to the given entity, with the direction and kind
 * of each relationship made explicit.
 */
export default function RelationList({ entityRef }: { entityRef: EntityRef }) {
  const rels = relationsFor(entityRef);
  if (rels.length === 0) {
    return <p className="muted">No relationships recorded yet.</p>;
  }

  return (
    <ul className="relation-list">
      {rels.map((r) => {
        const isOutgoing = r.from.type === entityRef.type && r.from.id === entityRef.id;
        const other = isOutgoing ? r.to : r.from;
        return (
          <li key={r.id} className="relation-item">
            <span className="relation-kind">
              {isOutgoing ? KIND_LABEL[r.kind] : `is ${KIND_LABEL[r.kind]} by`}
            </span>
            <Link to={hrefFor(other)} className="relation-target">
              {getEntityName(other)}
            </Link>
            <span className="relation-type">({other.type})</span>
            {r.note && <span className="relation-note">{r.note}</span>}
            {r.certainty && <CertaintyTag certainty={r.certainty} />}
          </li>
        );
      })}
    </ul>
  );
}
