import type {
  ProductAspect,
  ProductDeepDive,
  ProductEcosystem,
  ProductLevel,
  ProductLifecycle,
  ProductWorkflowStep,
  Certainty,
} from "./types";

/**
 * Stage 4 deep-dive data for every IRIS product: 21 knowledge aspects, five
 * learning levels, a six-step visual workflow, and lifecycle classification.
 *
 * Grounding rule: where public evidence is thin (notably Credixo, MSME, and
 * the exact per-product split of the divested TaxTech business), claims are
 * tagged INFERENCE / UNKNOWN rather than asserted as fact.
 */

// Source id shorthands
const SA = ["stockanalysis-company-profile"];
const IFILE = ["iris-ifile-page", "iris-filexbrl-abs", "stockanalysis-company-profile"];
const IDEAL = ["iris-ideal-page", "iris-rbi-cims", "stockanalysis-company-profile"];
const CARBON = ["carbon-launch-office365", "newswire-gap-carbon", "scanx-mz-brazil", "stockanalysis-company-profile"];
const ICONNECT = ["iconnect-launch", "stockanalysis-company-profile"];
const CREDIXO = ["stockanalysis-company-profile"];
const MSME = ["projects-today-goa-msme", "screener-iris"];
const TAX = ["stockanalysis-company-profile", "sovos-acquisition", "iris-pressrelease-divestment"];

function aspect(heading: string, body: string, sources?: string[], certainty?: Certainty): ProductAspect {
  return { heading, body, sources, certainty };
}

function level(level: 1 | 2 | 3 | 4 | 5, title: string, body: string, sources?: string[], certainty?: Certainty): ProductLevel {
  return { level, title, body, sources, certainty };
}

function step(label: string, body: string, sources?: string[], certainty?: Certainty): ProductWorkflowStep {
  return { label, body, sources, certainty };
}

function dive(
  productId: string,
  lifecycle: ProductLifecycle,
  lifecycleNote: string | undefined,
  elevator: string,
  aspects: ProductAspect[],
  levels: ProductLevel[],
  workflow: ProductWorkflowStep[],
  relatedProductIds: string[] = []
): ProductDeepDive {
  return { productId, lifecycle, lifecycleNote, elevator, aspects, levels, workflow, relatedProductIds };
}

const WORKFLOW_LABELS = ["Customer problem", "Data", "IRIS product", "Process", "Output", "Business / regulatory value"] as const;

