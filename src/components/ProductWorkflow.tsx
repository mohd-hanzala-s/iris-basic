import type { ProductWorkflowStep } from "@/data/types";
import CertaintyTag from "./CertaintyTag";
import SourceList from "./SourceList";

/**
 * Visual workflow for a product:
 * CUSTOMER PROBLEM → DATA → IRIS PRODUCT → PROCESS → OUTPUT → VALUE
 * Rendered as a horizontal chain of steps with arrows, plus per-step sources.
 */
export default function ProductWorkflow({ steps }: { steps: ProductWorkflowStep[] }) {
  return (
    <div className="flow-chain product-workflow">
      {steps.map((s, i) => (
        <div key={s.label} className="flow-step-wrap">
          <div className="flow-step workflow-step">
            <div className="flow-step-label">{s.label}</div>
            <p className="flow-step-body">{s.body}</p>
            <div className="perspective-meta">
              <CertaintyTag certainty={s.certainty} />
              <SourceList sourceIds={s.sources} inline />
            </div>
          </div>
          {i < steps.length - 1 && <div className="flow-arrow">→</div>}
        </div>
      ))}
    </div>
  );
}
