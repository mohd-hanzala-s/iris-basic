import type { ChainStep } from "@/data/irisProfile";
import CertaintyTag from "./CertaintyTag";

/**
 * Renders a linear cause-and-effect chain (e.g. "Why IRIS exists") as a
 * horizontal flow of linked steps with arrows between them.
 */
export default function FlowChain({ steps }: { steps: ChainStep[] }) {
  return (
    <div className="flow-chain">
      {steps.map((s, i) => (
        <div key={s.id} className="flow-step-wrap">
          <div className="flow-step">
            <div className="flow-step-label">{s.label}</div>
            <h4 className="flow-step-title">{s.title}</h4>
            <p className="flow-step-body">{s.body}</p>
            <CertaintyTag certainty={s.certainty} />
          </div>
          {i < steps.length - 1 && <div className="flow-arrow">→</div>}
        </div>
      ))}
    </div>
  );
}
