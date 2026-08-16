import type { Product } from "./types";

/**
 * IRIS product catalog. Stage 4 researched the full portfolio and classified
 * each product by lifecycle. The current (post-2025) portfolio is SupTech
 * (iFILE), RegTech (iDEAL, CARBON) and DataTech (iConnect, Credixo, MSME).
 * The GST / TaxTech products were divested to Sovos in Aug 2025.
 */
export const products: Product[] = [
  // --- SupTech -----------------------------------------------------------
  {
    id: "iris-ifile",
    name: "IRIS iFILE",
    summary:
      "End-to-end electronic filing platform for regulators to collect, validate and analyse any type of data from the entities they oversee.",
    certainty: "COMPANY_CLAIM",
    sources: ["stockanalysis-company-profile", "iris-ifile-page"],
    companyId: "iris",
    category: ["data collection", "SupTech", "filing"],
    lifecycle: "CURRENT",
    lifecycleNote: "Flagship SupTech product, still sold to regulators (30+ worldwide).",
  },
  // --- RegTech -----------------------------------------------------------
  {
    id: "iris-ideal",
    name: "IRIS iDEAL",
    summary:
      "Automated regulatory reporting solution for banks, credit institutions and investment firms; supports XBRL and other data standards.",
    certainty: "COMPANY_CLAIM",
    sources: ["stockanalysis-company-profile", "iris-ideal-page"],
    companyId: "iris",
    category: ["regulatory reporting", "SupTech"],
    lifecycle: "CURRENT",
    lifecycleNote: "RegTech flagship; used for RBI reporting (e.g. MUFG Bank).",
  },
  {
    id: "iris-carbon",
    name: "IRIS CARBON",
    summary:
      "Office 365-based disclosure management and reporting platform to create financial and non-financial (ESG) reports in XBRL/iXBRL formats.",
    certainty: "COMPANY_CLAIM",
    sources: ["stockanalysis-company-profile", "carbon-launch-office365", "newswire-gap-carbon"],
    companyId: "iris",
    category: ["XBRL", "disclosure management", "ESG reporting"],
    lifecycle: "CURRENT",
    lifecycleNote: "RegTech disclosure platform; Gap Inc. and MZ Consult (Brazil) are customers.",
  },
  // --- DataTech ----------------------------------------------------------
  {
    id: "iris-iconnect",
    name: "IRIS iConnect",
    summary:
      "XBRL analytics tool to evaluate and compare XBRL/iXBRL data using the familiar Microsoft Excel format.",
    certainty: "COMPANY_CLAIM",
    sources: ["stockanalysis-company-profile", "iconnect-launch"],
    companyId: "iris",
    category: ["XBRL", "analytics", "DataTech"],
    lifecycle: "CURRENT",
    lifecycleNote: "DataTech analytics product for structured-reporting data.",
  },
  {
    id: "iris-credixo",
    name: "IRIS Credixo",
    summary: "Credit analysis model tool for banks and fintechs.",
    certainty: "COMPANY_CLAIM",
    sources: ["stockanalysis-company-profile"],
    companyId: "iris",
    category: ["credit analytics", "DataTech"],
    lifecycle: "CURRENT",
    lifecycleNote: "DataTech credit-analytics product; capabilities thinly documented.",
  },
  {
    id: "iris-msme",
    name: "IRIS MSME",
    summary:
      "Platform that combines digital tools with financial access for micro, small and medium enterprises (MSMEs), including credit readiness.",
    certainty: "INFERENCE",
    sources: ["projects-today-goa-msme", "screener-iris"],
    companyId: "iris",
    category: ["MSME", "credit", "financial inclusion", "DataTech"],
    lifecycle: "CURRENT",
    lifecycleNote: "Referenced in the Goa MoU (Feb 2025) and Screener company notes; product detail is limited.",
  },
  // --- TaxTech (divested to Sovos, Aug 2025) -----------------------------
  {
    id: "iris-gst",
    name: "IRIS GST Software",
    summary:
      "GST filing solution with an ERP connector, reconciliation module, vendor management, and MIS/reports.",
    certainty: "COMPANY_CLAIM",
    sources: ["stockanalysis-company-profile"],
    companyId: "iris",
    category: ["tax filing", "GST", "TaxTech"],
    lifecycle: "DIVESTED",
    lifecycleNote: "Part of the APAC Tax Technology (GST) ASP business sold to Sovos (Aug 2025).",
  },
  {
    id: "iris-irp",
    name: "IRIS IRP",
    summary: "Invoice Registration Portal connection solution for taxpayers.",
    certainty: "COMPANY_CLAIM",
    sources: ["stockanalysis-company-profile"],
    companyId: "iris",
    category: ["GST", "e-invoicing", "TaxTech"],
    lifecycle: "DIVESTED",
    lifecycleNote: "Part of the TaxTech business divested to Sovos (Aug 2025).",
  },
  {
    id: "iris-einvoicing",
    name: "IRIS E-Invoicing",
    summary: "E-invoicing solution with integrated GST compliance and reconciliation.",
    certainty: "COMPANY_CLAIM",
    sources: ["stockanalysis-company-profile"],
    companyId: "iris",
    category: ["e-invoicing", "GST", "TaxTech"],
    lifecycle: "DIVESTED",
    lifecycleNote: "Part of the TaxTech business divested to Sovos (Aug 2025).",
  },
  {
    id: "iris-zircon",
    name: "IRIS Zircon",
    summary: "APIs for GST, e-way bill and e-invoicing for enterprises and partners.",
    certainty: "COMPANY_CLAIM",
    sources: ["stockanalysis-company-profile"],
    companyId: "iris",
    category: ["API", "GST", "e-way bill", "e-invoicing", "TaxTech"],
    lifecycle: "DIVESTED",
    lifecycleNote: "Part of the TaxTech business divested to Sovos (Aug 2025).",
  },
  {
    id: "iris-lms",
    name: "IRIS LMS",
    summary:
      "Direct Tax (DT) and Indirect Tax (IDT) litigation management tool to simplify GST audits and litigations for enterprises.",
    certainty: "COMPANY_CLAIM",
    sources: ["stockanalysis-company-profile"],
    companyId: "iris",
    category: ["litigation management", "tax", "TaxTech"],
    lifecycle: "DIVESTED",
    lifecycleNote: "Notice & litigation management was named in the Sovos acquisition scope.",
  },
  {
    id: "iris-peridot",
    name: "IRIS Peridot",
    summary: "App for GST counterparty verification.",
    certainty: "COMPANY_CLAIM",
    sources: ["stockanalysis-company-profile"],
    companyId: "iris",
    category: ["GST", "counterparty verification", "TaxTech"],
    lifecycle: "DIVESTED",
    lifecycleNote: "GST counterparty verification app; part of the TaxTech business divested to Sovos.",
  },
];