export const productDeepDives: ProductDeepDive[] = [
  // =====================================================================
  // iFILE — SupTech
  // =====================================================================
  dive(
    "iris-ifile",
    "CURRENT",
    "Flagship SupTech product, still sold to regulators (30+ worldwide).",
    "The regulator-side platform to collect, validate and analyse any type of data filing from supervised entities.",
    [
      aspect("What is it?", "IRIS iFILE is an end-to-end electronic filing platform that regulators use to collect, validate and analyse data from the entities they supervise. IRIS markets it as capable of handling 'any type of data'.", IFILE, "COMPANY_CLAIM"),
      aspect("What problem does it solve?", "Regulators receive huge volumes of filings from hundreds or thousands of entities; manual intake, checking and re-keying do not scale. iFILE automates collection and catches errors on entry so data arrives clean and analysable.", IFILE, "INFERENCE"),
      aspect("Who buys it?", "Regulators and supervisory authorities: central banks, business registries, capital-market regulators, stock exchanges and tax authorities.", IFILE, "COMPANY_CLAIM"),
      aspect("Who uses it?", "The regulator's own staff — data-collection, supervision, statistics and IT teams — plus the reporting entities who submit through the portal.", IFILE, "INFERENCE"),
      aspect("What regulatory/business problem does it address?", "It is the intake layer of supervision (SupTech): collecting structured, valid, comparable data at scale so a regulator can actually supervise rather than just chase paperwork.", IFILE, "COMPANY_CLAIM"),
      aspect("How does it work?", "The regulator defines taxonomies/schemas for each return; filers submit via the portal; the system validates submissions against the taxonomy rules on entry, stores them, and exposes them for analysis.", IFILE, "INFERENCE"),
      aspect("What data goes into it?", "Any structured data the regulator requires — financial, statistical, compliance and custom-defined returns — typically in XBRL/iXBRL or other structured formats.", IFILE, "COMPANY_CLAIM"),
      aspect("What happens to the data?", "It is validated, normalised and stored in a central repository; clean data is routed to analysts and dashboards, while errors are queried back to the filer for correction.", IFILE, "INFERENCE"),
      aspect("What comes out?", "Validated datasets, validation/error reports, dashboards and analytics inputs; filers receive acceptance or rejection feedback on each submission.", IFILE, "INFERENCE"),
      aspect("Major capabilities", "Collection, automated validation, analysis, filing workflow, and multi-format support (XBRL and other standards).", IFILE, "COMPANY_CLAIM"),
      aspect("Relevant regulations & standards", "XBRL and iXBRL are the core standards; SDMX may apply to statistical (aggregate) collection, though no iFILE-SDMX product is explicitly documented.", IFILE, "INFERENCE"),
      aspect("Geography", "Trusted by 30+ regulators worldwide. Known clients include India's RBI, SEBI, MCA, NSE and BSE, plus the Qatar General Tax Authority and the South African Reserve Bank.", IFILE, "FACT"),
      aspect("Customer examples", "RBI, SEBI, MCA, NSE and BSE (XBRL solutions); Qatar GTA (6-year contract, 2025); SARB (contract extension, 2025).", IFILE, "FACT"),
      aspect("Implementation model", "Project-based regulator deployments with multi-year contracts and support. IRIS 'implemented XBRL solutions for' these institutions — suggesting custom/configured delivery rather than off-the-shelf self-service.", IFILE, "INFERENCE"),
      aspect("Technology (publicly known)", "XBRL/iXBRL processing, taxonomy tooling and web-based filing portals. Deeper technical detail is not published.", IFILE, "INFERENCE"),
      aspect("Integrations", "Regulator taxonomies/schemas from standards bodies; filing entities' own systems submit through the portal (API or manual upload).", IFILE, "INFERENCE"),
      aspect("Competitors", "CoreFiling and other XBRL regulator-tooling vendors; regulators' in-house IT builds are the default alternative.", SA, "ANALYST_VIEW"),
      aspect("IRIS advantages", "XBRL pedigree since 2000, an install base of 30+ regulators, and the Central Banking Award 2024 for Technology Services.", IFILE, "FACT"),
      aspect("Competitor advantages", "In-house builds give regulators full control and no vendor lock-in; specialised rivals may offer deeper taxonomy tooling.", IFILE, "INFERENCE"),
      aspect("Limitations & gaps", "SupTech is a slow-moving, small, contract-driven market with long sales cycles and lumpy revenue; deep product capability is not publicly documented.", IFILE, "INFERENCE"),
      aspect("Strategic importance to IRIS", "iFILE is IRIS's flagship and the anchor of its 'both sides of the market' positioning — it locks in long-term regulator relationships and generates recurring SupTech revenue.", IFILE, "INFERENCE"),
    ],
    [
      level(1, "One sentence", "iFILE is the software a regulator uses to collect, check and analyse every filing it receives from the companies and banks it oversees.", IFILE, "INFERENCE"),
      level(2, "Beginner", "Think of it as the regulator's secure digital letterbox plus an automated check-in desk. Every bank and company submits its returns through one portal; the system checks each one on arrival, stores the good ones, and flags the bad ones — instead of people doing it by hand.", IFILE, "INFERENCE"),
      level(3, "Professional", "iFILE is a SupTech data-collection platform. A regulator publishes the taxonomy for each return (defining required fields, data types and validation rules); filers submit structured data; the platform validates on entry, normalises it into a central store, and feeds supervision analytics. This is the intake layer that lets regulators move to risk-based, data-driven supervision.", IFILE, "INFERENCE"),
      level(4, "Technical", "The system centres on taxonomy-driven validation: each filing is checked against XBRL schema and business rules (required facts, data types, calculations, cross-field checks) before acceptance. It must handle scale (hundreds to thousands of filers), filing schedules, multi-format ingestion (XBRL/iXBRL and other standards) and a query-back workflow for rejections.", IFILE, "INFERENCE"),
      level(5, "Strategic", "iFILE is IRIS's moat. A regulator that runs its intake on iFILE is a long-term, sticky customer — and the structured data it collects is the raw material for IRIS's DataTech and analytics ambitions. It is the product that makes IRIS unusual among RegTech vendors (most only sell to firms, not to regulators).", IFILE, "INFERENCE"),
    ],
    [
      step(WORKFLOW_LABELS[0], "A regulator must gather complete, correct, comparable data from thousands of entities with limited examiner resources.", IFILE, "INFERENCE"),
      step(WORKFLOW_LABELS[1], "Structured returns (XBRL/iXBRL or other schemas) submitted by banks, companies and intermediaries.", IFILE, "COMPANY_CLAIM"),
      step(WORKFLOW_LABELS[2], "IRIS iFILE — the regulator-side collection and validation portal.", IFILE, "COMPANY_CLAIM"),
      step(WORKFLOW_LABELS[3], "Filing → taxonomy validation on entry → normalisation → central storage → routing to analysts.", IFILE, "INFERENCE"),
      step(WORKFLOW_LABELS[4], "Validated datasets, error/validation reports, dashboards and analytics inputs.", IFILE, "INFERENCE"),
      step(WORKFLOW_LABELS[5], "Data-driven, risk-based supervision — more coverage, fewer resubmissions, earlier risk detection.", IFILE, "INFERENCE"),
    ],
    ["iris-iconnect"]
  ),

  // =====================================================================
  // iDEAL — RegTech
  // =====================================================================
  dive(
    "iris-ideal",
    "CURRENT",
    "RegTech flagship for bank/institution regulatory reporting (e.g. RBI CIMS).",
    "Automated regulatory reporting for banks, credit institutions and investment firms; supports XBRL and other data standards.",
    [
      aspect("What is it?", "IRIS iDEAL is an automated financial-reporting solution that simplifies regulatory reporting for banking and financial institutions, supporting XBRL and other data standards.", IDEAL, "COMPANY_CLAIM"),
      aspect("What problem does it solve?", "Banks must produce frequent, error-sensitive returns to their supervisor, historically via error-prone Excel/spreadsheet processes. iDEAL automates generation and submission so returns are accurate and timely.", IDEAL, "INFERENCE"),
      aspect("Who buys it?", "Banks, credit institutions and investment firms — regulated financial institutions with mandatory reporting to a supervisor.", SA, "COMPANY_CLAIM"),
      aspect("Who uses it?", "Finance, regulatory-reporting and compliance teams inside those institutions; supervisors receive the output.", IDEAL, "INFERENCE"),
      aspect("What regulatory/business problem does it address?", "Supervisory/prudential reporting — the confidential, scheduled returns firms send so a supervisor can assess their health (capital, liquidity, asset quality).", IDEAL, "COMPANY_CLAIM"),
      aspect("How does it work?", "It takes the institution's source data, maps it onto the regulator's reporting taxonomy (XBRL or other formats), validates it against the mandate's rules, and generates the return for submission.", IDEAL, "INFERENCE"),
      aspect("What data goes into it?", "The institution's financial data — balance-sheet, capital, liquidity, asset-quality and other supervisory data from core systems.", IDEAL, "INFERENCE"),
      aspect("What happens to the data?", "It is transformed/mapped onto regulatory concepts, validated, and packaged into the required report format; updates can be applied when the regulator changes the mandate.", IDEAL, "INFERENCE"),
      aspect("What comes out?", "Validated, submission-ready regulatory returns to the supervisor — and, per customer testimony, reliable and compliant data generation.", IDEAL, "CUSTOMER_OPINION"),
      aspect("Major capabilities", "Automated report generation, mapping to XBRL/other standards, validation, and rapid rollout of regulatory updates.", IDEAL, "COMPANY_CLAIM"),
      aspect("Relevant regulations & standards", "XBRL and related data standards; in India, RBI regulatory returns (centralised via the RBI's CIMS programme).", IDEAL, "FACT"),
      aspect("Geography", "India is the documented market (RBI reporting); IRIS sells reporting products internationally, but iDEAL's specific non-India footprint is not publicly detailed.", IDEAL, "INFERENCE"),
      aspect("Customer examples", "MUFG Bank (RBI submissions) and at least one additional bank via testimonial (Rajeev K). The RBI's CIMS programme is implemented in partnership with IRIS.", IDEAL, "FACT"),
      aspect("Implementation model", "Enterprise software deployment for each institution, configured to its reporting obligations; IRIS supports implementation and regulatory updates.", IDEAL, "INFERENCE"),
      aspect("Technology (publicly known)", "XBRL and other data-standard engines, plus automation of report generation. Beyond this, the stack is not publicly documented.", IDEAL, "INFERENCE"),
      aspect("Integrations", "Banks' source/core banking and finance systems feed data into iDEAL; output integrates with the supervisor's collection system (e.g. RBI CIMS).", IDEAL, "INFERENCE"),
      aspect("Competitors", "Other regulatory-reporting/XBRL vendors and in-house bank reporting platforms; specific named rivals are not documented.", SA, "ANALYST_VIEW"),
      aspect("IRIS advantages", "XBRL expertise, RBI-specific implementation experience (including CIMS), and named marquee banking customers (MUFG).", IDEAL, "FACT"),
      aspect("Competitor advantages", "Large global reporting vendors (e.g. Adenza/AxiomSL, Wolters Kluwer) have broader multi-jurisdiction reporting suites and deeper bank integration.", IDEAL, "ANALYST_VIEW"),
      aspect("Limitations & gaps", "The documented footprint is India-centric; global scalability against established bank-reporting suites is unproven in public sources.", IDEAL, "INFERENCE"),
      aspect("Strategic importance to IRIS", "iDEAL is IRIS's flagship RegTech (firm-side) product — the counterpart to iFILE, letting IRIS serve both the filer and the regulator in the same reporting flow.", IDEAL, "INFERENCE"),
    ],
    [
      level(1, "One sentence", "iDEAL is the software a bank uses to automatically generate and submit the reports its regulator demands.", IDEAL, "INFERENCE"),
      level(2, "Beginner", "Banks must send their supervisor regular reports about their money, loans and risks. Doing this by hand in spreadsheets is slow and mistake-prone. iDEAL pulls the bank's own data, turns it into exactly the shape the regulator wants, checks it, and submits it.", IDEAL, "INFERENCE"),
      level(3, "Professional", "iDEAL automates supervisory reporting: it maps an institution's source data onto the regulator's taxonomy (XBRL or other standards), applies the mandate's validation rules, and produces submission-ready returns. It also helps institutions absorb regulatory change quickly — a key capability when return formats are updated.", IDEAL, "INFERENCE"),
      level(4, "Technical", "At its core iDEAL performs data transformation (internal concepts → taxonomy concepts), validation against business rules, and report serialisation into XBRL/other formats for the supervisor's collection system. RBI's CIMS is the Indian collection counterpart; iDEAL is the filer-side that produces CIMS-compatible returns.", IDEAL, "INFERENCE"),
      level(5, "Strategic", "iDEAL pairs with iFILE to give IRIS coverage of the entire reporting loop — it sells the filer-side tool to banks and the collector-side tool to the RBI. That symmetry is rare and strategically powerful: IRIS learns the mandate from the regulator side and the pain from the bank side.", IDEAL, "INFERENCE"),
    ],
    [
      step(WORKFLOW_LABELS[0], "A bank must file accurate, timely returns to its supervisor or face scrutiny and penalties.", IDEAL, "INFERENCE"),
      step(WORKFLOW_LABELS[1], "The bank's own capital, liquidity, asset-quality and financial data from core systems.", IDEAL, "INFERENCE"),
      step(WORKFLOW_LABELS[2], "IRIS iDEAL — automated regulatory-reporting engine.", IDEAL, "COMPANY_CLAIM"),
      step(WORKFLOW_LABELS[3], "Source data → mapping to taxonomy (XBRL/other) → validation → report generation.", IDEAL, "INFERENCE"),
      step(WORKFLOW_LABELS[4], "Validated, submission-ready regulatory returns to the supervisor (e.g. RBI CIMS).", IDEAL, "FACT"),
      step(WORKFLOW_LABELS[5], "Accurate, reliable and compliant reporting — reduced error risk and faster regulatory-change adoption.", IDEAL, "CUSTOMER_OPINION"),
    ],
    ["iris-ifile", "iris-carbon"]
  ),

  // =====================================================================
  // CARBON — RegTech (disclosure management)
  // =====================================================================
  dive(
    "iris-carbon",
    "CURRENT",
    "RegTech disclosure-management platform; Gap Inc. and MZ Consult are customers.",
    "Office 365-based disclosure management platform to create financial and non-financial (ESG) reports in XBRL/iXBRL.",
    [
      aspect("What is it?", "IRIS CARBON is a disclosure-management platform (built on Microsoft Office 365) for creating comprehensive financial and non-financial reports in XBRL/iXBRL formats.", CARBON, "COMPANY_CLAIM"),
      aspect("What problem does it solve?", "Companies must publish regulated disclosures in multiple formats (PDF for humans, XBRL/iXBRL for machines) and increasingly in digital ESG form. CARBON lets them author once and output to each required format.", CARBON, "INFERENCE"),
      aspect("Who buys it?", "Listed companies and other organisations with disclosure obligations — including issuers and those facing ESG/CSRD reporting.", CARBON, "INFERENCE"),
      aspect("Who uses it?", "Corporate finance, controllership, sustainability/ESG and investor-relations teams who prepare and review disclosures.", CARBON, "INFERENCE"),
      aspect("What regulatory/business problem does it address?", "Disclosure management and digital reporting — producing ESEF (EU), SEC (US) or other XBRL/iXBRL filings, plus structured ESG reporting.", CARBON, "COMPANY_CLAIM"),
      aspect("How does it work?", "Preparers author the report in Office 365 (Word/Excel), tag figures to the relevant taxonomy (XBRL/iXBRL), and render to the required formats with review workflow.", CARBON, "INFERENCE"),
      aspect("What data goes into it?", "Financial statement data and non-financial/ESG data (emissions, workforce metrics, etc.) authored by the reporting company.", CARBON, "INFERENCE"),
      aspect("What happens to the data?", "It is tagged to taxonomy concepts, validated, and packaged into XBRL/iXBRL (and PDF) documents for submission.", CARBON, "INFERENCE"),
      aspect("What comes out?", "Submission-ready XBRL/iXBRL reports (and PDF/print versions) — e.g. a digitally tagged annual or sustainability report.", CARBON, "COMPANY_CLAIM"),
      aspect("Major capabilities", "Disclosure authoring and management, XBRL/iXBRL tagging, multi-format output, and non-financial/ESG reporting.", CARBON, "COMPANY_CLAIM"),
      aspect("Relevant regulations & standards", "XBRL and iXBRL standards; ESEF (EU), US SEC XBRL, and ESG frameworks such as CSRD/ESRS.", CARBON, "FACT"),
      aspect("Geography", "US and Europe/LatAm via named customers (Gap Inc. in the US; MZ Consult serving Brazilian issuers); IRIS sells disclosure software internationally.", CARBON, "FACT"),
      aspect("Customer examples", "Gap Inc. (digital sustainability report, 2022); a major Brazilian oil & gas company via MZ Consult (multi-year disclosure & ESG contract, 2026).", CARBON, "FACT"),
      aspect("Implementation model", "SaaS (Office 365-based) delivery, with service-led implementation for issuers; MZ Consult (Brazil) acts as a disclosure/ESG delivery arm.", CARBON, "INFERENCE"),
      aspect("Technology (publicly known)", "Microsoft Office 365 integration (Word/Excel-based authoring) and XBRL/iXBRL tagging/output. Deeper technical detail is not published.", CARBON, "COMPANY_CLAIM"),
      aspect("Integrations", "Office 365 authoring environment; output feeds regulator portals (ESMA ESEF, SEC EDGAR) and print/PDF workflows.", CARBON, "INFERENCE"),
      aspect("Competitors", "Workiva (disclosure management), CoreFiling (XBRL/iXBRL), DFIN and similar SEC/ESEF filing platforms.", CARBON, "ANALYST_VIEW"),
      aspect("IRIS advantages", "Deep XBRL/iXBRL pedigree, Office 365 familiarity (lower training cost), and proven ESG/disclosure delivery (Gap Inc., MZ Consult).", CARBON, "COMPANY_CLAIM"),
      aspect("Competitor advantages", "Workiva has a larger enterprise footprint, richer collaboration/controls and a broader US SEC install base; DFIN offers full filing/printing services.", CARBON, "ANALYST_VIEW"),
      aspect("Limitations & gaps", "Against Workiva, CARBON's enterprise-scale and multi-jurisdiction coverage are less proven in public sources; capabilities beyond XBRL tagging are not detailed.", CARBON, "INFERENCE"),
      aspect("Strategic importance to IRIS", "CARBON is IRIS's vehicle for the fast-growing ESG/CSRD disclosure wave — the future-looking RegTech growth theme IRIS leadership emphasises.", CARBON, "INFERENCE"),
    ],
    [
      level(1, "One sentence", "CARBON is the tool a company uses to turn its annual and ESG reports into the machine-readable (XBRL/iXBRL) files regulators now require.", CARBON, "INFERENCE"),
      level(2, "Beginner", "A company's report used to be a PDF for humans only. Regulators now want the same report 'tagged' so computers can read every number. CARBON (inside familiar Word/Excel) lets the company tag and publish those reports — including its sustainability report — without leaving Office.", CARBON, "INFERENCE"),
      level(3, "Professional", "CARBON is a disclosure-management platform: it supports authoring, taxonomy tagging (XBRL/iXBRL), validation and multi-format rendering for regulated filings (ESEF, SEC XBRL) and ESG disclosures. It addresses the shift from document-based to data-based disclosure.", CARBON, "INFERENCE"),
      level(4, "Technical", "Built on Office 365, CARBON lets preparers tag figures to taxonomy concepts (e.g. IFRS or ESRS elements) within Word/Excel, validate against the taxonomy's rules, and serialise to Inline XBRL for ESEF/SEC submission plus PDF. The Office 365 foundation is the key architectural detail IRIS discloses.", CARBON, "COMPANY_CLAIM"),
      level(5, "Strategic", "ESG/CSRD disclosure is a large, fast-growing, still-unconsolidated market. CARBON positions IRIS at the centre of the digital-sustainability wave — a higher-growth opportunity than traditional XBRL filing, and one that leverages IRIS's core taxonomy expertise.", CARBON, "INFERENCE"),
    ],
    [
      step(WORKFLOW_LABELS[0], "A company must publish financial and ESG reports in mandated digital (XBRL/iXBRL) formats, not just PDF.", CARBON, "INFERENCE"),
      step(WORKFLOW_LABELS[1], "Financial-statement figures and non-financial ESG data authored by the company.", CARBON, "INFERENCE"),
      step(WORKFLOW_LABELS[2], "IRIS CARBON — Office 365-based disclosure management.", CARBON, "COMPANY_CLAIM"),
      step(WORKFLOW_LABELS[3], "Author in Word/Excel → tag to taxonomy → validate → render to XBRL/iXBRL + PDF.", CARBON, "INFERENCE"),
      step(WORKFLOW_LABELS[4], "Submission-ready digital reports (e.g. ESEF/ESG filings).", CARBON, "COMPANY_CLAIM"),
      step(WORKFLOW_LABELS[5], "Compliant, machine-readable disclosure — investor/regulator comparability and ESG credibility.", CARBON, "INFERENCE"),
    ],
    ["iris-ideal", "iris-iconnect"]
  ),

  // =====================================================================
  // iConnect — DataTech
  // =====================================================================
  dive(
    "iris-iconnect",
    "CURRENT",
    "DataTech analytics product for structured-reporting data.",
    "XBRL analytics in Excel — evaluate and compare XBRL/iXBRL data for better business decisions.",
    [
      aspect("What is it?", "IRIS iConnect is an XBRL analytics tool that lets users evaluate and compare XBRL/iXBRL data using the familiar Microsoft Excel format.", ICONNECT, "COMPANY_CLAIM"),
      aspect("What problem does it solve?", "XBRL makes filings machine-readable, but analysts still struggle to extract and compare that data. iConnect brings XBRL data into Excel so analysts can work with it using familiar tools.", ICONNECT, "INFERENCE"),
      aspect("Who buys it?", "Organisations that need to analyse structured filings — banks, research/analytics teams, auditors, and firms doing peer benchmarking.", ICONNECT, "INFERENCE"),
      aspect("Who uses it?", "Financial analysts, credit/equity researchers, auditors and data teams comparing companies.", ICONNECT, "INFERENCE"),
      aspect("What regulatory/business problem does it address?", "It turns the compliance output (XBRL data) into an analytical asset — enabling comparison and benchmarking across entities.", ICONNECT, "INFERENCE"),
      aspect("How does it work?", "It ingests XBRL/iXBRL filings and exposes them in Excel so users can evaluate and compare figures (e.g. revenue, assets) across many companies.", ICONNECT, "INFERENCE"),
      aspect("What data goes into it?", "XBRL/iXBRL filings — financial statements and other tagged disclosures from public filings.", ICONNECT, "COMPANY_CLAIM"),
      aspect("What happens to the data?", "It is parsed, mapped to a common structure and presented in Excel cells/sheets for analysis.", ICONNECT, "INFERENCE"),
      aspect("What comes out?", "Comparable, Excel-ready datasets and analyses (e.g. cross-company comparisons).", ICONNECT, "COMPANY_CLAIM"),
      aspect("Major capabilities", "XBRL/iXBRL data evaluation and comparison within Excel.", ICONNECT, "COMPANY_CLAIM"),
      aspect("Relevant regulations & standards", "XBRL and iXBRL.", ICONNECT, "FACT"),
      aspect("Geography", "Not publicly specified; XBRL analytics has global applicability wherever XBRL filings exist.", ICONNECT, "UNKNOWN"),
      aspect("Customer examples", "No named customers are publicly documented.", ICONNECT, "UNKNOWN"),
      aspect("Implementation model", "Not publicly documented.", ICONNECT, "UNKNOWN"),
      aspect("Technology (publicly known)", "XBRL/iXBRL parsing and Excel integration.", ICONNECT, "COMPANY_CLAIM"),
      aspect("Integrations", "Microsoft Excel; consumes XBRL/iXBRL data sources.", ICONNECT, "INFERENCE"),
      aspect("Competitors", "General XBRL analytics/viewers and specialist data vendors (e.g. Calcbench, XBRL-analytics tools).", ICONNECT, "ANALYST_VIEW"),
      aspect("IRIS advantages", "Deep XBRL expertise and the familiarity of Excel, lowering the adoption barrier for analysts.", ICONNECT, "INFERENCE"),
      aspect("Competitor advantages", "Dedicated analytics vendors (e.g. Calcbench) have richer datasets and query tooling beyond Excel.", ICONNECT, "ANALYST_VIEW"),
      aspect("Limitations & gaps", "Positioning versus richer analytics platforms is unclear; little public detail on depth, scale or customers.", ICONNECT, "INFERENCE"),
      aspect("Strategic importance to IRIS", "iConnect is the analytics bridge that turns IRIS's XBRL/DataTech heritage into a product analysts pay for — evidence that structured data has value beyond compliance.", ICONNECT, "INFERENCE"),
    ],
    [
      level(1, "One sentence", "iConnect lets analysts open and compare machine-readable company filings directly in Excel.", ICONNECT, "INFERENCE"),
      level(2, "Beginner", "Company reports are now 'tagged' (XBRL) so computers can read them. iConnect grabs that tagged data and puts it into an Excel spreadsheet, so an analyst can compare revenue or assets across hundreds of companies without retyping anything.", ICONNECT, "INFERENCE"),
      level(3, "Professional", "iConnect turns XBRL/iXBRL filings into analytical data in Excel — enabling peer comparison and benchmarking. It is IRIS's DataTech product for the analyst/auditor persona, monetising the structured data that reporting itself creates.", ICONNECT, "INFERENCE"),
      level(4, "Technical", "iConnect parses XBRL/iXBRL instance documents, resolves facts against taxonomy concepts, and presents them in an Excel-based interface for evaluation and comparison. Exact data-coverage and query capabilities are not publicly documented.", ICONNECT, "INFERENCE"),
      level(5, "Strategic", "iConnect demonstrates the 'compliance → insight' flywheel: structured reporting creates a data reservoir that analytics can mine. It positions IRIS beyond reporting into the higher-value analytics layer of DataTech.", ICONNECT, "INFERENCE"),
    ],
    [
      step(WORKFLOW_LABELS[0], "Analysts need to compare company financials but data is locked in unstructured or tagged filings.", ICONNECT, "INFERENCE"),
      step(WORKFLOW_LABELS[1], "XBRL/iXBRL filings from many companies.", ICONNECT, "COMPANY_CLAIM"),
      step(WORKFLOW_LABELS[2], "IRIS iConnect — XBRL analytics tool.", ICONNECT, "COMPANY_CLAIM"),
      step(WORKFLOW_LABELS[3], "Parse XBRL/iXBRL → resolve concepts → expose in Excel.", ICONNECT, "INFERENCE"),
      step(WORKFLOW_LABELS[4], "Comparable, Excel-ready datasets for analysis.", ICONNECT, "COMPANY_CLAIM"),
      step(WORKFLOW_LABELS[5], "Better, faster business decisions from machine-readable data.", ICONNECT, "COMPANY_CLAIM"),
    ],
    ["iris-carbon", "iris-credixo"]
  ),

  // =====================================================================
  // Credixo — DataTech
  // =====================================================================
  dive(
    "iris-credixo",
    "CURRENT",
    "DataTech credit-analytics product; capabilities thinly documented.",
    "A credit analysis model tool for banks and fintechs.",
    [
      aspect("What is it?", "IRIS Credixo is a credit-analysis model tool for banks and fintechs.", CREDIXO, "COMPANY_CLAIM"),
      aspect("What problem does it solve?", "It aims to help lenders assess credit risk — building/using credit-analysis models for lending decisions.", CREDIXO, "INFERENCE"),
      aspect("Who buys it?", "Banks and fintechs (lenders).", CREDIXO, "COMPANY_CLAIM"),
      aspect("Who uses it?", "Credit and risk teams in lending institutions.", CREDIXO, "INFERENCE"),
      aspect("What regulatory/business problem does it address?", "Credit risk assessment — supporting lending decisions and, indirectly, prudential credit-risk management.", CREDIXO, "INFERENCE"),
      aspect("How does it work?", "Not publicly documented. It is described as a 'model tool', implying model building/analysis rather than a data feed.", CREDIXO, "UNKNOWN"),
      aspect("What data goes into it?", "Not publicly documented — presumably borrower/financial data for credit analysis.", CREDIXO, "UNKNOWN"),
      aspect("What happens to the data?", "Not publicly documented.", CREDIXO, "UNKNOWN"),
      aspect("What comes out?", "Presumably credit scores/ratings or model outputs; not publicly documented.", CREDIXO, "UNKNOWN"),
      aspect("Major capabilities", "Credit analysis modelling (per company description); specifics undocumented.", CREDIXO, "COMPANY_CLAIM"),
      aspect("Relevant regulations & standards", "None specifically documented; credit-risk tooling can relate to prudential (Basel) expectations, but this is inference.", CREDIXO, "INFERENCE"),
      aspect("Geography", "Not publicly specified.", CREDIXO, "UNKNOWN"),
      aspect("Customer examples", "None publicly documented.", CREDIXO, "UNKNOWN"),
      aspect("Implementation model", "Not publicly documented.", CREDIXO, "UNKNOWN"),
      aspect("Technology (publicly known)", "Not publicly documented.", CREDIXO, "UNKNOWN"),
      aspect("Integrations", "Not publicly documented.", CREDIXO, "UNKNOWN"),
      aspect("Competitors", "Established credit-scoring/decisioning vendors (e.g. Experian, TransUnion, and fintech credit-decisioning tools).", CREDIXO, "ANALYST_VIEW"),
      aspect("IRIS advantages", "Access to structured reporting data (XBRL) could enrich credit analysis; this is inference, not a documented differentiator.", CREDIXO, "INFERENCE"),
      aspect("Competitor advantages", "Bureau-scale data assets and mature decisioning platforms that Credixo cannot be shown to match on public evidence.", CREDIXO, "INFERENCE"),
      aspect("Limitations & gaps", "Very little public information exists about Credixo's actual capability, customers or traction — the biggest evidence gap in the portfolio.", CREDIXO, "INFERENCE"),
      aspect("Strategic importance to IRIS", "Credixo (with MSME) represents IRIS's DataTech push into credit analytics; its strategic weight is unclear given the evidence gap.", CREDIXO, "INFERENCE"),
    ],
    [
      level(1, "One sentence", "Credixo is IRIS's credit-analysis modelling tool for banks and fintechs.", CREDIXO, "COMPANY_CLAIM"),
      level(2, "Beginner", "When a bank decides whether to lend, it needs to judge how likely it is to be repaid. Credixo is a tool to help build and use those credit-analysis models.", CREDIXO, "INFERENCE"),
      level(3, "Professional", "Credixo is positioned as a credit-analysis model tool for lenders, forming part of IRIS's DataTech segment alongside iConnect. Beyond the product category, public detail is minimal.", CREDIXO, "INFERENCE"),
      level(4, "Technical", "No technical detail (data inputs, modelling approach, deployment model) is publicly documented — treat specific capabilities as unknown.", CREDIXO, "UNKNOWN"),
      level(5, "Strategic", "Credixo signals IRIS's intent to move DataTech beyond XBRL analytics into credit analytics. Its strategic contribution is currently unverifiable given the lack of public evidence.", CREDIXO, "INFERENCE"),
    ],
    [
      step(WORKFLOW_LABELS[0], "Lenders need to assess credit risk when making lending decisions.", CREDIXO, "INFERENCE"),
      step(WORKFLOW_LABELS[1], "Borrower/financial data (specifics undocumented).", CREDIXO, "UNKNOWN"),
      step(WORKFLOW_LABELS[2], "IRIS Credixo — credit analysis model tool.", CREDIXO, "COMPANY_CLAIM"),
      step(WORKFLOW_LABELS[3], "Model-based credit analysis (specifics undocumented).", CREDIXO, "UNKNOWN"),
      step(WORKFLOW_LABELS[4], "Credit-analysis outputs (specifics undocumented).", CREDIXO, "UNKNOWN"),
      step(WORKFLOW_LABELS[5], "Better-informed credit decisions (inferred).", CREDIXO, "INFERENCE"),
    ],
    ["iris-iconnect", "iris-msme"]
  ),

  // =====================================================================
  // MSME — DataTech / financial inclusion
  // =====================================================================
  dive(
    "iris-msme",
    "CURRENT",
    "Referenced in the Goa MoU (Feb 2025) and Screener notes; product detail limited.",
    "Platform combining digital tools with financial/credit access for micro, small and medium enterprises.",
    [
      aspect("What is it?", "IRIS MSME is a platform aimed at micro, small and medium enterprises, combining digital tools with financial (credit) access.", MSME, "INFERENCE"),
      aspect("What problem does it solve?", "MSMEs often lack the structured financial data and credit history needed to access formal credit; IRIS MSME aims to improve MSME credit access.", MSME, "INFERENCE"),
      aspect("Who buys it?", "Unclear — the Goa MoU suggests government/state partnerships; end-beneficiaries are MSMEs.", MSME, "INFERENCE"),
      aspect("Who uses it?", "MSMEs (and possibly lenders/governments facilitating credit).", MSME, "INFERENCE"),
      aspect("What regulatory/business problem does it address?", "MSME financial inclusion and credit access — a policy priority in India.", MSME, "FACT"),
      aspect("How does it work?", "Not publicly documented in detail; the Goa MoU centres on improving MSME credit access.", MSME, "UNKNOWN"),
      aspect("What data goes into it?", "Presumably MSME business/financial data used to assess creditworthiness.", MSME, "INFERENCE"),
      aspect("What happens to the data?", "Not publicly documented.", MSME, "UNKNOWN"),
      aspect("What comes out?", "Presumably credit-readiness/eligibility signals for MSMEs and lenders.", MSME, "INFERENCE"),
      aspect("Major capabilities", "MSME digital tools and credit facilitation (per MoU and Screener); specifics undocumented.", MSME, "INFERENCE"),
      aspect("Relevant regulations & standards", "Indian MSME and financial-inclusion policy (e.g. MSME Development Act); no specific standard documented.", MSME, "INFERENCE"),
      aspect("Geography", "India (Goa MoU, Feb 2025).", MSME, "FACT"),
      aspect("Customer examples", "Goa government MoU (Feb 2025) to boost MSME credit.", MSME, "FACT"),
      aspect("Implementation model", "Government/state partnership model (per the Goa MoU); broader model unclear.", MSME, "INFERENCE"),
      aspect("Technology (publicly known)", "Not publicly documented.", MSME, "UNKNOWN"),
      aspect("Integrations", "Not publicly documented.", MSME, "UNKNOWN"),
      aspect("Competitors", "MSME credit/fintech platforms (e.g. account-aggregator-based lenders, TReDS platforms).", MSME, "ANALYST_VIEW"),
      aspect("IRIS advantages", "IRIS's structured-data and XBRL expertise could underpin MSME credit-readiness; this is inference.", MSME, "INFERENCE"),
      aspect("Competitor advantages", "Dedicated MSME fintechs have existing distribution and lender relationships.", MSME, "INFERENCE"),
      aspect("Limitations & gaps", "Public evidence is very thin — little clarity on what the platform does, how it monetises, or its scale.", MSME, "INFERENCE"),
      aspect("Strategic importance to IRIS", "MSME links IRIS's DataTech segment to a large Indian financial-inclusion opportunity, but its strategic value is unproven on current evidence.", MSME, "INFERENCE"),
    ],
    [
      level(1, "One sentence", "IRIS MSME is a platform to help India's small businesses get digital tools and better access to credit.", MSME, "INFERENCE"),
      level(2, "Beginner", "Small businesses often struggle to get loans because they lack tidy financial records. IRIS MSME is a platform intended to help them — including via a partnership with the Goa government to improve MSME credit access.", MSME, "INFERENCE"),
      level(3, "Professional", "IRIS MSME sits in IRIS's DataTech segment as a financial-inclusion play, evidenced by the Feb 2025 Goa MoU. Its precise product mechanics and business model are not publicly documented.", MSME, "INFERENCE"),
      level(4, "Technical", "No technical detail is publicly documented — data inputs, credit-assessment approach and integrations are unknown.", MSME, "UNKNOWN"),
      level(5, "Strategic", "MSME is a bet on India's large MSME credit gap and on IRIS's ability to apply structured-data expertise to financial inclusion. It is early and unproven in public disclosures.", MSME, "INFERENCE"),
    ],
    [
      step(WORKFLOW_LABELS[0], "MSMEs are credit-starved because lenders lack reliable data on them.", MSME, "INFERENCE"),
      step(WORKFLOW_LABELS[1], "MSME business/financial data (specifics undocumented).", MSME, "INFERENCE"),
      step(WORKFLOW_LABELS[2], "IRIS MSME — digital tools + credit-access platform.", MSME, "INFERENCE"),
      step(WORKFLOW_LABELS[3], "Data structuring / credit-readiness (specifics undocumented).", MSME, "UNKNOWN"),
      step(WORKFLOW_LABELS[4], "Credit-readiness signals for MSMEs and lenders (inferred).", MSME, "INFERENCE"),
      step(WORKFLOW_LABELS[5], "Improved MSME access to formal credit.", MSME, "FACT"),
    ],
    ["iris-credixo"]
  ),

  // =====================================================================
  // TaxTech products — DIVESTED to Sovos (Aug 2025)
  // Each kept a complete (if concise) dive so the deep page is populated,
  // but every body flags that IRIS no longer owns the product.
  // =====================================================================
  divestedDive(
    "iris-gst",
    "A GST filing solution with an ERP connector, reconciliation module, vendor management and MIS/reports.",
    "Periodic GST return filing (GSTR forms), reconciliation of input tax credit with vendor data, and tax MIS/reporting.",
    "ERP connector, reconciliation, vendor management, MIS/reports."
  ),
  divestedDive(
    "iris-einvoicing",
    "An e-invoicing solution with integrated GST compliance and reconciliation.",
    "Generating GST e-invoices and obtaining Invoice Reference Numbers (IRN) from the IRP, with reconciliation to returns.",
    "E-invoice generation, IRP integration (IRN), GST reconciliation."
  ),
  divestedDive(
    "iris-irp",
    "An Invoice Registration Portal (IRP) connection solution for taxpayers.",
    "Connecting a taxpayer's systems to the GST Invoice Registration Portal to register e-invoices.",
    "IRP connectivity and e-invoice registration."
  ),
  divestedDive(
    "iris-zircon",
    "APIs for GST, e-way bill and e-invoicing for enterprises and partners.",
    "Programmatic access to GST filing, e-way bill generation and e-invoicing for integration into enterprise systems.",
    "GST, e-way bill and e-invoicing APIs."
  ),
  divestedDive(
    "iris-lms",
    "A Direct Tax (DT) and Indirect Tax (IDT) litigation management tool to simplify GST audits and litigations for enterprises.",
    "Managing tax notices, GST audits and litigation workflows for enterprises.",
    "Notice management, litigation workflow, audit support (DT + IDT)."
  ),
  divestedDive(
    "iris-peridot",
    "An app for GST counterparty verification.",
    "Verifying the GST registration/status of counterparties (suppliers/customers) before transacting.",
    "GST counterparty verification."
  ),
];

