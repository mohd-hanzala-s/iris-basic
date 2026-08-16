import type { Concept, ConceptSection, Certainty } from "./types";

/**
 * Concept explainers — the heart of the RegTech domain layer. Each concept is
 * explained at multiple levels (simple → professional → example → rationale →
 * relevance to firms/regulators → IRIS participation) so the learner can move
 * from intuition to professional fluency.
 */

type SectionInput = [heading: string, body: string, sources?: readonly string[], certainty?: Certainty];

function sections(...rows: SectionInput[]): ConceptSection[] {
  return rows.map(([heading, body, sources, certainty]) => ({
    heading,
    body,
    sources: sources ? [...sources] : undefined,
    certainty,
  }));
}

const S = {
  xbrl: ["xbrl-what-is"],
  ixbrl: ["xbrl-ixbrl"],
  sdmx: ["sdmx-home"],
  fca: ["fca-regtech"],
  bis: ["bis-suptech-generations"],
  esma: ["esma-esef"],
  bcbs: ["bcbs239"],
  iris: ["stockanalysis-company-profile"],
} as const;

function concept(
  id: string,
  name: string,
  group: string,
  summary: string,
  description: string,
  sources: readonly string[],
  tags: string[],
  secs: SectionInput[],
  certainty: Certainty = "FACT"
): Concept {
  return { id, name, group, summary, description, sources: [...sources], tags, sections: sections(...secs), certainty };
}

