import { COMPETITION_TIER_LABEL } from "@/data/types";
import type { CompetitionTier } from "@/data/types";

/** Badge classifying how directly a company competes with IRIS. */
export default function CompetitionTierTag({ tier }: { tier: CompetitionTier }) {
  return (
    <span className={`tier tier-${tier.toLowerCase()}`} title="How directly this company competes with IRIS">
      {COMPETITION_TIER_LABEL[tier]}
    </span>
  );
}