function divestedDive(
  productId: string,
  functionDesc: string,
  problemDesc: string,
  capabilities: string
): ProductDeepDive {
  const note =
    "Divested — part of the APAC Tax Technology (GST) ASP business sold to Sovos in Aug 2025 (~₹151 Cr). IRIS no longer owns/sells this product.";
  const src = TAX;
  const aspects: ProductAspect[] = [
    aspect("What is it?", `${functionDesc} ${note}`, src, "FACT"),
    aspect("What problem does it solve?", `${problemDesc}`, src, "COMPANY_CLAIM"),
    aspect("Who buys it?", "Indian enterprises and tax professionals managing GST compliance (historically, when IRIS owned it).", src, "COMPANY_CLAIM"),
    aspect("Who uses it?", "Finance and tax teams in enterprises, and tax practitioners.", src, "INFERENCE"),
    aspect("What regulatory/business problem does it address?", "Indian GST and e-invoicing compliance (CGST Act 2017; e-invoicing mandate).", src, "FACT"),
    aspect("How does it work?", `${problemDesc}`, src, "INFERENCE"),
    aspect("What data goes into it?", "Transactional, invoice and GST-filing data from enterprise systems.", src, "INFERENCE"),
    aspect("What happens to the data?", "It was transformed into GST-compliant filings/invoices and submitted to the GSTN/IRP systems.", src, "INFERENCE"),
    aspect("What comes out?", "Filed GST returns, registered e-invoices, reconciliation and compliance reports.", src, "INFERENCE"),
    aspect("Major capabilities", `${capabilities}`, src, "COMPANY_CLAIM"),
    aspect("Relevant regulations & standards", "Indian GST (CGST Act 2017) and the GST e-invoicing mandate.", src, "FACT"),
    aspect("Geography", "India (APAC Tax Technology business).", src, "FACT"),
    aspect("Customer examples", "Not individually named in the divestment disclosures.", src, "UNKNOWN"),
    aspect("Implementation model", "ASP (application service provider) / SaaS model for GST compliance — the 'ASP business' Sovos acquired.", src, "FACT"),
    aspect("Technology (publicly known)", "Not documented beyond the product category.", src, "UNKNOWN"),
    aspect("Integrations", "ERP connectors (GST software) and APIs (Zircon); IRP/GSTN systems.", src, "INFERENCE"),
    aspect("Competitors", "ClearTax, Avalara, and other GST/e-invoicing ASPs; Sovos (now the owner) competes in the same space.", src, "ANALYST_VIEW"),
    aspect("IRIS advantages", "Early mover in India's post-2017 GST automation; integrated suite (filing, e-invoicing, litigation).", src, "COMPANY_CLAIM"),
    aspect("Competitor advantages", "ClearTax's large SMB distribution; Avalara's global compliance platform.", src, "ANALYST_VIEW"),
    aspect("Limitations & gaps", "IRIS divested the business — positioning it as non-core relative to RegTech/SupTech/DataTech; the GST ASP market is crowded and price-competitive.", src, "INFERENCE"),
    aspect("Strategic importance to IRIS", "Now historical: it funded growth after 2017 but was sold (₹151 Cr) to sharpen focus on RegTech/SupTech/DataTech and strengthen the balance sheet.", src, "FACT"),
  ];
  const levels: ProductLevel[] = [
    level(1, "One sentence", `IRIS's ${functionDesc.split(" ").slice(0, 3).join(" ")} — now divested to Sovos.`, src, "FACT"),
    level(2, "Beginner", `This product handled a slice of Indian GST compliance (${problemDesc.toLowerCase()}). IRIS sold its entire GST/TaxTech business to Sovos in 2025, so this is now a historical IRIS product.`, src, "FACT"),
    level(3, "Professional", `A TaxTech ASP product in IRIS's former GST portfolio (${problemDesc.toLowerCase()}). It was part of the APAC Tax Technology business divested to Sovos (Aug 2025, ~₹151 Cr) as IRIS refocused on RegTech, SupTech and DataTech.`, src, "FACT"),
    level(4, "Technical", `Technical detail was never deeply public; the product operated as part of IRIS's GST ASP stack (${capabilities.toLowerCase()}). Ownership transferred to Sovos in 2025.`, src, "INFERENCE"),
    level(5, "Strategic", `The TaxTech divestment shows IRIS choosing focus over breadth: GST compliance was high-volume but price-competitive and capital-hungry, whereas RegTech/SupTech/DataTech offer stickier regulator relationships and higher strategic value.`, src, "INFERENCE"),
  ];
  const workflow: ProductWorkflowStep[] = [
    step(WORKFLOW_LABELS[0], `Enterprises needed automated GST compliance (${problemDesc.toLowerCase()}).`, src, "INFERENCE"),
    step(WORKFLOW_LABELS[1], "Transactional/invoice/GST data from enterprise systems.", src, "INFERENCE"),
    step(WORKFLOW_LABELS[2], `IRIS ${functionDesc.split(" ").slice(0, 2).join(" ")} (TaxTech, now Sovos).`, src, "FACT"),
    step(WORKFLOW_LABELS[3], "Data → GST-compliant processing → submission/reconciliation.", src, "INFERENCE"),
    step(WORKFLOW_LABELS[4], "Filed returns, registered e-invoices, reconciliation reports.", src, "INFERENCE"),
    step(WORKFLOW_LABELS[5], "Automated GST compliance (value now delivered by Sovos).", src, "FACT"),
  ];
  return dive(productId, "DIVESTED", note, functionDesc, aspects, levels, workflow, []);
}

