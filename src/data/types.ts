/**
 * IRIS RegTech University — core knowledge schema.
 *
 * Every entity type shares a common shape so that the knowledge base can be
 * indexed, searched, related and rendered uniformly. Every claim about the
 * world carries an explicit certainty tag plus source attribution so that
 * speculation is never presented as fact.
 */

// ---------------------------------------------------------------------------
// Certainty taxonomy
// ---------------------------------------------------------------------------
export type Certainty =
  | "FACT" // independently verifiable, widely accepted, primary-source grounded
  | "COMPANY_CLAIM" // stated by IRIS (or another company) about itself
  | "CUSTOMER_OPINION" // stated by a customer / user about the product or company
  | "ANALYST_VIEW" // stated by an analyst, journalist, or third-party commentator
  | "INFERENCE" // reasoned conclusion from other evidence; NOT established fact
  | "UNKNOWN"; // genuinely unknown or unverifiable at this time

export const CERTAINTY_LABEL: Record<Certainty, string> = {
  FACT: "Fact",
  COMPANY_CLAIM: "Company claim",
  CUSTOMER_OPINION: "Customer / user opinion",
  ANALYST_VIEW: "Analyst view",
  INFERENCE: "Inference",
  UNKNOWN: "Unknown",
};

// ---------------------------------------------------------------------------
// Sources
// ---------------------------------------------------------------------------
export type SourceType =
  | "COMPANY_WEBSITE"
  | "PRESS_RELEASE"
  | "REGULATORY_FILING"
  | "STOCK_EXCHANGE"
  | "NEWS"
  | "ANALYST_REPORT"
  | "STANDARD_BODY"
  | "GOVERNMENT"
  | "THIRD_PARTY"
  | "OTHER";

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  type: SourceType;
  accessedAt: string; // ISO date when the source was consulted
  publishedAt?: string; // ISO date when the source was published, if known
  notes?: string;
}

// ---------------------------------------------------------------------------
// Entity base
// ---------------------------------------------------------------------------
export interface EntityBase {
  id: string;
  name: string;
  aliases?: string[];
  summary: string;
  /** Longer, structured description. Markdown is allowed. */
  description?: string;
  /** Map of topic -> markdown detail. Used to grow depth over phases. */
  details?: Record<string, string>;
  certainty: Certainty;
  /** Source ids backing the summary/description. */
  sources: string[];
  tags?: string[];
}

// ---------------------------------------------------------------------------
// Concrete entity types
// ---------------------------------------------------------------------------
export type CompanyType =
  | "IRIS"
  | "COMPETITOR"
  | "CUSTOMER"
  | "PARTNER"
  | "REGULATOR"
  | "OTHER";

export interface Company extends EntityBase {
  companyType: CompanyType;
  founded?: number;
  headquarters?: string;
  ticker?: string;
  exchange?: string;
  website?: string;
  employees?: number;
  segment?: string[]; // for IRIS: SupTech / RegTech / TaxTech / DataTech
}

export type ProductLifecycle =
  | "CURRENT" // still sold/supported by IRIS today
  | "LEGACY" // still referenced / maintained but no longer a growth focus
  | "DISCONTINUED" // no longer offered
  | "DIVESTED" // sold / transferred to another owner
  | "UNCLEAR"; // status could not be determined from evidence

export const LIFECYCLE_LABEL: Record<ProductLifecycle, string> = {
  CURRENT: "Current",
  LEGACY: "Legacy",
  DISCONTINUED: "Discontinued",
  DIVESTED: "Divested",
  UNCLEAR: "Unclear",
};

/**
 * Confidence classification for technology descriptions. Separates what IRIS
 * (or the standard) publicly documents, from reasoned architectural inference,
 * from genuinely unknown detail.
 */
export type DocStatus =
  | "PUBLICLY_DOCUMENTED" // stated by IRIS / the standard body / a primary source
  | "ARCHITECTURAL_INFERENCE" // reasoned from how such systems work; not confirmed by a source
  | "UNKNOWN"; // no evidence either way

export const DOC_STATUS_LABEL: Record<DocStatus, string> = {
  PUBLICLY_DOCUMENTED: "Publicly documented",
  ARCHITECTURAL_INFERENCE: "Architectural inference",
  UNKNOWN: "Unknown",
};

export interface Product extends EntityBase {
  /** Owning company id (usually "company/iris"). */
  companyId: string;
  category: string[]; // e.g. ["regulatory reporting", "tax filing"]
  /** Lifecycle classification per Stage 4 research. */
  lifecycle: ProductLifecycle;
  /** Human-readable note explaining the lifecycle classification. */
  lifecycleNote?: string;
  launchYear?: number;
  website?: string;
}

export interface Regulator extends EntityBase {
  jurisdiction: string[]; // countries / regions
  regulatorType: string[]; // e.g. ["central bank", "capital markets"]
}

export interface Regulation extends EntityBase {
  jurisdiction: string[];
  regulatorIds: string[]; // regulators that issue/enforce it
  status?: "ACTIVE" | "PROPOSED" | "SUPERSEDED" | "UNKNOWN";
  firstIssued?: number;
}

