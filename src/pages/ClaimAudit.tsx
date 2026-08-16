import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  evidenceClaims,
  evidenceProblems,
  getSource,
  sourceTierOf,
  sourceReachable,
  sourceVerificationNote,
  EVIDENCE_STATUS_LABEL,
  EVIDENCE_CATEGORY_LABEL,
  EVIDENCE_FLAG_LABEL,
} from "@/data/index";
import type { EvidenceStatus, EvidenceCategory } from "@/data/index";
import EvidenceStatusTag from "@/components/EvidenceStatusTag";
import SourceTierTag from "@/components/SourceTierTag";

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

function sourceLabel(id: string): string {
  const s = getSource(id);
  return s ? `${s.title} (${s.publisher})` : id;
}

export default function ClaimAudit() {
  const [params] = useSearchParams();
  const initStatus = params.get("status") as EvidenceStatus | null;
  const initClaim = params.get("claim");

  const [status, setStatus] = useState<EvidenceStatus | "all">(
    initStatus && STATUS_ORDER.includes(initStatus) ? initStatus : "all"
  );
  const [category, setCategory] = useState<EvidenceCategory | "all">("all");

  const filtered = useMemo(() => {
    if (initClaim) return evidenceClaims.filter((c) => c.id === initClaim);
    return evidenceClaims.filter((c) => {
      if (status !== "all" && c.status !== status) return false;
      if (category !== "all" && c.category !== category) return false;
      return true;
    });
  }, [status, category, initClaim]);

  const problemsByClaim = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const p of evidenceProblems) {
      for (const c of p.relatedClaims) {
        if (!map.has(c)) map.set(c, []);
        map.get(c)!.push(p.id);
      }
    }
    return map;
  }, []);

  return (
    <div className="page">
      <h1>Claim Audit</h1>
      <p className="lede">
        Every audited claim, with its statement, evidence score, backing sources, tier, and
        confidence. Sources are resolved to their registry entry (title, publisher, URL).
      </p>

      <div className="audit-filters">
        <div className="filter-group">
          <span className="filter-label">Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value as EvidenceStatus | "all")}>
            <option value="all">All statuses</option>
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {EVIDENCE_STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <span className="filter-label">Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value as EvidenceCategory | "all")}>
            <option value="all">All categories</option>
            {CATEGORY_ORDER.map((c) => (
              <option key={c} value={c}>
                {EVIDENCE_CATEGORY_LABEL[c]}
              </option>
            ))}
          </select>
        </div>
        <span className="muted">{filtered.length} claim(s)</span>
      </div>

      <div className="claim-audit-list">
        {filtered.map((c) => {
          const probs = problemsByClaim.get(c.id) ?? [];
          return (
            <article key={c.id} id={c.id} className="claim-audit">
              <div className="claim-audit-head">
                <EvidenceStatusTag status={c.status} />
                <span className="claim-cat">{EVIDENCE_CATEGORY_LABEL[c.category]}</span>
                <span className={`claim-confidence confidence-${c.confidence.toLowerCase()}`}>
                  {c.confidence} confidence
                </span>
              </div>
              <p className="claim-statement">{c.statement}</p>
              <dl className="meta-grid">
                <div className="meta-item">
                  <dt>Location</dt>
                  <dd>{c.claimLocation}</dd>
                </div>
                <div className="meta-item">
                  <dt>Last verified</dt>
                  <dd>{c.lastVerified}</dd>
                </div>
              </dl>
              <div className="claim-evidence">
                <span className="claim-evidence-label">Evidence</span>
                <p>{c.evidence}</p>
              </div>
              <div className="claim-sources">
                {c.sourceIds.map((id) => {
                  const s = getSource(id);
                  return (
                    <div key={id} className="claim-source">
                      <SourceTierTag tier={sourceTierOf(id)} />
                      <div className="claim-source-body">
                        <span className="claim-source-title">{sourceLabel(id)}</span>
                        {sourceReachable(id) ? (
                          <span className="reach reach-ok">reachable</span>
                        ) : (
                          <span className="reach reach-bad">not re-verified</span>
                        )}
                        {s?.url && (
                          <a className="claim-source-url" href={s.url} target="_blank" rel="noreferrer">
                            {s.url}
                          </a>
                        )}
                        <span className="muted">{sourceVerificationNote(id)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {c.flags.length > 0 && (
                <div className="claim-flags">
                  {c.flags.map((f) => (
                    <span key={f} className="tag">
                      {EVIDENCE_FLAG_LABEL[f]}
                    </span>
                  ))}
                </div>
              )}
              {probs.length > 0 && (
                <div className="claim-problems">
                  <span className="claim-evidence-label">Related problems</span>
                  <div className="tag-row">
                    {probs.map((id) => {
                      const p = evidenceProblems.find((x) => x.id === id);
                      return (
                        <span key={id} className="tag" title={p?.detail}>
                          {p?.title ?? id}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          );
        })}
        {filtered.length === 0 && (
          <p className="muted">No claims match the current filter.</p>
        )}
      </div>
    </div>
  );
}
