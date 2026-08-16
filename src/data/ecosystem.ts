/**
 * The RegTech ecosystem map: the end-to-end flow from regulation to supervision.
 * Rendered as a visual pipeline on the RegTech domain hub. Each stage links to
 * its concept explainer (and, where relevant, a related IRIS product/entity).
 */
export interface EcosystemStage {
  id: string;
  name: string;
  description: string;
  conceptId?: string;
  /** Related entity refs (e.g. IRIS products) shown on the stage. */
  related?: { type: "product" | "company" | "technology"; id: string; label: string }[];
}

export const ecosystemFlow: EcosystemStage[] = [
  {
    id: "regulators",
    name: "Regulators",
    description:
      "Central banks, capital-market regulators, business registries, exchanges and tax authorities that set and enforce rules.",
    conceptId: "suptech",
  },
  {
    id: "regulations",
    name: "Regulations",
    description:
      "Laws and rules (prudential, conduct, tax, disclosure, ESG) that create reporting and compliance obligations.",
    conceptId: "regulatory-compliance",
  },
  {
    id: "reporting-requirements",
    name: "Reporting requirements",
    description:
      "The specific mandates that flow from regulation: what data, in what format, by what deadline.",
    conceptId: "regulatory-reporting",
  },
  {
    id: "taxonomies",
    name: "Taxonomies & standards",
    description:
      "Machine-readable dictionaries (XBRL, iXBRL, SDMX) that define the vocabulary and validation rules of a mandate.",
    conceptId: "regulatory-taxonomies",
    related: [
      { type: "technology", id: "xbrl-standard", label: "XBRL" },
      { type: "technology", id: "ixbrl-standard", label: "iXBRL" },
    ],
  },
  {
    id: "companies",
    name: "Companies & financial institutions",
    description:
      "Banks, corporates, funds and other entities that must compile and submit their data.",
    conceptId: "regtech",
  },
  {
    id: "data",
    name: "Data",
    description:
      "The underlying business data in firms' systems that must be turned into reportable form.",
    conceptId: "regulatory-data",
  },
  {
    id: "transformation",
    name: "Transformation",
    description:
      "Mapping, cleansing and restructuring internal data into the regulator's taxonomy.",
    conceptId: "data-transformation",
  },
  {
    id: "validation",
    name: "Validation",
    description:
      "Running rules and checks so errors are caught before (and after) submission.",
    conceptId: "data-validation",
  },
  {
    id: "submission",
    name: "Submission",
    description:
      "Filing the structured report to the regulator's collection system within the deadline.",
    conceptId: "regulatory-data-collection",
    related: [{ type: "product", id: "iris-ifile", label: "IRIS iFILE" }],
  },
  {
    id: "analytics",
    name: "Regulatory analytics",
    description:
      "Turning collected data into insight — benchmarks, risk indicators, anomaly detection.",
    conceptId: "datatech",
    related: [{ type: "product", id: "iris-iconnect", label: "IRIS iConnect" }],
  },
  {
    id: "supervision",
    name: "Supervision",
    description:
      "Regulators use the data and analytics to monitor, examine and act — closing the loop back to regulation.",
    conceptId: "suptech",
  },
];
