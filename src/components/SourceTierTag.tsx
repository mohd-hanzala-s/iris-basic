import { SOURCE_TIER_LABEL } from "@/data/evidence";
import type { SourceTier } from "@/data/evidence";

const TITLES: Record<SourceTier, string> = {
  TIER1: "Primary source (official / regulator / standard body / exchange / filing)",
  TIER2: "Credible secondary (established press, analyst, consulting)",
  TIER3: "Aggregator / community / social / AI-generated",
};

/** Badge for a source's evidence tier. */
export default function SourceTierTag({ tier }: { tier: SourceTier }) {
  return (
    <span className={`tier source-tier-${tier.toLowerCase()}`} title={TITLES[tier]}>
      {SOURCE_TIER_LABEL[tier]}
    </span>
  );
}
