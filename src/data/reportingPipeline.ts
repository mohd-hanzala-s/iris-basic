/**
 * Stage 5 — the reporting pipeline.
 *
 * Every regulated filing flows through the same eight stages, regardless of
 * jurisdiction. This module encodes that pipeline and, at each stage, shows
 * where IRIS products and the underlying technologies participate.
 *
 *   REGULATION → TAXONOMY → DATA → TRANSFORMATION → VALIDATION
 *   → REPORT → SUBMISSION → REGULATOR
 */

export interface PipelineStage {
  id: string;
  label: string;
  title: string;
  body: string; // markdown
  irisProducts: string[]; // product ids involved at this stage
  technologies: string[]; // technology ids involved at this stage
  sources?: string[];
}

export interface ReportingPipeline {
  id: string;
  name: string;
  description: string;
  stages: PipelineStage[];
  /** Framework (regulation) ids this pipeline illustrates. */
  exampleFrameworks: string[];
}

export const reportingPipeline: ReportingPipeline = {
  id: "reporting-pipeline",
  name: "The reporting pipeline",
  description:
    "From a regulator's mandate to a clean, machine-readable filing, every reporting obligation runs through the same eight stages. IRIS products plug in at different points: iFILE on the regulator (collection) side, CARBON and iDEAL on the preparer (filing) side, iConnect on the analysis side.",
  exampleFrameworks: ["esef", "rbi-returns", "us-sec-xbrl", "cipc-xbrl"],
  stages: [
    {
      id: "regulation",
      label: "REGULATION",
      title: "A mandate is issued",
      body:
        "A regulator (central bank, securities authority, tax authority or registry) issues a rule requiring entities to report data in a structured, machine-readable form.",
      irisProducts: [],
      technologies: [],
      sources: ["esma-esef", "cipc-xbrl"],
    },
    {
      id: "taxonomy",
      label: "TAXONOMY",
      title: "The data dictionary is published",
      body:
        "The regulator (or a standard body) publishes a taxonomy — the structured dictionary of concepts, labels and validation rules that define exactly what must be reported and how.",
      irisProducts: ["iris-ifile"],
      technologies: ["xbrl-taxonomy", "ifrs-taxonomy", "xbrl-dimensions"],
      sources: ["xbrl-what-is", "esma-esef"],
    },
    {
      id: "data",
      label: "DATA",
      title: "Source data is gathered",
      body:
        "The reporting entity pulls source data from its ERP, core banking, actuarial or accounting systems — the raw material that must be shaped into a filing.",
      irisProducts: ["iris-ideal", "iris-carbon"],
      technologies: ["data-ingestion", "rest-api"],
      sources: ["stockanalysis-company-profile"],
    },
    {
      id: "transformation",
      label: "TRANSFORMATION",
      title: "Data is mapped and tagged",
      body:
        "The entity's data is mapped, cleansed and tagged to the taxonomy concepts — every figure gets a concept, unit and context. This is the most error-prone step in reporting.",
      irisProducts: ["iris-carbon", "iris-ideal"],
      technologies: ["etl-transformation", "xbrl-facts", "xbrl-contexts"],
      sources: ["xbrl-what-is"],
    },
    {
      id: "validation",
      label: "VALIDATION",
      title: "The filing is checked",
      body:
        "Machine-executable rules (required facts, data types, calculations, cross-field checks) run against the filing to catch errors before submission.",
      irisProducts: ["iris-ifile", "iris-carbon", "iris-ideal"],
      technologies: ["validation"],
      sources: ["xbrl-what-is", "esma-esef"],
    },
    {
      id: "report",
      label: "REPORT",
      title: "The report is rendered",
      body:
        "The tagged data is rendered into the deliverable — an XBRL instance, an Inline XBRL document, or both (a human-readable report plus a machine-readable one).",
      irisProducts: ["iris-carbon", "iris-ideal"],
      technologies: ["ixbrl-standard", "xbrl-standard"],
      sources: ["xbrl-ixbrl"],
    },
    {
      id: "submission",
      label: "SUBMISSION",
      title: "The filing is submitted",
      body:
        "The filing is uploaded to the regulator's portal (EDGAR, an OAM, CIMS, CIPC) or the authority's collection system, which validates and stores it.",
      irisProducts: ["iris-ifile"],
      technologies: ["cloud-saas", "rest-api"],
      sources: ["sec-edgar", "iris-rbi-cims"],
    },
    {
      id: "regulator",
      label: "REGULATOR",
      title: "The regulator analyses it",
      body:
        "The regulator stores the validated data and runs supervision, surveillance and analytics over the full population of filings — closing the loop.",
      irisProducts: ["iris-ifile", "iris-iconnect"],
      technologies: ["analytics", "sdmx-standard"],
      sources: ["iconnect-launch", "iris-ifile-page"],
    },
  ],
};
