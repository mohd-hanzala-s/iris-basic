import { Link } from "react-router-dom";

export default function Strategy() {
  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Learn · Strategy</span>
        <h1 className="page-hero-title">Strategy</h1>
        <p className="page-hero-lede">
          IRIS's strategic position — how its SupTech + RegTech dual-sided model, XBRL
          specialism and global footprint combine. Deep strategic analysis is built in a
          later stage.
        </p>
      </header>

      <section className="section">
        <h2>Strategic themes (initial framing)</h2>
        <div className="grid-2">
          <div className="info-card">
            <h3>Dual-sided market position</h3>
            <p>
              IRIS sells to <Link to="/customers">regulators</Link> (SupTech) and to the{" "}
              firms regulators supervise (RegTech/TaxTech). This is relatively unusual
              and gives IRIS visibility into both sides of the reporting relationship.
            </p>
          </div>
          <div className="info-card">
            <h3>XBRL specialism</h3>
            <p>
              A strong base in <Link to="/glossary/xbrl">XBRL</Link>/iXBRL structured
              reporting is a durable technical moat, given regulators' long-lived,
              standard-driven mandates.
            </p>
          </div>
          <div className="info-card">
            <h3>Four-segment diversification</h3>
            <p>
              SupTech, RegTech, TaxTech and DataTech spread revenue across different
              buyer types and regulatory cycles.
            </p>
          </div>
          <div className="info-card">
            <h3>Geographic expansion</h3>
            <p>
              From an India base into the Middle East, Asia Pacific, Africa, the US,
              Europe and the UK.
            </p>
          </div>
        </div>
        <p className="muted">
          These are framings for the strategy-research stage; they will be supported,
          refined or corrected with evidence in later phases.
        </p>
      </section>
    </div>
  );
}
