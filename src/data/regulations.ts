import type { Regulation } from "./types";

/**
 * Regulatory frameworks library (Stage 5). Each entry is a reporting regime,
 * standard or filing system that creates demand for IRIS products. The
 * `details` map carries the eight-part framework profile used across the
 * site: what it is, who regulates it, who complies, the data involved, how
 * reporting works, why it exists, the relevant IRIS products and competitors.
 */

function fw(
  id: string,
  name: string,
  summary: string,
  jurisdiction: string[],
  regulatorIds: string[],
  status: Regulation["status"],
  firstIssued: number | undefined,
  sources: string[],
  details: Record<string, string>,
  certainty: Regulation["certainty"] = "FACT"
): Regulation {
  return { id, name, summary, jurisdiction, regulatorIds, status, firstIssued, sources, details, certainty };
}

function D(
  what: string,
  whoRegulates: string,
  whoComplies: string,
  data: string,
  how: string,
  why: string,
  irisProducts: string,
  competitors: string
): Record<string, string> {
  return {
    "What it is": what,
    "Who regulates it": whoRegulates,
    "Who must comply": whoComplies,
    "What data is involved": data,
    "How reporting works": how,
    "Why it exists": why,
    "IRIS products": irisProducts,
    Competitors: competitors,
  };
}

