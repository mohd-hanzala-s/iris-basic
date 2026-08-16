import type {
  Company,
  KnowledgeBase,
  EntityRef,
  EntityType,
  Source,
} from "./types";
import { sources } from "./sources";
import { companies } from "./companies";
import { products } from "./products";
import { regulators } from "./regulators";
import { regulations } from "./regulations";
import { technologies } from "./technologies";
import { markets } from "./markets";
import { useCases } from "./useCases";
import { glossary } from "./glossary";
import { concepts } from "./concepts";
import { relations } from "./relations";
import { learningModules } from "./learningModules";
import { flashcards } from "./flashcards";
import { quizzes } from "./quizzes";
import { customerSegments } from "./customerSegments";
import { reportingPipeline } from "./reportingPipeline";
import { masteryPath, followPaths } from "./learningPaths";
import { competitorProfiles } from "./competitorProfiles";
import {
  headToHeads,
  competitorMap,
  productMatrix,
  competitiveThreats,
  competitivePositioning,
  whyChoose,
} from "./competitorIntelligence";

export {
  sources,
  companies,
  products,
  regulators,
  regulations,
  technologies,
  markets,
  useCases,
  glossary,
  concepts,
  relations,
  learningModules,
  flashcards,
  quizzes,
  customerSegments,
  reportingPipeline,
  masteryPath,
  followPaths,
  competitorProfiles,
  headToHeads,
  competitorMap,
  productMatrix,
  competitiveThreats,
  competitivePositioning,
  whyChoose,
};

export { ecosystemFlow } from "./ecosystem";
export type { EcosystemStage } from "./ecosystem";

export { timeline, TIMELINE_PHASES } from "./timeline";
export type { TimelineEvent, TimelinePhase } from "./timeline";

export { whyIrisExists, irisPerspectives } from "./irisProfile";
export type { ChainStep, Perspective } from "./irisProfile";

export {
  evidenceClaims,
  sourceVerifications,
  evidenceProblems,
  EVIDENCE_STATUS_LABEL,
  EVIDENCE_CATEGORY_LABEL,
  SOURCE_TIER_LABEL,
  EVIDENCE_FLAG_LABEL,
  EVIDENCE_PROBLEM_LABEL,
  sourceTierOf,
  sourceReachable,
  sourceVerificationNote,
} from "./evidence";
export type {
  EvidenceStatus,
  EvidenceCategory,
  SourceTier,
  EvidenceFlag,
  EvidenceProblemKind,
  Claim,
  SourceVerification,
  EvidenceProblem,
} from "./evidence";

export { LIFECYCLE_LABEL, CERTAINTY_LABEL, DOC_STATUS_LABEL, COMPETITION_TIER_LABEL, EDGE_LABEL, SEVERITY_LABEL } from "./types";
export type { DocStatus, SegmentChain, CustomerSegment, CompetitorProfile, HeadToHead, CompetitiveThreat, LearningPath, LearningPathLevel, FollowPath, FollowStep, FollowMode, LearningTrack } from "./types";
export type { ReportingPipeline, PipelineStage } from "./reportingPipeline";

export { productDeepDives, productEcosystem, getProductDive } from "./productDeep";
export type {
  ProductDeepDive,
  ProductAspect,
  ProductLevel,
  ProductWorkflowStep,
  ProductEcosystem,
  ProductLifecycle,
} from "./types";

export const knowledgeBase: KnowledgeBase = {
  sources,
  companies,
  products,
  regulators,
  regulations,
  technologies,
  markets,
  useCases,
  glossary,
  concepts,
  relations,
  learningModules,
  flashcards,
  quizzes,
};

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------
export function getSource(id: string): Source | undefined {
  return sources.find((s) => s.id === id);
}

export function getEntity(ref: EntityRef) {
  switch (ref.type) {
    case "company":
      return companies.find((c) => c.id === ref.id);
    case "product":
      return products.find((p) => p.id === ref.id);
    case "regulator":
      return regulators.find((r) => r.id === ref.id);
    case "regulation":
      return regulations.find((r) => r.id === ref.id);
    case "technology":
      return technologies.find((t) => t.id === ref.id);
    case "market":
      return markets.find((m) => m.id === ref.id);
    case "useCase":
      return useCases.find((u) => u.id === ref.id);
    case "glossary":
      return glossary.find((g) => g.id === ref.id);
    case "concept":
      return concepts.find((c) => c.id === ref.id);
    default:
      return undefined;
  }
}

export function getEntityName(ref: EntityRef): string {
  return getEntity(ref)?.name ?? `${ref.type}:${ref.id}`;
}

/** Resolve a "type:id" string (used in learning/quiz refs) to an entity. */
export function resolveRef(refStr: string) {
  const [type, ...rest] = refStr.split(":");
  const id = rest.join(":");
  return getEntity({ type: type as EntityType, id });
}

export function relationsFor(ref: EntityRef) {
  return relations.filter(
    (r) =>
      (r.from.type === ref.type && r.from.id === ref.id) ||
      (r.to.type === ref.type && r.to.id === ref.id)
  );
}

export function companiesByType(type: Company["companyType"]) {
  return companies.filter((c) => c.companyType === type);
}

export function getCustomerSegment(id: string) {
  return customerSegments.find((s) => s.id === id);
}

export function getCompetitorProfile(companyId: string) {
  return competitorProfiles.find((c) => c.companyId === companyId);
}

export const sectionNames = [
  "HOME",
  "START HERE",
  "REGTECH",
  "IRIS",
  "PRODUCTS",
  "CUSTOMERS",
  "REGULATIONS",
  "COMPETITORS",
  "TECHNOLOGY",
  "MARKETS",
  "STRATEGY",
  "GLOSSARY",
  "LEARNING",
  "FLASHCARDS",
  "QUIZZES",
  "SOURCES",
] as const;