export interface Technology extends EntityBase {
  category: string[]; // e.g. ["XBRL", "API", "cloud"]
  standardOf?: string; // standard body / specification, if any
  /** How confident we are in the description of this technology as IRIS actually uses it. */
  docStatus: DocStatus;
}

export interface Market extends EntityBase {
  region: string;
  countries?: string[];
}

export interface UseCase extends EntityBase {
  /** Which entity (product/company) solves this use case. */
  solvedBy: string[];
  persona?: string[]; // e.g. ["regulator", "corporate", "bank"]
}

export interface GlossaryTerm extends EntityBase {
  acronymOf?: string;
  seeAlso?: string[];
}

// ---------------------------------------------------------------------------
// Concepts (rich, multi-level explainers)
// ---------------------------------------------------------------------------
export interface ConceptSection {
  heading: string;
  body: string; // markdown
  sources?: string[];
  certainty?: Certainty;
}

export interface Concept extends EntityBase {
  /** Grouping used on the domain hub / concepts index. */
  group: string;
  /** Ordered explainer sections (simple → professional → example → why…). */
  sections: ConceptSection[];
}

// ---------------------------------------------------------------------------
// Products (deep dive)
// ---------------------------------------------------------------------------
/** A single labelled block of product knowledge. */
export interface ProductAspect {
  heading: string;
  body: string; // markdown
  sources?: string[];
  certainty?: Certainty;
}

export interface ProductLevel {
  level: 1 | 2 | 3 | 4 | 5;
  title: string; // "One sentence" | "Beginner" | "Professional" | "Technical" | "Strategic"
  body: string; // markdown
  sources?: string[];
  certainty?: Certainty;
}

export interface ProductWorkflowStep {
  /** Fixed chain label: CUSTOMER PROBLEM → DATA → IRIS PRODUCT → PROCESS → OUTPUT → VALUE */
  label: string;
  body: string; // markdown
  sources?: string[];
  certainty?: Certainty;
}

export interface ProductDeepDive {
  productId: string;
  lifecycle: ProductLifecycle;
  lifecycleNote?: string;
  /** One-line summary used in ecosystem / comparison views. */
  elevator: string;
  /** The 21 ordered aspects. */
  aspects: ProductAspect[];
  /** The 5 learning levels. */
  levels: ProductLevel[];
  /** The 6-step visual workflow. */
  workflow: ProductWorkflowStep[];
  /** Cross-links to other products (ecosystem). */
  relatedProductIds?: string[];
}

export interface ProductEcosystemLink {
  from: string; // product id
  to: string; // product id
  note: string;
}

export interface ProductEcosystem {
  /** Segment name -> product ids (segment = SupTech / RegTech / TaxTech / DataTech). */
  segments: Record<string, string[]>;
  /** How segments/products flow into one another. */
  links: ProductEcosystemLink[];
  description: string; // markdown
}

// ---------------------------------------------------------------------------
// Customers (Stage 5)
// ---------------------------------------------------------------------------
/** The six-step value chain for a customer segment. */
export interface SegmentChain {
  problem: string;
  regulatoryRequirement: string;
  dataProblem: string;
  product: string;
  workflow: string;
  outcome: string;
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  chain: SegmentChain;
  /** A realistic end-to-end customer journey, ordered. */
  journey: string[];
  /** Products relevant to this segment. */
  productIds: string[];
  /** Named customers / regulators exemplifying this segment. */
  entityRefs: EntityRef[];
  sources: string[];
  certainty: Certainty;
}

// ---------------------------------------------------------------------------
// Learning system
// ---------------------------------------------------------------------------
/** Which track a module belongs to in the domain-mastery curriculum. */
export type LearningTrack =
  | "PATH" // the 10-level progressive path (LEVEL 1..10)
  | "SNAPSHOT" // time-boxed IRIS snapshots (5 min / 15 min / 1 hour / deep dive)
  | "MODE"; // guided traversal modes (Follow the Data / Follow the Regulation)

export interface LearningModule {
  id: string;
  title: string;
  /** Ordered position in the progressive curriculum. */
  order: number;
  /** LEVEL number for PATH modules (1..10). */
  level?: number;
  /** Which track this module belongs to. */
  track?: LearningTrack;
  summary: string;
  sections: LearningSection[];
  /** Entity ids referenced by this module. */
  entityRefs: string[];
  sources: string[];
}

export interface LearningSection {
  heading: string;
  body: string; // markdown
  certainty?: Certainty;
  sources?: string[];
}

export interface Flashcard {
  id: string;
  deck: string;
  front: string;
  back: string;
  tags?: string[];
  sources?: string[];
  certainty?: Certainty;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  /** Question style: multiple-choice or a situational scenario. */
  kind?: "mcq" | "scenario";
  /** Markdown context setting up a scenario question. */
  scenario?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  entityRefs?: string[];
  sources?: string[];
}

// ---------------------------------------------------------------------------
// Learning paths & guided traversal modes
// ---------------------------------------------------------------------------
export interface LearningPathLevel {
  level: number;
  title: string;
  moduleId: string;
  summary: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string; // markdown
  levels: LearningPathLevel[];
}

