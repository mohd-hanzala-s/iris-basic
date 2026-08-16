import { Link } from "react-router-dom";
import { getEntityName } from "@/data/index";
import { products } from "@/data/products";
import { SEVERITY_LABEL } from "@/data/types";
import type { CompetitiveThreat } from "@/data/types";
import Markdown from "./Markdown";

/**
 * Ranked competitive threats, each with severity, affected products,
 * competitors involved and the evidence behind it.
 */
export default function ThreatList({ threats }: { threats: CompetitiveThreat[] }) {
  const productName = new Map(products.map((p) => [p.id, p.name]));

  const order: Record<string, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  const sorted = [...threats].sort((a, b) => order[a.severity] - order[b.severity]);

  return (
    <div className="threat-list">
      {sorted.map((t) => (
        <div key={t.id} className="threat">
          <div className="threat-head">
            <h3>{t.title}</h3>
            <span className={`severity severity-${t.severity.toLowerCase()}`}>{SEVERITY_LABEL[t.severity]}</span>
          </div>
          <Markdown text={t.description} />
          <div className="threat-meta">
            {t.affectedProductIds.length > 0 && (
              <span className="threat-meta-group">
                <span className="threat-meta-label">Affects</span>
                {t.affectedProductIds.map((pid) => (
                  <Link key={pid} to={`/product/${pid}`} className="threat-chip">
                    {productName.get(pid) ?? pid}
                  </Link>
                ))}
              </span>
            )}
            {t.competitorIds.length > 0 && (
              <span className="threat-meta-group">
                <span className="threat-meta-label">Competitors</span>
                {t.competitorIds.map((cid) => (
                  <Link key={cid} to={`/company/${cid}`} className="threat-chip">
                    {getEntityName({ type: "company", id: cid })}
                  </Link>
                ))}
              </span>
            )}
          </div>
          <div className="threat-evidence">
            <strong>Evidence:</strong> <Markdown text={t.evidence} />
          </div>
        </div>
      ))}
    </div>
  );
}
