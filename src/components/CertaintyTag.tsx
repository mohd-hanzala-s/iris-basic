import type { Certainty } from "@/data/types";
import { CERTAINTY_LABEL } from "@/data/types";

/**
 * Colored tag indicating how a claim should be treated. Guarantees that
 * speculation is never visually or semantically presented as fact.
 */
export default function CertaintyTag({ certainty }: { certainty?: Certainty }) {
  if (!certainty) return null;
  return (
    <span className={`certainty certainty-${certainty.toLowerCase()}`} title="Evidential basis of this claim">
      {CERTAINTY_LABEL[certainty]}
    </span>
  );
}
