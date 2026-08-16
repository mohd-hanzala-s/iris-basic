import type { LearningPath, FollowPath } from "./types";

/**
 * The 10-level mastery path metadata. Levels point at the PATH-track learning
 * modules (see learningModules.ts). The levels are the spine of the Domain
 * Mastery System; the snapshots and follow-modes hang off it.
 */
export const masteryPath: LearningPath = {
  id: "mastery-path",
  title: "Domain Mastery Path",
  description:
    "A progressive, ten-level curriculum that builds an interconnected mental model of IRIS and RegTech — from 'what is RegTech?' to genuine domain mastery.",
  levels: [
    {
      level: 1,
      title: "RegTech Beginner",
      moduleId: "regtech-from-zero",
      summary: "What RegTech and SupTech are, the problem they solve, and the standards that power them.",
    },
    {
      level: 2,
      title: "Regulatory Reporting",
      moduleId: "level-2-regulatory-reporting",
      summary: "The reporting lifecycle from rule to supervision, and the three families of reporting.",
    },
    {
      level: 3,
      title: "XBRL & Data",
      moduleId: "level-3-xbrl-data",
      summary: "XBRL, iXBRL, SDMX, taxonomies, and the data layer — facts, contexts, validation, lineage.",
    },
    {
      level: 4,
      title: "IRIS Company",
      moduleId: "level-4-iris-company",
      summary: "Meet IRIS: history, segments, customers, financials, and the two facts that shape its present.",
    },
    {
      level: 5,
      title: "IRIS Products",
      moduleId: "level-5-iris-products",
      summary: "The portfolio — iFILE, iDEAL, CARBON, iConnect, Credixo, MSME — and how they connect.",
    },
    {
      level: 6,
      title: "Customers",
      moduleId: "level-6-customers",
      summary: "The dual-sided customer base, segments, proof points, and the value chain each buyer walks.",
    },
    {
      level: 7,
      title: "Competitors",
      moduleId: "level-7-competitors",
      summary: "The competitive landscape: tiers, head-to-heads, threats, and where each side wins.",
    },
    {
      level: 8,
      title: "Technology",
      moduleId: "level-8-technology",
      summary: "The technology layer: the XBRL data model, cloud/SaaS, analytics, and the AI frontier.",
    },
    {
      level: 9,
      title: "Strategy",
      moduleId: "level-9-strategy",
      summary: "The dual-sided moat, the post-divestment refocus, the ₹500 Cr ambition, and the risks.",
    },
    {
      level: 10,
      title: "Domain Mastery",
      moduleId: "regtech-domain-mastery",
      summary: "The integrated picture: the data value chain, governance, the global landscape, ESG, AI.",
    },
  ],
};

/**
 * Guided traversal modes — "Follow the Data" and "Follow the Regulation".
 * Each is an ordered chain of steps the learner walks to see how entities
 * connect across the knowledge graph.
 */