export const concepts: Concept[] = [
  // ----------------------------------------------------------------- Core
  concept(
    "regtech",
    "RegTech",
    "Core concepts",
    "Technology that helps regulated firms meet their compliance, reporting and monitoring obligations more efficiently.",
    "The UK Financial Conduct Authority (FCA) defines RegTech as new technologies developed to help overcome regulatory challenges in financial services. RegTech is usually treated as a subset of, or sibling to, FinTech, but its demand driver is regulation rather than market opportunity — which makes it largely non-discretionary spend for regulated firms.",
    [...S.fca],
    ["regtech", "regulatory", "core"],
    [
      ["Simple explanation", "Software that does the boring-but-critical job of keeping a company on the right side of the rules — filing reports, checking compliance, spotting risks — automatically instead of with spreadsheets and manual effort.", S.fca],
      ["Professional explanation", "RegTech encompasses a broad set of technologies — structured data standards, automated reporting, workflow automation, analytics, and increasingly AI — applied to regulatory compliance. It spans reporting, monitoring, risk management, identity/AML, and regulatory change management. The category crystallised after the 2008 financial crisis, when the volume of regulation grew faster than firms' capacity to comply manually.", S.fca],
      ["Real-world example", "A bank that once had a team manually aggregating spreadsheets to produce its monthly capital return to the central bank now uses RegTech software to extract, validate and submit the return automatically.", S.fca],
      ["Why it exists", "Regulation has grown sharply since 2008 (capital, liquidity, conduct, AML, ESG), and manual compliance does not scale — it is slow, error-prone and expensive. The FCA's 2015 Call for Input on supporting RegTech formally recognised this and catalysed the market.", S.fca],
      ["Why it matters to financial institutions", "Compliance is a large, growing cost centre and a source of operational risk. RegTech reduces cost, errors and the risk of fines, and shortens time-to-compliance when rules change.", S.fca, "INFERENCE"],
      ["Why it matters to regulators", "RegTech improves the quality, timeliness and consistency of the data regulators receive, making supervision more effective. Regulators such as the FCA actively support the ecosystem (innovation hubs, sandboxes, TechSprints).", S.fca],
      ["How companies like IRIS participate", "RegTech is IRIS's core market. IRIS sells reporting, XBRL disclosure and tax-compliance products (IRIS CARBON, IRIS iDEAL, IRIS GST) to corporates and banks — i.e. it is a RegTech vendor on the firm side.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  concept(
    "suptech",
    "SupTech",
    "Core concepts",
    "Technology used by regulators and supervisors themselves to collect, validate and analyse data from the entities they oversee.",
    "The Bank for International Settlements (BIS) defines SupTech as the application of big data or artificial intelligence to tools used by financial authorities. It is the regulator-side mirror of RegTech. BIS's 'suptech generations' framing traces an evolution from basic data collection toward AI-driven analysis.",
    [...S.bis, ...S.iris],
    ["suptech", "regulatory", "core"],
    [
      ["Simple explanation", "Regulators face the mirror image of the compliance problem: they receive more data than humans can review. SupTech is their software for collecting it, checking it, and making sense of it.", S.bis],
      ["Professional explanation", "SupTech refers to technologies deployed *inside* a financial authority — data collection portals, automated validation, big-data analytics and AI — to supervise markets and institutions. BIS notes it is still relatively nascent and experimental, with use cases concentrated in misconduct analysis, reporting and data management.", S.bis],
      ["Real-world example", "A central bank runs a portal (SupTech) where all banks upload their returns; the system validates them on entry and flags anomalies for examiners automatically.", S.bis],
      ["Why it exists", "Authorities must monitor thousands of firms with finite examiner resources; technology lets them do data-driven, risk-based supervision rather than purely manual review.", S.bis],
      ["Why it matters to financial institutions", "Firms interact with SupTech as the other end of their filing — cleaner collection systems mean fewer resubmissions and clearer feedback loops.", S.bis, "INFERENCE"],
      ["Why it matters to regulators", "SupTech is how regulators achieve efficiency, coverage and early-warning capability in supervision.", S.bis],
      ["How companies like IRIS participate", "SupTech is a named IRIS segment. IRIS iFILE (an electronic filing platform to collect, validate and analyse data from entities) and IRIS iDEAL are SupTech products sold to central banks, registries, capital-market regulators and exchanges.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  concept(
    "datatech",
    "DataTech",
    "Core concepts",
    "Data-focused technology — analytics, credit models and data tooling. IRIS uses 'DataTech' as one of its four operating segments.",
    "Unlike RegTech and SupTech, 'DataTech' is not a widely standardised global industry term — it is more commonly used to describe data-management and analytics technology generally. IRIS specifically uses it as one of its four operating segments (SupTech, RegTech, TaxTech, DataTech), covering data analytics, credit analytics and XBRL data tooling.",
    [...S.iris],
    ["datatech", "data", "iris-segment"],
    [
      ["Simple explanation", "Once data is structured and machine-readable, you can analyse it. DataTech is the layer that turns raw data into insight — analytics, models and tools.", S.iris, "INFERENCE"],
      ["Professional explanation", "IRIS's DataTech segment covers analytical products built on structured data: IRIS iConnect (XBRL analysis in Excel) and IRIS Credixo (credit-analysis models for banks and fintechs). More broadly, 'DataTech' in industry denotes data-management and analytics technology.", S.iris],
      ["Real-world example", "A bank uses IRIS Credixo to build a credit-analysis model, or an analyst uses IRIS iConnect to compare XBRL filings across thousands of companies.", S.iris],
      ["Why it exists", "Structured reporting (XBRL) creates a reservoir of comparable data; analytics is how that data becomes valuable to firms and regulators.", S.iris, "INFERENCE"],
      ["Why it matters to financial institutions", "Analytics on structured data supports credit decisions, benchmarking and risk assessment — turning a compliance cost into an asset.", S.iris, "INFERENCE"],
      ["Why it matters to regulators", "Analytical capability over collected data is the end-goal of SupTech; data tools enable it.", S.bis, "INFERENCE"],
      ["How companies like IRIS participate", "DataTech is literally an IRIS segment name; iConnect and Credixo are its DataTech products. Note: the term's broader industry usage is less settled than RegTech/SupTech.", S.iris, "COMPANY_CLAIM"],
    ],
    "INFERENCE"
  ),

  concept(
    "fintech-vs-regtech",
    "FinTech vs RegTech",
    "Core concepts",
    "FinTech delivers financial services; RegTech manages the compliance obligations that come with them. Different jobs, overlapping skills.",
    "FinTech improves or disrupts the delivery of financial services (payments, lending, investing). RegTech addresses the regulatory obligations attached to financial activity. The two share tooling but differ in buyer, demand driver and business model: RegTech demand is regulation-driven and largely non-discretionary; FinTech demand is service/market-driven.",
    [...S.fca],
    ["fintech", "regtech", "core"],
    [
      ["Simple explanation", "FinTech = tech that helps people use money (payments, lending apps). RegTech = tech that helps firms follow the rules. A payment app is FinTech; the software that files its reports to the regulator is RegTech.", S.fca, "INFERENCE"],
      ["Professional explanation", "The two categories are adjacent and often grouped under 'FinTech' in broad usage (Bloomberg, for example, describes IRIS as a fintech). But RegTech is B2B, regulation-driven and tied to compliance infrastructure, whereas consumer FinTech is product- and user-driven. Regulators run innovation programmes that cover both.", S.fca],
      ["Real-world example", "A neobank (FinTech) builds a slick payments app — but must still run AML checks and file returns; it buys or builds RegTech to do so.", S.fca, "INFERENCE"],
      ["Why it exists", "The distinction matters for understanding who buys, why, and whether spend is discretionary. RegTech spend survives downturns because it is mandated.", S.fca, "INFERENCE"],
      ["Why it matters to financial institutions", "Banks and firms allocate budget to both, but treat them differently — growth investment vs. compliance cost that must be managed.", S.fca, "INFERENCE"],
      ["Why it matters to regulators", "Regulators engage both ecosystems, but RegTech vendors specifically become infrastructure for supervision.", S.fca, "INFERENCE"],
      ["How companies like IRIS participate", "IRIS is squarely RegTech/SupTech — it does not sell consumer financial services. Its 'fintech' descriptor in some databases reflects loose industry usage rather than consumer FinTech.", S.iris, "ANALYST_VIEW"],
    ],
    "INFERENCE"
  ),

  // ----------------------------------------------------------------- Reporting
  concept(
    "regulatory-reporting",
    "Regulatory Reporting",
    "Reporting",
    "The structured submission of required data to a regulator, in a prescribed format and on a schedule.",
    "Regulatory reporting is the recurring, mandated submission of quantitative and qualitative data to a regulator — prudential, statistical, tax, or disclosure — in the format and timeframe the regulator specifies. It is the core workload that RegTech automates, and it is increasingly digital and machine-readable (XBRL, iXBRL, APIs).",
    [...S.esma, ...S.iris],
    ["regulatory-reporting", "reporting", "core"],
    [
      ["Simple explanation", "Formally sending the numbers and facts a regulator demands, in the exact shape it wants, by the deadline.", S.esma, "INFERENCE"],
      ["Professional explanation", "Regulatory reporting covers a wide set of obligations: prudential returns to central banks, statistical reports, tax filings, and structured public disclosures. Each framework is defined by a taxonomy or schema that dictates what must be reported and how. Failure to report accurately or on time carries penalties.", S.esma],
      ["Real-world example", "An EU-listed company files its annual report in ESEF format (XHTML + Inline XBRL), or a bank files prudential returns to its supervisor.", S.esma],
      ["Why it exists", "Regulators need standardised, comparable data to assess risk and health across the financial system; that requires firms to report in a uniform way.", S.esma, "INFERENCE"],
      ["Why it matters to financial institutions", "Reporting is a heavy recurring cost with material error/fine risk; automating and error-proofing it is a direct cost saving and risk reduction.", S.esma, "INFERENCE"],
      ["Why it matters to regulators", "The quality and comparability of reported data determine the effectiveness of supervision and policy.", S.esma, "INFERENCE"],
      ["How companies like IRIS participate", "IRIS products are reporting tools: IRIS iDEAL (regulatory reporting for banks, credit institutions, investment firms), IRIS CARBON (XBRL/iXBRL reporting), IRIS GST (tax filing).", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  concept(
    "regulatory-compliance",
    "Regulatory Compliance",
    "Compliance",
    "Ensuring an organisation meets all the laws, rules and standards that apply to it.",
    "Compliance is the set of governance, control and reporting processes by which an organisation demonstrates it meets its legal and regulatory obligations. RegTech automates portions of compliance — monitoring, screening, reporting, evidence-gathering — but compliance remains an organisational discipline, not just software.",
    [...S.fca],
    ["compliance", "regulatory", "core"],
    [
      ["Simple explanation", "Following all the rules that apply to your business — and being able to prove it.", S.fca, "INFERENCE"],
      ["Professional explanation", "Compliance spans licensing and authorisation, conduct rules, capital and liquidity requirements, AML/financial-crime controls, and reporting. Regulated firms must maintain demonstrable, auditable compliance; failures lead to fines, remediation orders or loss of licence.", S.fca, "INFERENCE"],
      ["Real-world example", "A bank runs AML screening, keeps a compliance team tracking rules, and files periodic returns — all part of compliance.", S.fca, "INFERENCE"],
      ["Why it exists", "Regulation exists to protect consumers and market integrity; compliance is how firms meet it, and regulators verify it through data and examinations.", S.fca],
      ["Why it matters to financial institutions", "Compliance is a licence to operate and a major cost; getting it wrong has severe consequences, so firms invest in efficiency and reliability.", S.fca, "INFERENCE"],
      ["Why it matters to regulators", "The entire point of regulation is achieved (or not) through firms' compliance; regulators assess it via reported data and supervision.", S.fca, "INFERENCE"],
      ["How companies like IRIS participate", "IRIS automates the reporting and tax-compliance portion: reporting products, GST/e-invoicing compliance, and litigation management (IRIS LMS) for tax disputes.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  concept(
    "supervisory-reporting",
    "Supervisory Reporting",
    "Reporting",
    "The confidential, often high-frequency reports firms send specifically so a supervisor can assess their health and behaviour.",
    "Supervisory reporting is the subset of regulatory reporting produced *for supervision* — prudential and conduct supervision of individual firms — as distinct from tax filing or public disclosure. It tends to be more granular, more frequent, and confidential. It is the data that feeds a regulator's SupTech systems.",
    [...S.bis, ...S.iris],
    ["supervisory-reporting", "reporting", "suptech"],
    [
      ["Simple explanation", "The private reports a firm sends its supervisor about how much risk it is carrying and how it is behaving.", S.bis, "INFERENCE"],
      ["Professional explanation", "Supervisory returns (e.g. capital, liquidity, asset quality) let supervisors monitor solvency, concentration and conduct between examinations. They are usually confidential and more demanding than public disclosures, and are increasingly collected via structured, machine-readable formats.", S.bis],
      ["Real-world example", "A bank's confidential liquidity report to its central bank, filed monthly, versus its public annual report.", S.bis, "INFERENCE"],
      ["Why it exists", "Supervisors need near-real-time, granular visibility into individual firms to catch risk early — information public disclosures don't provide.", S.bis, "INFERENCE"],
      ["Why it matters to financial institutions", "Supervisory reporting is high-stakes and high-effort; errors can trigger supervisory scrutiny.", S.bis, "INFERENCE"],
      ["Why it matters to regulators", "Supervisory reporting is the raw material of supervision; its quality drives supervisory effectiveness.", S.bis],
      ["How companies like IRIS participate", "IRIS iDEAL serves banks/credit institutions/investment firms' supervisory reporting; IRIS iFILE is the regulator-side collection system that receives it.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  concept(
    "digital-reporting",
    "Digital Reporting",
    "Reporting",
    "Producing and filing reports as structured, machine-readable data rather than paper or PDF.",
    "Digital reporting is the umbrella term for machine-readable reporting — XBRL/iXBRL, structured formats and APIs — that replaces manual, document-based filing. Regulators are moving toward it wholesale: the FCA's Digital Regulatory Reporting programme explores making rules machine-executable, and the EU's ESEF mandates digital annual reports.",
    [...S.xbrl, ...S.fca, ...S.esma],
    ["digital-reporting", "reporting", "xbrl"],
    [
      ["Simple explanation", "Instead of a PDF someone has to read by hand, the report is data a computer can read directly.", S.xbrl, "INFERENCE"],
      ["Professional explanation", "Digital reporting standardises both the data and its meaning (via taxonomies), enabling automated validation, comparison and analysis at scale. It turns reporting from a document exercise into a data pipeline.", S.xbrl],
      ["Real-world example", "ESEF requires EU issuers to file annual reports as XHTML with Inline XBRL tags, not PDF.", S.esma],
      ["Why it exists", "Manual document reporting doesn't scale; regulators and investors need data they can aggregate and analyse across thousands of entities.", S.xbrl],
      ["Why it matters to financial institutions", "The transition from documents to data pipelines is a significant operational shift, but it lowers long-run reporting cost and error rates.", S.xbrl, "INFERENCE"],
      ["Why it matters to regulators", "Digital reporting enables automated validation, analytics and AI — the foundation of modern supervision.", S.xbrl],
      ["How companies like IRIS participate", "Digital reporting is IRIS's entire business: CARBON creates XBRL/iXBRL reports, iFILE collects/validates/analyses them, iDEAL and GST cover regulated returns.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  concept(
    "disclosure-management",
    "Disclosure Management",
    "Reporting",
    "The discipline of preparing, managing and publishing required financial and non-financial disclosures in the correct formats.",
    "Disclosure management assembles regulated disclosures — annual reports, sustainability statements, multi-jurisdiction filings — with version control, review workflows, and output to multiple formats (XBRL, iXBRL, PDF, print). IRIS is explicitly described as providing disclosure management alongside XBRL/iXBRL reporting.",
    [...S.iris, ...S.esma],
    ["disclosure-management", "reporting"],
    [
      ["Simple explanation", "Getting all the reports a company must publish right — content, format and deadlines — without manual chaos.", S.iris, "INFERENCE"],
      ["Professional explanation", "Disclosure management platforms let preparers author a disclosure once and render it to every required format (e.g. ESEF iXBRL and PDF), with controls for review, approval and audit trail. This is where reporting accuracy and efficiency meet.", S.esma],
      ["Real-world example", "A listed company prepares its annual report once and outputs ESEF iXBRL for the regulator, plus PDF for investors and print for the AGM.", S.esma, "INFERENCE"],
      ["Why it exists", "Disclosure obligations are numerous, format-specific and error-sensitive; a managed process is essential at scale.", S.esma, "INFERENCE"],
      ["Why it matters to financial institutions", "Efficient, accurate disclosure reduces cost, avoids refilings, and supports capital-market credibility.", S.esma, "INFERENCE"],
      ["Why it matters to regulators", "Well-formed disclosures improve the quality and comparability of the public filings regulators rely on.", S.esma, "INFERENCE"],
      ["How companies like IRIS participate", "IRIS CARBON is a disclosure/XBRL reporting platform, and IRIS's company description lists disclosure management as a core offering.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  concept(
    "esg-reporting",
    "ESG Reporting",
    "Reporting",
    "Disclosing environmental, social and governance performance in a standardised, increasingly machine-readable form.",
    "ESG (Environmental, Social, Governance) reporting is being mandated across jurisdictions — the EU's CSRD/ESRS is the leading example, and ESMA is planning to extend ESEF to digitally tag sustainability disclosures. XBRL is the chosen mechanism for making ESG data structured and comparable.",
    [...S.esma, ...S.xbrl, ...S.iris],
    ["esg", "reporting", "sustainability"],
    [
      ["Simple explanation", "Companies must now report their climate and social impact in a standard, comparable format — not just marketing.", S.esma, "INFERENCE"],
      ["Professional explanation", "Sustainability reporting is moving from voluntary to mandatory, with standards (ESRS, ISSB) and digital tagging (iXBRL). ESG data must be structured, assured and machine-readable to be decision-useful and to combat greenwashing.", S.esma],
      ["Real-world example", "An EU company tags its emissions and workforce metrics in Inline XBRL under the ESRS taxonomy, alongside its financial statements.", S.esma],
      ["Why it exists", "Investors and regulators demand comparable, trustworthy sustainability data; voluntary, unstructured disclosures failed to provide it.", S.esma, "INFERENCE"],
      ["Why it matters to financial institutions", "ESG is a fast-growing, data-heavy compliance burden that many firms are not yet equipped to handle.", S.esma, "INFERENCE"],
      ["Why it matters to regulators", "Sustainability is a new supervisory domain requiring new data collection and quality frameworks.", S.esma],
      ["How companies like IRIS participate", "IRIS's description includes 'digital ESG' reporting, and IRIS CARBON covers non-financial/ESG reports in XBRL/iXBRL.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  // ----------------------------------------------------------------- Standards
  concept(
    "xbrl",
    "XBRL",
    "Standards",
    "The open global standard that makes business reports computer-readable by tagging each fact with its meaning.",
    "eXtensible Business Reporting Language is an open, XML-based standard maintained by XBRL International. It acts as 'a single universal alphabet and grammar' for reporting: standards-setters build taxonomies (dictionaries), and preparers tag each fact so software can extract and analyse it. It is used in ~65 countries across ~220 reporting implementations.",
    [...S.xbrl],
    ["xbrl", "standard", "reporting"],
    [
      ["Simple explanation", "Think of barcodes: a quick scan tells a computer exactly what each number means, so reports can be read and compared by software.", S.xbrl],
      ["Professional explanation", "XBRL standardises how business data is represented and labelled. Regulators publish taxonomies defining the concepts (e.g. 'ifrs:Revenue'); preparers tag figures to those concepts. Reports become fully digital, enabling automated validation, cross-company comparison and analysis at scale, and providing high-quality input for AI models.", S.xbrl],
      ["Real-world example", "A company tags its revenue with the IFRS 'Revenue' concept; an analyst can then pull revenue for 10,000 companies and compare instantly.", S.xbrl],
      ["Why it exists", "Unstructured reports (PDF/HTML) can't be analysed at scale; regulators and investors need consistent, comparable, machine-readable data.", S.xbrl],
      ["Why it matters to financial institutions", "XBRL is mandatory in many jurisdictions; adopting it well reduces reporting cost, enables automation and can improve access to capital.", S.xbrl],
      ["Why it matters to regulators", "XBRL standardises collection and analysis across thousands of reports — more efficient and effective oversight.", S.xbrl],
      ["How companies like IRIS participate", "IRIS is a deep XBRL specialist: IRIS CARBON creates XBRL/iXBRL reports, IRIS iConnect analyses them, and IRIS provides taxonomy development and testing services.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  concept(
    "ixbrl",
    "iXBRL",
    "Standards",
    "Inline XBRL — XBRL tags embedded inside a human-readable report, so one document is both readable and machine-readable.",
    "iXBRL embeds XBRL tags into HTML (XHTML), letting preparers keep full control of layout while data remains structured. It is used by the US SEC, UK HMRC (2M+ companies) and Companies House, Japan's JFSA, Denmark's business registry, and the EU's ESEF mandate.",
    [...S.ixbrl, ...S.esma],
    ["ixbrl", "xbrl", "standard", "reporting"],
    [
      ["Simple explanation", "One file that looks like a normal report to a human but carries invisible tags a computer can read.", S.ixbrl, "INFERENCE"],
      ["Professional explanation", "iXBRL takes the HTML of a web page and adds XBRL tags giving meaning to figures and statements. It combines human-readable presentation with structured data, allowing tagged reports to be consumed by any compliant processor, loaded into databases, or fed to analytics — while retaining links back to the original presentation.", S.ixbrl],
      ["Real-world example", "An annual report whose figures are tagged (e.g. 'ifrs:Revenue') while retaining the company's designed layout; the SEC viewer and other tools can search and extract the tags.", S.ixbrl],
      ["Why it exists", "Preparers wanted layout control and regulators wanted structured data; iXBRL reconciles both in a single document.", S.ixbrl, "INFERENCE"],
      ["Why it matters to financial institutions", "iXBRL is the dominant statutory filing format in several major jurisdictions; supporting it well is a compliance necessity.", S.ixbrl],
      ["Why it matters to regulators", "iXBRL gives regulators a document that is both human-reviewable and machine-analysable — the best of both.", S.ixbrl, "INFERENCE"],
      ["How companies like IRIS participate", "IRIS CARBON is a platform for creating financial and non-financial reports in XBRL/iXBRL formats.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  concept(
    "sdmx",
    "SDMX",
    "Standards",
    "The international standard for exchanging statistical data and metadata between official organisations.",
    "SDMX (Statistical Data and Metadata eXchange) is an ISO standard (17369) for standardising statistical and aggregate data and its metadata. It is sponsored by the BIS, ECB, Eurostat, ILO, IMF, OECD, UN and World Bank, and underpins statistical exchange between national statistics offices and central banks.",
    [...S.sdmx],
    ["sdmx", "standard", "statistical", "data"],
    [
      ["Simple explanation", "A shared language so statistical agencies (central banks, stats offices) can exchange data with each other and with the IMF/ECB without custom plumbing.", S.sdmx],
      ["Professional explanation", "SDMX provides data models, schemas and code lists for aggregate statistical data, plus an ecosystem of open-source tools. It is complementary to XBRL: XBRL is typically entity-level reporting, while SDMX is aggregate statistical exchange. The standard recently rebranded to 'SDMx' to reflect a shift from data exchange toward broader data leadership.", S.sdmx],
      ["Real-world example", "A national statistics office publishes a CPI series in SDMX format; the ECB and IMF consume it directly into their systems.", S.sdmx],
      ["Why it exists", "Statistical organisations needed interoperable, metadata-rich exchange to automate data flows and improve quality across the statistical lifecycle.", S.sdmx],
      ["Why it matters to financial institutions", "Less direct than XBRL, but firms reporting statistical data to central banks may encounter SDMX-based collection.", S.sdmx, "INFERENCE"],
      ["Why it matters to regulators", "SDMX standardises the statistical side of reporting and data-sharing between authorities.", S.sdmx],
      ["How companies like IRIS participate", "IRIS's SupTech/statistical data-collection work can intersect with SDMX, but a specific SDMX product is not documented in current sources — treat this as inference, not fact.", S.iris, "INFERENCE"],
    ],
    "INFERENCE"
  ),

  concept(
    "regulatory-taxonomies",
    "Regulatory Taxonomies",
    "Standards",
    "The official 'dictionary' a regulator publishes to define exactly what must be reported and how each item is labelled.",
    "A taxonomy is a structured list of reporting elements (concepts), their relationships, and validation rules — the vocabulary of a reporting framework. In XBRL, regulators publish taxonomies (e.g. the ESEF taxonomy, an extension of the IFRS Taxonomy); in SDMX, data structure definitions play the same role. The taxonomy *is* the machine-readable specification of a reporting requirement.",
    [...S.xbrl, ...S.esma, ...S.iris],
    ["taxonomy", "xbrl", "standard", "reporting"],
    [
      ["Simple explanation", "The official list of 'what to report and what to call it' that turns a rulebook into a data format.", S.xbrl, "INFERENCE"],
      ["Professional explanation", "Taxonomies define the concepts, labels (often multilingual), dimensional structure and calculation/validation rules for a reporting mandate. Preparing a report means mapping an entity's own data onto the taxonomy's concepts — often the hardest, most expertise-heavy part of reporting.", S.xbrl],
      ["Real-world example", "ESMA publishes the ESEF taxonomy (extending the IFRS Accounting Taxonomy) so every EU issuer tags the same items the same way.", S.esma],
      ["Why it exists", "Without a shared, precise vocabulary, reported data cannot be machine-readable or comparable across entities.", S.xbrl],
      ["Why it matters to financial institutions", "Mapping internal data to taxonomies is the core technical challenge of reporting; taxonomy changes force re-mapping and re-testing.", S.esma, "INFERENCE"],
      ["Why it matters to regulators", "The taxonomy is how a regulator turns policy into an enforceable, testable data specification.", S.esma, "INFERENCE"],
      ["How companies like IRIS participate", "IRIS offers taxonomy development and testing services and builds software that maps entity data onto regulatory taxonomies — a core capability.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  // ----------------------------------------------------------------- Data
  concept(
    "regulatory-data",
    "Regulatory Data",
    "Data",
    "The structured information regulators collect from firms and markets, governed by taxonomies and used for supervision and policy.",
    "Regulatory data is the body of structured, taxonomy-governed data submitted by regulated entities and reused for supervision, statistics and policy. Its defining properties are quality, consistency, comparability and machine-readability. XBRL and SDMX are the two dominant standards for carrying it.",
    [...S.xbrl, ...S.sdmx],
    ["regulatory-data", "data", "reporting"],
    [
      ["Simple explanation", "The numbers and facts regulators hold about every firm and market — organised so they can be compared and analysed.", S.xbrl, "INFERENCE"],
      ["Professional explanation", "Regulatory data spans entity-level filings (XBRL/iXBRL) and aggregate statistical series (SDMX). Its value depends entirely on quality: consistency across entities, accuracy, and machine-readability are what make it usable for supervision and AI.", S.xbrl],
      ["Real-world example", "XBRL-tagged financial statements across all EU issuers, or SDMX statistical series held by a central bank.", S.xbrl],
      ["Why it exists", "Regulators are data-driven: their risk assessments and policy decisions rest on the data firms submit.", S.xbrl, "INFERENCE"],
      ["Why it matters to financial institutions", "Firms must produce and quality-control this data; poor data means rejected filings and supervisory questions.", S.xbrl, "INFERENCE"],
      ["Why it matters to regulators", "Their analytical capacity and supervisory effectiveness are bounded by data quality.", S.xbrl, "INFERENCE"],
      ["How companies like IRIS participate", "IRIS sits on both sides: products that *produce* regulatory data (CARBON, iDEAL, GST) and products that *collect/validate* it (iFILE).", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  concept(
    "data-validation",
    "Data Validation",
    "Data",
    "Checking submitted data is complete, correct and in the required format before it is accepted.",
    "Data validation applies the rules embedded in a taxonomy or schema — required fields, data types, calculations, cross-field checks — to detect errors at the point of filing. XBRL embeds validation capabilities, and regulators publish conformance suites (ESMA's ESEF Conformance Suite has 215 packages / 68 tests) so software can be tested against the rules.",
    [...S.xbrl, ...S.esma, ...S.iris],
    ["data-validation", "data", "quality"],
    [
      ["Simple explanation", "A spellcheck for regulatory filings: it catches missing, wrong or contradictory data before it counts.", S.xbrl, "INFERENCE"],
      ["Professional explanation", "Validation runs business rules (e.g. 'total assets = liabilities + equity') against a filing. It happens on both sides: preparers validate before submission, and regulators' systems validate on receipt. XBRL and ESEF define the rules machine-executably.", S.xbrl],
      ["Real-world example", "A filing is rejected because total assets don't reconcile, or a required disclosure tag is missing.", S.esma, "INFERENCE"],
      ["Why it exists", "Garbage-in/garbage-out: regulators cannot supervise on bad data, and firms cannot afford rejected filings.", S.xbrl, "INFERENCE"],
      ["Why it matters to financial institutions", "Catching errors before submission avoids rejection, resubmission and regulatory scrutiny.", S.xbrl, "INFERENCE"],
      ["Why it matters to regulators", "Front-line data quality determines the value of everything downstream (analytics, supervision).", S.esma, "INFERENCE"],
      ["How companies like IRIS participate", "IRIS iFILE is described as a platform to 'collect, validate, and analyse' data; IRIS's reporting products embed validation so firms file cleanly.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  concept(
    "data-lineage",
    "Data Lineage",
    "Data",
    "The recorded history of where a data point came from and how it was transformed on its way to a report.",
    "Data lineage tracks a data item's origin, movement, transformations and ownership end-to-end. It is central to data governance and auditability, and is a key expectation of BCBS 239 (principles for effective risk data aggregation), which requires banks to trace risk data to its sources.",
    [...S.bcbs],
    ["data-lineage", "data", "governance"],
    [
      ["Simple explanation", "Knowing where every number came from and what happened to it on the way into the report.", S.bcbs, "INFERENCE"],
      ["Professional explanation", "Lineage provides an auditable trail from source systems through transformations to the final reported figure. Regulators increasingly expect firms to demonstrate lineage to substantiate data accuracy and integrity — a core BCBS 239 principle.", S.bcbs],
      ["Real-world example", "A bank can trace a reported capital number back to its source systems and the formulas that produced it.", S.bcbs, "INFERENCE"],
      ["Why it exists", "Trust, auditability and error-tracing: without lineage, firms cannot prove their data is right, and regulators cannot verify it.", S.bcbs, "INFERENCE"],
      ["Why it matters to financial institutions", "Lineage underpins auditability, faster root-cause analysis and regulatory confidence (BCBS 239).", S.bcbs],
      ["Why it matters to regulators", "Lineage is how regulators gain confidence that reported data is trustworthy and traceable.", S.bcbs, "INFERENCE"],
      ["How companies like IRIS participate", "Reporting platforms implicitly preserve some provenance, but data lineage is not a headline IRIS product feature in current sources — treat the IRIS angle as inference.", S.iris, "INFERENCE"],
    ],
    "INFERENCE"
  ),

  concept(
    "data-transformation",
    "Data Transformation",
    "Data",
    "Converting a firm's internal data into the exact structure and labels the regulator requires.",
    "Data transformation is the mapping, cleansing, restructuring and standardisation of source data into a target taxonomy or schema. It is typically the most labour-intensive, error-prone part of reporting, because internal systems rarely match regulatory definitions.",
    [...S.esma, ...S.iris],
    ["data-transformation", "data", "reporting"],
    [
      ["Simple explanation", "Translating your company's own numbers and codes into the regulator's format.", S.esma, "INFERENCE"],
      ["Professional explanation", "Transformation includes mapping internal concepts to taxonomy elements, converting formats, handling units/currencies, and applying calculations. Regulated firms run this as part of every reporting cycle, and it must be re-run whenever a taxonomy changes.", S.esma],
      ["Real-world example", "Mapping a bank's internal loan classification codes onto the regulator's asset-class codes before filing a return.", S.esma, "INFERENCE"],
      ["Why it exists", "Internal systems and regulatory schemas are built independently; they almost never match, so translation is unavoidable.", S.esma, "INFERENCE"],
      ["Why it matters to financial institutions", "Transformation is the biggest cost and risk in reporting; getting the mapping wrong produces wrong filings.", S.esma, "INFERENCE"],
      ["Why it matters to regulators", "Regulators want consistent input regardless of each firm's internal systems — transformation standardises the data.", S.esma, "INFERENCE"],
      ["How companies like IRIS participate", "IRIS builds the software and taxonomy expertise that performs this mapping: taxonomy development/testing services and reporting products that handle conversion to XBRL/iXBRL.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  concept(
    "regulatory-data-collection",
    "Regulatory Data Collection",
    "Data",
    "The regulator-side process of gathering filings from many entities into one system for validation and analysis.",
    "Regulatory data collection is the SupTech function: portals and systems through which regulators collect, validate, store and analyse data from supervised entities. IRIS iFILE is a direct example — 'an end-to-end electronic filing platform to collect, validate, and analyze any type of data from entities'.",
    [...S.iris, ...S.bis],
    ["data-collection", "suptech", "data"],
    [
      ["Simple explanation", "The regulator's intake system: every firm submits its data through one portal, which checks and stores it.", S.iris, "INFERENCE"],
      ["Professional explanation", "Collection systems must handle scale (hundreds to thousands of filers), schedules, validation, and storage, then feed analytics. They are the backbone of SupTech and are typically built or licensed by authorities rather than built by firms.", S.bis],
      ["Real-world example", "A central bank runs a portal where all banks submit returns; the system validates on entry and routes clean data to analysts.", S.iris, "INFERENCE"],
      ["Why it exists", "Regulators must aggregate data from many entities reliably and at scale — a distinct infrastructure problem.", S.bis, "INFERENCE"],
      ["Why it matters to financial institutions", "This is the 'other end' of filing; a good collection system means smoother submission and clearer feedback for firms.", S.iris, "INFERENCE"],
      ["Why it matters to regulators", "Collection is the foundation of everything a regulator does with data — supervision starts here.", S.bis],
      ["How companies like IRIS participate", "IRIS iFILE is precisely a regulatory data-collection product, sold to central banks, registries, capital-market regulators and exchanges.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  // ----------------------------------------------------------------- Compliance & intelligence
  concept(
    "regulatory-intelligence",
    "Regulatory Intelligence",
    "Compliance & intelligence",
    "Tracking what rules exist, how they change, and how they apply to an organisation.",
    "Regulatory intelligence is the monitoring, interpretation and operationalisation of regulatory change across jurisdictions: horizon scanning, obligations mapping and impact analysis. It feeds a firm's regulatory change management process.",
    [...S.fca],
    ["regulatory-intelligence", "compliance", "change"],
    [
      ["Simple explanation", "Staying on top of every rule that applies to you, and noticing when they change.", S.fca, "INFERENCE"],
      ["Professional explanation", "Regulatory intelligence combines sources (regulators, standards bodies, taxonomies) into a structured view of obligations and changes, enabling firms to anticipate rather than react. It is increasingly automated with NLP/AI.", S.fca, "INFERENCE"],
      ["Real-world example", "A compliance team tracks a new ESG directive across jurisdictions and maps which entities and reports it affects.", S.fca, "INFERENCE"],
      ["Why it exists", "Rules change continuously and across jurisdictions; firms cannot afford to miss changes that carry penalties.", S.fca, "INFERENCE"],
      ["Why it matters to financial institutions", "Proactive awareness of regulatory change reduces surprise, cost and risk of non-compliance.", S.fca, "INFERENCE"],
      ["Why it matters to regulators", "Regulators publish taxonomies and updates expecting timely adoption; firm-side intelligence improves overall market compliance.", S.fca, "INFERENCE"],
      ["How companies like IRIS participate", "Not a headline IRIS product; IRIS's consulting and training services and its taxonomy work relate to regulatory change. Treat specific IRIS regulatory-intelligence products as unknown.", S.iris, "UNKNOWN"],
    ],
    "INFERENCE"
  ),

  concept(
    "compliance-automation",
    "Compliance Automation",
    "Compliance & intelligence",
    "Using software to perform compliance tasks automatically instead of manually.",
    "Compliance automation applies technology to controls, checks, workflows and evidence-gathering across compliance: automated reporting, real-time AML screening, rule-based monitoring. It is the practical output of RegTech.",
    [...S.fca],
    ["compliance-automation", "compliance", "regtech"],
    [
      ["Simple explanation", "Letting software do the repetitive compliance work — checking, screening, filing — instead of people.", S.fca, "INFERENCE"],
      ["Professional explanation", "Automation turns manual, error-prone compliance activities into deterministic, auditable processes. It spans the compliance lifecycle from monitoring and screening to reporting and evidence retention.", S.fca, "INFERENCE"],
      ["Real-world example", "Real-time automated AML screening of transactions, or automatic generation and submission of a regulatory return.", S.fca, "INFERENCE"],
      ["Why it exists", "Manual compliance doesn't scale and introduces inconsistency; automation provides scale, consistency and defensibility.", S.fca, "INFERENCE"],
      ["Why it matters to financial institutions", "Lower cost, fewer errors, and an auditable trail that regulators can verify.", S.fca, "INFERENCE"],
      ["Why it matters to regulators", "Automated compliance raises baseline consistency across the market and is explicitly encouraged via regulator innovation programmes.", S.fca],
      ["How companies like IRIS participate", "IRIS automates the reporting and tax-compliance slice: GST filing, e-invoicing reconciliation, and structured reporting products.", S.iris, "COMPANY_CLAIM"],
    ]
  ),

  concept(
    "regulatory-change-management",
    "Regulatory Change Management",
    "Compliance & intelligence",
    "The governed process of adapting an organisation to new or changed regulations.",
    "Regulatory change management is the discipline of ingesting regulatory changes, assessing impact, updating policies/systems/controls, and evidencing completion by deadline. It is continuous, because regulation is continuous — taxonomies are updated annually (e.g. ESMA's yearly ESEF taxonomy amendments).",
    [...S.esma, ...S.fca],
    ["regulatory-change-management", "compliance", "change"],
    [
      ["Simple explanation", "A structured way to roll out 'the new rule' across a company by the deadline, without chaos.", S.esma, "INFERENCE"],
      ["Professional explanation", "Change management covers horizon scanning, impact assessment, implementation across systems and processes, and sign-off/evidence. For reporting specifically, each taxonomy update triggers re-mapping and re-testing cycles.", S.esma],
      ["Real-world example", "A bank runs a programme to implement a new capital rule — updating systems, models and reports by the compliance date.", S.esma, "INFERENCE"],
      ["Why it exists", "Regulatory change is constant and non-negotiable; failure to adapt on time carries fines and remediation orders.", S.esma, "INFERENCE"],
      ["Why it matters to financial institutions", "Structured change management reduces cost, risk and the chance of missing deadlines.", S.esma, "INFERENCE"],
      ["Why it matters to regulators", "Timely, correct adoption of rules is what regulators are checking for.", S.esma, "INFERENCE"],
      ["How companies like IRIS participate", "IRIS supports change via taxonomy development/testing and consulting/training; as mandates change, its software and taxonomies update. Specific change-management products are not documented — treat as inference.", S.iris, "INFERENCE"],
    ],
    "INFERENCE"
  ),

  // ----------------------------------------------------------------- AI
  concept(
    "ai-in-regtech",
    "AI in RegTech",
    "AI & automation",
    "Applying AI/ML to compliance and supervision — spotting risk, interpreting rules and automating analysis.",
    "AI in RegTech spans NLP for rule interpretation, machine learning for anomaly/misconduct detection, and generative AI for report drafting. The FCA highlights interest in AI helping firms meet obligations; the BIS frames SupTech as big-data/AI tools for authorities; and XBRL International argues structured XBRL data is high-quality input for AI models.",
    [...S.bis, ...S.fca, ...S.xbrl],
    ["ai", "machine-learning", "regtech", "suptech"],
    [
      ["Simple explanation", "Teaching software to find risky patterns, understand rules and draft compliance work — like having an always-on analyst.", S.bis, "INFERENCE"],
      ["Professional explanation", "AI augments both sides: RegTech uses ML for monitoring and anomaly detection, NLP to ingest regulatory text, and GenAI to draft disclosures; SupTech uses the same tools inside authorities for misconduct analysis. Governance and explainability remain open challenges.", S.bis],
      ["Real-world example", "An ML model flags suspicious transactions for AML review; a SupTech tool detects unusual reporting patterns across banks.", S.bis],
      ["Why it exists", "Data volumes and rule complexity exceed human capacity; AI is the only scalable way to keep pace.", S.bis, "INFERENCE"],
      ["Why it matters to financial institutions", "AI can cut compliance cost and improve risk detection, but introduces model-risk and governance obligations.", S.fca, "INFERENCE"],
      ["Why it matters to regulators", "AI powers next-generation supervision (SupTech) while also requiring regulators to govern AI risk in firms.", S.bis],
      ["How companies like IRIS participate", "No specific IRIS AI product is documented in current sources. IRIS's structured-data foundation (XBRL) positions it to feed AI models, but treat IRIS AI products as unknown pending research.", S.iris, "UNKNOWN"],
    ],
    "INFERENCE"
  ),
];
