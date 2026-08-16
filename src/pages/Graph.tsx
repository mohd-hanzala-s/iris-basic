import { Link } from "react-router-dom";
import KnowledgeGraph from "@/components/KnowledgeGraph";

export default function GraphPage() {
  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Explore · Knowledge graph</span>
        <h1 className="page-hero-title">Knowledge graph</h1>
        <p className="page-hero-lede">
          The whole domain, connected. Start at IRIS and click your way through
          products, customers, problems, regulations, technology, competitors,
          markets and sources — building the interconnected mental model the
          mastery path aims for.
        </p>
      </header>

      <KnowledgeGraph />

      <section className="section">
        <h2>Suggested chains to follow</h2>
        <ul className="bullet-list">
          <li>
            <strong>CARBON → XBRL → iXBRL → ESEF → listed companies → ESMA/SEC → Workiva / Toppan Merrill</strong> — follow a
            disclosure product through its standards, mandate and rivals.
          </li>
          <li>
            <strong>iDEAL → RBI returns → RBI → banks (MUFG)</strong> — the supervisory-reporting loop.
          </li>
          <li>
            <strong>iFILE → regulators → markets</strong> — the SupTech franchise footprint.
          </li>
        </ul>
        <p className="muted">
          Prefer a guided walk? Use{" "}
          <Link to="/follow/data">Follow the Data</Link> or{" "}
          <Link to="/follow/regulation">Follow the Regulation</Link>.
        </p>
      </section>
    </div>
  );
}
