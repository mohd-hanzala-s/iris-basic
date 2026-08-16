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
  relations,
  learningModules,
  flashcards,
  quizzes,
  customerSegments,
  masteryPath,
  followPaths,
  competitorProfiles,
  headToHeads,
  competitiveThreats,
  competitivePositioning,
  whyChoose,
  sources,
  evidenceClaims,
  sourceVerifications,
  productDeepDives,
} from "../src/data/index";
import { ecosystemFlow } from "../src/data/ecosystem";

const errors: string[] = [];

const ids = {
  company: new Set(companies.map((c) => c.id)),
  product: new Set(products.map((p) => p.id)),
  regulator: new Set(regulators.map((r) => r.id)),
  regulation: new Set(regulations.map((r) => r.id)),
  technology: new Set(technologies.map((t) => t.id)),
  market: new Set(markets.map((m) => m.id)),
  useCase: new Set(useCases.map((u) => u.id)),
  glossary: new Set(glossary.map((g) => g.id)),
  concept: new Set(concepts.map((c) => c.id)),
  source: new Set(sources.map((s) => s.id)),
  learning: new Set(learningModules.map((m) => m.id)),
  flashcard: new Set(flashcards.map((f) => f.id)),
  quiz: new Set(quizzes.map((q) => q.id)),
};

function checkId(kind: keyof typeof ids, id: string, ctx: string) {
  if (!ids[kind].has(id)) errors.push(`[${ctx}] missing ${kind} id: ${id}`);
}

function checkSources(list: string[] | undefined, ctx: string) {
  for (const s of list ?? []) if (!ids.source.has(s)) errors.push(`[${ctx}] missing source id: ${s}`);
}

// relations
for (const r of relations) {
  checkId(r.from.type as keyof typeof ids, r.from.id, `relation ${r.id} from`);
  checkId(r.to.type as keyof typeof ids, r.to.id, `relation ${r.id} to`);
  checkSources(r.sources, `relation ${r.id}`);
}

// entities -> sources
for (const e of [...companies, ...products, ...regulators, ...regulations, ...technologies, ...markets, ...useCases, ...glossary, ...concepts])
  checkSources(e.sources, `entity ${e.name}`);

// headToHeads
for (const h of headToHeads) {
  checkId("product", h.irisProductId, `headToHead ${h.id} iris`);
  checkId("company", h.competitorCompanyId, `headToHead ${h.id} comp`);
}

// competitorProfiles
for (const p of competitorProfiles) checkId("company", p.companyId, `profile ${p.id}`);

// customerSegments
for (const s of customerSegments) {
  for (const pid of s.productIds) checkId("product", pid, `segment ${s.id}`);
  for (const r of s.entityRefs) checkId(r.type as keyof typeof ids, r.id, `segment ${s.id} entityRef`);
  checkSources(s.sources, `segment ${s.id}`);
}

// masteryPath
for (const l of masteryPath.levels) checkId("learning", l.moduleId, `mastery level ${l.level}`);

// followPaths
for (const p of followPaths) for (const st of p.steps) {
  for (const r of st.refs) checkId(r.type as keyof typeof ids, r.id, `follow ${p.mode} step ${st.label}`);
  checkSources(st.sources, `follow ${p.mode} step ${st.label}`);
}

// ecosystem
for (const stage of ecosystemFlow) {
  if (stage.conceptId) checkId("concept", stage.conceptId, `ecosystem ${stage.id}`);
  for (const r of stage.related ?? []) checkId(r.type as keyof typeof ids, r.id, `ecosystem ${stage.id}`);
}

// competitiveThreats
for (const t of competitiveThreats) {
  for (const pid of t.productIds ?? []) checkId("product", pid, `threat ${t.id}`);
  for (const cid of t.competitorIds ?? []) checkId("company", cid, `threat ${t.id}`);
}

// whyChoose
for (const w of whyChoose) checkSources(w.sources, `whyChoose ${w.id}`);

// learningModules / flashcards / quizzes sources
for (const m of learningModules) checkSources(m.sources, `module ${m.title}`);
for (const f of flashcards) checkSources(f.sources, `flashcard ${f.front}`);
for (const q of quizzes) for (const qq of q.questions) checkSources(qq.sources, `quiz ${q.title}`);

// evidence claims sourceIds
for (const c of evidenceClaims) for (const sid of c.sourceIds) if (!ids.source.has(sid)) errors.push(`[claim ${c.id}] missing source id: ${sid}`);
for (const sv of sourceVerifications) if (!ids.source.has(sv.sourceId)) errors.push(`[verification] missing source id: ${sv.sourceId}`);

// product deep dives
for (const d of productDeepDives) {
  checkId("product", d.productId, `dive ${d.productId}`);
  for (const rp of d.relatedProductIds ?? []) checkId("product", rp, `dive ${d.productId} related`);
  for (const a of d.aspects) checkSources(a.sources, `dive ${d.productId} aspect ${a.heading}`);
  for (const l of d.levels) for (const ref of l.refs ?? []) checkId(ref.type as keyof typeof ids, ref.id, `dive ${d.productId} level ${l.level}`);
}

if (errors.length === 0) {
  console.log("ALL REFERENCES VALID");
} else {
  console.log(`FOUND ${errors.length} PROBLEMS:`);
  for (const e of errors) console.log("  " + e);
}
