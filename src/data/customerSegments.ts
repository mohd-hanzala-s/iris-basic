import type { CustomerSegment, Certainty, EntityRef } from "./types";

/**
 * Stage 5 — customer segments. For each segment we model the six-step value
 * chain (problem → regulatory requirement → data problem → IRIS product →
 * workflow → outcome) and a realistic end-to-end customer journey, so the
 * learner sees how IRIS products slot into a real buyer's world.
 */

function seg(
  id: string,
  name: string,
  description: string,
  chain: CustomerSegment["chain"],
  journey: string[],
  productIds: string[],
  entityRefs: EntityRef[],
  sources: string[],
  certainty: Certainty
): CustomerSegment {
  return { id, name, description, chain, journey, productIds, entityRefs, sources, certainty };
}

const c = (id: string): EntityRef => ({ type: "company", id });
const r = (id: string): EntityRef => ({ type: "regulator", id });

export const customerSegments: CustomerSegment[] = [
  seg(
    "central-banks",
    "Central banks",
    "National central banks that supervise banks and collect prudential, statistical and financial-stability data.",
    {
      problem: "A central bank must gather accurate, timely data from every bank it supervises to assess risk and set policy.",
      regulatoryRequirement: "Recurring supervisory and statistical returns (e.g. RBI returns; CIMS programme).",
      dataProblem: "Hundreds of banks file in varied formats; manual intake and checking does not scale.",
      product: "IRIS iFILE (collect/validate/analyse) and IRIS iDEAL (filer-side reporting).",
      workflow: "Banks submit structured returns → iFILE validates on entry → normalises → central store → supervision analytics.",
      outcome: "Clean, comparable data and data-driven, risk-based supervision.",
    },
    [
      "The central bank defines the reporting taxonomies and schedules for each return.",
      "Banks adopt a reporting tool (IRIS iDEAL) to map their data onto those taxonomies.",
      "The bank's returns are submitted through the central bank's collection portal.",
      "IRIS iFILE validates each submission on entry and queries errors back to the bank.",
      "Clean data flows into supervision dashboards and analytics for examiners.",
      "When the mandate changes, the taxonomy is updated and both sides re-map/re-test.",
    ],
    ["iris-ifile", "iris-ideal"],
    [r("rbi"), r("sarb")],
    ["iris-rbi-cims", "scanx-sarb", "iris-ifile-page"],
    "FACT"
  ),

  seg(
    "financial-regulators",
    "Financial regulators",
    "Capital-market and securities regulators that collect disclosures and market data from issuers and intermediaries.",
    {
      problem: "A securities regulator must monitor issuers, intermediaries and markets across thousands of filings.",
      regulatoryRequirement: "XBRL-based disclosure and reporting mandates (e.g. SEBI LODR).",
      dataProblem: "Disclosures arrive as documents; comparability and machine-readability are required.",
      product: "IRIS iFILE (collection/validation) and IRIS CARBON / IRIS iDEAL (filer-side disclosure).",
      workflow: "Filers tag disclosures in XBRL → iFILE validates and stores → regulator analyses trends.",
      outcome: "Machine-readable disclosures enabling automated surveillance and analytics.",
    },
    [
      "The regulator publishes an XBRL taxonomy for each filing type.",
      "Listed companies and intermediaries use disclosure software (CARBON/iDEAL) to tag and file.",
      "IRIS iFILE collects and validates all submissions centrally.",
      "Errors are flagged to filers; clean data is stored and routed to surveillance teams.",
      "The regulator runs cross-entity analytics on the structured data.",
    ],
    ["iris-ifile", "iris-carbon", "iris-ideal"],
    [r("sebi")],
    ["iris-filexbrl-abs"],
    "FACT"
  ),

  seg(
    "government-agencies",
    "Government agencies & tax authorities",
    "Tax authorities and other government bodies that collect filings and payments from businesses.",
    {
      problem: "A tax authority must collect returns and tax data from every business in the country.",
      regulatoryRequirement: "Tax filing regimes (e.g. GST, income tax) — for IRIS, regulator-side collection.",
      dataProblem: "Massive, heterogeneous filing volumes with tight validation requirements.",
      product: "IRIS iFILE (regulator-side tax-data collection).",
      workflow: "Businesses file tax returns → iFILE validates → tax data centralised for administration.",
      outcome: "Efficient, scalable tax administration with fewer manual re-checks.",
    },
    [
      "The tax authority issues the filing requirement and data schemas.",
      "IRIS deploys iFILE as the authority's collection platform.",
      "Businesses (via their own software) submit structured returns.",
      "iFILE validates and stores returns; queries are sent back on error.",
      "The authority uses the collected data for compliance and policy.",
    ],
    ["iris-ifile"],
    [r("qatar-gta"), r("cbic")],
    ["scanx-qatar-tax"],
    "FACT"
  ),

  seg(
    "banks",
    "Banks",
    "Commercial and foreign banks filing supervisory returns and assessing credit risk.",
    {
      problem: "A bank must produce accurate supervisory returns on tight deadlines or face scrutiny.",
      regulatoryRequirement: "RBI returns / CIMS; prudential (Basel) reporting.",
      dataProblem: "Source data lives across core systems and rarely matches regulatory definitions.",
      product: "IRIS iDEAL (reporting) and IRIS Credixo (credit analysis).",
      workflow: "Core data → map to taxonomy → validate → generate return → submit to supervisor.",
      outcome: "Accurate, timely, compliant reporting with reduced error risk.",
    },
    [
      "The bank's finance team maps internal data to the regulator's taxonomy.",
      "iDEAL validates and generates the return before the deadline.",
      "The return is submitted to the central bank's collection system (iFILE/CIMS).",
      "Regulatory updates are absorbed quickly when the mandate changes.",
      "Separately, credit teams use Credixo for credit-analysis modelling.",
    ],
    ["iris-ideal", "iris-credixo"],
    [c("mufg-bank")],
    ["iris-ideal-page", "iris-rbi-cims"],
    "FACT"
  ),

  seg(
    "insurance",
    "Insurance companies",
    "Insurers with solvency and supervisory reporting obligations (e.g. Solvency II-style regimes).",
    {
      problem: "An insurer must prove solvency and report its risk profile to its supervisor.",
      regulatoryRequirement: "Solvency II (EU) or equivalent risk-based reporting.",
      dataProblem: "Actuarial, asset and liability data must be aggregated into standardised reports.",
      product: "IRIS iDEAL (structured reporting) — inferred, not confirmed.",
      workflow: "Actuarial/asset data → map to reporting taxonomy → validate → submit.",
      outcome: "Compliant solvency reporting and clearer supervisory standing.",
    },
    [
      "The insurer collects asset, liability and capital data.",
      "Data is mapped to the solvency reporting taxonomy.",
      "Reports are validated and submitted to the supervisor.",
      "Quarterly/annual cycles repeat with updated data.",
    ],
    ["iris-ideal"],
    [],
    ["eiopa-solvency", "stockanalysis-company-profile"],
    "INFERENCE"
  ),

  seg(
    "financial-institutions",
    "Financial institutions & investment firms",
    "Credit institutions, investment firms, brokers and funds with regulatory reporting obligations.",
    {
      problem: "An investment firm must file regulatory returns and maintain compliant records.",
      regulatoryRequirement: "Prudential and market-reporting obligations (varies by jurisdiction).",
      dataProblem: "Portfolio, capital and transaction data must be aggregated into returns.",
      product: "IRIS iDEAL (reporting).",
      workflow: "Transaction/position data → aggregate → validate → report.",
      outcome: "Timely, accurate regulatory filings and reduced compliance risk.",
    },
    [
      "The firm's systems produce position and capital data.",
      "iDEAL maps and validates it against the regulator's format.",
      "Returns are generated and submitted.",
    ],
    ["iris-ideal"],
    [],
    ["stockanalysis-company-profile"],
    "INFERENCE"
  ),

  seg(
    "listed-companies",
    "Listed companies",
    "Public companies that must file digital financial and sustainability disclosures.",
    {
      problem: "A listed company must publish annual and ESG reports in machine-readable formats.",
      regulatoryRequirement: "ESEF (EU), SEC XBRL (US), MCA-21 / SEBI LODR (India).",
      dataProblem: "Financial and ESG data must be tagged to taxonomies and rendered to XBRL/iXBRL.",
      product: "IRIS CARBON (disclosure management).",
      workflow: "Author in Word/Excel → tag to taxonomy → validate → render XBRL/iXBRL + PDF.",
      outcome: "Compliant, machine-readable disclosure with investor/regulator comparability.",
    },
    [
      "The company's finance/ESG team prepares the report in Office 365.",
      "Figures are tagged to the relevant taxonomy (IFRS/ESRS).",
      "CARBON validates the tagging and renders XBRL/iXBRL plus PDF.",
      "The filing is submitted to the regulator's portal (EDGAR/ESEF).",
    ],
    ["iris-carbon"],
    [c("gap-inc")],
    ["newswire-gap-carbon", "carbon-launch-office365", "esma-esef"],
    "FACT"
  ),

  seg(
    "enterprises",
    "Enterprises",
    "Large corporates managing multi-jurisdiction disclosure and (historically) GST/tax compliance.",
    {
      problem: "A large corporate must juggle reporting and (formerly) tax-compliance across jurisdictions.",
      regulatoryRequirement: "Corporate disclosure + GST/e-invoicing (now Sovos for tax).",
      dataProblem: "Enterprise data is scattered across ERPs and must be reconciled and structured.",
      product: "IRIS CARBON (disclosure); formerly IRIS GST/E-invoicing (divested).",
      workflow: "ERP/Office data → reconcile → tag/format → validate → file.",
      outcome: "Accurate disclosure and (pre-divestment) automated tax compliance.",
    },
    [
      "The enterprise consolidates data from its ERP and finance systems.",
      "Disclosure teams author and tag reports in CARBON.",
      "Tax teams (pre-divestment) used GST software with ERP connectors to file returns.",
      "After the Sovos divestment, IRIS's enterprise story focuses on disclosure/ESG.",
    ],
    ["iris-carbon"],
    [],
    ["stockanalysis-company-profile", "sovos-acquisition"],
    "INFERENCE"
  ),

  seg(
    "msmes",
    "MSMEs & data users",
    "Micro, small and medium enterprises, plus analysts and data users consuming structured data.",
    {
      problem: "MSMEs lack the structured financial data to access credit; analysts need comparable company data.",
      regulatoryRequirement: "Financial-inclusion policy and (indirectly) credit-risk assessment.",
      dataProblem: "MSME records are unstructured; XBRL filings are hard for analysts to use directly.",
      product: "IRIS MSME (credit access) and IRIS iConnect (XBRL analytics in Excel).",
      workflow: "MSME data → credit-readiness signals → lender decisions; XBRL filings → Excel analytics.",
      outcome: "Better MSME credit access and easier analysis of structured data.",
    },
    [
      "An MSME (or state partner) onboards to the IRIS MSME platform.",
      "Its business/financial data is structured for credit-readiness.",
      "Lenders use the signals to make decisions (Goa MoU model).",
      "Analysts separately use iConnect to compare company filings in Excel.",
    ],
    ["iris-msme", "iris-iconnect"],
    [],
    ["projects-today-goa-msme", "iconnect-launch"],
    "INFERENCE"
  ),

  seg(
    "exchanges-registries",
    "Stock exchanges & business registries",
    "Exchanges and company registries that collect XBRL filings from issuers and companies.",
    {
      problem: "An exchange or registry must collect standardised filings from all its members/companies.",
      regulatoryRequirement: "Listing obligations and incorporation filing rules (e.g. MCA-21).",
      dataProblem: "Filings arrive in many formats and must be made comparable and analysable.",
      product: "IRIS iFILE (collection/validation).",
      workflow: "Issuers/companies file XBRL → iFILE validates → registry stores and publishes.",
      outcome: "A single, validated repository of corporate data.",
    },
    [
      "The registry/exchange defines filing taxonomies.",
      "IRIS deploys iFILE as the collection layer.",
      "Companies submit XBRL filings, validated on entry.",
      "Validated data is stored, published and analysed.",
    ],
    ["iris-ifile"],
    [r("nse-india"), r("bse-india"), r("mca")],
    ["iris-filexbrl-abs"],
    "FACT"
  ),
];
