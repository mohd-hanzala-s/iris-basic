import { Link } from "react-router-dom";
import { ecosystemFlow } from "@/data/ecosystem";
import { hrefFor } from "@/components/RelationList";

/**
 * Visual pipeline of the RegTech ecosystem: Regulators → … → Supervision.
 * Each stage links to its concept explainer and any related IRIS entities.
 */
export default function EcosystemMap() {
  return (
    <div className="ecosystem">
      <div className="ecosystem-flow">
        {ecosystemFlow.map((stage, i) => (
          <div key={stage.id} className="eco-node-wrap">
            <div className="eco-node">
              <div className="eco-node-name">{stage.name}</div>
              <div className="eco-node-desc">{stage.description}</div>
              <div className="eco-node-links">
                {stage.conceptId && (
                  <Link to={`/concept/${stage.conceptId}`} className="eco-link">
                    Concept →
                  </Link>
                )}
                {stage.related?.map((r) => (
                  <Link key={r.id} to={hrefFor({ type: r.type, id: r.id })} className="eco-link">
                    {r.label} →
                  </Link>
                ))}
              </div>
            </div>
            {i < ecosystemFlow.length - 1 && <div className="eco-arrow">↓</div>}
          </div>
        ))}
      </div>
      <p className="muted eco-loop">
        ↺ Supervision feeds back into regulation — the loop repeats continuously.
      </p>
    </div>
  );
}
