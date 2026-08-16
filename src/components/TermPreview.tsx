import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEntity, CERTAINTY_LABEL } from "@/data/index";
import type { EntityType } from "@/data/types";
import AudioPlayer from "./AudioPlayer";

interface TermPreviewProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

// Parse url to extract entity type and id
function parseEntityPath(path: string): { type: EntityType; id: string } | null {
  const clean = path.replace(/^\//, "").split("?")[0].split("#")[0];
  const parts = clean.split("/");
  if (parts.length < 2) return null;

  const [rawType, id] = parts;
  const typeMap: Record<string, EntityType> = {
    concept: "concept",
    glossary: "glossary",
    product: "product",
    regulation: "regulation",
    regulator: "regulator",
    technology: "technology",
    company: "company",
    market: "market",
    useCase: "useCase",
  };

  const type = typeMap[rawType];
  if (!type || !id) return null;
  return { type, id };
}

export default function TermPreview({ to, children, className = "" }: TermPreviewProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; placeAbove: boolean }>({
    top: 0,
    left: 0,
    placeAbove: false,
  });

  const anchorRef = useRef<HTMLAnchorElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const entityInfo = parseEntityPath(to);
  const entity = entityInfo ? getEntity(entityInfo) : null;

  function showPopover() {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!anchorRef.current || !entity) return;

    const rect = anchorRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const placeAbove = spaceBelow < 220 && rect.top > 220;

    setCoords({
      top: placeAbove ? rect.top - 8 : rect.bottom + 8,
      left: Math.min(Math.max(16, rect.left + rect.width / 2 - 160), window.innerWidth - 336),
      placeAbove,
    });
    setOpen(true);
  }

  function hidePopover(delay = 200) {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, delay);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // If not a recognized entity link, just render standard Link
  if (!entity || !entityInfo) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <span
      className="term-preview-wrapper"
      onMouseEnter={showPopover}
      onMouseLeave={() => hidePopover(250)}
      onFocus={showPopover}
      onBlur={() => hidePopover(250)}
    >
      <Link
        ref={anchorRef}
        to={to}
        className={`term-smart-link ${className}`}
        onClick={(e) => {
          // On mobile / touch, first click reveals popover
          if (window.innerWidth < 768 && !open) {
            e.preventDefault();
            showPopover();
          }
        }}
      >
        {children}
        <span className="term-inline-icon">ℹ️</span>
      </Link>

      {open && (
        <div
          ref={popoverRef}
          className={`term-popover ${coords.placeAbove ? "place-above" : "place-below"}`}
          style={{
            position: "fixed",
            top: coords.placeAbove ? "auto" : `${coords.top}px`,
            bottom: coords.placeAbove ? `${window.innerHeight - coords.top}px` : "auto",
            left: `${coords.left}px`,
            zIndex: 9999,
          }}
          onMouseEnter={() => {
            if (timerRef.current) clearTimeout(timerRef.current);
          }}
          onMouseLeave={() => hidePopover(200)}
        >
          <div className="term-popover-header">
            <span className="term-category-badge">{entityInfo.type.toUpperCase()}</span>
            {entity.certainty && (
              <span className="term-certainty-badge">
                {CERTAINTY_LABEL[entity.certainty] || entity.certainty}
              </span>
            )}
            <AudioPlayer text={`${entity.name}. ${entity.summary}`} />
          </div>

          <h4 className="term-popover-title">{entity.name}</h4>
          <p className="term-popover-summary">{entity.summary}</p>

          <div className="term-popover-footer">
            <Link
              to={to}
              className="term-popover-btn"
              onClick={() => setOpen(false)}
            >
              Open Full Entity Page →
            </Link>
          </div>
        </div>
      )}
    </span>
  );
}