export function getProductDive(id: string): ProductDeepDive | undefined {
  return productDeepDives.find((d) => d.productId === id);
}

// ---------------------------------------------------------------------------
// Product ecosystem
// ---------------------------------------------------------------------------
export const productEcosystem: ProductEcosystem = {
  segments: {
    SupTech: ["iris-ifile"],
    RegTech: ["iris-ideal", "iris-carbon"],
    DataTech: ["iris-iconnect", "iris-credixo", "iris-msme"],
    "TaxTech (divested to Sovos)": ["iris-gst", "iris-einvoicing", "iris-irp", "iris-zircon", "iris-lms", "iris-peridot"],
  },
  links: [
    { from: "iris-ifile", to: "iris-iconnect", note: "Regulator-collected XBRL data is the raw material iConnect analyses." },
    { from: "iris-carbon", to: "iris-iconnect", note: "CARBON creates the XBRL/iXBRL data iConnect consumes." },
    { from: "iris-ideal", to: "iris-ifile", note: "iDEAL (filer-side) produces returns that iFILE (regulator-side) collects." },
    { from: "iris-carbon", to: "iris-ideal", note: "Both are RegTech reporting products; CARBON is public disclosure, iDEAL is supervisory." },
    { from: "iris-credixo", to: "iris-msme", note: "Both are DataTech bets on credit analytics/financial inclusion." },
    { from: "iris-iconnect", to: "iris-credixo", note: "Sibling DataTech analytics products on structured data." },
  ],
  description:
    "IRIS's products form a reporting loop: **iFILE** (regulator side) collects the structured data that **iDEAL** (bank side) produces and that **CARBON** (disclosure) publishes; **iConnect** and **Credixo** then mine that structured data for analytics. The **TaxTech** products (GST, e-invoicing, IRP, Zircon, LMS, Peridot) were divested to Sovos in 2025 and no longer sit inside IRIS's ecosystem.",
};
