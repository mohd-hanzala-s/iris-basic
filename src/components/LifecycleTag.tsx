import { LIFECYCLE_LABEL } from "@/data/types";
import type { ProductLifecycle } from "@/data/types";

/**
 * Badge indicating a product's lifecycle classification (Current / Legacy /
 * Discontinued / Divested / Unclear). Divested is styled distinctly because
 * it signals the product is no longer IRIS-owned.
 */
export default function LifecycleTag({ lifecycle }: { lifecycle: ProductLifecycle }) {
  return (
    <span className={`lifecycle lifecycle-${lifecycle.toLowerCase()}`}>
      {LIFECYCLE_LABEL[lifecycle]}
    </span>
  );
}