export const followPaths: FollowPath[] = [
  {
    id: "follow-data",
    mode: "data",
    title: "Follow the Data",
    description:
      "Trace a single structured fact from its origin in a company's systems all the way to regulatory supervision. This is the spine of the entire IRIS product ecosystem — every IRIS product lives somewhere on this chain.",
    steps: [
      {
        label: "1 · Source data",
        body:
          "Every regulated report begins as **raw data** inside a firm's systems — ERP, finance, HR, ESG data. At this stage the data is unstructured and does not match any regulator's vocabulary.",
        refs: [
          { type: "concept", id: "regulatory-data" },
          { type: "technology", id: "data-ingestion" },
        ],
        sources: ["stockanalysis-company-profile"],
        certainty: "INFERENCE",
      },
      {
        label: "2 · Transformation",
        body:
          "The firm maps its internal data onto the regulator's **taxonomy** — the machine-readable dictionary of concepts. This mapping is the most error-prone, expertise-heavy step in reporting.",
        refs: [
          { type: "concept", id: "data-transformation" },
          { type: "technology", id: "etl-transformation" },
          { type: "concept", id: "regulatory-taxonomies" },
        ],
        sources: ["esma-esef"],
        certainty: "FACT",
      },
      {
        label: "3 · Tagging (XBRL / iXBRL)",
        body:
          "Each fact is tagged with its meaning — **XBRL** for pure data, **iXBRL** when the report must stay human-readable. Now the number carries both a value and a definition (a fact with concept, unit and context).",
        refs: [
          { type: "concept", id: "xbrl" },
          { type: "concept", id: "ixbrl" },
          { type: "technology", id: "xbrl-standard" },
          { type: "technology", id: "ixbrl-standard" },
        ],
        sources: ["xbrl-what-is", "xbrl-ixbrl"],
        certainty: "FACT",
      },
      {
        label: "4 · Validation",
        body:
          "Machine-executable rules check the filing — required facts present, calculations reconcile, data types correct. This happens on the filer side *and* again on the regulator side.",
        refs: [
          { type: "concept", id: "data-validation" },
          { type: "technology", id: "validation" },
        ],
        sources: ["xbrl-what-is", "esma-esef"],
        certainty: "FACT",
      },
      {
        label: "5 · Filing (IRIS CARBON / iDEAL)",
        body:
          "The filer-side IRIS products produce the report: **CARBON** renders disclosure as XBRL/iXBRL (Office 365-based); **iDEAL** generates supervisory returns for banks and investment firms.",
        refs: [
          { type: "product", id: "iris-carbon" },
          { type: "product", id: "iris-ideal" },
        ],
        sources: ["carbon-launch-office365", "iris-ideal-page"],
        certainty: "COMPANY_CLAIM",
      },
      {
        label: "6 · Collection (IRIS iFILE)",
        body:
          "On the regulator side, **iFILE** collects, validates and stores every submission centrally — the SupTech intake that turns many filings into one clean dataset.",
        refs: [
          { type: "product", id: "iris-ifile" },
          { type: "concept", id: "regulatory-data-collection" },
        ],
        sources: ["iris-ifile-page"],
        certainty: "COMPANY_CLAIM",
      },
      {
        label: "7 · Analytics (IRIS iConnect)",
        body:
          "The structured data is now comparable at scale. **iConnect** lets analysts evaluate and compare XBRL/iXBRL data in Excel; regulators run surveillance and benchmarking on the collected store.",
        refs: [
          { type: "product", id: "iris-iconnect" },
          { type: "technology", id: "analytics" },
        ],
        sources: ["iconnect-launch"],
        certainty: "COMPANY_CLAIM",
      },
      {
        label: "8 · Supervision & decision",
        body:
          "The end of the chain: data-driven, risk-based **supervision** by the regulator (SupTech), which in turn feeds new rules and updated taxonomies — and the loop begins again.",
        refs: [
          { type: "concept", id: "suptech" },
          { type: "concept", id: "regulatory-change-management" },
          { type: "regulator", id: "rbi" },
          { type: "regulator", id: "esma" },
        ],
        sources: ["bis-suptech-generations"],
        certainty: "FACT",
      },
    ],
  },
  {
    id: "follow-regulation",
    mode: "regulation",
    title: "Follow the Regulation",
    description:
      "Trace a single regulatory mandate from the regulator's rule all the way to the companies that comply, the products they use, and the competitors serving the same requirement — using ESEF (Europe's digital reporting format) as the worked example.",
    steps: [
      {
        label: "1 · A regulator issues a rule",
        body:
          "**ESMA** issues the European Single Electronic Format (ESEF), requiring EU-listed issuers to file annual reports as XHTML with Inline XBRL-tagged IFRS statements. Every digital-reporting mandate starts like this: a regulator turning policy into a filing obligation.",
        refs: [
          { type: "regulator", id: "esma" },
          { type: "regulation", id: "esef" },
        ],
        sources: ["esma-esef"],
        certainty: "FACT",
      },
      {
        label: "2 · The rule becomes a taxonomy",
        body:
          "The requirement is expressed as a machine-readable **taxonomy** — ESEF extends the **IFRS Taxonomy** with the specific concepts, labels and validation rules issuers must tag against.",
        refs: [
          { type: "technology", id: "ifrs-taxonomy" },
          { type: "technology", id: "xbrl-taxonomy" },
          { type: "concept", id: "regulatory-taxonomies" },
        ],
        sources: ["esma-esef", "ifrs-foundation"],
        certainty: "FACT",
      },
      {
        label: "3 · Who must comply",
        body:
          "The mandate lands on **listed companies** — issuers on EU regulated markets, and by extension any listed company elsewhere with an equivalent regime (SEC XBRL in the US, SEBI LODR in India, CIPC in South Africa).",
        refs: [
          { type: "company", id: "gap-inc" },
          { type: "concept", id: "disclosure-management" },
          { type: "regulation", id: "us-sec-xbrl" },
        ],
        sources: ["esma-esef", "xbrl-ixbrl"],
        certainty: "FACT",
      },
      {
        label: "4 · Filer-side products",
        body:
          "To comply, preparers use disclosure-management software. **IRIS CARBON** authors and tags reports in XBRL/iXBRL (Office 365-based); IRIS's broader disclosure portfolio serves the equivalent Indian and US mandates.",
        refs: [
          { type: "product", id: "iris-carbon" },
          { type: "product", id: "iris-ideal" },
        ],
        sources: ["carbon-launch-office365"],
        certainty: "COMPANY_CLAIM",
      },
      {
        label: "5 · Validation & conformance",
        body:
          "Before submission, filings are validated against the taxonomy's rules and the regulator's conformance suite (ESMA publishes a conformance suite of hundreds of tests). Clean filings are the goal; rejection is the risk.",
        refs: [
          { type: "technology", id: "validation" },
          { type: "concept", id: "data-validation" },
        ],
        sources: ["esma-esef"],
        certainty: "FACT",
      },
      {
        label: "6 · Submission & collection",
        body:
          "Issuers file through their Officially Appointed Mechanism (OAM) — or EDGAR in the US. On the regulator side, collection platforms (like **iFILE**) receive and validate the structured data centrally.",
        refs: [
          { type: "regulation", id: "sec-edgar" },
          { type: "product", id: "iris-ifile" },
        ],
        sources: ["esma-esef", "sec-edgar"],
        certainty: "FACT",
      },
      {
        label: "7 · Competitors serving the same mandate",
        body:
          "The same ESEF/SEC mandate is served by IRIS's direct competitors — **Workiva**, **CoreFiling**, **DFIN (Donnelley Financial)** and **Toppan Merrill**. This is where IRIS's standards depth competes with rivals' scale and enterprise reach.",
        refs: [
          { type: "company", id: "workiva" },
          { type: "company", id: "corefiling" },
          { type: "company", id: "toppan-merrill" },
          { type: "company", id: "dfin" },
        ],
        sources: ["stockanalysis-company-profile"],
        certainty: "ANALYST_VIEW",
      },
      {
        label: "8 · The loop continues",
        body:
          "Mandates evolve — ESEF is being extended toward **CSRD/ESRS** (ESG) digital tagging, and taxonomies are updated annually. Each change re-triggers the whole chain: new rules, new taxonomies, re-mapping, re-testing. Regulation is a loop, and vendors monetise the parts of the loop that stay hard.",
        refs: [
          { type: "regulation", id: "csrd-esrs" },
          { type: "concept", id: "regulatory-change-management" },
        ],
        sources: ["esma-esef"],
        certainty: "INFERENCE",
      },
    ],
  },
];
