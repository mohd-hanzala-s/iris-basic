import { Link } from "react-router-dom";
import ProgressDashboard from "@/components/ProgressDashboard";

export default function Dashboard() {
  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Practice · Review</span>
        <h1 className="page-hero-title">Learning dashboard</h1>
        <p className="page-hero-lede">
          Your progress through the Domain Mastery System. The goal is not
          memorisation — it's an interconnected mental model of IRIS and RegTech.
        </p>
      </header>

      <ProgressDashboard />

      <section className="section">
        <h2>Keep exploring</h2>
        <div className="grid-3">
          <div className="info-card">
            <h3>
              <Link to="/graph">Knowledge graph</Link>
            </h3>
            <p>Explore how every entity connects to every other.</p>
          </div>
          <div className="info-card">
            <h3>
              <Link to="/learning">Learning path</Link>
            </h3>
            <p>The ten-level mastery curriculum plus snapshots and modes.</p>
          </div>
          <div className="info-card">
            <h3>
              <Link to="/start">Start here</Link>
            </h3>
            <p>A guided route through the whole system.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
