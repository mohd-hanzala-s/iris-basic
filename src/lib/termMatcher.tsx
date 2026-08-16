import React from "react";
import { knowledgeBase } from "@/data/index";
import type { EntityType } from "@/data/types";
import TermPreview from "@/components/TermPreview";

export interface RecognizedTerm {
  term: string;
  type: EntityType;
  id: string;
  href: string;
  name: string;
  summary: string;
}

let cachedTerms: RecognizedTerm[] | null = null;
let termRegex: RegExp | null = null;
let termMap: Map<string, RecognizedTerm> | null = null;

export function getRecognizedTerms(): RecognizedTerm[] {
  if (cachedTerms) return cachedTerms;

  const terms: RecognizedTerm[] = [];
  const added = new Set<string>();

  function add(term: string, type: EntityType, id: string, name: string, summary: string) {
    const cleanTerm = term.trim();
    if (cleanTerm.length < 2) return;
    const lower = cleanTerm.toLowerCase();
    if (added.has(lower)) return;
    added.add(lower);
    terms.push({
      term: cleanTerm,
      type,
      id,
      href: `/${type}/${id}`,
      name,
      summary,
    });
  }

  // 1. Glossary items
  knowledgeBase.glossary.forEach((g) => {
    add(g.name, "glossary", g.id, g.name, g.summary);
    if (g.aliases) {
      g.aliases.forEach((alias) => add(alias, "glossary", g.id, g.name, g.summary));
    }
  });

  // 2. Products
  knowledgeBase.products.forEach((p) => {
    add(p.name, "product", p.id, p.name, p.summary);
    if (p.aliases) {
      p.aliases.forEach((alias) => add(alias, "product", p.id, p.name, p.summary));
    }
  });

  // 3. Concepts
  knowledgeBase.concepts.forEach((c) => {
    add(c.name, "concept", c.id, c.name, c.summary);
    if (c.aliases) {
      c.aliases.forEach((alias) => add(alias, "concept", c.id, c.name, c.summary));
    }
  });

  // 4. Regulations
  knowledgeBase.regulations.forEach((r) => {
    add(r.name, "regulation", r.id, r.name, r.summary);
    if (r.aliases) {
      r.aliases.forEach((alias) => add(alias, "regulation", r.id, r.name, r.summary));
    }
  });

  // 5. Regulators
  knowledgeBase.regulators.forEach((rg) => {
    add(rg.name, "regulator", rg.id, rg.name, rg.summary);
    if (rg.aliases) {
      rg.aliases.forEach((alias) => add(alias, "regulator", rg.id, rg.name, rg.summary));
    }
  });

  // 6. Technologies
  knowledgeBase.technologies.forEach((t) => {
    add(t.name, "technology", t.id, t.name, t.summary);
    if (t.aliases) {
      t.aliases.forEach((alias) => add(alias, "technology", t.id, t.name, t.summary));
    }
  });

  // 7. Companies
  knowledgeBase.companies.forEach((co) => {
    add(co.name, "company", co.id, co.name, co.summary);
    if (co.aliases) {
      co.aliases.forEach((alias) => add(alias, "company", co.id, co.name, co.summary));
    }
  });

  // Sort by term length descending so longer compound terms match first
  terms.sort((a, b) => b.term.length - a.term.length);
  cachedTerms = terms;

  // Build lookup map and regex
  termMap = new Map();
  terms.forEach((t) => {
    termMap?.set(t.term.toLowerCase(), t);
  });

  // Escape regex special chars
  const escapedTerms = terms.map((t) =>
    t.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  // Word boundary regex
  termRegex = new RegExp(`\\b(${escapedTerms.join("|")})\\b`, "gi");

  return cachedTerms;
}

/**
 * Automatically detects recognized terms in a plain text string and wraps them in TermPreview.
 */
export function autoHighlightTerms(text: string, keyPrefix: string): React.ReactNode[] {
  getRecognizedTerms(); // Ensure initialized
  if (!termRegex || !termMap) return [text];

  // Reset regex index
  termRegex.lastIndex = 0;
  const parts = text.split(termRegex);
  if (parts.length <= 1) return [text];

  const nodes: React.ReactNode[] = [];
  parts.forEach((part, idx) => {
    if (!part) return;
    const match = termMap?.get(part.toLowerCase());
    const key = `${keyPrefix}-term-${idx}`;

    if (match) {
      nodes.push(
        <TermPreview key={key} to={match.href} className="term-auto-highlight">
          {part}
        </TermPreview>
      );
    } else {
      nodes.push(part);
    }
  });

  return nodes;
}