export type FollowMode = "data" | "regulation";

export interface FollowStep {
  label: string;
  body: string; // markdown
  refs: EntityRef[];
  sources?: string[];
  certainty?: Certainty;
}

export interface FollowPath {
  id: string;
  mode: FollowMode;
  title: string;
  description: string; // markdown
  steps: FollowStep[];
}

// ---------------------------------------------------------------------------
// Relationships (the knowledge graph)
// ---------------------------------------------------------------------------
export type EntityType =
  | "company"
  | "product"
  | "regulator"
  | "regulation"
  | "technology"
  | "market"
  | "useCase"
  | "glossary"
  | "concept";

export interface EntityRef {
  type: EntityType;
  id: string;
}

export type RelationKind =
  | "serves" // company serves a customer segment
  | "competesWith" // company competes with company
  | "makes" // company makes product
  | "compliesWith" // company/product complies with regulation
  | "enforces" // regulator enforces regulation
  | "builtWith" // product built with technology
  | "operatesIn" // company operates in market
  | "uses" // customer uses product
  | "supports" // product supports regulation/use case
  | "relatedTo" // loose association
  | "partnerOf" // partnership
  | "owns" // company owns subsidiary
  | "divestedTo"; // company divested a business to another company

export interface Relation {
  id: string;
  from: EntityRef;
  to: EntityRef;
  kind: RelationKind;
  note?: string;
  sources: string[];
  certainty?: Certainty;
}

// ---------------------------------------------------------------------------
// Aggregated knowledge base
// ---------------------------------------------------------------------------
export interface KnowledgeBase {
  sources: Source[];
  companies: Company[];
  products: Product[];
  regulators: Regulator[];
  regulations: Regulation[];
  technologies: Technology[];
  markets: Market[];
  useCases: UseCase[];
  glossary: GlossaryTerm[];
  concepts: Concept[];
  relations: Relation[];
  learningModules: LearningModule[];
  flashcards: Flashcard[];
  quizzes: Quiz[];
}

// ---------------------------------------------------------------------------
// Competitor intelligence (Stage 6)
// ---------------------------------------------------------------------------
/** How directly a company competes with IRIS. */
export type CompetitionTier =
  | "DIRECT" // overlaps IRIS products/segments head-on
  | "ADJACENT" // overlaps partially or in one niche
  | "NON_COMPETITOR"; // related ecosystem player, not a direct rival

export const COMPETITION_TIER_LABEL: Record<CompetitionTier, string> = {
  DIRECT: "Direct competitor",
  ADJACENT: "Adjacent",
  NON_COMPETITOR: "Ecosystem player",
};

export interface CompetitorProfile {
  /** company id in companies.ts */
  companyId: string;
  tier: CompetitionTier;
  /** one-line positioning summary. */
  positioning: string;
  /** IRIS product ids this company overlaps with. */
  overlapsWith: string[];
  /** Ordered research dimensions (the 20-part profile). */
  dimensions: { heading: string; body: string; sources?: string[]; certainty?: Certainty }[];
  strengths: string[];
  weaknesses: string[];
  /** markdown. */
  customerSentiment: string;
  /** markdown; use "Insufficient public evidence." where unknown. */
  pricing: string;
  sources: string[];
  certainty: Certainty;
}

export type Edge = "IRIS" | "COMPETITOR" | "NEUTRAL" | "UNKNOWN";

export interface HeadToHeadRow {
  dimension: string;
  iris: string; // markdown
  competitor: string; // markdown
  edge: Edge;
}

export interface HeadToHead {
  id: string;
  irisProductId: string;
  competitorCompanyId: string;
  summary: string; // markdown
  rows: HeadToHeadRow[];
  irisEdges: string[]; // "where IRIS has an edge"
  competitorEdges: string[]; // "where the competitor has an edge"
  whyItMatters: string; // markdown
  evidence: string; // markdown; may state "Insufficient public evidence."
  sources: string[];
  certainty: Certainty;
}

export interface CompetitiveThreat {
  id: string;
  title: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  description: string; // markdown
  affectedProductIds: string[];
  competitorIds: string[];
  evidence: string; // markdown
}

export interface ProductMatrixCell {
  competitorId: string;
  tier: CompetitionTier;
  note: string;
}

export interface ProductMatrixRow {
  productId: string;
  cells: ProductMatrixCell[];
}

export interface CompetitorMapSegment {
  segment: string; // "SupTech", "RegTech — reporting", etc.
  description: string; // markdown
  competitorIds: string[];
}

export interface WhyChooseNarrative {
  id: string;
  perspective: string; // buyer persona, e.g. "a regulator", "a bank", "a listed company"
  chooseIris: string[]; // markdown
  chooseCompetitor: string[]; // markdown
  sources: string[];
}

export const EDGE_LABEL: Record<Edge, string> = {
  IRIS: "IRIS",
  COMPETITOR: "Competitor",
  NEUTRAL: "Even",
  UNKNOWN: "Unclear",
};

export const SEVERITY_LABEL: Record<CompetitiveThreat["severity"], string> = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};
