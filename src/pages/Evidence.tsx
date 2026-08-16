import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  evidenceClaims,
  evidenceProblems,
  sourceVerifications,
  EVIDENCE_CATEGORY_LABEL,
  EVIDENCE_PROBLEM_LABEL,
  SOURCE_TIER_LABEL,
} from "@/data/index";
import type { EvidenceStatus, EvidenceCategory, SourceTier } from "@/data/index";
import EvidenceStatusTag from "@/components/EvidenceStatusTag";

const STATUS_ORDER: EvidenceStatus[] = [
  "VERIFIED",
  "WELL_SUPPORTED",
  "PLAUSIBLE",
  "INFERENCE",
  "UNSUPPORTED",
  "CONTRADICTED",
  "OUTDATED",
];

const CATEGORY_ORDER: EvidenceCategory[] = [
  "company",
  "product",
  "customer",
  "competitor",
  "regulation",
  "technology",
  "market",
  "strategy",
];

const TIER_ORDER: SourceTier[] = ["TIER1", "TIER2", "TIER3"];

export default function Evidence() {
  const [category, setCategory] = useState<EvidenceCategory | "all">("all");
  const [tier, setTier] = useState<SourceTier | "all">("all");

  const statusCounts = useMemo(() => {
    const map = new Map<EvidenceStatus, number>();
    for (const s of STATUS_ORDER) map.set(s, 0);
    for (const c of evidenceClaims) map.set(c.status, (map.get(c.status) ?? 0) + 1);
    return map;
  }, []);

  const reachable = sourceVerifications.filter((s) => s.reachable).length;
  const total = sourceVerifications.length;

  const filtered = useMemo(
    () =>
      evidenceClaims.filter((c) => {
        if (category !== "all" && c.category !== category) return false;
        if (tier !== "all") {
          const best = c.sourceIds.reduce<SourceTier | null>((acc, id) => {
            const t = sourceVerifications.find((s) => s.sourceId === id)?.tier ?? "TIER3";
            if (!acc) return t;
            const order = TIER_ORDER.indexOf(t);
            return TIER_ORDER.indexOf(acc) > order ? t : acc;
          }, null);
          if (best !== tier) return false;
        }
        return true;
      }),
    [category, tier]
  );

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Explore · Evidence</span>
        <h1 className="page-hero-title">Evidence Dashboard</h1>
        <p className="page-hero-lede">
          Research-quality audit of the knowledge base. Every important claim is scored
          against its sources, and every problem is surfaced — nothing is silently assumed
          to be true. Last verification pass: 2026-08-15.
        </p>
      </header>

      <section className="section">
        <div className="evidence-stats">
          <div className="stat-card">
            <div className="stat-value">{evidenceClaims.length}</div>
            <div className="stat-label">Claims audited</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {reachable}
              <span className="stat-sub">/{total}</span>
            </div>
            <div className="stat-label">Sources reachable</div>
          </div>
          <div className="stat-card stat-card-warn">
            <div className="stat-value">{evidenceProblems.length}</div>
            <div className="stat-label">Open problems</div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Claims by evidence status</h2>
        <div className="status-breakdown">
          {STATUS_ORDER.map((s) => {
            const n = statusCounts.get(s) ?? 0;
            return (
              <Link key={s} to={`/claims?status=${s.toLowerCase()}`} className="status-breakdown-item">
                <EvidenceStatusTag status={s} />
                <span className="status-count">{n}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <h2>Claims by category</h2>
        <div className="status-breakdown">
          {CATEGORY_ORDER.map((c) => {
            const n = evidenceClaims.filter((x) => x.category === c).length;
            return (
              <button
                key={c}
                className={`chip${category === c ? " chip-active" : ""}`}
                onClick={() => setCategory(category === c ? "all" : c)}
              >
                {EVIDENCE_CATEGORY_LABEL[c]} <span className="status-count">{n}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="section">
        <h2>Source tiers</h2>
        <p className="muted">
          Tier 1 primary (official / regulator / standard body / exchange) · Tier 2 credible
          secondary (established press, analyst) · Tier 3 aggregator / community / social /
          AI-generated.
        </p>
        <div className="status-breakdown">
          {TIER_ORDER.map((t) => {
            const n = sourceVerifications.filter((s) => s.tier === t).length;
            return (
              <button
                key={t}
                className={`chip${tier === t ? " chip-active" : ""}`}
                onClick={() => setTier(tier === t ? "all" : t)}
              >
                {SOURCE_TIER_LABEL[t]} <span className="status-count">{n}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="section">
        <h2>Problem register</h2>
        <p className="muted">
          Issues found during verification, surfaced rather than hidden. Click through to the
          claim audit for the underlying claims.
        </p>
        <div className="problem-list">
          {evidenceProblems.map((p) => (
            <div key={p.id} className={`problem-card problem-${p.kind}`}>
              <div className="problem-head">
                <span className="problem-kind">{EVIDENCE_PROBLEM_LABEL[p.kind]}</span>
                <h3>{p.title}</h3>
              </div>
              <p>{p.detail}</p>
              {p.relatedClaims.length > 0 && (
                <div className="problem-refs">
                  <span className="problem-refs-label">Claims:</span>{" "}
                  {p.relatedClaims.map((id) => (
                    <Link key={id} to={`/claims?claim=${id}`} className="chip">
                      {id}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Filtered claims ({filtered.length})</h2>
        {category !== "all" || tier !== "all" ? (
          <div className="claim-list">
            {filtered.map((c) => (
              <Link key={c.id} to={`/claims?claim=${c.id}`} className="claim-row">
                <EvidenceStatusTag status={c.status} />
                <span className="claim-statement">{c.statement}</span>
                <span className="claim-cat">{EVIDENCE_CATEGORY_LABEL[c.category]}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="muted">
            Select a category or source tier above to filter claims, or open the{" "}
            <Link to="/claims">full claim audit</Link>.
          </p>
        )}
      </section>
    </div>
  );
}
