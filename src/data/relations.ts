import type { Relation } from "./types";

/**
 * The knowledge graph: directed edges connecting entities. Every relation
 * carries source attribution so the graph stays auditable. Seeded with the
 * relations that follow directly from the company description; expanded as
 * research deepens in later phases.
 */
export const relations: Relation[] = [
  // IRIS makes each of its products
  ...["iris-ideal", "iris-carbon", "iris-gst", "iris-irp", "iris-ifile", "iris-einvoicing", "iris-zircon", "iris-lms", "iris-iconnect", "iris-credixo", "iris-peridot", "iris-msme"].map(
    (pid, i): Relation => ({
      id: `iris-makes-${pid}`,
      from: { type: "company", id: "iris" },
      to: { type: "product", id: pid },
      kind: "makes",
      sources: ["stockanalysis-company-profile"],
      certainty: "COMPANY_CLAIM",
      note: i === 0 ? "IRIS is the developer and provider of its product portfolio." : undefined,
    })
  ),

  // Product -> technology links (clear, direct mappings)
  { id: "r-carbon-xbrl", from: { type: "product", id: "iris-carbon" }, to: { type: "technology", id: "xbrl-standard" }, kind: "builtWith", sources: ["stockanalysis-company-profile"], certainty: "COMPANY_CLAIM", note: "CARBON produces XBRL/iXBRL reports." },
  { id: "r-carbon-ixbrl", from: { type: "product", id: "iris-carbon" }, to: { type: "technology", id: "ixbrl-standard" }, kind: "builtWith", sources: ["stockanalysis-company-profile"], certainty: "COMPANY_CLAIM", note: "CARBON produces iXBRL reports." },
  { id: "r-iconnect-xbrl", from: { type: "product", id: "iris-iconnect" }, to: { type: "technology", id: "xbrl-standard" }, kind: "builtWith", sources: ["stockanalysis-company-profile"], certainty: "COMPANY_CLAIM", note: "iConnect analyses XBRL/iXBRL data." },
  { id: "r-ifile-xbrl", from: { type: "product", id: "iris-ifile" }, to: { type: "technology", id: "xbrl-standard" }, kind: "builtWith", sources: ["iris-ifile-page"], certainty: "COMPANY_CLAIM", note: "iFILE collects/validates data in XBRL and other structured formats." },
  { id: "r-ideal-xbrl", from: { type: "product", id: "iris-ideal" }, to: { type: "technology", id: "xbrl-standard" }, kind: "builtWith", sources: ["iris-ideal-page"], certainty: "COMPANY_CLAIM", note: "iDEAL supports XBRL and other data standards." },
  { id: "r-zircon-api", from: { type: "product", id: "iris-zircon" }, to: { type: "technology", id: "rest-api" }, kind: "builtWith", sources: ["stockanalysis-company-profile"], certainty: "COMPANY_CLAIM", note: "Zircon is delivered as APIs." },

  // --- Stage 4: product ↔ regulation links -------------------------------
  { id: "r-carbon-esef", from: { type: "product", id: "iris-carbon" }, to: { type: "regulation", id: "esef" }, kind: "compliesWith", sources: ["esma-esef"], certainty: "INFERENCE", note: "CARBON's XBRL/iXBRL disclosure supports ESEF-style filing." },
  { id: "r-carbon-csrd", from: { type: "product", id: "iris-carbon" }, to: { type: "regulation", id: "csrd-esrs" }, kind: "compliesWith", sources: ["esma-esef"], certainty: "INFERENCE", note: "CARBON covers non-financial/ESG reporting (CSRD/ESRS direction)." },
  { id: "r-carbon-sec", from: { type: "product", id: "iris-carbon" }, to: { type: "regulation", id: "us-sec-xbrl" }, kind: "compliesWith", sources: ["xbrl-ixbrl"], certainty: "INFERENCE", note: "CARBON produces iXBRL for US-style filing." },
  { id: "r-ideal-rbi", from: { type: "product", id: "iris-ideal" }, to: { type: "regulation", id: "rbi-returns" }, kind: "compliesWith", sources: ["iris-rbi-cims"], certainty: "FACT", note: "iDEAL is used for RBI regulatory reporting (CIMS)." },
  { id: "r-ifile-esef", from: { type: "product", id: "iris-ifile" }, to: { type: "regulation", id: "esef" }, kind: "supports", sources: ["esma-esef"], certainty: "INFERENCE", note: "Regulator-side collection supports digital-reporting mandates." },
  { id: "r-gst-gstlaw", from: { type: "product", id: "iris-gst" }, to: { type: "regulation", id: "india-gst" }, kind: "compliesWith", sources: ["stockanalysis-company-profile"], certainty: "FACT", note: "GST software automates GST return filing." },
  { id: "r-einv-einvmandate", from: { type: "product", id: "iris-einvoicing" }, to: { type: "regulation", id: "india-einvoicing" }, kind: "compliesWith", sources: ["stockanalysis-company-profile"], certainty: "FACT", note: "E-invoicing automates the e-invoice mandate." },
  { id: "r-irp-einvmandate", from: { type: "product", id: "iris-irp" }, to: { type: "regulation", id: "india-einvoicing" }, kind: "compliesWith", sources: ["stockanalysis-company-profile"], certainty: "FACT", note: "IRP connector registers e-invoices." },
  { id: "r-zircon-gstlaw", from: { type: "product", id: "iris-zircon" }, to: { type: "regulation", id: "india-gst" }, kind: "compliesWith", sources: ["stockanalysis-company-profile"], certainty: "FACT", note: "Zircon APIs cover GST and e-way bill." },

  // --- Stage 4: product ↔ customer links ---------------------------------
  { id: "r-gap-uses-carbon", from: { type: "company", id: "gap-inc" }, to: { type: "product", id: "iris-carbon" }, kind: "uses", sources: ["newswire-gap-carbon"], certainty: "FACT", note: "Gap Inc. used CARBON for its digital sustainability report." },
  { id: "r-mufg-uses-ideal", from: { type: "company", id: "mufg-bank" }, to: { type: "product", id: "iris-ideal" }, kind: "uses", sources: ["iris-ideal-page"], certainty: "FACT", note: "MUFG Bank uses iDEAL for RBI submissions." },

  // --- Stage 4: IRIS competes with disclosure/XBRL vendors ----------------
  { id: "r-iris-competes-workiva", from: { type: "company", id: "iris" }, to: { type: "company", id: "workiva" }, kind: "competesWith", sources: ["stockanalysis-company-profile"], certainty: "ANALYST_VIEW", note: "Both sell disclosure management / XBRL reporting software." },
  { id: "r-iris-competes-corefiling", from: { type: "company", id: "iris" }, to: { type: "company", id: "corefiling" }, kind: "competesWith", sources: ["stockanalysis-company-profile"], certainty: "ANALYST_VIEW", note: "Both are XBRL/iXBRL reporting and regulator-tooling specialists." },

  // --- Stage 4: product ecosystem (product ↔ product) --------------------
  { id: "r-eco-ifile-iconnect", from: { type: "product", id: "iris-ifile" }, to: { type: "product", id: "iris-iconnect" }, kind: "relatedTo", sources: ["stockanalysis-company-profile"], certainty: "INFERENCE", note: "Regulator-collected XBRL data is the raw material iConnect analyses." },
  { id: "r-eco-carbon-iconnect", from: { type: "product", id: "iris-carbon" }, to: { type: "product", id: "iris-iconnect" }, kind: "relatedTo", sources: ["stockanalysis-company-profile"], certainty: "INFERENCE", note: "CARBON creates the XBRL/iXBRL data iConnect consumes." },
  { id: "r-eco-ideal-ifile", from: { type: "product", id: "iris-ideal" }, to: { type: "product", id: "iris-ifile" }, kind: "relatedTo", sources: ["iris-rbi-cims"], certainty: "INFERENCE", note: "iDEAL (filer) produces returns iFILE (regulator) collects." },
  { id: "r-eco-carbon-ideal", from: { type: "product", id: "iris-carbon" }, to: { type: "product", id: "iris-ideal" }, kind: "relatedTo", sources: ["stockanalysis-company-profile"], certainty: "INFERENCE", note: "Both RegTech reporting products: disclosure vs. supervisory." },
  { id: "r-eco-credixo-msme", from: { type: "product", id: "iris-credixo" }, to: { type: "product", id: "iris-msme" }, kind: "relatedTo", sources: ["screener-iris"], certainty: "INFERENCE", note: "Both are DataTech bets on credit analytics / financial inclusion." },

  // IRIS operates in its home market
  { id: "r-iris-india", from: { type: "company", id: "iris" }, to: { type: "market", id: "india" }, kind: "operatesIn", sources: ["stockanalysis-company-profile"], certainty: "FACT" },

  // --- Domain layer: IRIS as a RegTech/SupTech vendor ---------------------
  { id: "r-iris-regtech", from: { type: "company", id: "iris" }, to: { type: "concept", id: "regtech" }, kind: "relatedTo", note: "IRIS is a RegTech vendor on the firm side.", sources: ["stockanalysis-company-profile"], certainty: "COMPANY_CLAIM" },
  { id: "r-iris-suptech", from: { type: "company", id: "iris" }, to: { type: "concept", id: "suptech" }, kind: "relatedTo", note: "SupTech is a named IRIS segment.", sources: ["stockanalysis-company-profile"], certainty: "COMPANY_CLAIM" },
  { id: "r-iris-datatech", from: { type: "company", id: "iris" }, to: { type: "concept", id: "datatech" }, kind: "relatedTo", note: "DataTech is a named IRIS segment.", sources: ["stockanalysis-company-profile"], certainty: "COMPANY_CLAIM" },

  // --- Products support concepts ----------------------------------------
  ...(
    [
      ["iris-carbon", "xbrl", "CARBON produces XBRL/iXBRL reports."],
      ["iris-carbon", "ixbrl", "CARBON produces iXBRL reports."],
      ["iris-carbon", "digital-reporting", "CARBON creates structured digital reports."],
      ["iris-carbon", "disclosure-management", "CARBON is a disclosure-management platform."],
      ["iris-carbon", "esg-reporting", "CARBON covers non-financial/ESG reporting."],
      ["iris-iconnect", "xbrl", "iConnect analyses XBRL/iXBRL data."],
      ["iris-iconnect", "datatech", "iConnect is an IRIS DataTech product."],
      ["iris-credixo", "datatech", "Credixo is an IRIS DataTech credit-analytics product."],
      ["iris-ideal", "regulatory-reporting", "iDEAL is a regulatory reporting solution for banks and investment firms."],
      ["iris-ideal", "supervisory-reporting", "iDEAL serves supervisory reporting to regulators."],
      ["iris-ifile", "regulatory-data-collection", "iFILE is a regulator-side data collection platform."],
      ["iris-ifile", "data-validation", "iFILE validates collected data."],
      ["iris-ifile", "suptech", "iFILE is an IRIS SupTech product."],
      ["iris-gst", "compliance-automation", "GST software automates tax compliance and filing."],
      ["iris-einvoicing", "compliance-automation", "E-Invoicing automates GST compliance and reconciliation."],
    ] as [string, string, string][]
  ).map(
    ([pid, cid, note]): Relation => ({
      id: `r-${pid}-${cid}`,
      from: { type: "product", id: pid },
      to: { type: "concept", id: cid },
      kind: "supports",
      note,
      sources: ["stockanalysis-company-profile"],
      certainty: "COMPANY_CLAIM",
    })
  ),

  // --- Concepts ↔ technologies ------------------------------------------
  { id: "r-c-xbrl-tech", from: { type: "concept", id: "xbrl" }, to: { type: "technology", id: "xbrl-standard" }, kind: "relatedTo", sources: ["xbrl-what-is"], certainty: "FACT" },
  { id: "r-c-ixbrl-tech", from: { type: "concept", id: "ixbrl" }, to: { type: "technology", id: "ixbrl-standard" }, kind: "relatedTo", sources: ["xbrl-ixbrl"], certainty: "FACT" },
  { id: "r-c-digital-tech", from: { type: "concept", id: "digital-reporting" }, to: { type: "technology", id: "xbrl-standard" }, kind: "relatedTo", sources: ["xbrl-what-is"], certainty: "FACT" },

  // --- Concepts ↔ glossary -----------------------------------------------
  ...(
    [
      ["regtech", "regtech"],
      ["suptech", "suptech"],
      ["datatech", "datatech"],
      ["fintech-vs-regtech", "fintech"],
      ["regulatory-reporting", "regulatory-reporting"],
      ["supervisory-reporting", "supervisory-reporting"],
      ["regulatory-data", "regulatory-data"],
      ["regulatory-taxonomies", "regulatory-taxonomy"],
      ["xbrl", "xbrl"],
      ["ixbrl", "ixbrl"],
      ["sdmx", "sdmx"],
      ["digital-reporting", "digital-reporting"],
      ["data-validation", "data-validation"],
      ["data-lineage", "data-lineage"],
      ["data-transformation", "data-transformation"],
      ["regulatory-data-collection", "data-collection-system"],
      ["disclosure-management", "disclosure-management"],
      ["esg-reporting", "esg"],
      ["regulatory-intelligence", "regulatory-intelligence"],
      ["compliance-automation", "compliance-automation"],
      ["regulatory-change-management", "regulatory-change-management"],
    ] as [string, string][]
  ).map(
    ([cid, gid]): Relation => ({
      id: `r-c-${cid}-gloss`,
      from: { type: "concept", id: cid },
      to: { type: "glossary", id: gid },
      kind: "relatedTo",
      sources: [],
      certainty: "FACT",
    })
  ),

  // --- IRIS → regulators served ------------------------------------------
  ...(
    ["rbi", "sebi", "mca", "nse-india", "bse-india", "qatar-gta", "sarb"] as string[]
  ).map(
    (rid): Relation => ({
      id: `r-iris-serves-${rid}`,
      from: { type: "company", id: "iris" },
      to: { type: "regulator", id: rid },
      kind: "serves",
      sources: ["iris-filexbrl-abs", "scanx-qatar-tax", "scanx-sarb"],
      certainty: "FACT",
    })
  ),

  // --- IRIS owns subsidiaries --------------------------------------------
  { id: "r-iris-owns-llc", from: { type: "company", id: "iris" }, to: { type: "company", id: "iris-llc" }, kind: "owns", note: "Fully-owned US subsidiary.", sources: ["xbrl-us-iris"], certainty: "FACT" },
  { id: "r-iris-owns-mz", from: { type: "company", id: "iris" }, to: { type: "company", id: "mz-consult" }, kind: "owns", note: "Brazil-based disclosure/ESG arm.", sources: ["scanx-mz-brazil"], certainty: "FACT" },

  // --- IRIS ↔ Sovos (competitor + divestiture) ---------------------------
  { id: "r-iris-competes-sovos", from: { type: "company", id: "iris" }, to: { type: "company", id: "sovos" }, kind: "competesWith", note: "Both sell tax-compliance/e-invoicing software.", sources: ["sovos-acquisition"], certainty: "ANALYST_VIEW" },
  { id: "r-iris-divests-sovos", from: { type: "company", id: "iris" }, to: { type: "company", id: "sovos" }, kind: "divestedTo", note: "Sold its APAC Tax Technology (GST) ASP business — IRIS Logix Solutions Pvt Ltd — for ~₹151 Cr (2025).", sources: ["sovos-acquisition", "hdfc-sky-151cr"], certainty: "FACT" },

  // --- IRIS serves customers ---------------------------------------------
  { id: "r-iris-serves-gap", from: { type: "company", id: "iris" }, to: { type: "company", id: "gap-inc" }, kind: "serves", note: "Gap Inc. uses IRIS CARBON for digital sustainability reporting.", sources: ["newswire-gap-carbon"], certainty: "FACT" },

  // --- IRIS operates in markets ------------------------------------------
  ...(
    ["middle-east", "asia-pacific", "africa", "north-america", "europe"] as string[]
  ).map(
    (mid): Relation => ({
      id: `r-iris-market-${mid}`,
      from: { type: "company", id: "iris" },
      to: { type: "market", id: mid },
      kind: "operatesIn",
      sources: ["stockanalysis-company-profile"],
      certainty: "FACT",
    })
  ),

  // --- Stage 5: regulator enforces regulation -----------------------------
  ...(
    [
      ["esma", "esef"],
      ["esma", "csrd-esrs"],
      ["us-sec", "us-sec-xbrl"],
      ["us-sec", "sec-edgar"],
      ["mca", "mca21-xbrl"],
      ["sebi", "sebi-lodr-xbrl"],
      ["rbi", "rbi-returns"],
      ["cipc", "cipc-xbrl"],
      ["eba", "crr"],
      ["eiopa", "solvency-ii"],
      ["ifrs-foundation", "ifrs"],
      ["cbic", "india-gst"],
      ["cbic", "india-einvoicing"],
    ] as [string, string][]
  ).map(
    ([rid, regId]): Relation => ({
      id: `r-${rid}-enforces-${regId}`,
      from: { type: "regulator", id: rid },
      to: { type: "regulation", id: regId },
      kind: "enforces",
      sources: ["esma-esef", "cipc-xbrl", "eba-crr", "eiopa-solvency", "ifrs-foundation"],
      certainty: "FACT",
    })
  ),

  // --- Stage 5: product ↔ regulation (remaining frameworks) ---------------
  { id: "r-carbon-ifrs", from: { type: "product", id: "iris-carbon" }, to: { type: "regulation", id: "ifrs" }, kind: "compliesWith", sources: ["ifrs-foundation"], certainty: "INFERENCE", note: "CARBON tags financials to the IFRS Taxonomy." },
  { id: "r-carbon-cipc", from: { type: "product", id: "iris-carbon" }, to: { type: "regulation", id: "cipc-xbrl" }, kind: "compliesWith", sources: ["cipc-xbrl"], certainty: "INFERENCE", note: "CARBON-style iXBRL supports CIPC corporate filing." },
  { id: "r-ideal-crr", from: { type: "product", id: "iris-ideal" }, to: { type: "regulation", id: "crr" }, kind: "compliesWith", sources: ["eba-crr"], certainty: "INFERENCE", note: "iDEAL is a bank reporting tool; CRR support is inference." },
  { id: "r-ideal-solvency", from: { type: "product", id: "iris-ideal" }, to: { type: "regulation", id: "solvency-ii" }, kind: "compliesWith", sources: ["eiopa-solvency"], certainty: "INFERENCE", note: "iDEAL-style structured reporting for insurers; inference." },
  { id: "r-carbon-mca21", from: { type: "product", id: "iris-carbon" }, to: { type: "regulation", id: "mca21-xbrl" }, kind: "compliesWith", sources: ["iris-filexbrl-abs"], certainty: "INFERENCE", note: "CARBON/filing tools serve the preparer side of MCA-21." },
  { id: "r-carbon-lodr", from: { type: "product", id: "iris-carbon" }, to: { type: "regulation", id: "sebi-lodr-xbrl" }, kind: "supports", sources: ["iris-filexbrl-abs"], certainty: "INFERENCE", note: "Disclosure products support SEBI LODR XBRL filings." },
  { id: "r-ifile-cipc", from: { type: "product", id: "iris-ifile" }, to: { type: "regulation", id: "cipc-xbrl" }, kind: "supports", sources: ["cipc-xbrl"], certainty: "INFERENCE", note: "Regulator-side collection supports XBRL mandates like CIPC." },

  // --- Stage 5: product ↔ technology (new concepts) ----------------------
  { id: "r-carbon-ifrstax", from: { type: "product", id: "iris-carbon" }, to: { type: "technology", id: "ifrs-taxonomy" }, kind: "builtWith", sources: ["ifrs-foundation"], certainty: "COMPANY_CLAIM", note: "CARBON tags to the IFRS/ESEF taxonomy." },
  { id: "r-carbon-validation", from: { type: "product", id: "iris-carbon" }, to: { type: "technology", id: "validation" }, kind: "builtWith", sources: ["esma-esef"], certainty: "INFERENCE", note: "CARBON validates tagged reports before filing." },
  { id: "r-ideal-validation", from: { type: "product", id: "iris-ideal" }, to: { type: "technology", id: "validation" }, kind: "builtWith", sources: ["iris-ideal-page"], certainty: "INFERENCE", note: "iDEAL validates returns before submission." },
  { id: "r-ifile-validation", from: { type: "product", id: "iris-ifile" }, to: { type: "technology", id: "validation" }, kind: "builtWith", sources: ["iris-ifile-page"], certainty: "COMPANY_CLAIM", note: "iFILE validates collected data." },
  { id: "r-carbon-etl", from: { type: "product", id: "iris-carbon" }, to: { type: "technology", id: "etl-transformation" }, kind: "builtWith", sources: ["esma-esef"], certainty: "INFERENCE", note: "CARBON maps entity data onto taxonomies." },
  { id: "r-ideal-etl", from: { type: "product", id: "iris-ideal" }, to: { type: "technology", id: "etl-transformation" }, kind: "builtWith", sources: ["iris-ideal-page"], certainty: "INFERENCE", note: "iDEAL maps banking data onto regulatory taxonomies." },
  { id: "r-carbon-cloud", from: { type: "product", id: "iris-carbon" }, to: { type: "technology", id: "cloud-saas" }, kind: "builtWith", sources: ["carbon-launch-office365"], certainty: "COMPANY_CLAIM", note: "CARBON is Office 365 / SaaS." },
  { id: "r-carbon-taxonomy", from: { type: "product", id: "iris-carbon" }, to: { type: "technology", id: "xbrl-taxonomy" }, kind: "builtWith", sources: ["esma-esef"], certainty: "INFERENCE", note: "CARBON consumes regulatory taxonomies." },
  { id: "r-ideal-taxonomy", from: { type: "product", id: "iris-ideal" }, to: { type: "technology", id: "xbrl-taxonomy" }, kind: "builtWith", sources: ["iris-ideal-page"], certainty: "INFERENCE", note: "iDEAL maps data to regulatory taxonomies." },
  { id: "r-ifile-taxonomy", from: { type: "product", id: "iris-ifile" }, to: { type: "technology", id: "xbrl-taxonomy" }, kind: "builtWith", sources: ["iris-ifile-page"], certainty: "INFERENCE", note: "iFILE enforces regulator taxonomies on collection." },
  { id: "r-iconnect-analytics", from: { type: "product", id: "iris-iconnect" }, to: { type: "technology", id: "analytics" }, kind: "builtWith", sources: ["iconnect-launch"], certainty: "COMPANY_CLAIM", note: "iConnect is an XBRL analytics tool." },
  { id: "r-credixo-analytics", from: { type: "product", id: "iris-credixo" }, to: { type: "technology", id: "analytics" }, kind: "builtWith", sources: ["screener-iris"], certainty: "INFERENCE", note: "Credixo models credit risk." },
  { id: "r-gst-automation", from: { type: "product", id: "iris-gst" }, to: { type: "technology", id: "automation" }, kind: "builtWith", sources: ["stockanalysis-company-profile"], certainty: "COMPANY_CLAIM", note: "GST software automates tax filing (divested)." },
  { id: "r-einv-automation", from: { type: "product", id: "iris-einvoicing" }, to: { type: "technology", id: "automation" }, kind: "builtWith", sources: ["stockanalysis-company-profile"], certainty: "COMPANY_CLAIM", note: "E-invoicing automates invoice registration (divested)." },
  { id: "r-carbon-workflow", from: { type: "product", id: "iris-carbon" }, to: { type: "technology", id: "workflow" }, kind: "builtWith", sources: ["esma-esef"], certainty: "INFERENCE", note: "Disclosure management implies review workflow." },
  { id: "r-ideal-workflow", from: { type: "product", id: "iris-ideal" }, to: { type: "technology", id: "workflow" }, kind: "builtWith", sources: ["iris-ideal-page"], certainty: "INFERENCE", note: "Reporting preparation implies approval workflow." },

  // --- Stage 5: technology ↔ technology -----------------------------------
  { id: "r-t-xbrl-ixbrl", from: { type: "technology", id: "xbrl-standard" }, to: { type: "technology", id: "ixbrl-standard" }, kind: "relatedTo", sources: ["xbrl-ixbrl"], certainty: "FACT", note: "iXBRL embeds XBRL in HTML." },
  { id: "r-t-xbrl-taxonomy", from: { type: "technology", id: "xbrl-standard" }, to: { type: "technology", id: "xbrl-taxonomy" }, kind: "relatedTo", sources: ["xbrl-what-is"], certainty: "FACT", note: "Taxonomies define XBRL's vocabulary." },
  { id: "r-t-taxonomy-ifrs", from: { type: "technology", id: "xbrl-taxonomy" }, to: { type: "technology", id: "ifrs-taxonomy" }, kind: "relatedTo", sources: ["ifrs-foundation"], certainty: "FACT", note: "The IFRS Taxonomy is a specific XBRL taxonomy." },
  { id: "r-t-xbrl-sdmx", from: { type: "technology", id: "xbrl-standard" }, to: { type: "technology", id: "sdmx-standard" }, kind: "relatedTo", sources: ["sdmx-home"], certainty: "FACT", note: "Complementary standards: entity vs. statistical data." },

  // --- Stage 5: concept ↔ technology --------------------------------------
  { id: "r-c-sdmx-tech", from: { type: "concept", id: "sdmx" }, to: { type: "technology", id: "sdmx-standard" }, kind: "relatedTo", sources: ["sdmx-home"], certainty: "FACT" },
  { id: "r-c-lineage-tech", from: { type: "concept", id: "data-lineage" }, to: { type: "technology", id: "data-lineage" }, kind: "relatedTo", sources: ["bcbs239"], certainty: "FACT" },
  { id: "r-c-transform-tech", from: { type: "concept", id: "data-transformation" }, to: { type: "technology", id: "etl-transformation" }, kind: "relatedTo", sources: ["esma-esef"], certainty: "FACT" },
  { id: "r-c-validation-tech", from: { type: "concept", id: "data-validation" }, to: { type: "technology", id: "validation" }, kind: "relatedTo", sources: ["xbrl-what-is"], certainty: "FACT" },
];
