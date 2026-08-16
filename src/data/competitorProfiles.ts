import type { CompetitorProfile, Certainty } from "./types";

/**
 * Stage 6 — competitor intelligence. Deep profiles for the competitive set
 * around IRIS. Each profile is keyed to a company in companies.ts and carries
 * the full research dimensions requested, plus strengths, weaknesses, customer
 * sentiment, and pricing (marked "Insufficient public evidence." where there
 * is no reliable public data). Content is evidence-based and deliberately
 * non-promotional; positioning claims default to ANALYST_VIEW certainty.
 */

interface Dim {
  heading: string;
  body: string;
  sources?: string[];
  certainty?: Certainty;
}

function d(heading: string, body: string, sources?: string[]): Dim {
  return { heading, body, sources, certainty: "ANALYST_VIEW" };
}

function p(
  companyId: string,
  tier: CompetitorProfile["tier"],
  positioning: string,
  overlapsWith: string[],
  dimensions: Dim[],
  strengths: string[],
  weaknesses: string[],
  customerSentiment: string,
  pricing: string,
  sources: string[],
  certainty: Certainty = "ANALYST_VIEW"
): CompetitorProfile {
  return { companyId, tier, positioning, overlapsWith, dimensions, strengths, weaknesses, customerSentiment, pricing, sources, certainty };
}

const NO_PRICE = "Insufficient public evidence.";

