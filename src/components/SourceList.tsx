import { Link } from "react-router-dom";
import { getSource } from "@/data/index";
import type { Source } from "@/data/types";

export function sourceLabel(s: Source): string {
  return `${s.publisher} — ${s.title}`;
}

/**
 * Renders a compact, linked list of sources backing a claim. In `inline`
 * mode, renders just the linked publisher names, comma-separated, for tight
 * placement next to a claim.
 */
export default function SourceList({
  sourceIds,
  inline,
}: {
  sourceIds?: string[];
  inline?: boolean;
}) {
  if (!sourceIds || sourceIds.length === 0) return null;
  const resolved = sourceIds
    .map((id) => getSource(id))
    .filter((s): s is Source => Boolean(s));

  if (inline) {
    return (
      <span className="source-list source-list-inline">
        {resolved.map((s, i) => (
          <span key={s.id}>
            <Link to={`/sources#${s.id}`} className="source-link">
              {s.publisher}
            </Link>
            {i < resolved.length - 1 ? ", " : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <ul className="source-list">
      {resolved.map((s) => (
        <li key={s.id}>
          <Link to={`/sources#${s.id}`} className="source-link">
            {s.publisher}
          </Link>
          <span className="source-title">{s.title}</span>
          {s.url && (
            <a href={s.url} target="_blank" rel="noreferrer" className="source-ext">
              ↗
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
