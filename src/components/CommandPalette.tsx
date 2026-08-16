import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { search, TYPE_LABEL } from "@/lib/search";
import type { SearchHit } from "@/lib/search";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      setResults(search(query.trim(), 12));
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cmd-palette-overlay" onClick={onClose}>
      <div className="cmd-palette-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-palette-input-row">
          <span className="cmd-search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-palette-input"
            placeholder="Search concepts, products, regulations, glossary... (Type to search)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="cmd-esc-hint" onClick={onClose}>ESC</kbd>
        </div>

        <div className="cmd-palette-results">
          {query.trim() && results.length === 0 && (
            <div className="cmd-empty">No matching definitions or entities found.</div>
          )}

          {!query.trim() && (
            <div className="cmd-suggestions">
              <span className="cmd-suggestions-title">Popular searches &amp; quick jumps</span>
              <div className="cmd-tag-list">
                {["XBRL", "iXBRL", "ESEF", "IRIS CARBON", "SupTech", "RegTech", "DORA", "SDMX"].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      className="cmd-suggest-chip"
                      onClick={() => setQuery(term)}
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {results.map((hit) => (
            <Link
              key={`${hit.type}:${hit.id}`}
              to={hit.href}
              className="cmd-result-item"
              onClick={onClose}
            >
              <div className="cmd-result-top">
                <span className="cmd-result-type">{TYPE_LABEL[hit.type] || hit.type}</span>
                <span className="cmd-result-title">{hit.title}</span>
              </div>
              {hit.subtitle && <p className="cmd-result-snippet">{hit.subtitle}</p>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