export const competitorProfiles: CompetitorProfile[] = [
  // ==========================================================================
  // DIRECT COMPETITORS
  // ==========================================================================
  p(
    "workiva",
    "DIRECT",
    "The enterprise leader in connected reporting and disclosure — IRIS's most significant competitor for IRIS CARBON.",
    ["iris-carbon"],
    [
      d("Company", "Workiva Inc. is a US-listed (NYSE: WK) SaaS company headquartered in Ames, Iowa, focused on 'connected reporting' — linking financial, ESG and GRC data in one controlled platform.", ["workiva-home"]),
      d("History", "Founded in 2008 (as WebFilings) to simplify SEC XBRL filing; IPO in 2014; grew from XBRL tagging into a broad reporting/ESG/audit platform (the legacy Wdesk brand was folded into the Workiva platform)."),
      d("Products", "The Workiva platform (data prep/Amplify, documents, spreadsheets), SEC/statutory reporting, ESG, GRC (SOX/audit controls) and an XBRL/Inline XBRL engine."),
      d("Customers", "Large enterprises and public companies — Workiva reports thousands of customers heavily weighted to SEC filers and the Fortune 1000; it is enterprise- and mid-enterprise-focused, not SMB."),
      d("Markets", "Financial reporting, ESG reporting, audit/GRC and data management for corporates."),
      d("Geography", "US-centric with a growing European (ESEF) and APAC presence; less deep in emerging-market regulator relationships than IRIS."),
      d("Regulatory coverage", "US SEC/EDGAR (Inline XBRL), EU ESEF, statutory reporting across many countries, and ESG frameworks (CSRD/ESRS, ISSB, SASB). Not a core central-bank prudential-reporting vendor."),
      d("XBRL", "Strong — a mature Inline XBRL authoring and taxonomy engine with an XBRL API; but XBRL is a feature of a broader platform, not the specialist moat it is for IRIS or CoreFiling."),
      d("Disclosure management", "Market-leading collaborative disclosure authoring — review/approval workflow, version control, live linking between source data and the report."),
      d("Regulatory reporting", "Strong for corporate disclosure and GRC; weaker for bank prudential/supervisory returns (COREP/FINREP), where Regnology and AxiomSL lead."),
      d("Data", "Data-prep (Amplify) plus connectors to ERPs and source systems; a linked-data model that propagates changes across documents."),
      d("ESG", "A leading ESG-reporting platform with framework alignment (CSRD/ESRS, ISSB) and audit-grade controls — arguably its biggest growth franchise."),
      d("Analytics", "Reporting dashboards and basic analytics; not a specialist XBRL/structured-data analytics tool (that is iConnect/ParsePort territory)."),
      d("AI", "Has launched GenAI-assisted drafting and summarisation features; capabilities are maturing rather than proven at scale."),
      d("Integrations", "Broad — ERP (SAP, Oracle, NetSuite), GRC, data sources, and a large partner/consulting ecosystem."),
      d("Technology", "Multi-tenant SaaS with collaborative documents/spreadsheets and a controlled, auditable data model."),
      d("Implementation", "Enterprise onboarding via professional services and partners; longer and costlier to deploy than self-serve tools."),
    ],
    [
      "Enterprise scale and brand trust in disclosure and ESG.",
      "Broad platform (reporting + ESG + GRC) in one controlled system.",
      "Strong collaboration, workflow and audit/controls.",
      "Large partner and consulting ecosystem.",
    ],
    [
      "Premium pricing that excludes smaller filers.",
      "Disclosure-centric — not a deep bank prudential-reporting or regulator (SupTech) platform.",
      "US-centric footprint; less emerging-market/regulator depth than IRIS.",
    ],
    "Generally strong among enterprise reporting teams for collaboration and auditability; the most common criticisms are cost, implementation effort and platform complexity for smaller teams.",
    NO_PRICE + " Publicly Workiva is a premium, enterprise subscription priced per-customer with annual contracts; list pricing is not published.",
    ["workiva-home", "stockanalysis-company-profile"]
  ),

  p(
    "corefiling",
    "DIRECT",
    "A niche XBRL/taxonomy authority — competes with IRIS on the deep XBRL/tooling axis (CARBON, iFILE, iConnect).",
    ["iris-carbon", "iris-ifile", "iris-iconnect"],
    [
      d("Company", "CoreFiling is a UK (Oxford) software house specialising in XBRL/iXBRL tooling, taxonomy design and regulatory reporting.", ["corefiling-home"]),
      d("History", "Founded in 2005 by XBRL practitioners with deep involvement in the XBRL standard; it has worked with tax authorities, regulators and standard bodies since the standard's early days."),
      d("Products", "True North (XBRL data platform/processor), Seahorse (taxonomy authoring), Magnify (analytics/viewer), plus managed XBRL services and taxonomy development for regulators."),
      d("Customers", "Regulators, tax authorities and large filers — often where deep XBRL/taxonomy expertise is the deciding factor."),
      d("Markets", "XBRL tooling, regulator data collection, taxonomy design and conformance."),
      d("Geography", "UK/Europe-centred, with global regulator engagements."),
      d("Regulatory coverage", "Strong on UK (HMRC iXBRL), ESEF and various national regulators; effectively taxonomy/standard-led rather than jurisdiction-led."),
      d("XBRL", "Elite — taxonomy development, XBRL processors, conformance and iXBRL rendering are its core competence."),
      d("Disclosure management", "Not core — it provides filing, validation and processing rather than collaborative corporate authoring."),
      d("Regulatory reporting", "Firm-side XBRL reporting plus regulator-side collection tooling; narrower than Regnology/AxiomSL in bank prudential regimes."),
      d("Data", "A data platform (True North) optimised for XBRL data processing and validation at scale."),
      d("ESG", "Limited — no broad ESG-reporting suite."),
      d("Analytics", "Some (Magnify) for XBRL data visualisation/analysis."),
      d("AI", "Minimal public evidence of AI capability."),
      d("Integrations", "Technical/API-level integration for XBRL tooling rather than a broad business-app ecosystem."),
      d("Technology", "Purpose-built XBRL engines and taxonomy tooling; standards-first engineering."),
      d("Implementation", "Project-based for regulators and large filers; managed services available."),
    ],
    [
      "Deepest-in-class XBRL/taxonomy expertise and standards credibility.",
      "Trusted by regulators for taxonomy development and conformance.",
      "Strong validation and data-processing engine (True North).",
    ],
    [
      "Narrow product suite — no broad enterprise reporting, ESG or GRC platform.",
      "Smaller scale and fewer enterprise/corporate relationships.",
      "Limited analytics/AI and non-XBRL capabilities.",
    ],
    "Highly respected within the XBRL/regulatory community for technical depth; less known outside specialist circles.",
    NO_PRICE + " CoreFiling sells enterprise licences and managed services; list pricing is not published.",
    ["corefiling-home"]
  ),

  p(
    "datatracks",
    "DIRECT",
    "A low-cost, service-led XBRL/iXBRL filing bureau — competes with IRIS CARBON on price and convenience, not on platform depth.",
    ["iris-carbon"],
    [
      d("Company", "DataTracks provides managed XBRL/iXBRL tagging and filing services across many jurisdictions.", ["datatracks-home"]),
      d("History", "Founded in 2005 with Indian delivery roots, it scaled as a global, low-cost alternative to software-based XBRL filing."),
      d("Products", "Managed tagging/filing services (SEC, ESEF, HMRC, CIPC, MCA and others), plus some self-service tooling."),
      d("Customers", "SMEs, mid-market filers and accounting firms that prefer to outsource filing."),
      d("Markets", "XBRL/iXBRL filing services."),
      d("Geography", "Broad multi-jurisdiction: US, UK, EU, India, Middle East and South Africa."),
      d("Regulatory coverage", "Wide filing coverage (SEC/EDGAR, ESEF, HMRC, CIPC, MCA-21) via a service bureau model."),
      d("XBRL", "Strong operational XBRL/iXBRL tagging — reliable, but delivered as a service rather than in-house technology."),
      d("Disclosure management", "Limited — it tags/filed documents; it is not a collaborative authoring platform."),
      d("Regulatory reporting", "Filing services only; no bank prudential or regulator-side tooling."),
      d("Data", "Tagging and filing pipelines; not a data platform."),
      d("ESG", "Limited."),
      d("Analytics", "Limited."),
      d("AI", "Minimal public evidence."),
      d("Integrations", "Limited; services-led rather than API/ecosystem-led."),
      d("Technology", "Service bureau with supporting tooling."),
      d("Implementation", "Very light — customers send source data and receive the tagged filing."),
    ],
    [
      "Low cost and per-filing convenience.",
      "Broad multi-jurisdiction filing coverage.",
      "Removes the burden of learning XBRL (fully managed).",
    ],
    [
      "Not a platform — limited control, collaboration or audit workflow.",
      "No regulator-side (SupTech) or bank-reporting capability.",
      "Shallow ESG, analytics and enterprise capabilities.",
    ],
    "Favourable among cost-sensitive filers and accounting firms that want filing done for them; limited for enterprises that need control and workflow.",
    "Publicly positioned as low-cost, per-filing pricing (more accessible than enterprise platforms); specific price lists vary by jurisdiction and are not published.",
    ["datatracks-home"]
  ),

  p(
    "parseport",
    "DIRECT",
    "A self-service ESEF/XBRL conversion and analytics SaaS — competes with IRIS CARBON (ESEF) and iConnect (XBRL analytics).",
    ["iris-carbon", "iris-iconnect"],
    [
      d("Company", "ParsePort (Copenhagen) is a Danish XBRL/iXBRL conversion and analytics SaaS, acquired by Workiva in 2021.", ["parseport-home"]),
      d("History", "Built around self-service ESEF conversion, it was acquired by Workiva to serve the European ESEF market and add XBRL analytics."),
      d("Products", "ESEF/iXBRL conversion (XHTML→Inline XBRL), XBRL validation, a developer API, and XBRL data analytics."),
      d("Customers", "EU filers (ESEF) and accounting firms; developers via its API."),
      d("Markets", "ESEF conversion and XBRL analytics."),
      d("Geography", "Europe-centric."),
      d("Regulatory coverage", "Focused on ESEF; some broader XBRL use."),
      d("XBRL", "Strong — fast inline-XBRL conversion and validation."),
      d("Disclosure management", "Conversion/rendering only; not a full authoring platform."),
      d("Regulatory reporting", "ESEF filing conversion; no bank prudential or SupTech."),
      d("Data", "Conversion plus data extraction/analytics."),
      d("ESG", "Minimal (and now overlaps with its Workiva parent)."),
      d("Analytics", "XBRL data analytics is a real strength (developer/API)."),
      d("AI", "Minimal public evidence."),
      d("Integrations", "Strong developer/API orientation."),
      d("Technology", "SaaS conversion engine plus API."),
      d("Implementation", "Self-service, fast onboarding; per-report use."),
    ],
    [
      "Self-service ESEF conversion is quick and cheap to start.",
      "Developer-friendly API for XBRL analytics.",
      "Backed by Workiva's resources since 2021.",
    ],
    [
      "Narrow scope (ESEF conversion/analytics).",
      "Not a full disclosure/ESG platform; strategic overlap with Workiva.",
    ],
    "Well-regarded for ease of ESEF conversion; some users note it is now positioned within Workiva's broader (more expensive) stack.",
    NO_PRICE + " ParsePort has historically offered per-report/per-filing pricing; current list pricing is not published.",
    ["parseport-home"]
  ),

  p(
    "regnology",
    "DIRECT",
    "A leader in European bank regulatory reporting and supervisor tech — IRIS's strongest competitor for iDEAL and iFILE.",
    ["iris-ideal", "iris-ifile"],
    [
      d("Company", "Regnology (Frankfurt) provides regulatory reporting (Abacus) and supervisory-technology/data solutions.", ["regnology-home"]),
      d("History", "Formed in 2021 from BearingPoint's RegTech business (the Abacus lineage), later backed by private equity and expanded through acquisitions."),
      d("Products", "Abacus / Abacus 360 (bank regulatory reporting), Regnology Rcloud (data collection/analytics for supervisors), tax and ESG reporting modules."),
      d("Customers", "Banks, insurers and, critically, regulators/supervisors — a dual-side model like IRIS."),
      d("Markets", "Bank regulatory reporting and supervisory data."),
      d("Geography", "Europe-strong (Germany, ECB/Eurosystem), expanding globally."),
      d("Regulatory coverage", "Deep European coverage — EBA/CRR (COREP/FINREP), ECB/Eurosystem, national supervisors — plus a growing APAC/global footprint."),
      d("XBRL", "Strong XBRL support within its reporting frameworks."),
      d("Disclosure management", "Not a corporate disclosure/ESG authoring tool."),
      d("Regulatory reporting", "Core strength — one of the leaders in European bank and insurer reporting."),
      d("Data", "A strong regulatory-data model with lineage and quality tooling."),
      d("ESG", "Growing ESG reporting for financial institutions."),
      d("Analytics", "Supervisory analytics and data-quality dashboards."),
      d("AI", "Emerging (regulatory-change and reporting intelligence)."),
      d("Integrations", "Strong — core banking and data-source integration."),
      d("Technology", "Data-centric reporting platform."),
      d("Implementation", "Enterprise onboarding via services/partners."),
    ],
    [
      "Deep European regulatory content and supervisor relationships.",
      "Dual-side (firm + regulator) model with a broad reporting-regime footprint.",
      "Scale and funding to invest across regimes.",
    ],
    [
      "Heavily European; thinner in India/Middle East/Africa than IRIS.",
      "Not a corporate disclosure/ESG specialist.",
      "Enterprise pricing and implementation complexity.",
    ],
    "Strong among European banks for reporting breadth and regulator alignment; complexity/cost are the recurring criticisms.",
    NO_PRICE + " Enterprise licensing; list pricing is not published.",
    ["regnology-home"]
  ),

  p(
    "vizor",
    "DIRECT",
    "A pure-play SupTech vendor for regulators — IRIS's clearest direct competitor for iFILE.",
    ["iris-ifile"],
    [
      d("Company", "Vizor Software (Dublin) builds supervision, data-collection and analytics software for regulators.", ["vizor-home"]),
      d("History", "Founded in the 2000s as a specialist in regulatory/supervisory technology; it has served central banks and regulators across many jurisdictions."),
      d("Products", "Vizor Supervision — data collection, validation, workflow and risk-based supervision analytics for regulators."),
      d("Customers", "Central banks, financial regulators and tax authorities."),
      d("Markets", "SupTech (regulator-side)."),
      d("Geography", "Global, including emerging markets (Middle East, Africa, Asia)."),
      d("Regulatory coverage", "Central-bank supervisory returns, insurance, tax and IFRS-based collection."),
      d("XBRL", "Supports structured/XBRL data collection."),
      d("Disclosure management", "None."),
      d("Regulatory reporting", "Regulator-side collection; no firm-side reporting product."),
      d("Data", "Data collection, validation and workflow."),
      d("ESG", "Limited."),
      d("Analytics", "Risk-based supervision analytics."),
      d("AI", "Some."),
      d("Integrations", "Regulator system integration."),
      d("Technology", "SupTech platform."),
      d("Implementation", "Project-based regulator deployments."),
    ],
    [
      "Single-minded SupTech focus and regulator relationships.",
      "Global (incl. emerging-market) regulator footprint.",
    ],
    [
      "No firm-side products — one-sided vs. IRIS's dual-side model.",
      "Smaller scale; narrower analytics/data capabilities.",
    ],
    "Regarded as a credible SupTech specialist; less visible than IRIS in XBRL standards circles.",
    NO_PRICE + " Regulator project/licensing deals; pricing not published.",
    ["vizor-home"]
  ),

  p(
    "toppan-merrill",
    "DIRECT",
    "A US disclosure and filing provider (with financial-printing services) — competes with IRIS CARBON on SEC/ESG disclosure.",
    ["iris-carbon"],
    [
      d("Company", "Toppan Merrill (US; part of Japan's Toppan group) provides disclosure-management software and financial-communications services.", ["toppan-merrill-home"]),
      d("History", "Evolved from Merrill Corporation's financial-printing business, acquired by Toppan in 2018, blending services with SaaS disclosure."),
      d("Products", "Bridge (disclosure management), SEC/ESEF/HMRC filing, XBRL tagging, typesetting/printing and ESG reporting services."),
      d("Customers", "Public companies, law firms and funds."),
      d("Markets", "Disclosure, filing and financial communications."),
      d("Geography", "US-centric with global filing support."),
      d("Regulatory coverage", "SEC/EDGAR, ESEF and statutory filing."),
      d("XBRL", "Strong filing/XBRL capability."),
      d("Disclosure management", "Strong (Bridge platform plus services)."),
      d("Regulatory reporting", "Disclosure, not bank prudential."),
      d("Data", "Filing data."),
      d("ESG", "Yes (ESG reporting services)."),
      d("Analytics", "Limited."),
      d("AI", "Emerging."),
      d("Integrations", "Good."),
      d("Technology", "SaaS plus high-touch services."),
      d("Implementation", "Services-led onboarding."),
    ],
    [
      "Breadth of disclosure/filing plus services/printing heritage.",
      "Strong US SEC compliance presence.",
    ],
    [
      "US-centric; less deep XBRL/taxonomy than CoreFiling/IRIS.",
      "Services-heavy model; no regulator-side (SupTech) tooling.",
    ],
    "Well-regarded for US filing reliability; software is one part of a broader services relationship.",
    NO_PRICE + " Enterprise subscriptions plus per-filing services; pricing not published.",
    ["toppan-merrill-home"]
  ),

  p(
    "wolters-kluwer",
    "DIRECT",
    "A global information-services leader whose OneSumX competes with IRIS iDEAL in bank regulatory reporting.",
    ["iris-ideal"],
    [
      d("Company", "Wolters Kluwer (Netherlands) is a global professional-information firm; its finance/risk division sells OneSumX.", ["wolterskluwer-home"]),
      d("History", "Long history in legal/tax/health/finance information; OneSumX was assembled through acquisitions into a leading regulatory-reporting platform."),
      d("Products", "OneSumX (regulatory reporting, finance, risk), CCH Tagetik (consolidation/disclosure), TeamMate (audit), compliance content."),
      d("Customers", "Global banks, insurers and large corporates."),
      d("Markets", "Regulatory reporting and finance."),
      d("Geography", "Global."),
      d("Regulatory coverage", "Broad global coverage (EBA/ECB, US Fed/SEC, APAC) via its regulatory-content business."),
      d("XBRL", "Strong XBRL support in reporting."),
      d("Disclosure management", "Yes via CCH Tagetik (corporate disclosure/consolidation)."),
      d("Regulatory reporting", "Leader, alongside Regnology/AxiomSL, in bank reporting."),
      d("Data", "Finance data management and regulatory content."),
      d("ESG", "Yes (Tagetik ESG and reporting)."),
      d("Analytics", "Strong finance analytics."),
      d("AI", "Emerging across products."),
      d("Integrations", "Broad ERP and data integration."),
      d("Technology", "Platform suite across reporting/finance."),
      d("Implementation", "Enterprise services/partner-led."),
    ],
    [
      "Global scale and a huge regulatory-content operation.",
      "Breadth across reporting, consolidation, audit and tax.",
    ],
    [
      "Enterprise cost and complexity.",
      "Less niche XBRL/taxonomy depth than specialists.",
    ],
    "Trusted by large banks for regulatory reporting breadth; cost and implementation effort are common concerns.",
    NO_PRICE + " Enterprise licensing; pricing not published.",
    ["wolterskluwer-home"]
  ),

  p(
    "dfin",
    "DIRECT",
    "A US disclosure-management and capital-markets provider — competes with IRIS CARBON on SEC filing and enterprise disclosure.",
    ["iris-carbon"],
    [
      d("Company", "DFIN (Donnelley Financial Solutions, Chicago) provides disclosure management, SEC filing, virtual data rooms and capital-markets software.", ["dfin-home"]),
      d("History", "Spun off from RR Donnelley in 2016; evolved from financial printing into SaaS disclosure (ActiveDisclosure)."),
      d("Products", "ActiveDisclosure, SEC/EDGAR filing, virtual data rooms, ESG reporting."),
      d("Customers", "Public companies, law firms, banks and funds."),
      d("Markets", "Disclosure and capital markets."),
      d("Geography", "US-centric with global filing support."),
      d("Regulatory coverage", "SEC/EDGAR, ESEF and statutory filing."),
      d("XBRL", "Strong Inline XBRL filing."),
      d("Disclosure management", "Leader (ActiveDisclosure)."),
      d("Regulatory reporting", "Disclosure, not bank prudential."),
      d("Data", "Filing data."),
      d("ESG", "Yes."),
      d("Analytics", "Some."),
      d("AI", "Emerging."),
      d("Integrations", "Good."),
      d("Technology", "SaaS."),
      d("Implementation", "Services/partner-led."),
    ],
    [
      "US SEC filing depth and capital-markets reach.",
      "ActiveDisclosure brand and workflow.",
    ],
    [
      "US-centric; less XBRL/taxonomy depth than specialists.",
      "No regulator-side (SupTech) tooling.",
    ],
    "Strong reputation for US filing; similar cost/complexity complaints as other enterprise disclosure tools.",
    NO_PRICE + " Enterprise subscriptions plus services; pricing not published.",
    ["dfin-home"]
  ),

  p(
    "adenza",
    "DIRECT",
    "AxiomSL (now Adenza, part of Nasdaq) is a leader in bank regulatory reporting — a direct competitor to IRIS iDEAL.",
    ["iris-ideal"],
    [
      d("Company", "Adenza (New York) is Nasdaq's 2023 acquisition combining AxiomSL (regulatory reporting) and Calypso (treasury/risk).", ["adenza-home"]),
      d("History", "AxiomSL was founded in 1991 as a data-driven regulatory-reporting engine; merged with Calypso and was acquired by Nasdaq."),
      d("Products", "AxiomSL regulatory reporting (capital, liquidity, financial), Calypso treasury/risk."),
      d("Customers", "Large global banks, brokers and insurers."),
      d("Markets", "Bank regulatory reporting and treasury."),
      d("Geography", "Global (US, EU, APAC)."),
      d("Regulatory coverage", "Broad (US Fed/SEC, EBA/ECB, APAC regulators)."),
      d("XBRL", "Supports structured/XBRL reporting."),
      d("Disclosure management", "None."),
      d("Regulatory reporting", "Leader, with strong data lineage/dictionary."),
      d("Data", "Strong data lineage and data-dictionary governance."),
      d("ESG", "Emerging."),
      d("Analytics", "Risk/finance analytics."),
      d("AI", "Emerging."),
      d("Integrations", "Strong."),
      d("Technology", "Data-centric reporting platform."),
      d("Implementation", "Enterprise services/partner-led."),
    ],
    [
      "Deep data lineage and global regulatory coverage.",
      "Tier-1 bank credibility and Nasdaq backing.",
    ],
    [
      "Enterprise cost and complexity.",
      "No corporate disclosure/ESG or regulator-side (SupTech) product.",
    ],
    "Respected by large banks for data-driven reporting; complexity is a known trade-off.",
    NO_PRICE + " Enterprise licensing; pricing not published.",
    ["adenza-home"]
  ),

  p(
    "cleartax",
    "DIRECT",
    "India's GST/e-invoicing leader — competed with IRIS's now-divested TaxTech business.",
    ["iris-gst", "iris-einvoicing", "iris-irp", "iris-zircon"],
    [
      d("Company", "ClearTax (Bengaluru) is India's leading tax-compliance SaaS for GST, e-invoicing and e-way bills.", ["cleartax-home"]),
      d("History", "Founded in 2011; scaled rapidly on the back of India's 2017 GST launch."),
      d("Products", "GST software, e-invoicing, e-way bill, tax filing for enterprises and CA firms."),
      d("Customers", "Indian SMEs, enterprises and chartered accountants."),
      d("Markets", "India tax compliance."),
      d("Geography", "India-focused."),
      d("Regulatory coverage", "GST and e-invoicing (CBIC/GSTN)."),
      d("XBRL", "None."),
      d("Disclosure management", "None."),
      d("Regulatory reporting", "GST returns only."),
      d("Data", "Invoice data."),
      d("ESG", "None."),
      d("Analytics", "Some."),
      d("AI", "Some (document AI)."),
      d("Integrations", "ERP integration."),
      d("Technology", "SaaS."),
      d("Implementation", "Self-serve plus assisted."),
    ],
    [
      "India tax market leadership and SME reach.",
      "Strong brand and distribution.",
    ],
    [
      "India-only tax; no XBRL/regulatory-reporting or SupTech.",
      "IRIS has now exited this market (divested to Sovos), so this is a historical rivalry.",
    ],
    "Popular with Indian businesses for GST; this rivalry is now moot for IRIS's current portfolio.",
    "Publicly low/mid subscription pricing for GST products.",
    ["cleartax-home", "sovos-acquisition"]
  ),

  p(
    "sovos",
    "DIRECT",
    "US 'always-on' tax-compliance company — was IRIS's TaxTech competitor, then acquired that business in 2025.",
    ["iris-gst", "iris-einvoicing", "iris-irp", "iris-zircon"],
    [
      d("Company", "Sovos Compliance LLC is a US-headquartered global tax-compliance and e-invoicing/CTC vendor.", ["sovos-acquisition"]),
      d("History", "Grew through acquisitions into a global indirect-tax and e-invoicing platform; acquired IRIS's APAC Tax Technology (GST) business in August 2025 (~₹151 Cr)."),
      d("Products", "E-invoicing, continuous transaction controls (CTC), sales/use tax, VAT/GST compliance."),
      d("Customers", "Multinational enterprises."),
      d("Markets", "Global indirect tax and e-invoicing."),
      d("Geography", "Global (US HQ, strong Europe/LatAm/APAC)."),
      d("Regulatory coverage", "Global e-invoicing/CTC mandates."),
      d("XBRL", "None."),
      d("Disclosure management", "None."),
      d("Regulatory reporting", "Tax filings."),
      d("Data", "Invoice/tax data."),
      d("ESG", "None."),
      d("Analytics", "Tax analytics."),
      d("AI", "Some."),
      d("Integrations", "Strong ERP integration."),
      d("Technology", "SaaS."),
      d("Implementation", "Enterprise services."),
    ],
    [
      "Global CTC/e-invoicing scale.",
      "Now owns IRIS's former GST assets, consolidating the market.",
    ],
    [
      "No XBRL/regulatory-reporting or SupTech — not a rival to IRIS's current core.",
    ],
    "Enterprise buyers view Sovos as a leader in global tax compliance; this rivalry is now resolved by the divestment.",
    NO_PRICE + " Enterprise subscription pricing; not published.",
    ["sovos-acquisition"]
  ),

  // ==========================================================================
  // ADJACENT COMPETITORS
  // ==========================================================================
  p(
    "moodys",
    "ADJACENT",
    "A credit-ratings and risk-analytics giant — overlaps IRIS only in credit analytics (Credixo/MSME).",
    ["iris-credixo", "iris-msme"],
    [
      d("Company", "Moody's Corporation (New York) is a global credit-ratings and risk-analytics/data business.", ["moodys-home"]),
      d("History", "A century-old ratings agency that expanded into data, analytics and risk software."),
      d("Products", "Credit ratings, research, data (Orbis/Bureau van Dijk), risk analytics, ESG/climate data."),
      d("Customers", "Banks, investors, corporates, insurers."),
      d("Markets", "Credit and risk analytics."),
      d("Geography", "Global."),
      d("Regulatory coverage", "Not a reporting vendor; provides data used in risk workflows."),
      d("XBRL", "None."),
      d("Disclosure management", "None."),
      d("Regulatory reporting", "None (risk data only)."),
      d("Data", "A data powerhouse (company financials, ESG, credit)."),
      d("ESG", "Yes (Moody's ESG/climate data)."),
      d("Analytics", "Industry-leading risk/credit analytics."),
      d("AI", "Emerging."),
      d("Integrations", "Data feeds/APIs."),
      d("Technology", "Data + analytics platform."),
      d("Implementation", "Data/API onboarding."),
    ],
    [
      "Unmatched credit/risk data and analytics scale.",
      "Global brand and data coverage.",
    ],
    [
      "Not a compliance/reporting product — overlaps only with Credixo's niche.",
    ],
    "Deeply trusted for credit data; not seen as a compliance-software vendor.",
    NO_PRICE + " Data/analytics subscriptions; pricing not published.",
    ["moodys-home"]
  ),

  p(
    "fis",
    "ADJACENT",
    "A global banking-technology vendor whose regulatory-reporting offerings are adjacent to IRIS iDEAL/iFILE.",
    ["iris-ideal", "iris-ifile"],
    [
      d("Company", "FIS (Jacksonville, Florida) is a global banking and capital-markets technology vendor.", ["fis-home"]),
      d("History", "Grew through acquisitions (including SunGard, Worldpay) into a broad fintech platform."),
      d("Products", "Core banking, payments, capital markets and regulatory-reporting solutions."),
      d("Customers", "Banks, brokers, corporates."),
      d("Markets", "Banking technology."),
      d("Geography", "Global."),
      d("Regulatory coverage", "Regulatory reporting modules for banking."),
      d("XBRL", "Some."),
      d("Disclosure management", "Limited."),
      d("Regulatory reporting", "Yes, as part of larger banking suites."),
      d("Data", "Strong banking data."),
      d("ESG", "Limited."),
      d("Analytics", "Strong."),
      d("AI", "Emerging."),
      d("Integrations", "Deep within banking ecosystems."),
      d("Technology", "Broad fintech platform."),
      d("Implementation", "Enterprise."),
    ],
    [
      "Scale and breadth across the banking stack.",
    ],
    [
      "Regulatory reporting is a module, not a specialist focus; no XBRL/SupTech depth.",
    ],
    "Chosen for breadth by large banks; reporting is not its differentiator.",
    NO_PRICE,
    ["fis-home"]
  ),

  p(
    "sap",
    "ADJACENT",
    "The ERP leader — overlaps IRIS disclosure tools at the enterprise data/consolidation layer.",
    ["iris-carbon"],
    [
      d("Company", "SAP SE (Walldorf, Germany) is the world's leading ERP vendor.", ["sap-home"]),
      d("History", "Decades-long enterprise-software leader; extended into finance consolidation and regulatory reporting."),
      d("Products", "S/4HANA, SAP Group Reporting (consolidation), tax/regulatory add-ons."),
      d("Customers", "Large enterprises globally."),
      d("Markets", "ERP and finance."),
      d("Geography", "Global."),
      d("Regulatory coverage", "Statutory/consolidation reporting; some XBRL via partners."),
      d("XBRL", "Limited (often via partner tools)."),
      d("Disclosure management", "Emerging (Group Reporting)."),
      d("Regulatory reporting", "Consolidation/statutory, not bank prudential."),
      d("Data", "The system-of-record for enterprise data."),
      d("ESG", "Growing (SAP Sustainability)."),
      d("Analytics", "Strong."),
      d("AI", "Emerging (Joule)."),
      d("Integrations", "Ubiquitous."),
      d("Technology", "ERP platform."),
      d("Implementation", "Large, long."),
    ],
    [
      "Owns the source data and ERP stack.",
    ],
    [
      "Reporting is not its core; XBRL/disclosure depth is thin vs. specialists.",
    ],
    "Enterprises keep SAP as the system of record and add specialist disclosure tools on top.",
    NO_PRICE,
    ["sap-home"]
  ),

  p(
    "ibm",
    "ADJACENT",
    "A technology/AI platform vendor with RegTech solutions — competes with IRIS at the platform/tooling layer, not the product layer.",
    ["iris-iconnect"],
    [
      d("Company", "IBM (Armonk, New York) is a global technology, cloud and AI platform vendor.", ["ibm-home"]),
      d("History", "Century-old technology leader pivoting to hybrid cloud and AI."),
      d("Products", "Cloud (IBM Cloud), AI (watsonx), data, and RegTech/financial-compliance solutions."),
      d("Customers", "Enterprises and institutions globally."),
      d("Markets", "Technology platform."),
      d("Geography", "Global."),
      d("Regulatory coverage", "Compliance/RegTech platforms and tooling."),
      d("XBRL", "Not core."),
      d("Disclosure management", "Not core."),
      d("Regulatory reporting", "Platform/tooling, not specialist reporting."),
      d("Data", "Strong data/AI."),
      d("ESG", "Some (Envizi)."),
      d("Analytics", "Strong."),
      d("AI", "Leader (watsonx)."),
      d("Integrations", "Extensive."),
      d("Technology", "Cloud/AI platform."),
      d("Implementation", "Enterprise."),
    ],
    [
      "AI/cloud platform scale.",
    ],
    [
      "Not a domain specialist in XBRL/regulatory reporting.",
    ],
    "Seen as an infrastructure/AI partner rather than a compliance-product rival.",
    NO_PRICE,
    ["ibm-home"]
  ),

  p(
    "broadridge",
    "ADJACENT",
    "An investor-communications and regulatory-reporting services provider — overlaps IRIS only in narrow niches.",
    ["iris-carbon"],
    [
      d("Company", "Broadridge Financial Solutions (Lake Success, New York) provides investor communications, proxy and regulatory-reporting services.", ["broadridge-home"]),
      d("History", "Spun out of ADP; scaled in investor communications and financial-services processing."),
      d("Products", "Proxy/communications, regulatory reporting services, data."),
      d("Customers", "Banks, brokers, issuers, asset managers."),
      d("Markets", "Investor communications."),
      d("Geography", "US-centric, global."),
      d("Regulatory coverage", "Regulatory reporting services (narrow)."),
      d("XBRL", "Limited."),
      d("Disclosure management", "Limited."),
      d("Regulatory reporting", "Some services (e.g., transaction reporting)."),
      d("Data", "Strong communications data."),
      d("ESG", "Limited."),
      d("Analytics", "Some."),
      d("AI", "Emerging."),
      d("Integrations", "Broad."),
      d("Technology", "Services + platform."),
      d("Implementation", "Enterprise."),
    ],
    [
      "Investor-communications scale and reach.",
    ],
    [
      "Not a specialist in XBRL/disclosure/regulatory reporting as IRIS defines them.",
    ],
    "Chosen for communications/proxy; not a like-for-like IRIS rival.",
    NO_PRICE,
    ["broadridge-home"]
  ),

  // ==========================================================================
  // NON-COMPETITORS (ecosystem players)
  // ==========================================================================
  p(
    "finastra",
    "NON_COMPETITOR",
    "A core-banking/lending/treasury platform vendor — part of the ecosystem IRIS integrates with, not a reporting rival.",
    [],
    [
      d("Company", "Finastra (London) provides core banking, lending, payments and treasury software.", ["finastra-home"]),
      d("Products", "Fusion core banking, lending, payments, treasury."),
      d("Customers", "Banks and financial institutions."),
      d("Markets", "Banking software."),
      d("Geography", "Global."),
      d("Regulatory coverage", "None directly (reporting done by partners)."),
      d("XBRL", "None."),
      d("Disclosure management", "None."),
      d("Regulatory reporting", "Via partners/integrations."),
      d("Data", "Core banking data."),
      d("ESG", "Limited."),
      d("Analytics", "Some."),
      d("AI", "Emerging."),
      d("Integrations", "Open platform."),
      d("Technology", "Banking platform."),
      d("Implementation", "Enterprise."),
    ],
    ["Core-banking scale and open ecosystem."],
    ["Not a competitor — could be an integration/partner surface for IRIS."],
    "A platform IRIS reporting tools would integrate with, not displace.",
    NO_PRICE,
    ["finastra-home"]
  ),

  p(
    "nice-actimize",
    "NON_COMPETITOR",
    "A financial-crime/AML compliance vendor — adjacent to IRIS's compliance story, not a direct rival.",
    [],
    [
      d("Company", "NICE Actimize (Hoboken, New Jersey) provides financial-crime, fraud and AML compliance software.", ["nice-actimize-home"]),
      d("Products", "AML, fraud, market-surveillance and compliance analytics."),
      d("Customers", "Banks and financial institutions."),
      d("Markets", "Financial crime compliance."),
      d("Geography", "Global."),
      d("Regulatory coverage", "AML/financial-crime regimes."),
      d("XBRL", "None."),
      d("Disclosure management", "None."),
      d("Regulatory reporting", "None (crime/fraud analytics)."),
      d("Data", "Transaction/monitoring data."),
      d("ESG", "None."),
      d("Analytics", "Strong."),
      d("AI", "Strong (detection)."),
      d("Integrations", "Broad."),
      d("Technology", "Compliance analytics platform."),
      d("Implementation", "Enterprise."),
    ],
    ["Financial-crime detection strength."],
    ["Different compliance category — not a reporting rival."],
    "Adjacent brand awareness but no direct product overlap.",
    NO_PRICE,
    ["nice-actimize-home"]
  ),
];
