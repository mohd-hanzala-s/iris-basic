import type { Technology } from "./types";

/**
 * Technology concepts (Stage 5). Each entry teaches a concept behind the
 * IRIS ecosystem and carries a `docStatus` classifying our confidence:
 * PUBLICLY_DOCUMENTED (stated by the standard body / IRIS / a primary source),
 * ARCHITECTURAL_INFERENCE (reasoned from how such systems work), or UNKNOWN.
 */
export const technologies: Technology[] = [
  {
    id: "xbrl-standard",
    name: "XBRL",
    summary:
      "Open, XML-based standard for machine-readable business and financial reporting; the foundation of most of IRIS's regulatory reporting and disclosure products.",
    certainty: "FACT",
    sources: ["xbrl-what-is"],
    category: ["reporting-standard", "data-standard"],
    standardOf: "XBRL International",
    tags: ["standard", "reporting"],
    docStatus: "PUBLICLY_DOCUMENTED",
    details: {
      "How it works":
        "XBRL wraps each reported fact in a tag that names its concept (e.g. ifrs:Revenue), so software can extract, validate and compare it. Regulators publish taxonomies defining the concepts, and preparers tag their figures to them.",
      "How IRIS uses it":
        "XBRL is IRIS's core: CARBON produces XBRL/iXBRL reports, iDEAL produces XBRL returns, iFILE collects/validates XBRL data, and iConnect analyses it.",
    },
  },
  {
    id: "ixbrl-standard",
    name: "iXBRL",
    summary:
      "Inline XBRL — embeds XBRL tags within an HTML document so reports are both human- and machine-readable; used widely in regulator mandates (ESEF, US SEC).",
    certainty: "FACT",
    sources: ["xbrl-ixbrl", "esma-esef"],
    category: ["reporting-standard", "data-standard"],
    standardOf: "XBRL International",
    tags: ["standard", "reporting"],
    docStatus: "PUBLICLY_DOCUMENTED",
    details: {
      "How it works": "iXBRL adds XBRL tags to an XHTML report so one file is both a human-readable document and a machine-readable data set.",
      "How IRIS uses it": "CARBON renders disclosure reports as iXBRL for ESEF/SEC-style filing.",
    },
  },
  {
    id: "sdmx-standard",
    name: "SDMX",
    summary:
      "ISO 17369 standard for exchanging statistical (aggregate) data and metadata between official organisations — complementary to XBRL.",
    certainty: "FACT",
    sources: ["sdmx-home"],
    category: ["data-standard", "statistical"],
    standardOf: "SDMX (BIS, ECB, Eurostat, IMF, OECD, UN, World Bank)",
    tags: ["standard", "statistical", "data"],
    docStatus: "PUBLICLY_DOCUMENTED",
    details: {
      "How it works": "SDMX defines data structures and code lists so statistical series (e.g. CPI, aggregates) can be exchanged with full metadata between agencies and the IMF/ECB.",
      "How IRIS uses it": "IRIS's SupTech/statistical collection work can intersect with SDMX, but no specific IRIS SDMX product is documented (inference).",
    },
  },
  {
    id: "ifrs-taxonomy",
    name: "IFRS Taxonomy",
    summary:
      "The XBRL taxonomy that represents IFRS Accounting Standards — the vocabulary digital-reporting regimes such as ESEF build on.",
    certainty: "FACT",
    sources: ["ifrs-foundation", "esma-esef"],
    category: ["taxonomy", "xbrl", "accounting"],
    standardOf: "IFRS Foundation / IASB",
    tags: ["taxonomy", "ifrs", "xbrl"],
    docStatus: "PUBLICLY_DOCUMENTED",
    details: {
      "How it works": "The IFRS Taxonomy defines the XBRL elements, labels and relationships for IFRS disclosures; ESMA's ESEF taxonomy extends it.",
      "How IRIS uses it": "CARBON tags financials to IFRS/ESEF taxonomies; IRIS provides taxonomy development and testing services.",
    },
  },
  {
    id: "xbrl-taxonomy",
    name: "XBRL Taxonomies",
    summary:
      "The structured 'dictionary' a regulator publishes defining what must be reported, how each item is labelled, and the validation rules.",
    certainty: "FACT",
    sources: ["xbrl-what-is", "esma-esef"],
    category: ["taxonomy", "xbrl"],
    standardOf: "XBRL International (spec)",
    tags: ["taxonomy", "xbrl", "standard"],
    docStatus: "PUBLICLY_DOCUMENTED",
    details: {
      "How it works": "A taxonomy defines concepts, labels, dimensional structure and calculation/validation rules; it is the machine-readable specification of a reporting mandate.",
      "How IRIS uses it": "IRIS's products map entity data onto regulatory taxonomies; IRIS also develops and tests taxonomies for regulators.",
    },
  },
  {
    id: "xbrl-facts",
    name: "XBRL Facts",
    summary:
      "The individual reported values (a number or text) tagged with a concept — the atomic unit of an XBRL report.",
    certainty: "FACT",
    sources: ["xbrl-what-is"],
    category: ["xbrl", "data-model"],
    standardOf: "XBRL International",
    tags: ["xbrl", "fact", "data"],
    docStatus: "PUBLICLY_DOCUMENTED",
    details: {
      "How it works": "A fact pairs a concept (e.g. ifrs:Revenue) with a value, a unit, and a context that says what entity, period and scenario it describes.",
      "How IRIS uses it": "CARBON/iDEAL create tagged facts; iFILE validates them; iConnect surfaces them for analysis.",
    },
  },
  {
    id: "xbrl-contexts",
    name: "XBRL Contexts",
    summary:
      "The part of an XBRL fact that identifies the entity, reporting period and scenario the value applies to.",
    certainty: "FACT",
    sources: ["xbrl-what-is"],
    category: ["xbrl", "data-model"],
    standardOf: "XBRL International",
    tags: ["xbrl", "context", "data"],
    docStatus: "PUBLICLY_DOCUMENTED",
    details: {
      "How it works": "Every fact references a context specifying entity identifier, period (instant/duration) and optional scenario/segment dimensions.",
      "How IRIS uses it": "IRIS's products must construct and validate contexts correctly so facts are unambiguous (e.g. comparative periods).",
    },
  },
  {
    id: "xbrl-dimensions",
    name: "XBRL Dimensions",
    summary:
      "The XBRL mechanism for multi-dimensional data (e.g. revenue by segment, by region) using explicit or typed members.",
    certainty: "FACT",
    sources: ["xbrl-what-is"],
    category: ["xbrl", "data-model"],
    standardOf: "XBRL International",
    tags: ["xbrl", "dimensions", "data"],
    docStatus: "PUBLICLY_DOCUMENTED",
    details: {
      "How it works": "Dimensions let a fact carry 'axes' (e.g. Segment, Region) with members, so a single concept can be reported many ways.",
      "How IRIS uses it": "Regulatory taxonomies (e.g. IFRS segment reporting) rely on dimensions; IRIS products map and validate dimensional facts.",
    },
  },
  {
    id: "xbrl-extensions",
    name: "XBRL Taxonomy Extensions",
    summary:
      "Regulator- or entity-specific additions to a base taxonomy (e.g. ESEF's extension of the IFRS Taxonomy).",
    certainty: "FACT",
    sources: ["esma-esef", "xbrl-what-is"],
    category: ["xbrl", "taxonomy"],
    standardOf: "XBRL International",
    tags: ["xbrl", "taxonomy", "extension"],
    docStatus: "PUBLICLY_DOCUMENTED",
    details: {
      "How it works": "A regulator extends a base taxonomy with jurisdiction-specific elements and rules; preparers must validate against both.",
      "How IRIS uses it": "ESEF is an extension of the IFRS Taxonomy; IRIS's disclosure products handle extension elements and conformance rules.",
    },
  },
  {
    id: "validation",
    name: "Data Validation",
    summary:
      "Applying taxonomy rules (required facts, data types, calculations, cross-field checks) to detect errors before a filing is accepted.",
    certainty: "FACT",
    sources: ["xbrl-what-is", "esma-esef"],
    category: ["data", "quality"],
    tags: ["validation", "quality", "xbrl"],
    docStatus: "PUBLICLY_DOCUMENTED",
    details: {
      "How it works": "Validation runs machine-executable business rules (e.g. 'assets = liabilities + equity') against a filing, on both the preparer and regulator side.",
      "How IRIS uses it": "iFILE validates filings on entry; CARBON/iDEAL validate before submission so firms file cleanly.",
    },
  },
  {
    id: "rest-api",
    name: "REST APIs",
    summary:
      "Programmatic interfaces used by IRIS Zircon (GST, e-way bill, e-invoicing) to integrate compliance into enterprise systems.",
    certainty: "INFERENCE",
    sources: ["stockanalysis-company-profile"],
    category: ["integration"],
    tags: ["api", "integration"],
    docStatus: "PUBLICLY_DOCUMENTED",
    details: {
      "How it works": "REST APIs expose functions over HTTP so other systems can trigger compliance actions programmatically.",
      "How IRIS uses it": "Zircon was delivered as APIs for GST, e-way bill and e-invoicing (divested to Sovos).",
    },
  },
  {
    id: "data-ingestion",
    name: "Data Ingestion",
    summary:
      "Getting a filer's source data into the reporting product — via upload, ERP connectors or APIs.",
    certainty: "INFERENCE",
    sources: ["stockanalysis-company-profile"],
    category: ["data", "integration"],
    tags: ["ingestion", "data", "integration"],
    docStatus: "ARCHITECTURAL_INFERENCE",
    details: {
      "How it works": "Reporting products accept source data in various forms (files, ERP extracts, APIs) and normalise it before mapping.",
      "How IRIS uses it": "IRIS GST had an ERP connector; CARBON works in Office 365. Specific ingestion paths for other products are not publicly documented (inference).",
    },
  },
  {
    id: "etl-transformation",
    name: "ETL / Data Transformation",
    summary:
      "Mapping, cleansing and restructuring a firm's internal data into the exact structure and labels the regulator requires.",
    certainty: "INFERENCE",
    sources: ["esma-esef", "stockanalysis-company-profile"],
    category: ["data", "transformation"],
    tags: ["etl", "transformation", "data"],
    docStatus: "ARCHITECTURAL_INFERENCE",
    details: {
      "How it works": "Extract from source systems → transform/map to taxonomy concepts → load into the report structure. This is the most error-prone step in reporting.",
      "How IRIS uses it": "IRIS products perform this mapping (CARBON tagging, iDEAL return generation), but the specific ETL mechanics are not publicly documented (inference).",
    },
  },
  {
    id: "data-lineage",
    name: "Data Lineage",
    summary:
      "The recorded history of a data point's origin and transformations — a BCBS 239 expectation for risk data.",
    certainty: "INFERENCE",
    sources: ["bcbs239"],
    category: ["data", "governance"],
    tags: ["lineage", "governance", "data"],
    docStatus: "ARCHITECTURAL_INFERENCE",
    details: {
      "How it works": "Lineage tracks where each reported number came from and how it was transformed, enabling auditability and root-cause analysis.",
      "How IRIS uses it": "Reporting platforms implicitly preserve some provenance, but lineage is not a documented IRIS feature (inference).",
    },
  },
  {
    id: "cloud-saas",
    name: "Cloud / SaaS",
    summary:
      "Software delivered as a hosted subscription service — the delivery model for IRIS CARBON (Office 365-based).",
    certainty: "COMPANY_CLAIM",
    sources: ["carbon-launch-office365", "stockanalysis-company-profile"],
    category: ["delivery", "cloud"],
    tags: ["cloud", "saas", "delivery"],
    docStatus: "PUBLICLY_DOCUMENTED",
    details: {
      "How it works": "The vendor hosts the application; customers subscribe and access it over the internet.",
      "How IRIS uses it": "CARBON is explicitly a SaaS/Office 365-based solution; IRIS describes itself as a RegTech SaaS company.",
    },
  },
  {
    id: "workflow",
    name: "Reporting Workflow",
    summary:
      "The multi-step, role-based process of preparing, reviewing, approving and submitting a report.",
    certainty: "INFERENCE",
    sources: ["esma-esef"],
    category: ["process", "collaboration"],
    tags: ["workflow", "process", "collaboration"],
    docStatus: "ARCHITECTURAL_INFERENCE",
    details: {
      "How it works": "Disclosure platforms manage version control, review and approval so the right people sign off each report.",
      "How IRIS uses it": "CARBON's disclosure management implies review workflow, but explicit workflow features are not publicly documented (inference).",
    },
  },
  {
    id: "analytics",
    name: "Analytics",
    summary:
      "Turning structured reporting data into insight — comparison, benchmarking and decision support (iConnect).",
    certainty: "COMPANY_CLAIM",
    sources: ["iconnect-launch", "stockanalysis-company-profile"],
    category: ["data", "analytics"],
    tags: ["analytics", "data", "datatech"],
    docStatus: "ARCHITECTURAL_INFERENCE",
    details: {
      "How it works": "Analytics ingests structured data and produces comparisons, aggregates and insights.",
      "How IRIS uses it": "iConnect evaluates/compares XBRL data in Excel; Credixo is a credit-analysis model tool. Depth beyond this is inference.",
    },
  },
  {
    id: "ai",
    name: "AI / Machine Learning",
    summary:
      "AI/ML applied to compliance and supervision (anomaly detection, rule interpretation, report drafting).",
    certainty: "INFERENCE",
    sources: ["bis-suptech-generations", "xbrl-what-is"],
    category: ["ai", "automation"],
    tags: ["ai", "machine-learning"],
    docStatus: "UNKNOWN",
    details: {
      "How it works": "ML detects anomalies, NLP ingests rules, GenAI drafts disclosures; XBRL data is high-quality input for AI.",
      "How IRIS uses it": "No specific IRIS AI product is documented. IRIS's structured-data foundation could feed AI, but treat IRIS AI capability as unknown.",
    },
  },
  {
    id: "automation",
    name: "Compliance Automation",
    summary:
      "Performing compliance tasks (reporting, reconciliation, filing) automatically instead of manually.",
    certainty: "FACT",
    sources: ["stockanalysis-company-profile", "fca-regtech"],
    category: ["automation", "compliance"],
    tags: ["automation", "compliance", "regtech"],
    docStatus: "PUBLICLY_DOCUMENTED",
    details: {
      "How it works": "Automation turns manual, error-prone compliance activities into deterministic, auditable processes.",
      "How IRIS uses it": "IRIS automates reporting (iDEAL/CARBON) and, formerly, GST filing and e-invoicing reconciliation (divested).",
    },
  },
];