export const regulations: Regulation[] = [
  // --- European digital reporting ----------------------------------------
  fw(
    "esef",
    "ESEF (European Single Electronic Format)",
    "EU mandate requiring issuers on EU regulated markets to file annual financial reports as XHTML with Inline XBRL tagging of IFRS consolidated statements.",
    ["European Union"],
    ["esma"],
    "ACTIVE",
    2020,
    ["esma-esef"],
    D(
      "The European Single Electronic Format — a machine-readable reporting format for annual financial reports, combining XHTML with Inline XBRL.",
      "ESMA (European Securities and Markets Authority), which publishes the ESEF taxonomy and conformance suite.",
      "Issuers with securities listed on EU regulated markets (IFRS adopters).",
      "IFRS consolidated financial statements (statement of financial position, P&L, cash flows, equity) tagged to the ESEF taxonomy.",
      "Preparers tag each IFRS figure with the ESEF taxonomy (an extension of the IFRS Taxonomy) as Inline XBRL, validate against ESMA's conformance rules, and file via their Officially Appointed Mechanism (OAM).",
      "To harmonise digital annual reporting across the EU so statements are machine-readable and comparable at scale.",
      "[IRIS CARBON](/product/iris-carbon) — Office 365-based disclosure/XBRL authoring for ESEF-style filings.",
      "Workiva, CoreFiling, DFIN (Donnelley Financial), Toppan Merrill."
    )
  ),
  fw(
    "csrd-esrs",
    "CSRD / ESRS (Corporate Sustainability Reporting Directive)",
    "EU directive requiring companies to disclose sustainability information under the European Sustainability Reporting Standards, with plans for digital (iXBRL) tagging.",
    ["European Union"],
    ["esma"],
    "ACTIVE",
    2023,
    ["esma-esef"],
    D(
      "The Corporate Sustainability Reporting Directive, which mandates standardised sustainability disclosure under the ESRS (European Sustainability Reporting Standards).",
      "EU member states implement it; ESMA plans to extend ESEF to digitally tag the disclosures; EFRAG drafted the standards.",
      "Large EU companies and listed SMEs, phased in from 2024 onward; also non-EU groups with significant EU activity.",
      "Environmental, social and governance data — emissions (Scopes 1–3), workforce, governance and due-diligence metrics.",
      "Companies report against ESRS standards; ESMA is planning digital (iXBRL) tagging so the disclosures are machine-readable, with assurance requirements.",
      "To give investors comparable, trustworthy sustainability data and combat greenwashing.",
      "[IRIS CARBON](/product/iris-carbon) — covers non-financial/ESG reporting in XBRL/iXBRL.",
      "Workiva, specialised ESG-reporting platforms, and disclosure-management suites."
    )
  ),

  // --- US reporting -------------------------------------------------------
  fw(
    "us-sec-xbrl",
    "US SEC XBRL mandate",
    "US Securities and Exchange Commission requirement for public companies to file financial statements in machine-readable XBRL (Inline XBRL since 2019).",
    ["United States"],
    ["us-sec"],
    "ACTIVE",
    2009,
    ["xbrl-ixbrl"],
    D(
      "The SEC's requirement that operating companies and foreign private issuers tag their financial statements in machine-readable format.",
      "US Securities and Exchange Commission (SEC).",
      "US public operating companies and foreign private issuers filing with the SEC.",
      "Financial statements and notes, tagged to the US GAAP or IFRS taxonomy.",
      "Companies tag financials as Inline XBRL and file them through EDGAR; the SEC's viewer renders and validates the tags.",
      "To automate the analysis, comparison and review of millions of filings.",
      "[IRIS CARBON](/product/iris-carbon) — produces iXBRL; delivered via the US subsidiary IRIS Business Services LLC.",
      "Workiva, DFIN, Toppan Merrill, CoreFiling."
    )
  ),
  fw(
    "sec-edgar",
    "EDGAR (Electronic Data Gathering, Analysis, and Retrieval)",
    "The SEC's electronic filing and disclosure system through which all US public-company filings are submitted and retrieved.",
    ["United States"],
    ["us-sec"],
    "ACTIVE",
    1984,
    ["sec-edgar"],
    D(
      "The SEC's online filing system and public repository for corporate disclosures.",
      "US Securities and Exchange Commission (SEC).",
      "All SEC registrants — operating companies, funds and foreign private issuers.",
      "All mandated filings: 10-K/10-Q annual/quarterly reports, Inline XBRL financials, prospectuses, proxy statements and 8-Ks.",
      "Filers submit structured documents (including Inline XBRL) through the EDGAR system, which validates and publishes them.",
      "To provide free, immediate public access to company filings for investors and regulators.",
      "[IRIS CARBON](/product/iris-carbon) — produces EDGAR-ready Inline XBRL filings.",
      "Workiva, DFIN, Toppan Merrill."
    )
  ),

  // --- India reporting ----------------------------------------------------
  fw(
    "mca21-xbrl",
    "MCA-21 XBRL filing mandate",
    "Indian Ministry of Corporate Affairs requirement for companies to file financial statements in XBRL under the MCA-21 e-governance programme.",
    ["India"],
    ["mca"],
    "ACTIVE",
    undefined,
    ["iris-filexbrl-abs"],
    D(
      "The Ministry of Corporate Affairs' digital governance programme requiring XBRL-based corporate filings.",
      "Ministry of Corporate Affairs (MCA), India.",
      "Indian companies (coverage is size/turnover-based).",
      "Financial statements (balance sheet, P&L, cash flow) in XBRL.",
      "Companies file XBRL financial statements through the MCA-21 portal.",
      "To build a digital corporate registry and improve data quality and analysis.",
      "IRIS implemented XBRL solutions for the MCA; [IRIS CARBON](/product/iris-carbon) / filing tools serve the preparer side.",
      "DataTracks, Tally-based XBRL utilities, and other Indian XBRL vendors."
    )
  ),
  fw(
    "sebi-lodr-xbrl",
    "SEBI LODR XBRL disclosures",
    "Securities and Exchange Board of India Listing Obligations and Disclosure Requirements, requiring XBRL-based disclosures from listed entities.",
    ["India"],
    ["sebi"],
    "ACTIVE",
    undefined,
    ["iris-filexbrl-abs"],
    D(
      "SEBI's Listing Obligations and Disclosure Requirements (LODR) — the disclosure framework for listed Indian entities, with XBRL filings.",
      "Securities and Exchange Board of India (SEBI).",
      "Entities listed on BSE/NSE.",
      "Financial results, shareholding patterns and corporate-governance disclosures in XBRL.",
      "Listed entities file XBRL disclosures through the exchanges' systems (BSE/NSE).",
      "To ensure investor transparency and enable market surveillance.",
      "IRIS implemented XBRL solutions for BSE/NSE (exchange side) and serves filers via disclosure products.",
      "CoreFiling and other XBRL/regulatory-reporting vendors."
    )
  ),
  fw(
    "rbi-returns",
    "RBI regulatory returns",
    "The Reserve Bank of India's recurring supervisory and statistical returns that banks and financial institutions must file, now centralised via the CIMS programme.",
    ["India"],
    ["rbi"],
    "ACTIVE",
    undefined,
    ["iris-rbi-cims"],
    D(
      "The Reserve Bank of India's scheduled returns from banks and financial institutions, centralised under the Centralized Information Management System (CIMS).",
      "Reserve Bank of India (RBI).",
      "Indian banks and financial institutions.",
      "Capital adequacy, liquidity, asset-quality, and statistical data on banking activity.",
      "Banks submit structured returns via the RBI's CIMS, which IRIS helped implement.",
      "To supervise bank solvency and behaviour and to inform monetary and financial-stability policy.",
      "[IRIS iDEAL](/product/iris-ideal) (filer-side) and [IRIS iFILE](/product/iris-ifile) (CIMS collection side).",
      "AxiomSL/Adenza, Wolters Kluwer, Regnology."
    )
  ),

  // --- South Africa -------------------------------------------------------
  fw(
    "cipc-xbrl",
    "CIPC XBRL mandate",
    "South African business registry requirement for companies to file annual financial statements in XBRL/iXBRL.",
    ["South Africa"],
    ["cipc"],
    "ACTIVE",
    2018,
    ["cipc-xbrl"],
    D(
      "The Companies and Intellectual Property Commission's mandate for XBRL/iXBRL filing of annual financial statements.",
      "Companies and Intellectual Property Commission (CIPC), South Africa.",
      "South African companies (subject to exemptions).",
      "Annual financial statements tagged to the CIPC/IFRS taxonomy.",
      "Companies file iXBRL annual financial statements to CIPC.",
      "To standardise company data, improve registry quality and enable automated analysis.",
      "IRIS serves the South African Reserve Bank; CIPC corporate filing is adjacent (treat as inference).",
      "CoreFiling and local XBRL filing vendors."
    )
  ),

  // --- EU prudential (banks & insurance) ----------------------------------
  fw(
    "crr",
    "CRR (Capital Requirements Regulation)",
    "EU regulation setting banks' capital and liquidity requirements, with standardised COREP/FINREP supervisory reporting.",
    ["European Union"],
    ["eba"],
    "ACTIVE",
    2013,
    ["eba-crr"],
    D(
      "The Capital Requirements Regulation, which (with CRD) sets EU banks' capital, liquidity and leverage requirements and their supervisory reporting.",
      "European Banking Authority (EBA) — via national competent authorities that enforce it.",
      "EU banks and investment firms.",
      "Capital ratios, liquidity (LCR/NSFR), leverage, and FINREP financial data.",
      "Banks report via COREP (common reporting) and FINREP (financial reporting) frameworks in structured (XBRL) formats to their supervisor.",
      "To ensure bank solvency and financial stability, a central post-2008 regulatory pillar.",
      "[IRIS iDEAL](/product/iris-ideal) is a regulatory-reporting tool for banks; direct CRR support is inference.",
      "AxiomSL/Adenza, Wolters Kluwer, Regnology."
    )
  ),
  fw(
    "solvency-ii",
    "Solvency II",
    "EU insurance directive mandating risk-based capital and quarterly/annual supervisory reporting (QRTs) in XBRL.",
    ["European Union"],
    ["eiopa"],
    "ACTIVE",
    2016,
    ["eiopa-solvency"],
    D(
      "The EU directive governing insurance regulation: risk-based capital requirements plus standardised reporting.",
      "European Insurance and Occupational Pensions Authority (EIOPA), via national supervisors.",
      "EU insurance and reinsurance undertakings.",
      "Solvency capital (SCR/MCR), assets and liabilities, technical provisions and own funds.",
      "Insurers file quarterly and annual quantitative reporting templates (QRTs) in XBRL to their supervisor.",
      "To protect policyholders by ensuring insurers hold adequate capital and can be supervised consistently.",
      "[IRIS iDEAL](/product/iris-ideal) (structured regulatory reporting) — direct Solvency II support is inference.",
      "AxiomSL/Adenza, Regnology, Wolters Kluwer."
    )
  ),

  // --- Accounting standards ----------------------------------------------
  fw(
    "ifrs",
    "IFRS (International Financial Reporting Standards)",
    "Global accounting standards issued by the IASB, with the IFRS Taxonomy (XBRL) underpinning digital reporting regimes like ESEF.",
    ["Global"],
    ["ifrs-foundation"],
    "ACTIVE",
    2001,
    ["ifrs-foundation"],
    D(
      "A globally used set of accounting standards, plus the IFRS Taxonomy — the XBRL 'dictionary' used by digital-reporting regimes.",
      "IFRS Foundation / International Accounting Standards Board (IASB), which issues both standards and taxonomy.",
      "Entities in jurisdictions that adopt IFRS (over 140 countries).",
      "Complete financial statements prepared under IFRS.",
      "Preparers prepare statements under IFRS and, where mandated, tag figures using the IFRS Taxonomy (e.g. for ESEF).",
      "To make financial reporting comparable across countries and to provide a stable taxonomy for digital reporting.",
      "[IRIS CARBON](/product/iris-carbon) tags financials to IFRS/ESEF taxonomies; IRIS also provides taxonomy development/testing services.",
      "Workiva, CoreFiling, DFIN."
    )
  ),

  // --- India tax (divested TaxTech products) -----------------------------
  fw(
    "india-gst",
    "Indian GST (CGST Act 2017)",
    "India's unified indirect tax regime requiring periodic GST returns and reconciliation.",
    ["India"],
    ["cbic"],
    "ACTIVE",
    2017,
    ["stockanalysis-company-profile"],
    D(
      "India's Goods and Services Tax, a unified indirect tax on goods and services.",
      "Central Board of Indirect Taxes and Customs (CBIC), with the GSTN as the technology backbone.",
      "Businesses registered for GST.",
      "Sales/purchase invoice data, input tax credit and return data.",
      "Taxpayers file periodic GSTR returns and reconcile input tax credit with vendor data.",
      "To unify India's fragmented indirect taxes into a single, technology-enabled regime.",
      "[IRIS GST Software](/product/iris-gst) and [IRIS Zircon](/product/iris-zircon) — both divested to Sovos (2025).",
      "ClearTax, Avalara, Sovos."
    )
  ),
  fw(
    "india-einvoicing",
    "GST e-invoicing mandate",
    "Indian requirement for specified taxpayers to generate e-invoices with an Invoice Reference Number (IRN) via the GST e-invoice/IRP system.",
    ["India"],
    ["cbic"],
    "ACTIVE",
    2020,
    ["stockanalysis-company-profile"],
    D(
      "The GST e-invoicing mandate, requiring qualifying businesses to register invoices with the Invoice Registration Portal before use.",
      "Central Board of Indirect Taxes and Customs (CBIC) / GSTN.",
      "Businesses above turnover thresholds (phased rollout).",
      "Invoice data (seller, buyer, line items, tax amounts).",
      "Businesses generate invoices in the mandated JSON format and register them with the IRP to obtain an IRN and QR code.",
      "To curb tax evasion by validating invoices in real time and automating return pre-population.",
      "[IRIS E-Invoicing](/product/iris-einvoicing) and [IRIS IRP](/product/iris-irp) — divested to Sovos (2025).",
      "ClearTax, Avalara, Sovos."
    )
  ),
];
