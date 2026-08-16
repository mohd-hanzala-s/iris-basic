import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout";
import ProductDetail from "../src/pages/ProductDetail";
import RegulationDetail from "../src/pages/RegulationDetail";
import CompetitorDetail from "../src/pages/CompetitorDetail";
import TechnologyDetail from "../src/pages/TechnologyDetail";
import MarketDetail from "../src/pages/MarketDetail";
import GlossaryDetail from "../src/pages/GlossaryDetail";
import LearningDetail from "../src/pages/LearningDetail";
import QuizDetail from "../src/pages/QuizDetail";
import CompanyDetail from "../src/pages/CompanyDetail";
import RegulatorDetail from "../src/pages/RegulatorDetail";
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

function render(Component: any, path: string) {
  renderToString(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<Component />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

const failures: string[] = [];
let ok = 0;

function check(name: string, Component: any, path: string) {
  try {
    render(Component, path);
    ok++;
  } catch (e: any) {
    failures.push(`${name} (${path}): ${String(e?.message ?? e)}`);
  }
}

for (const p of knowledgeBase.products) check("product", ProductDetail, `/product/${p.id}`);
for (const r of knowledgeBase.regulations) check("regulation", RegulationDetail, `/regulation/${r.id}`);
for (const t of knowledgeBase.technologies) check("technology", TechnologyDetail, `/technology/${t.id}`);
for (const m of knowledgeBase.markets) check("market", MarketDetail, `/market/${m.id}`);
for (const g of knowledgeBase.glossary) check("glossary", GlossaryDetail, `/glossary/${g.id}`);
for (const lm of knowledgeBase.learningModules) check("learning", LearningDetail, `/learning/${lm.id}`);
for (const q of knowledgeBase.quizzes) check("quiz", QuizDetail, `/quizzes/${q.id}`);
for (const c of knowledgeBase.companies) check("company", CompanyDetail, `/company/${c.id}`);
for (const r of knowledgeBase.regulators) check("regulator", RegulatorDetail, `/regulator/${r.id}`);
for (const c of knowledgeBase.concepts) check("concept", ConceptDetail, `/concept/${c.id}`);
for (const c of knowledgeBase.companies.filter((x) => x.companyType === "COMPETITOR"))
  check("competitor", CompetitorDetail, `/competitor/${c.id}`);

console.log(`\n${ok} detail pages OK, ${failures.length} failures`);
for (const f of failures) console.log("FAIL " + f);
process.exit(failures.length ? 1 : 0);
