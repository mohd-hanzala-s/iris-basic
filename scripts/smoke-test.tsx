import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout";
import Home from "../src/pages/Home";
import StartHere from "../src/pages/StartHere";
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

// Minimal browser globals for components that touch them during render.
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

const firstId: Record<string, string | undefined> = {
  product: knowledgeBase.products[0]?.id,
  company: knowledgeBase.companies[0]?.id,
  regulator: knowledgeBase.regulators[0]?.id,
  regulation: knowledgeBase.regulations[0]?.id,
  technology: knowledgeBase.technologies[0]?.id,
  market: knowledgeBase.markets[0]?.id,
  glossary: knowledgeBase.glossary[0]?.id,
  concept: knowledgeBase.concepts[0]?.id,
  learning: knowledgeBase.learningModules[0]?.id,
  quiz: knowledgeBase.quizzes[0]?.id,
  competitor: knowledgeBase.companies.find((c) => c.companyType === "COMPETITOR")?.id,
};

interface Case {
  name: string;
  path: string;
  Component: any;
}

const cases: Case[] = [
  { name: "Home", path: "/", Component: Home },
  { name: "StartHere", path: "/start", Component: StartHere },
  { name: "RegTech", path: "/regtech", Component: RegTech },
  { name: "Iris", path: "/iris", Component: Iris },
  { name: "Products", path: "/products", Component: Products },
  { name: "ProductDetail", path: `/product/${firstId.product}`, Component: ProductDetail },
  { name: "Customers", path: "/customers", Component: Customers },
  { name: "Regulations", path: "/regulations", Component: Regulations },
  { name: "RegulationDetail", path: `/regulation/${firstId.regulation}`, Component: RegulationDetail },
  { name: "Competitors", path: "/competitors", Component: Competitors },
  { name: "CompetitorDetail", path: `/competitor/${firstId.competitor}`, Component: CompetitorDetail },
  { name: "Technology", path: "/technology", Component: Technology },
  { name: "TechnologyDetail", path: `/technology/${firstId.technology}`, Component: TechnologyDetail },
  { name: "Markets", path: "/markets", Component: Markets },
  { name: "MarketDetail", path: `/market/${firstId.market}`, Component: MarketDetail },
  { name: "Strategy", path: "/strategy", Component: Strategy },
  { name: "Glossary", path: "/glossary", Component: Glossary },
  { name: "GlossaryDetail", path: `/glossary/${firstId.glossary}`, Component: GlossaryDetail },
  { name: "Learning", path: "/learning", Component: Learning },
  { name: "LearningDetail", path: `/learning/${firstId.learning}`, Component: LearningDetail },
  { name: "Flashcards", path: "/flashcards", Component: Flashcards },
  { name: "Quizzes", path: "/quizzes", Component: Quizzes },
  { name: "QuizDetail", path: `/quizzes/${firstId.quiz}`, Component: QuizDetail },
  { name: "Sources", path: "/sources", Component: Sources },
  { name: "Evidence", path: "/evidence", Component: Evidence },
  { name: "ClaimAudit", path: "/claims", Component: ClaimAudit },
  { name: "Search", path: "/search?q=xbrl", Component: Search },
  { name: "Graph", path: "/graph", Component: Graph },
  { name: "Dashboard", path: "/dashboard", Component: Dashboard },
  { name: "Follow data", path: "/follow/data", Component: Follow },
  { name: "Follow regulation", path: "/follow/regulation", Component: Follow },
  { name: "CompanyDetail", path: `/company/${firstId.company}`, Component: CompanyDetail },
  { name: "RegulatorDetail", path: `/regulator/${firstId.regulator}`, Component: RegulatorDetail },
  { name: "Concepts", path: "/concepts", Component: Concepts },
  { name: "ConceptDetail", path: `/concept/${firstId.concept}`, Component: ConceptDetail },
];

const failures: { name: string; path: string; err: string }[] = [];
let ok = 0;

for (const c of cases) {
  const routePath = c.path.split("?")[0];
  try {
    const html = renderToString(
      <MemoryRouter initialEntries={[c.path]}>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routePath} element={<c.Component />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    if (html.length < 100) throw new Error("rendered output too small");
    ok++;
    console.log(`OK   ${c.name}  (${c.path})`);
  } catch (e: any) {
    failures.push({ name: c.name, path: c.path, err: String(e?.stack ?? e) });
    console.log(`FAIL ${c.name}  (${c.path})\n     ${String(e?.message ?? e)}`);
  }
}

console.log(`\n${ok}/${cases.length} pages rendered OK`);
if (failures.length) {
  console.log("\nFAILURES:");
  for (const f of failures) console.log(`- ${f.name} (${f.path}): ${f.err.split("\n")[0]}`);
  process.exit(1);
}
