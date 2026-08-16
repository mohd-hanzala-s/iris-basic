import type { GlossaryTerm } from "./types";

/**
 * Glossary. Seeded with foundational RegTech / XBRL / compliance terms that
 * are stable, widely accepted definitions. Will be extended substantially in
 * later phases.
 */
export const glossary: GlossaryTerm[] = [
  {
    id: "regtech",
    name: "RegTech",
    summary:
      "Regulatory Technology — the use of technology to help firms and regulators manage regulatory compliance, reporting and monitoring more efficiently.",
    certainty: "FACT",
    sources: [],
    tags: ["core-concept", "regulatory"],
  },
  {
    id: "suptech",
    name: "SupTech",
    summary:
      "Supervisory Technology — technology used by regulators/supervisors themselves to collect, validate, analyze and act on data from the entities they oversee.",
    certainty: "FACT",
    sources: [],
    tags: ["core-concept", "regulatory"],
  },
  {
    id: "taxtech",
    name: "TaxTech",
    summary:
      "Technology applied to tax compliance — filing, calculation, reconciliation, e-invoicing and litigation management of direct and indirect taxes.",
    certainty: "FACT",
    sources: [],
    tags: ["core-concept", "tax"],
  },
  {
    id: "xbrl",
    name: "XBRL",
    summary:
      "eXtensible Business Reporting Language — an open, XML-based standard for machine-readable business and financial reporting.",
    certainty: "FACT",
    sources: [],
    tags: ["standard", "reporting"],
  },
  {
    id: "ixbrl",
    name: "iXBRL",
    summary:
      "Inline XBRL — XBRL data embedded inside a human-readable HTML report so a single document is both machine-readable and human-readable.",
    certainty: "FACT",
    sources: [],
    tags: ["standard", "reporting"],
  },
  {
    id: "gst",
    name: "GST",
    summary:
      "Goods and Services Tax — a unified indirect tax on goods and services (notably implemented in India in 2017), replacing multiple prior indirect taxes.",
    certainty: "FACT",
    sources: [],
    tags: ["tax", "india"],
  },
  {
    id: "e-invoicing",
    name: "E-Invoicing",
    summary:
      "Electronic invoicing where structured invoice data is reported to a tax authority (often via an Invoice Registration Portal) to receive a valid reference before use.",
    certainty: "FACT",
    sources: [],
    tags: ["tax", "gst"],
  },
  {
    id: "disclosure-management",
    name: "Disclosure Management",
    summary:
      "The process of preparing, managing, and publishing regulated financial and non-financial disclosures in the required formats.",
    certainty: "FACT",
    sources: [],
    tags: ["reporting"],
  },
  {
    id: "esg",
    name: "ESG",
    summary:
      "Environmental, Social and Governance — non-financial factors increasingly subject to standardized disclosure and reporting requirements.",
    certainty: "FACT",
    sources: [],
    tags: ["reporting", "sustainability"],
  },
  {
    id: "regulatory-reporting",
    name: "Regulatory Reporting",
    summary:
      "The submission of structured information by regulated entities to a regulator in prescribed formats and timelines.",
    certainty: "FACT",
    sources: [],
    tags: ["reporting", "regulatory"],
  },
  {
    id: "irp",
    name: "IRP (Invoice Registration Portal)",
    summary:
      "A government portal where GST e-invoices are registered and assigned an Invoice Reference Number (IRN) before the invoice is valid.",
    certainty: "FACT",
    sources: [],
    tags: ["gst", "india"],
  },
  {
    id: "data-collection-system",
    name: "Data Collection System (SupTech)",
    summary:
      "A platform used by a regulator to collect, validate, and analyze structured data filings from supervised entities.",
    certainty: "FACT",
    sources: [],
    tags: ["suptech", "regulatory"],
  },
  {
    id: "api",
    name: "API",
    summary:
      "Application Programming Interface — a defined interface allowing software systems to exchange data and functionality programmatically.",
    certainty: "FACT",
    sources: [],
    tags: ["technology"],
  },
  {
    id: "erp",
    name: "ERP",
    summary:
      "Enterprise Resource Planning — integrated software for managing core business processes (finance, supply chain, HR, etc.).",
    certainty: "FACT",
    sources: [],
    tags: ["technology"],
  },
  {
    id: "saas",
    name: "SaaS",
    summary:
      "Software as a Service — software licensed on a subscription basis and hosted centrally, delivered over the internet.",
    certainty: "FACT",
    sources: [],
    tags: ["business-model"],
  },
  {
    id: "central-bank",
    name: "Central Bank",
    summary:
      "A national institution that oversees monetary policy and, in many jurisdictions, financial stability and banking supervision.",
    certainty: "FACT",
    sources: [],
    tags: ["regulator-type"],
  },
  {
    id: "fintech",
    name: "FinTech",
    summary:
      "Financial Technology — technology applied to the delivery and improvement of financial services (payments, lending, investing, etc.).",
    certainty: "FACT",
    sources: ["fca-regtech"],
    tags: ["core-concept", "financial"],
  },
  {
    id: "datatech",
    name: "DataTech",
    summary:
      "Data-focused technology (analytics, models, data tooling). IRIS uses it as one of its four operating segments; it is not a widely standardised global industry term.",
    certainty: "INFERENCE",
    sources: ["stockanalysis-company-profile"],
    tags: ["data", "iris-segment"],
  },
  {
    id: "sdmx",
    name: "SDMX",
    summary:
      "Statistical Data and Metadata eXchange — an ISO 17369 standard for exchanging statistical (aggregate) data and metadata between official organisations.",
    certainty: "FACT",
    sources: ["sdmx-home"],
    tags: ["standard", "statistical"],
  },
  {
    id: "digital-reporting",
    name: "Digital Reporting",
    summary:
      "Producing and filing reports as structured, machine-readable data (XBRL/iXBRL, APIs) rather than paper or PDF.",
    certainty: "FACT",
    sources: ["xbrl-what-is", "fca-regtech"],
    tags: ["reporting", "xbrl"],
  },
  {
    id: "data-validation",
    name: "Data Validation",
    summary:
      "Checking that submitted data is complete, correct and in the required format, using rules embedded in a taxonomy or schema.",
    certainty: "FACT",
    sources: ["xbrl-what-is", "esma-esef"],
    tags: ["data", "quality"],
  },
  {
    id: "data-lineage",
    name: "Data Lineage",
    summary:
      "The recorded history of a data point's origin, movement and transformations; a core expectation of BCBS 239 for risk data aggregation.",
    certainty: "FACT",
    sources: ["bcbs239"],
    tags: ["data", "governance"],
  },
  {
    id: "data-transformation",
    name: "Data Transformation",
    summary:
      "Mapping, cleansing and restructuring a firm's internal data into the exact structure and labels a regulator requires.",
    certainty: "FACT",
    sources: ["esma-esef"],
    tags: ["data", "reporting"],
  },
  {
    id: "supervisory-reporting",
    name: "Supervisory Reporting",
    summary:
      "The confidential, often high-frequency reports firms send specifically so a supervisor can assess their health and behaviour.",
    certainty: "FACT",
    sources: ["bis-suptech-generations"],
    tags: ["reporting", "suptech"],
  },
  {
    id: "regulatory-data",
    name: "Regulatory Data",
    summary:
      "The structured, taxonomy-governed information regulators collect from firms and markets and use for supervision and policy.",
    certainty: "FACT",
    sources: ["xbrl-what-is", "sdmx-home"],
    tags: ["data", "reporting"],
  },
  {
    id: "regulatory-taxonomy",
    name: "Regulatory Taxonomy",
    summary:
      "A regulator's structured 'dictionary' of reporting elements, relationships and validation rules — the machine-readable specification of a reporting requirement.",
    certainty: "FACT",
    sources: ["xbrl-what-is", "esma-esef"],
    tags: ["taxonomy", "xbrl", "standard"],
  },
  {
    id: "regulatory-intelligence",
    name: "Regulatory Intelligence",
    summary:
      "Monitoring, interpreting and operationalising regulatory change across jurisdictions — horizon scanning and obligations mapping.",
    certainty: "FACT",
    sources: ["fca-regtech"],
    tags: ["compliance", "change"],
  },
  {
    id: "compliance-automation",
    name: "Compliance Automation",
    summary:
      "Using software to perform compliance tasks (monitoring, screening, reporting, evidence) automatically instead of manually.",
    certainty: "FACT",
    sources: ["fca-regtech"],
    tags: ["compliance", "regtech"],
  },
  {
    id: "regulatory-change-management",
    name: "Regulatory Change Management",
    summary:
      "The governed process of adapting an organisation to new or changed regulations, from impact assessment to evidenced completion.",
    certainty: "FACT",
    sources: ["esma-esef", "fca-regtech"],
    tags: ["compliance", "change"],
  },
];
