import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout";
import Home from "../src/pages/Home";
import StartHere from "../src/pages/StartHere";
import BeginnerGuide from "../src/pages/BeginnerGuide";
import RegTech from "../src/pages/RegTech";
import Iris from "../src/pages/Iris";
import Products from "../src/pages/Products";
import ProductDetail from "../src/pages/ProductDetail";
import Customers from "../src/pages/Customers";
import Regulations from "../src/pages/Regulations";
import RegulationDetail from "../src/pages/RegulationDetail";
import Competitors from "../src/pages/Competitors";
import CompetitorDetail from "../src/pages/CompetitorDetail";
import Technology from "../src/pages/Technology";
import TechnologyDetail from "../src/pages/TechnologyDetail";
import Markets from "../src/pages/Markets";
import MarketDetail from "../src/pages/MarketDetail";
import Strategy from "../src/pages/Strategy";
import Glossary from "../src/pages/Glossary";
import GlossaryDetail from "../src/pages/GlossaryDetail";
import Learning from "../src/pages/Learning";
import LearningDetail from "../src/pages/LearningDetail";
import Flashcards from "../src/pages/Flashcards";
import Quizzes from "../src/pages/Quizzes";
import QuizDetail from "../src/pages/QuizDetail";
import Sources from "../src/pages/Sources";
import Evidence from "../src/pages/Evidence";
import ClaimAudit from "../src/pages/ClaimAudit";
import Search from "../src/pages/Search";
import Graph from "../src/pages/Graph";
import Dashboard from "../src/pages/Dashboard";
import Follow from "../src/pages/Follow";
import CompanyDetail from "../src/pages/CompanyDetail";
import RegulatorDetail from "../src/pages/RegulatorDetail";
import Concepts from "../src/pages/Concepts";
import ConceptDetail from "../src/pages/ConceptDetail";
import { knowledgeBase } from "../src/data/index";

const store: Record<string, string> = {};
(globalThis as any).localStorage = {
  getItem: (k: string) => store[k] ?? null,
  setItem: (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
};
(globalThis as any).window = globalThis;
(globalThis as any).document = {
  documentElement: { getAttribute: () => null, setAttribute: () => {}, removeAttribute: () => {} },
  getElementById: () => null,
  addEventListener: () => {},
  removeEventListener: () => {},
};
(globalThis as any).matchMedia = () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} });

const ids = {
  product: new Set(knowledgeBase.products.map((p) => p.id)),
  company: new Set(knowledgeBase.companies.map((c) => c.id)),
  regulator: new Set(knowledgeBase.regulators.map((r) => r.id)),
  regulation: new Set(knowledgeBase.regulations.map((r) => r.id)),
  technology: new Set(knowledgeBase.technologies.map((t) => t.id)),
  market: new Set(knowledgeBase.markets.map((m) => m.id)),
  glossary: new Set(knowledgeBase.glossary.map((g) => g.id)),
  concept: new Set(knowledgeBase.concepts.map((c) => c.id)),
  learning: new Set(knowledgeBase.learningModules.map((m) => m.id)),
  quiz: new Set(knowledgeBase.quizzes.map((q) => q.id)),
};

const staticRoutes = new Set([
  "/", "/start", "/guide", "/regtech", "/iris", "/products", "/customers", "/regulations",
  "/competitors", "/technology", "/markets", "/strategy", "/glossary", "/learning",
  "/flashcards", "/quizzes", "/sources", "/evidence", "/claims", "/search",
  "/graph", "/dashboard", "/concepts",
]);

const dynamicPrefix = [
  ["/product/", "product"],
  ["/company/", "company"],
  ["/regulator/", "regulator"],
  ["/regulation/", "regulation"],
  ["/technology/", "technology"],
  ["/market/", "market"],
  ["/glossary/", "glossary"],
  ["/concept/", "concept"],
  ["/learning/", "learning"],
  ["/quizzes/", "quiz"],
  ["/competitor/", "company"],
  ["/follow/", null],
] as const;

const broken = new Set<string>();
const seen = new Set<string>();
let hrefCount = 0;

function collect(html: string) {
  const re = /href="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    const href = m[1];
    if (!href.startsWith("/")) continue;
    hrefCount++;
    if (seen.has(href)) continue;
    seen.add(href);
    const clean = href.split("#")[0].split("?")[0];
    if (staticRoutes.has(clean)) continue;
    let matched = false;
    for (const [prefix, kind] of dynamicPrefix) {
      if (clean.startsWith(prefix)) {
        if (kind === null) { matched = true; break; }
        const id = clean.slice(prefix.length);
        if (id && ids[kind].has(id)) { matched = true; }
        break;
      }
    }
    if (!matched) broken.add(href);
  }
}

function render(Component: any, path: string) {
  const html = renderToString(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<Component />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  collect(html);
}

render(Home, "/");
render(StartHere, "/start");
render(BeginnerGuide, "/guide");
render(RegTech, "/regtech");
render(Iris, "/iris");
render(Products, "/products");
render(Customers, "/customers");
render(Regulations, "/regulations");
render(Competitors, "/competitors");
render(Technology, "/technology");
render(Markets, "/markets");
render(Strategy, "/strategy");
render(Glossary, "/glossary");
render(Learning, "/learning");
render(Flashcards, "/flashcards");
render(Quizzes, "/quizzes");
render(Sources, "/sources");
render(Evidence, "/evidence");
render(ClaimAudit, "/claims");
render(Search, "/search?q=xbrl");
render(Graph, "/graph");
render(Dashboard, "/dashboard");
render(Follow, "/follow/data");
render(Follow, "/follow/regulation");
render(Concepts, "/concepts");

for (const p of knowledgeBase.products) render(ProductDetail, `/product/${p.id}`);
for (const r of knowledgeBase.regulations) render(RegulationDetail, `/regulation/${r.id}`);
for (const t of knowledgeBase.technologies) render(TechnologyDetail, `/technology/${t.id}`);
for (const m of knowledgeBase.markets) render(MarketDetail, `/market/${m.id}`);
for (const g of knowledgeBase.glossary) render(GlossaryDetail, `/glossary/${g.id}`);
for (const lm of knowledgeBase.learningModules) render(LearningDetail, `/learning/${lm.id}`);
for (const q of knowledgeBase.quizzes) render(QuizDetail, `/quizzes/${q.id}`);
for (const c of knowledgeBase.companies) render(CompanyDetail, `/company/${c.id}`);
for (const r of knowledgeBase.regulators) render(RegulatorDetail, `/regulator/${r.id}`);
for (const c of knowledgeBase.concepts) render(ConceptDetail, `/concept/${c.id}`);
for (const c of knowledgeBase.companies.filter((x) => x.companyType === "COMPETITOR"))
  render(CompetitorDetail, `/competitor/${c.id}`);

console.log(`Total internal hrefs rendered: ${hrefCount}, unique: ${seen.size}`);
if (broken.size) {
  console.log(`\n${broken.size} BROKEN LINKS FOUND:`);
  for (const b of [...broken].sort()) console.log("  " + b);
  process.exit(1);
} else {
  console.log("NO BROKEN LINKS FOUND");
}
