import { EVIDENCE_STATUS_LABEL } from "@/data/evidence";
import type { EvidenceStatus } from "@/data/evidence";

const TITLES: Record<EvidenceStatus, string> = {
  VERIFIED: "Strong primary evidence",
  WELL_SUPPORTED: "Multiple reliable sources, or one authoritative source",
  PLAUSIBLE: "Some evidence, incomplete verification",
  INFERENCE: "Reasonable interpretation, not directly documented",
  UNSUPPORTED: "No adequate evidence found",
  CONTRADICTED: "Reliable sources conflict with the claim",
  OUTDATED: "Was true but is no longer current",
};

/** Badge for a claim's evidence score. */
export default function EvidenceStatusTag({ status }: { status: EvidenceStatus }) {
  return (
    <span className={`evidence-status evidence-${status.toLowerCase()}`} title={TITLES[status]}>
      {EVIDENCE_STATUS_LABEL[status]}
    </span>
  );
}
