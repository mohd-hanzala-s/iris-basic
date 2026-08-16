import type { ProductLevel } from "@/data/types";
import Markdown from "./Markdown";
import CertaintyTag from "./CertaintyTag";
import SourceList from "./SourceList";

const LEVEL_ACCENT = ["", "l1", "l2", "l3", "l4", "l5"];

/**
 * The five learning levels for a product (one sentence → beginner →
 * professional → technical → strategic), rendered as an ordered stack.
 */
export default function ProductLevels({ levels }: { levels: ProductLevel[] }) {
  const sorted = [...levels].sort((a, b) => a.level - b.level);
  return (
    <div className="product-levels">
      {sorted.map((l) => (
        <div key={l.level} className={`product-level ${LEVEL_ACCENT[l.level]}`}>
          <div className="product-level-head">
            <span className="product-level-badge">LEVEL {l.level}</span>
            <span className="product-level-title">{l.title}</span>
            <CertaintyTag certainty={l.certainty} />
          </div>
          <Markdown text={l.body} />
          <SourceList sourceIds={l.sources} inline />
        </div>
      ))}
    </div>
  );
}
