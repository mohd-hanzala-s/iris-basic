import { useState } from "react";
import { Link } from "react-router-dom";
import { resolveRef, CERTAINTY_LABEL } from "@/data/index";
import AudioPlayer from "./AudioPlayer";

interface LessonGlossaryDrawerProps {
  entityRefs: string[];
}

export default function LessonGlossaryDrawer({ entityRefs }: LessonGlossaryDrawerProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const entities = entityRefs
    .map((refStr) => {
      const [type, rid] = refStr.split(":");
      const entity = resolveRef(refStr);
      if (!entity) return null;
      return {
        refStr,
        type,
        rid,
        entity,
      };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  const filteredEntities = searchTerm.trim()
    ? entities.filter(
        (e) =>
          e.entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.entity.summary.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : entities;

  if (entities.length === 0) return null;

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        className="floating-glossary-btn"
        onClick={() => setOpen(true)}
        title="Open Lesson Glossary (Side-by-side terms)"
      >
        <span className="glossary-btn-icon">📖</span>
        <span className="glossary-btn-label">Lesson Terms ({entities.length})</span>
      </button>

      {/* Slide-out Side Drawer */}
      {open && (
        <div className="glossary-drawer-overlay" onClick={() => setOpen(false)}>
          <div
            className="glossary-drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glossary-drawer-header">
              <div>
                <span className="drawer-kicker">Instant Reference</span>
                <h3 className="drawer-title">Lesson Glossary &amp; Concepts</h3>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close drawer"
              >
                ✕
              </button>
            </div>

            <div className="glossary-drawer-search">
              <input
                type="text"
                placeholder="Filter lesson terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>

            <div className="glossary-drawer-list">
              {filteredEntities.map(({ refStr, type, rid, entity }) => (
                <div key={refStr} className="glossary-drawer-item">
                  <div className="drawer-item-top">
                    <span className="drawer-type-badge">{type.toUpperCase()}</span>
                    {entity.certainty && (
                      <span className="drawer-certainty-badge">
                        {CERTAINTY_LABEL[entity.certainty] || entity.certainty}
                      </span>
                    )}
                    <AudioPlayer text={`${entity.name}. ${entity.summary}`} />
                  </div>
                  <h4 className="drawer-item-name">{entity.name}</h4>
                  <p className="drawer-item-summary">{entity.summary}</p>
                  <Link
                    to={`/${type}/${rid}`}
                    className="drawer-item-link"
                    onClick={() => setOpen(false)}
                  >
                    Open full page →
                  </Link>
                </div>
              ))}

              {filteredEntities.length === 0 && (
                <p className="muted" style={{ padding: "1rem", textAlign: "center" }}>
                  No matching terms found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
