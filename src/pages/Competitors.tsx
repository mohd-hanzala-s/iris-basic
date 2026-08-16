import { Link } from "react-router-dom";
import {
  competitorProfiles,
  headToHeads,
  competitivePositioning,
  competitiveThreats,
  whyChoose,
  companiesByType,
} from "@/data/index";
import CompetitionTierTag from "@/components/CompetitionTierTag";
import CompetitorMap from "@/components/CompetitorMap";
import ThreatList from "@/components/ThreatList";
import HeadToHeadView from "@/components/HeadToHead";
import Markdown from "@/components/Markdown";
import SourceList from "@/components/SourceList";

export default function Competitors() {
  const competitorCompanies = companiesByType("COMPETITOR");
  const profiledIds = new Set(competitorProfiles.map((p) => p.companyId));
  const profiled = competitorCompanies.filter((c) => profiledIds.has(c.id));
  const unprofiled = competitorCompanies.filter((c) => !profiledIds.has(c.id));

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Learn · Competitive landscape</span>
        <h1 className="page-hero-title">Competitive landscape</h1>
        <p className="page-hero-lede">
          Who competes with IRIS, and how. This stage maps the competitive set by
          product, customer, geography, regulatory framework and use case — then
          compares IRIS product-by-product against each major rival, without
          manufacturing scores. Where evidence is thin, we say so.
        </p>
      </header>

      <section className="section">
        <h2>Competitor map &amp; product matrix</h2>
        <CompetitorMap />
      </section>

      <section className="section">
        <h2>IRIS vs competitor (product-by-product)</h2>
        <p className="muted">
          Head-to-head comparisons across capability, depth, regulatory
          expertise, geography, ease of use, enterprise fit, integrations,
          automation, AI, analytics, experience, implementation, pricing/value
          and market presence — plus where each side wins and why it matters.
        </p>
        <div className="h2h-list">
          {headToHeads.map((hh) => (
            <HeadToHeadView key={hh.id} hh={hh} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Competitive positioning</h2>
        <div className="positioning-list">
          {competitivePositioning.map((n) => (
            <div key={n.title} className="positioning-note">
              <h3>{n.title}</h3>
              <Markdown text={n.body} />
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Competitive threats</h2>
        <ThreatList threats={competitiveThreats} />
      </section>

      <section className="section">
        <h2>If I were a customer…</h2>
        <div className="whychoose-list">
          {whyChoose.map((w) => (
            <div key={w.id} className="whychoose">
              <h3>{w.perspective}</h3>
              <div className="grid-2">
                <div className="whychoose-col whychoose-iris">
                  <h4>Why I would choose IRIS</h4>
                  <ul className="bullet-list">
                    {w.chooseIris.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="whychoose-col whychoose-comp">
                  <h4>Why I might choose a competitor instead</h4>
                  <ul className="bullet-list bullet-list-negative">
                    {w.chooseCompetitor.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <SourceList sourceIds={w.sources} inline />
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>All competitors</h2>
        <div className="entity-grid">
          {profiled.map((c) => {
            const profile = competitorProfiles.find((p) => p.companyId === c.id)!;
            return (
              <Link key={c.id} to={`/competitor/${c.id}`} className="entity-card">
                <div className="entity-card-head">
                  <h3 className="entity-card-title">{c.name}</h3>
                  <CompetitionTierTag tier={profile.tier} />
                </div>
                <p className="entity-card-summary">{profile.positioning}</p>
              </Link>
            );
          })}
          {unprofiled.map((c) => (
            <Link key={c.id} to={`/company/${c.id}`} className="entity-card">
              <div className="entity-card-head">
                <h3 className="entity-card-title">{c.name}</h3>
              </div>
              <p className="entity-card-summary">{c.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
