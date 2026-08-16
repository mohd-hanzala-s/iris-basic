import type { SegmentChain as SegmentChainType } from "@/data/types";

const LABELS: { key: keyof SegmentChainType; label: string }[] = [
  { key: "problem", label: "Customer problem" },
  { key: "regulatoryRequirement", label: "Regulatory requirement" },
  { key: "dataProblem", label: "Data problem" },
  { key: "product", label: "IRIS product" },
  { key: "workflow", label: "Workflow" },
  { key: "outcome", label: "Outcome" },
];

/**
 * Renders a customer segment's six-step value chain as a horizontal flow:
 * PROBLEM → REGULATORY REQUIREMENT → DATA PROBLEM → IRIS PRODUCT → WORKFLOW → OUTCOME.
 */
export default function SegmentChain({ chain }: { chain: SegmentChainType }) {
  return (
    <div className="flow-chain segment-chain">
      {LABELS.map(({ key, label }, i) => (
        <div key={key} className="flow-step-wrap">
          <div className="flow-step">
            <div className="flow-step-label">{label}</div>
            <p className="flow-step-body">{chain[key]}</p>
          </div>
          {i < LABELS.length - 1 && <div className="flow-arrow">→</div>}
        </div>
      ))}
    </div>
  );
}
