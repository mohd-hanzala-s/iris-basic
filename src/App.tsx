import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import StartHere from "@/pages/StartHere";
import BeginnerGuide from "@/pages/BeginnerGuide";
import RegTech from "@/pages/RegTech";
import Iris from "@/pages/Iris";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Customers from "@/pages/Customers";
import Regulations from "@/pages/Regulations";
import RegulationDetail from "@/pages/RegulationDetail";
import Competitors from "@/pages/Competitors";
import CompetitorDetail from "@/pages/CompetitorDetail";
import Technology from "@/pages/Technology";
import TechnologyDetail from "@/pages/TechnologyDetail";
import Markets from "@/pages/Markets";
import MarketDetail from "@/pages/MarketDetail";
import Strategy from "@/pages/Strategy";
import Glossary from "@/pages/Glossary";
import GlossaryDetail from "@/pages/GlossaryDetail";
import Learning from "@/pages/Learning";
import LearningDetail from "@/pages/LearningDetail";
import Flashcards from "@/pages/Flashcards";
import Quizzes from "@/pages/Quizzes";
import QuizDetail from "@/pages/QuizDetail";
import Sources from "@/pages/Sources";
import Evidence from "@/pages/Evidence";
import ClaimAudit from "@/pages/ClaimAudit";
import Search from "@/pages/Search";
import Graph from "@/pages/Graph";
import Dashboard from "@/pages/Dashboard";
import Follow from "@/pages/Follow";
import CompanyDetail from "@/pages/CompanyDetail";
import RegulatorDetail from "@/pages/RegulatorDetail";
import Concepts from "@/pages/Concepts";
import ConceptDetail from "@/pages/ConceptDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<StartHere />} />
        <Route path="/guide" element={<BeginnerGuide />} />
        <Route path="/regtech" element={<RegTech />} />
        <Route path="/concepts" element={<Concepts />} />
        <Route path="/concept/:id" element={<ConceptDetail />} />
        <Route path="/iris" element={<Iris />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/regulations" element={<Regulations />} />
        <Route path="/regulation/:id" element={<RegulationDetail />} />
        <Route path="/regulator/:id" element={<RegulatorDetail />} />
        <Route path="/competitors" element={<Competitors />} />
        <Route path="/competitor/:id" element={<CompetitorDetail />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/technology/:id" element={<TechnologyDetail />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/market/:id" element={<MarketDetail />} />
        <Route path="/strategy" element={<Strategy />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/glossary/:id" element={<GlossaryDetail />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/learning/:id" element={<LearningDetail />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizzes/:id" element={<QuizDetail />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/claims" element={<ClaimAudit />} />
        <Route path="/search" element={<Search />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/follow/:mode" element={<Follow />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
