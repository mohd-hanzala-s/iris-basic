import Fuse from "fuse.js";
import type { EntityRef, EntityType } from "@/data/types";
import {
  companies,
  products,
  regulators,
  regulations,
  technologies,
  markets,
  useCases,
  glossary,
  concepts,
  learningModules,
  flashcards,
  quizzes,
} from "@/data/index";

export interface SearchHit {
  type: EntityType | "learning" | "flashcard" | "quiz";
  id: string;
  title: string;
  subtitle: string;
  /** Route path to navigate to. */
  href: string;
  ref?: EntityRef;
}

interface SearchRecord {
  type: SearchHit["type"];
  id: string;
  title: string;
  subtitle: string;
  keywords: string;
  href: string;
  ref?: EntityRef;
}

function buildRecords(): SearchRecord[] {
  const records: SearchRecord[] = [];

  for (const c of companies)
    records.push({
      type: "company",
      id: c.id,
      title: c.name,
      subtitle: c.summary,
      keywords: [c.aliases?.join(" "), c.tags?.join(" "), c.headquarters].filter(Boolean).join(" "),
      href: `/company/${c.id}`,
      ref: { type: "company", id: c.id },
    });
  for (const p of products)
    records.push({
      type: "product",
      id: p.id,
      title: p.name,
      subtitle: p.summary,
      keywords: p.category.join(" "),
      href: `/product/${p.id}`,
      ref: { type: "product", id: p.id },
    });
  for (const r of regulators)
    records.push({
      type: "regulator",
      id: r.id,
      title: r.name,
      subtitle: r.summary,
      keywords: r.regulatorType.join(" "),
      href: `/regulator/${r.id}`,
      ref: { type: "regulator", id: r.id },
    });
  for (const r of regulations)
    records.push({
      type: "regulation",
      id: r.id,
      title: r.name,
      subtitle: r.summary,
      keywords: r.jurisdiction.join(" "),
      href: `/regulation/${r.id}`,
      ref: { type: "regulation", id: r.id },
    });
  for (const t of technologies)
    records.push({
      type: "technology",
      id: t.id,
      title: t.name,
      subtitle: t.summary,
      keywords: t.category.join(" "),
      href: `/technology/${t.id}`,
      ref: { type: "technology", id: t.id },
    });
  for (const m of markets)
    records.push({
      type: "market",
      id: m.id,
      title: m.name,
      subtitle: m.summary,
      keywords: m.region,
      href: `/market/${m.id}`,
      ref: { type: "market", id: m.id },
    });
  for (const u of useCases)
    records.push({
      type: "useCase",
      id: u.id,
      title: u.name,
      subtitle: u.summary,
      keywords: (u.persona ?? []).join(" "),
      href: "/customers",
      ref: { type: "useCase", id: u.id },
    });
  for (const g of glossary)
    records.push({
      type: "glossary",
      id: g.id,
      title: g.name,
      subtitle: g.summary,
      keywords: [g.acronymOf, g.tags?.join(" ")].filter(Boolean).join(" "),
      href: `/glossary/${g.id}`,
      ref: { type: "glossary", id: g.id },
    });
  for (const c of concepts)
    records.push({
      type: "concept",
      id: c.id,
      title: c.name,
      subtitle: c.summary,
      keywords: [c.group, c.tags?.join(" ")].filter(Boolean).join(" "),
      href: `/concept/${c.id}`,
      ref: { type: "concept", id: c.id },
    });
  for (const m of learningModules)
    records.push({
      type: "learning",
      id: m.id,
      title: m.title,
      subtitle: m.summary,
      keywords: "",
      href: `/learning/${m.id}`,
    });
  for (const f of flashcards)
    records.push({
      type: "flashcard",
      id: f.id,
      title: f.front,
      subtitle: f.deck,
      keywords: f.tags?.join(" ") ?? "",
      href: "/flashcards",
    });
  for (const q of quizzes)
    records.push({
      type: "quiz",
      id: q.id,
      title: q.title,
      subtitle: q.description ?? "",
      keywords: "",
      href: `/quizzes/${q.id}`,
    });

  return records;
}

const records = buildRecords();

const fuse = new Fuse(records, {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "subtitle", weight: 0.3 },
    { name: "keywords", weight: 0.2 },
  ],
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

export function search(query: string, limit = 30): SearchHit[] {
  if (!query.trim()) return [];
  return fuse.search(query.trim()).slice(0, limit).map((r) => {
    const { type, id, title, subtitle, href, ref } = r.item;
    return { type, id, title, subtitle, href, ref };
  });
}

export const TYPE_LABEL: Record<SearchHit["type"], string> = {
  company: "Company",
  product: "Product",
  regulator: "Regulator",
  regulation: "Regulation",
  technology: "Technology",
  market: "Market",
  useCase: "Use case",
  glossary: "Glossary",
  concept: "Concept",
  learning: "Learning",
  flashcard: "Flashcard",
  quiz: "Quiz",
};
