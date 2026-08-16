import { DOC_STATUS_LABEL } from "@/data/types";
import type { DocStatus } from "@/data/types";

/**
 * Badge classifying how confident we are in a technology description as IRIS
 * actually uses it: publicly documented, architectural inference, or unknown.
 * Mirrors the lifecycle/certainty tags so the provenance system is uniform.
 */
export default function DocStatusTag({ docStatus }: { docStatus: DocStatus }) {
  return (
    <span className={`docstatus docstatus-${docStatus.toLowerCase()}`} title="How confidently this is documented">
      {DOC_STATUS_LABEL[docStatus]}
    </span>
  );
}
