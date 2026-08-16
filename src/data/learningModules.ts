import type { LearningModule } from "./types";

/**
 * The Domain Mastery curriculum, organised into three tracks:
 *
 *  PATH (LEVEL 1..10) — the progressive mastery path:
 *    L1 RegTech Beginner → L2 Regulatory Reporting → L3 XBRL & Data →
 *    L4 IRIS Company → L5 IRIS Products → L6 Customers → L7 Competitors →
 *    L8 Technology → L9 Strategy → L10 Domain Mastery.
 *
 *  SNAPSHOT — time-boxed IRIS snapshots: 5 minutes, 15 minutes, 1 hour, deep dive.
 *
 *  MODE — guided traversal: Follow the Data / Follow the Regulation.
 *
 * Every module references concept/product/company entities so the learner can
 * click through from any lesson into the connected knowledge graph.
 */
export const learningModules: LearningModule[] = [
  // ====================================================================
  // LEVEL 1 — RegTech Beginner
  // ====================================================================
  {
    id: "regtech-from-zero",
    title: "LEVEL 1 · REGTECH BEGINNER",
    order: 1,
    level: 1,
    track: "PATH",
    summary:
      "Build an intuitive, correct mental model of what RegTech is, why it exists, and the standards that power it — before any IRIS detail.",
    sections: [
      {
        heading: "The problem RegTech solves",
        body:
          "Since the 2008 financial crisis, regulation has grown sharply — capital, liquidity, conduct, anti-money-laundering and, now, ESG rules. Firms must report ever more data, in more formats, to more regulators, on tighter deadlines. Manual, spreadsheet-based compliance does not scale. **RegTech exists to solve this problem with technology.**",
        certainty: "FACT",
        sources: ["fca-regtech"],
      },
      {
        heading: "RegTech vs SupTech — the two sides",
        body:
          "**RegTech** is technology that helps *regulated firms* comply — reporting, monitoring, risk. **SupTech** is the mirror image: technology used by *regulators themselves* to collect, validate and analyse data. Remember: firms use RegTech, regulators use SupTech. IRIS is unusual for serving both sides.",
        certainty: "FACT",
        sources: ["fca-regtech", "bis-suptech-generations"],
      },
      {
        heading: "The standards that make it work",
        body:
          "Most RegTech work is built on **structured data standards**. **XBRL** makes business reports machine-readable by tagging each number with its meaning; **iXBRL** embeds those tags inside a human-readable report; **SDMX** does the equivalent for aggregate statistical data. These standards are the 'grammar' of the domain.",
        certainty: "FACT",
        sources: ["xbrl-what-is", "xbrl-ixbrl", "sdmx-home"],
      },
      {
        heading: "The reporting lifecycle, in one breath",
        body:
          "A regulator writes a rule → that rule becomes a **reporting requirement** → the requirement is turned into a **taxonomy** (a machine-readable dictionary) → a firm takes its internal **data**, **transforms** it into the taxonomy's shape, **validates** it, and **submits** it → the regulator runs **analytics** and **supervises**. That loop is the entire RegTech ecosystem.",
        certainty: "FACT",
        sources: ["esma-esef"],
      },
      {
        heading: "Where IRIS sits (the bridge to Level 4)",
        body:
          "IRIS RegTech Solutions Limited operates across **SupTech, RegTech, TaxTech and DataTech**, and is a deep XBRL/iXBRL specialist. It sells data-collection systems to regulators *and* reporting/compliance products to firms. You now understand the world those products live in — next we study reporting itself, then the data standards, then the company.",
        certainty: "FACT",
        sources: ["stockanalysis-company-profile"],
      },
    ],
    entityRefs: [
      "concept:regtech",
      "concept:suptech",
      "concept:xbrl",
      "concept:ixbrl",
      "concept:sdmx",
      "concept:regulatory-reporting",
      "concept:regulatory-taxonomies",
      "glossary:regtech",
      "glossary:suptech",
      "glossary:xbrl",
      "company:iris",
    ],
    sources: ["fca-regtech", "bis-suptech-generations", "xbrl-what-is", "esma-esef"],
  },

  // ====================================================================
  // LEVEL 2 — Regulatory Reporting
  // ====================================================================
  {
    id: "level-2-regulatory-reporting",
    title: "LEVEL 2 · REGULATORY REPORTING",
    order: 2,
    level: 2,
    track: "PATH",
    summary:
      "How the reporting machine actually works: the lifecycle from rule to supervision, and the three families of reporting a firm must produce.",
    sections: [
      {
        heading: "The reporting pipeline, end to end",
        body:
          "Every mandate follows the same eight-stage pipeline: **(1)** a regulator issues a rule; **(2)** the rule becomes a reporting requirement; **(3)** the requirement is expressed as a taxonomy or schema; **(4)** the filer gathers source data; **(5)** the data is transformed onto the taxonomy; **(6)** it is validated; **(7)** it is submitted; **(8)** the regulator stores, analyses and supervises. Cost and risk concentrate at stages 4–6.",
        certainty: "FACT",
        sources: ["esma-esef"],
      },
      {
        heading: "Three families of reporting",
        body:
          "**Supervisory reporting** — confidential, high-frequency returns to a supervisor (e.g. RBI returns, COREP/FINREP, Solvency II QRTs). **Disclosure reporting** — public, standardised statements to investors and the market (ESEF, SEC XBRL, SEBI LODR). **Statistical/tax reporting** — aggregate series (SDMX) and tax filings (GST, e-invoicing). IRIS products map onto all three.",
        certainty: "FACT",
        sources: ["bis-suptech-generations", "esma-esef", "stockanalysis-company-profile"],
      },
      {
        heading: "Who reports to whom",
        body:
          "Banks → central banks and banking authorities; insurers → insurance authorities; listed companies → securities regulators and exchanges; corporates → business registries and tax authorities. Each relationship has its own format, taxonomy, schedule and conformance regime — which is why the domain is fragmented and specialist.",
        certainty: "FACT",
        sources: ["esma-esef", "iris-filexbrl-abs"],
      },
      {
        heading: "Why reporting is hard",
        body:
          "Internal systems almost never match regulatory definitions, so **data transformation** is unavoidable. Each taxonomy update forces re-mapping and re-testing. Errors mean rejected filings, resubmissions and supervisory scrutiny. This is the pain that reporting software exists to remove.",
        certainty: "FACT",
        sources: ["esma-esef", "bcbs239"],
      },
      {
        heading: "IRIS connection",
        body:
          "IRIS builds both ends of the pipeline: **iDEAL** and **CARBON** on the filer side (transform → validate → submit) and **iFILE** on the regulator side (collect → validate → analyse). Few vendors span both.",
        certainty: "COMPANY_CLAIM",
        sources: ["iris-ideal-page", "iris-ifile-page", "carbon-launch-office365"],
      },
    ],
    entityRefs: [
      "concept:regulatory-reporting",
      "concept:supervisory-reporting",
      "concept:digital-reporting",
      "concept:disclosure-management",
      "product:iris-ideal",
      "product:iris-carbon",
      "product:iris-ifile",
      "regulation:esef",
      "regulation:rbi-returns",
    ],
    sources: ["esma-esef", "bis-suptech-generations", "iris-ifile-page"],
  },

  // ====================================================================
  // LEVEL 3 — XBRL & Data
  // ====================================================================
  {
    id: "level-3-xbrl-data",
    title: "LEVEL 3 · XBRL & DATA",
    order: 3,
    level: 3,
    track: "PATH",
    summary:
      "The grammar of the domain: XBRL, iXBRL, SDMX, taxonomies, and the data layer — facts, contexts, dimensions, validation and lineage.",
    sections: [
      {
        heading: "XBRL — the alphabet",
        body:
          "**eXtensible Business Reporting Language** is the open, XML-based standard that makes business reports machine-readable by tagging every fact with its meaning (e.g. `ifrs:Revenue`). Used in ~65 countries across ~220 implementations, it is the foundation of digital reporting.",
        certainty: "FACT",
        sources: ["xbrl-what-is"],
      },
      {
        heading: "iXBRL — human and machine in one file",
        body:
          "**Inline XBRL** embeds XBRL tags inside a human-readable HTML report, so a single document is both a designed page and a structured dataset. It is the dominant statutory format: US SEC, UK HMRC/Companies House (2M+ filings/year), Japan's JFSA, and the EU's **ESEF**.",
        certainty: "FACT",
        sources: ["xbrl-ixbrl", "esma-esef"],
      },
      {
        heading: "SDMX — the statistical twin",
        body:
          "**SDMX** (ISO 17369) standardises the exchange of *aggregate statistical* data and metadata between official organisations (BIS, ECB, Eurostat, IMF, OECD, UN, World Bank). Rule of thumb: XBRL is entity-level, SDMX is aggregate statistical exchange.",
        certainty: "FACT",
        sources: ["sdmx-home"],
      },
      {
        heading: "Taxonomies — the dictionary",
        body:
          "A **taxonomy** is the regulator's machine-readable specification: the concepts, labels, dimensional structure and validation rules for a mandate. ESEF, for example, extends the **IFRS Taxonomy**. Mapping entity data onto a taxonomy is the hardest, most expertise-heavy part of reporting.",
        certainty: "FACT",
        sources: ["xbrl-what-is", "ifrs-foundation", "esma-esef"],
      },
      {
        heading: "The data layer",
        body:
          "XBRL reports are built from **facts** (a value + concept + unit + **context**), with **dimensions** for multi-axis data (e.g. revenue by segment). **Data validation** runs machine-executable rules; **data lineage** records where each number came from (a BCBS 239 expectation). These make reported data trustworthy and auditable.",
        certainty: "FACT",
        sources: ["xbrl-what-is", "bcbs239"],
      },
      {
        heading: "IRIS connection",
        body:
          "IRIS is a deep XBRL/iXBRL specialist: **CARBON** creates tagged reports, **iDEAL** produces XBRL returns, **iFILE** validates on collection, and **iConnect** analyses the results. IRIS also develops and tests taxonomies for regulators.",
        certainty: "COMPANY_CLAIM",
        sources: ["stockanalysis-company-profile", "iris-filexbrl-abs"],
      },
    ],
    entityRefs: [
      "concept:xbrl",
      "concept:ixbrl",
      "concept:sdmx",
      "concept:regulatory-taxonomies",
      "concept:data-validation",
      "concept:data-lineage",
      "concept:data-transformation",
      "technology:xbrl-standard",
      "technology:ixbrl-standard",
      "technology:ifrs-taxonomy",
    ],
    sources: ["xbrl-what-is", "xbrl-ixbrl", "sdmx-home", "esma-esef"],
  },

  // ====================================================================
  // LEVEL 4 — IRIS Company
  // ====================================================================
  {
    id: "level-4-iris-company",
    title: "LEVEL 4 · IRIS COMPANY",
    order: 4,
    level: 4,
    track: "PATH",
    summary:
      "Meet IRIS RegTech Solutions Limited: history, segments, customers, financials, and the two facts that shape its present.",
    sections: [
      {
        heading: "What IRIS is",
        body:
          "**IRIS RegTech Solutions Limited** (formerly IRIS Business Services, renamed Nov 2025) is an India-listed (NSE:IRIS / BSE:540735) RegTech/SupTech software company, incorporated in 2000, headquartered in Navi Mumbai. A global specialist in **structured data standards** — XBRL, iXBRL and SDMX.",
        certainty: "FACT",
        sources: ["stockanalysis-company-profile", "scanx-rebrand"],
      },
      {
        heading: "Origin: a journalist and structured data",
        body:
          "Founded by **S. Swaminathan**, a former journalist and Yale-educated entrepreneur who earlier founded **Investment Research & Information Services Ltd (1994)** — the source of the 'IRIS' name. The bet: as reporting moved from paper to machine-readable data, both filers and regulators would need specialist software.",
        certainty: "FACT",
        sources: ["marketscreener-swaminathan", "exchange4media-swaminathan"],
      },
      {
        heading: "India's XBRL pioneer → global",
        body:
          "IRIS implemented XBRL solutions for **RBI, SEBI, BSE and NSE**, and became the MCA's XBRL filing specialist — the regulator credibility that later exported internationally to 52+ countries (Middle East, APAC, Africa, US, Europe, UK).",
        certainty: "COMPANY_CLAIM",
        sources: ["iris-filexbrl-abs", "linkedin-iris-company"],
      },
      {
        heading: "The four segments & the money",
        body:
          "**SupTech** (iFILE), **RegTech** (iDEAL, CARBON), **TaxTech** (GST/e-invoicing — divested 2025) and **DataTech** (iConnect, Credixo, MSME). Revenue: ~₹74 Cr (FY23) → ~₹128 Cr (FY26, +23% YoY). FY26 profit was inflated by a ~₹123 Cr one-time divestment gain.",
        certainty: "FACT",
        sources: ["stockanalysis-company-profile", "screener-iris", "theprint-q4fy26"],
      },
      {
        heading: "The two facts that shape it now",
        body:
          "**(1)** Founder-CEO S. Swaminathan died in March 2025; co-founder Balachandran Krishnan now leads. **(2)** In Aug 2025 IRIS sold its TaxTech business to Sovos (~₹151 Cr) to focus on RegTech/SupTech/DataTech and a stated **₹500 Cr** target.",
        certainty: "FACT",
        sources: ["cnbctv18-swaminathan", "sovos-acquisition", "scanx-500cr-target"],
      },
      {
        heading: "Go deeper",
        body:
          "For the time-boxed walkthroughs, see the snapshots: **IRIS in 5 minutes**, **IRIS in 15 minutes**, **IRIS in 1 hour** and the **IRIS Deep Dive**.",
        certainty: "FACT",
        sources: [],
      },
    ],
    entityRefs: [
      "company:iris",
      "company:sovos",
      "product:iris-ifile",
      "product:iris-carbon",
      "product:iris-ideal",
      "concept:regtech",
      "concept:suptech",
      "concept:datatech",
    ],
    sources: ["stockanalysis-company-profile", "screener-iris", "sovos-acquisition"],
  },

  // ====================================================================
  // LEVEL 5 — IRIS Products
  // ====================================================================
  {
    id: "level-5-iris-products",
    title: "LEVEL 5 · IRIS PRODUCTS",
    order: 5,
    level: 5,
    track: "PATH",
    summary:
      "The product portfolio: what each product does, which segment it serves, and how they connect into an ecosystem.",
    sections: [
      {
        heading: "The portfolio, by segment",
        body:
          "- **SupTech:** IRIS iFILE (regulator collection/validation/analytics).\n- **RegTech:** IRIS iDEAL (supervisory reporting) and IRIS CARBON (disclosure/ESG).\n- **DataTech:** IRIS iConnect (XBRL analytics in Excel), Credixo (credit models), MSME (financial inclusion).\n- **TaxTech (divested):** GST software, E-Invoicing, IRP, Zircon APIs, LMS, Peridot.",
        certainty: "COMPANY_CLAIM",
        sources: ["stockanalysis-company-profile", "iris-ifile-page"],
      },
      {
        heading: "The three flagships",
        body:
          "**iFILE** — 'an end-to-end electronic filing platform to collect, validate, and analyze any type of data from entities', trusted by 30+ regulators. **iDEAL** — automated regulatory reporting for banks/credit institutions/investment firms (e.g. RBI CIMS; MUFG Bank). **CARBON** — Office 365-based disclosure management producing XBRL/iXBRL incl. ESG (Gap Inc., MZ Consult Brazil).",
        certainty: "COMPANY_CLAIM",
        sources: ["iris-ifile-page", "iris-ideal-page", "carbon-launch-office365", "newswire-gap-carbon"],
      },
      {
        heading: "Lifecycle: what stayed, what left",
        body:
          "After the Aug 2025 Sovos divestment, the current portfolio is **SupTech + RegTech + DataTech**. The seven TaxTech products (GST, IRP, E-Invoicing, Zircon, LMS, Peridot) are marked DIVESTED. Use each product's lifecycle tag to see what is current vs. legacy.",
        certainty: "FACT",
        sources: ["sovos-acquisition", "stockanalysis-company-profile"],
      },
      {
        heading: "How products connect (the ecosystem)",
        body:
          "The products form a loop: **CARBON/iDEAL** create structured filings → **iFILE** collects and validates them (regulator side) → **iConnect** analyses the resulting XBRL data. iDEAL (filer) and iFILE (regulator) are two halves of the same reporting relationship.",
        certainty: "INFERENCE",
        sources: ["stockanalysis-company-profile"],
      },
      {
        heading: "Go deeper",
        body:
          "Every product has a full page: 21 knowledge aspects, a six-step workflow, five learning levels and its relationship map. Start at **Products** and drill in.",
        certainty: "FACT",
        sources: [],
      },
    ],
    entityRefs: [
      "product:iris-ifile",
      "product:iris-ideal",
      "product:iris-carbon",
      "product:iris-iconnect",
      "product:iris-credixo",
      "product:iris-msme",
      "product:iris-gst",
      "product:iris-einvoicing",
    ],
    sources: ["stockanalysis-company-profile", "iris-ifile-page", "sovos-acquisition"],
  },

  // ====================================================================
  // LEVEL 6 — Customers
  // ====================================================================
  {
    id: "level-6-customers",
    title: "LEVEL 6 · CUSTOMERS",
    order: 6,
    level: 6,
    track: "PATH",
    summary:
      "Who buys IRIS: the dual-sided customer base, the segments, the proof points, and the value chain each buyer walks.",
    sections: [
      {
        heading: "Two sides of the same coin",
        body:
          "IRIS sells to **regulators** (central banks, securities regulators, tax authorities, exchanges, registries — via iFILE) *and* to the **firms those regulators supervise** (banks, insurers, listed companies, corporates — via iDEAL/CARBON). Serving both sides is IRIS's structural signature.",
        certainty: "COMPANY_CLAIM",
        sources: ["stockanalysis-company-profile", "iris-ifile-page"],
      },
      {
        heading: "The segments",
        body:
          "Central banks; financial regulators; government agencies & tax authorities; banks; insurers; financial institutions & investment firms; listed companies; enterprises; MSMEs & data users; exchanges & registries. Each has a distinct problem, data and regulatory requirement.",
        certainty: "FACT",
        sources: ["stockanalysis-company-profile"],
      },
      {
        heading: "Proof points (named customers)",
        body:
          "**Qatar Tax Authority** (6-year contract, 2025), **South African Reserve Bank** (extension, 2025), **Gap Inc.** (CARBON sustainability report), a **Brazilian oil & gas major** (via MZ Consult), and Indian regulators **RBI/SEBI/MCA/NSE/BSE**. Repeat regulator business is the strongest signal of product fit.",
        certainty: "FACT",
        sources: ["scanx-qatar-tax", "scanx-sarb", "newswire-gap-carbon", "scanx-mz-brazil"],
      },
      {
        heading: "The value chain every buyer walks",
        body:
          "Every segment follows the same six-step chain: **problem → regulatory requirement → data problem → IRIS product → workflow → outcome**. For example, a listed company: must publish machine-readable reports → ESEF/SEC XBRL → tag financial/ESG data → CARBON → author/tag/validate/render → compliant disclosure.",
        certainty: "FACT",
        sources: ["esma-esef", "newswire-gap-carbon"],
      },
      {
        heading: "Go deeper",
        body:
          "Explore **Customers** for the full segment list, each with its value chain and an end-to-end customer journey.",
        certainty: "FACT",
        sources: [],
      },
    ],
    entityRefs: [
      "company:gap-inc",
      "company:mufg-bank",
      "company:mz-consult",
      "regulator:qatar-gta",
      "regulator:sarb",
      "regulator:rbi",
      "regulator:sebi",
    ],
    sources: ["scanx-qatar-tax", "scanx-sarb", "newswire-gap-carbon", "stockanalysis-company-profile"],
  },

  // ====================================================================
  // LEVEL 7 — Competitors
  // ====================================================================
  {
    id: "level-7-competitors",
    title: "LEVEL 7 · COMPETITORS",
    order: 7,
    level: 7,
    track: "PATH",
    summary:
      "The competitive landscape: who overlaps where, where IRIS wins, where rivals win, and the threats that matter.",
    sections: [
      {
        heading: "Not everyone competes",
        body:
          "Competitors are classified by tier: **DIRECT** (head-on overlap — Workiva, CoreFiling, Regnology, Toppan Merrill, DataTracks, ParsePort), **ADJACENT** (partial/niche overlap — Vizor, LucaNet, Wolters Kluwer, ClearTax, Adenza), and **NON_COMPETITOR** (ecosystem players — SAP, IBM, FIS, Finastra, Moody's, NICE Actimize, Broadridge). Never assume a big name competes with IRIS on everything.",
        certainty: "ANALYST_VIEW",
        sources: ["stockanalysis-company-profile"],
      },
      {
        heading: "Where IRIS has an edge",
        body:
          "Standards depth (XBRL/iXBRL/SDMX), regulator trust (30+ regulators; RBI/SEBI/MCA heritage), the rare dual-sided product set, and agility/value for small-to-mid regulators and filers.",
        certainty: "INFERENCE",
        sources: ["iris-filexbrl-abs", "iris-ifile-page"],
      },
      {
        heading: "Where rivals have an edge",
        body:
          "Workiva's scale, brand and US enterprise penetration; DFIN/Toppan Merrill's capital-markets services; Regnology/Adenza/Wolters Kluwer's depth in European prudential (COREP/FINREP/Solvency II). IRIS competes on domain specialism more than on enterprise scale.",
        certainty: "ANALYST_VIEW",
        sources: ["stockanalysis-company-profile"],
      },
      {
        heading: "The threats",
        body:
          "Post-divestment revenue gap; customer concentration in a few large regulator contracts; competition from larger, better-funded rivals; and dependence on regulators continuing to digitise. These are the honest counterweights to the growth story.",
        certainty: "INFERENCE",
        sources: ["sovos-acquisition", "screener-iris"],
      },
      {
        heading: "Go deeper",
        body:
          "See **Competitors** for the full map, product-by-product head-to-heads, threat register and the 'If I were a customer' narratives.",
        certainty: "FACT",
        sources: [],
      },
    ],
    entityRefs: [
      "company:workiva",
      "company:corefiling",
      "company:regnology",
      "company:toppan-merrill",
      "company:datatracks",
      "company:sovos",
      "company:iris",
    ],
    sources: ["stockanalysis-company-profile", "sovos-acquisition"],
  },

  // ====================================================================
  // LEVEL 8 — Technology
  // ====================================================================
  {
    id: "level-8-technology",
    title: "LEVEL 8 · TECHNOLOGY",
    order: 8,
    level: 8,
    track: "PATH",
    summary:
      "The technology layer: the XBRL data model, validation and transformation, cloud/SaaS delivery, analytics, and the AI frontier.",
    sections: [
      {
        heading: "The technology stack",
        body:
          "IRIS products rest on: **XBRL/iXBRL/SDMX** standards; the **XBRL data model** (facts, contexts, dimensions, extensions); **data validation** (taxonomy rules); **ETL/transformation** (mapping entity data); **cloud/SaaS** delivery (CARBON is Office 365-based); and **analytics** (iConnect, Credixo).",
        certainty: "COMPANY_CLAIM",
        sources: ["carbon-launch-office365", "iconnect-launch", "iris-ifile-page"],
      },
      {
        heading: "What's documented vs. inferred",
        body:
          "The system tags each technology description with a **docStatus**: PUBLICLY_DOCUMENTED (stated by a primary source), ARCHITECTURAL_INFERENCE (reasoned from how such systems work), or UNKNOWN. Standards and delivery model are documented; the internal ETL/workflow mechanics of each product are largely inference.",
        certainty: "FACT",
        sources: ["xbrl-what-is", "stockanalysis-company-profile"],
      },
      {
        heading: "SaaS and Office 365",
        body:
          "CARBON is explicitly a SaaS, Office 365-based disclosure platform — authors work in Word/Excel, CARBON tags and renders XBRL/iXBRL. IRIS describes itself as a RegTech SaaS company.",
        certainty: "COMPANY_CLAIM",
        sources: ["carbon-launch-office365"],
      },
      {
        heading: "The AI frontier",
        body:
          "No specific IRIS AI product is documented. But structured XBRL data is widely argued to be high-quality input for AI models, and the BIS frames SupTech as big-data/AI tools for authorities. IRIS's structured-data foundation positions it for this, but its own AI capability is currently **unknown**.",
        certainty: "INFERENCE",
        sources: ["bis-suptech-generations", "xbrl-what-is"],
      },
      {
        heading: "Go deeper",
        body:
          "Explore **Technology** for all 18 mapped technologies, each with 'how it works' and 'how IRIS uses it'.",
        certainty: "FACT",
        sources: [],
      },
    ],
    entityRefs: [
      "technology:xbrl-standard",
      "technology:ixbrl-standard",
      "technology:validation",
      "technology:etl-transformation",
      "technology:cloud-saas",
      "technology:analytics",
      "technology:ai",
    ],
    sources: ["carbon-launch-office365", "iconnect-launch", "xbrl-what-is"],
  },

  // ====================================================================
  // LEVEL 9 — Strategy
  // ====================================================================
  {
    id: "level-9-strategy",
    title: "LEVEL 9 · STRATEGY",
    order: 9,
    level: 9,
    track: "PATH",
    summary:
      "The strategic picture: the dual-sided moat, the post-divestment refocus, the ₹500 Cr ambition, and the risks.",
    sections: [
      {
        heading: "The five axes",
        body:
          "- **Product:** own the data value chain (reporting + collection + analytics).\n- **Technology:** XBRL/iXBRL/SDMX depth as a moat.\n- **AI:** structured data as high-quality input; ESG as the frontier.\n- **Geographic:** expand the regulator franchise (Middle East, Africa, LatAm).\n- **Growth:** exit TaxTech, concentrate on RegTech/SupTech/DataTech, target ₹500 Cr.",
        certainty: "COMPANY_CLAIM",
        sources: ["scanx-500cr-target", "sustainability-magazine-esg"],
      },
      {
        heading: "The dual-sided moat",
        body:
          "Selling to both regulators and firms gives IRIS rare visibility into both sides of the reporting relationship — and regulator wins (30+ regulators) create sticky, referenceable enterprise credibility that filer-side products benefit from.",
        certainty: "INFERENCE",
        sources: ["iris-ifile-page", "iris-filexbrl-abs"],
      },
      {
        heading: "The post-divestment refocus",
        body:
          "Selling TaxTech to Sovos was a concentration bet: exchange a competitive, low-margin tax business for focus on the higher-value RegTech/SupTech/DataTech core. The question is whether that core grows fast enough to close the revenue gap.",
        certainty: "ANALYST_VIEW",
        sources: ["sovos-acquisition", "screener-iris"],
      },
      {
        heading: "Market position",
        body:
          "A small-cap (~₹492 Cr) global niche player with 20+ years of domain depth, a rare dual-side product set, and international recognition (Central Banking Award 2024; a seat on the XBRL International board). Edge = standards expertise + regulator trust; challenge = scale and concentration.",
        certainty: "INFERENCE",
        sources: ["screener-iris", "theweek-central-banking-award", "theprint-xbrl-board"],
      },
      {
        heading: "What to watch",
        body:
          "Can RegTech/SupTech/DataTech replace divested TaxTech revenue? Will the ESG/CSRD wave convert into material CARBON revenue? Will the new DataTech subsidiary scale? These determine whether ₹500 Cr is reached.",
        certainty: "INFERENCE",
        sources: ["scanx-500cr-target", "scanx-datatech-subsidiary"],
      },
    ],
    entityRefs: [
      "company:iris",
      "company:sovos",
      "concept:esg-reporting",
      "product:iris-carbon",
      "product:iris-ifile",
      "product:iris-iconnect",
    ],
    sources: ["scanx-500cr-target", "sovos-acquisition", "screener-iris"],
  },

  // ====================================================================
  // LEVEL 10 — Domain Mastery
  // ====================================================================
  {
    id: "regtech-domain-mastery",
    title: "LEVEL 10 · DOMAIN MASTERY",
    order: 10,
    level: 10,
    track: "PATH",
    summary:
      "The advanced, integrated picture: the regulatory data value chain, data governance, the global landscape, ESG, AI — and where vendors create value.",
    sections: [
      {
        heading: "The regulatory data value chain",
        body:
          "Walk the full chain end-to-end: **Regulators → Regulations → Reporting requirements → Taxonomies/standards → Companies → Data → Transformation → Validation → Submission → Regulatory analytics → Supervision** (which loops back to regulation). Each link is a place where cost, risk and value concentrate — and where vendors like IRIS sell products.",
        certainty: "FACT",
        sources: ["esma-esef", "xbrl-what-is"],
      },
      {
        heading: "Data quality, lineage and governance",
        body:
          "Regulatory data is only as good as its **quality** and **lineage**. **BCBS 239** requires banks to aggregate risk data accurately and trace it end-to-end. **Data validation** (machine-executable rules) and **data lineage** (auditable provenance) are what make reported data trustworthy — and they are the hard, expertise-heavy parts of reporting.",
        certainty: "FACT",
        sources: ["bcbs239", "xbrl-what-is"],
      },
      {
        heading: "The global digital-reporting landscape",
        body:
          "Digital reporting is now mandated worldwide: the US **SEC** requires iXBRL; the UK's **HMRC/Companies House** process 2M+ iXBRL filings a year; Japan's **JFSA** covers 9,000+ issuers; the EU's **ESEF** mandates Inline XBRL for all listed IFRS reporters. Each mandate is a distinct taxonomy and conformance regime.",
        certainty: "FACT",
        sources: ["xbrl-ixbrl", "esma-esef"],
      },
      {
        heading: "ESG and the next frontier",
        body:
          "Sustainability reporting is being digitised: the EU's **CSRD/ESRS** and ESMA's plan to extend **ESEF** to tag sustainability disclosures mean ESG data will soon be structured and machine-readable — a fast-growing new compliance burden that RegTech vendors are racing to support.",
        certainty: "FACT",
        sources: ["esma-esef", "xbrl-ixbrl"],
      },
      {
        heading: "AI in RegTech and SupTech",
        body:
          "AI is the next layer: ML for anomaly and misconduct detection, NLP for rule interpretation, GenAI for drafting. The BIS frames SupTech as big-data/AI tools for authorities, and XBRL International argues structured data is high-quality input for AI. Governance and explainability are the open questions.",
        certainty: "FACT",
        sources: ["bis-suptech-generations", "fca-regtech", "xbrl-what-is"],
      },
      {
        heading: "Where vendors create value",
        body:
          "Vendors capture value at the hard links of the chain: **transformation** (mapping data to taxonomies), **validation** (conformance), **collection** (SupTech platforms), and **analytics** (turning structured data into insight). A firm that is strong at several of these — as IRIS is across SupTech, RegTech, TaxTech and DataTech — has a defensible position.",
        certainty: "INFERENCE",
        sources: ["stockanalysis-company-profile"],
      },
    ],
    entityRefs: [
      "concept:regulatory-data",
      "concept:data-validation",
      "concept:data-lineage",
      "concept:data-transformation",
      "concept:regulatory-data-collection",
      "concept:digital-reporting",
      "concept:esg-reporting",
      "concept:ai-in-regtech",
      "concept:regulatory-change-management",
      "glossary:sdmx",
    ],
    sources: ["bcbs239", "esma-esef", "bis-suptech-generations"],
  },

  // ====================================================================
  // SNAPSHOT — IRIS in 5 minutes
  // ====================================================================
  {
    id: "iris-in-5-minutes",
    title: "IRIS IN 5 MINUTES",
    order: 101,
    track: "SNAPSHOT",
    summary:
      "The essential IRIS snapshot — what the company is, who it serves, how it makes money, and the two facts that shape its present.",
    sections: [
      {
        heading: "What IRIS is",
        body:
          "**IRIS RegTech Solutions Limited** (formerly IRIS Business Services, renamed Nov 2025) is an India-listed (NSE:IRIS / BSE:540735) RegTech/SupTech software company, incorporated in 2000 and headquartered in Navi Mumbai. It is a global specialist in **structured data standards** — XBRL, iXBRL and SDMX.",
        certainty: "FACT",
        sources: ["stockanalysis-company-profile", "scanx-rebrand"],
      },
      {
        heading: "Who it serves (both sides)",
        body:
          "IRIS is unusual for serving **both** sides of reporting: it sells collection/analytics platforms to **regulators** (central banks, exchanges, tax authorities — 30+ via iFILE) *and* reporting/disclosure software to **firms** (banks, corporates, funds).",
        certainty: "COMPANY_CLAIM",
        sources: ["iris-ifile-page", "stockanalysis-company-profile"],
      },
      {
        heading: "The four segments",
        body:
          "**SupTech** (iFILE), **RegTech** (iDEAL, CARBON), **TaxTech** (GST/e-invoicing — divested 2025) and **DataTech** (iConnect, Credixo, MSME).",
        certainty: "FACT",
        sources: ["stockanalysis-company-profile"],
      },
      {
        heading: "How it makes money",
        body:
          "Software licensing, SaaS subscriptions and maintenance, plus consulting/training. Revenue ~₹128 Cr in FY26 (up 23% YoY), having crossed ₹100 Cr in FY25 — but FY26 profit was inflated by a ~₹123 Cr one-time gain from the TaxTech divestment.",
        certainty: "FACT",
        sources: ["screener-iris", "prnewswire-100cr", "theprint-q4fy26"],
      },
      {
        heading: "The two facts that shape it now",
        body:
          "**(1)** Founder-CEO S. Swaminathan died in March 2025 — co-founder Balachandran Krishnan now leads. **(2)** In Aug 2025 IRIS sold its TaxTech business to Sovos (~₹151 Cr) to focus on RegTech/SupTech/DataTech and a stated **₹500 Cr** revenue target.",
        certainty: "FACT",
        sources: ["cnbctv18-swaminathan", "sovos-acquisition", "scanx-500cr-target"],
      },
    ],
    entityRefs: ["company:iris", "product:iris-ifile", "product:iris-carbon", "product:iris-ideal", "company:sovos"],
    sources: ["stockanalysis-company-profile", "screener-iris", "sovos-acquisition"],
  },

  // ====================================================================
  // SNAPSHOT — IRIS in 15 minutes
  // ====================================================================
  {
    id: "iris-in-15-minutes",
    title: "IRIS IN 15 MINUTES",
    order: 102,
    track: "SNAPSHOT",
    summary:
      "A fuller account — the origin story, the product portfolio, the customers and contracts, the financial trajectory, and the risks.",
    sections: [
      {
        heading: "Origin: a journalist and structured data",
        body:
          "IRIS was founded in 2000 by **S. Swaminathan**, a former journalist and Yale-educated entrepreneur who had earlier founded the financial-information firm **Investment Research & Information Services Ltd (1994)** — the source of the 'IRIS' name. The bet: as reporting moved from paper to machine-readable data, both filers and regulators would need specialist software.",
        certainty: "FACT",
        sources: ["marketscreener-swaminathan", "exchange4media-swaminathan"],
      },
      {
        heading: "India's XBRL pioneer",
        body:
          "IRIS implemented XBRL solutions for **RBI, SEBI, BSE and NSE**, and became the MCA's XBRL filing specialist — the backbone of its regulator credibility that later exported internationally.",
        certainty: "COMPANY_CLAIM",
        sources: ["iris-filexbrl-abs"],
      },
      {
        heading: "The product portfolio",
        body:
          "- **IRIS iFILE** — regulator-side collection/validation/analytics (30+ regulators).\n- **IRIS CARBON** — SaaS disclosure management in XBRL/iXBRL, incl. ESG.\n- **IRIS iDEAL** — regulatory reporting for banks/investment firms.\n- **IRIS iConnect** — XBRL analytics in Excel; **Credixo** — credit models.\n- **IRIS MSME** — financial-inclusion tooling for small firms.\n- *(Divested) GST, e-invoicing, Zircon APIs → Sovos, 2025.*",
        certainty: "COMPANY_CLAIM",
        sources: ["stockanalysis-company-profile", "iris-ifile-page", "screener-iris"],
      },
      {
        heading: "Customers, contracts, geography",
        body:
          "Named engagements include the **Qatar Tax Authority** (6-year, 2025), **South African Reserve Bank** (extension, 2025), **Gap Inc.** (CARBON sustainability report), a **Brazilian oil & gas** major (via MZ Consult), and Indian regulators RBI/SEBI/MCA/NSE/BSE. Footprint: **52+ countries** across India, Middle East, APAC, Africa, US, Europe, UK.",
        certainty: "FACT",
        sources: ["scanx-qatar-tax", "scanx-sarb", "newswire-gap-carbon", "scanx-mz-brazil", "linkedin-iris-company"],
      },
      {
        heading: "Financial trajectory & the caveat",
        body:
          "Revenue: ~₹74 Cr (FY23) → ~₹102 Cr (FY24) → ~₹110 Cr (FY25) → ~₹128 Cr (FY26). The company is roughly debt-free, but reported FY26 profit is inflated by the ~₹123 Cr divestment gain; Q1 FY27 posted a small net loss on higher costs. Promoter holding is ~34.6%; no dividend is paid.",
        certainty: "FACT",
        sources: ["screener-iris", "pti-q1fy27"],
      },
      {
        heading: "Risks to hold in mind",
        body:
          "Founder loss and succession; low promoter holding; customer concentration in a few large regulator contracts; a post-divestment revenue gap; and dependence on regulators continuing to digitise. These are the honest counterweights to the growth story.",
        certainty: "INFERENCE",
        sources: ["screener-iris", "sovos-acquisition"],
      },
    ],
    entityRefs: [
      "company:iris",
      "company:sovos",
      "company:gap-inc",
      "company:mz-consult",
      "product:iris-ifile",
      "product:iris-carbon",
      "product:iris-ideal",
      "product:iris-iconnect",
      "product:iris-credixo",
      "regulator:qatar-gta",
      "regulator:sarb",
    ],
    sources: ["stockanalysis-company-profile", "screener-iris", "sovos-acquisition", "scanx-qatar-tax"],
  },

  // ====================================================================
  // SNAPSHOT — IRIS in 1 hour
  // ====================================================================
  {
    id: "iris-in-1-hour",
    title: "IRIS IN 1 HOUR",
    order: 103,
    track: "SNAPSHOT",
    summary:
      "The structured one-hour walkthrough: position in the domain, the full portfolio, customers and contracts, technology, competitors, financials, and strategy — with pointers into the deeper encyclopedia.",
    sections: [
      {
        heading: "1. Position in the domain (10 min)",
        body:
          "Start from the domain, not the company. RegTech (firm-side compliance technology) and SupTech (regulator-side supervision technology) are two halves of one reporting system, built on structured-data standards (**XBRL**, **iXBRL**, **SDMX**). IRIS sits at the intersection: a vendor to *both* halves. This dual-sided position is the single most important thing to understand about IRIS.",
        certainty: "FACT",
        sources: ["fca-regtech", "bis-suptech-generations", "xbrl-what-is"],
      },
      {
        heading: "2. The company (10 min)",
        body:
          "**IRIS RegTech Solutions Limited** — India-listed (NSE:IRIS / BSE:540735), incorporated 2000, HQ Navi Mumbai. Founded by **S. Swaminathan** (former journalist; also founded Investment Research & Information Services Ltd, 1994 — the 'IRIS' name). India's XBRL pioneer: implemented XBRL for **RBI, SEBI, BSE, NSE** and the MCA. Now spans **52+ countries**.",
        certainty: "FACT",
        sources: ["marketscreener-swaminathan", "iris-filexbrl-abs", "linkedin-iris-company"],
      },
      {
        heading: "3. The product portfolio (15 min)",
        body:
          "Four segments, three current:\n\n- **SupTech — iFILE:** regulator-side 'collect, validate, analyse' platform, 30+ regulators.\n- **RegTech — iDEAL** (bank/investment-firm supervisory reporting; RBI CIMS, MUFG) **and CARBON** (Office 365 disclosure/XBRL/iXBRL/ESG; Gap Inc., MZ Consult).\n- **DataTech — iConnect** (XBRL analytics in Excel), **Credixo** (credit models), **MSME** (financial inclusion).\n- **TaxTech (divested):** GST, E-Invoicing, IRP, Zircon, LMS, Peridot → Sovos (Aug 2025).\n\nRead each product's deep-dive (21 aspects, workflow, levels, relationship map).",
        certainty: "COMPANY_CLAIM",
        sources: ["iris-ifile-page", "iris-ideal-page", "carbon-launch-office365", "sovos-acquisition"],
      },
      {
        heading: "4. Customers & contracts (10 min)",
        body:
          "Regulator side: **Qatar Tax Authority** (6-year), **SARB** (extension), Indian RBI/SEBI/MCA/NSE/BSE. Filer side: **Gap Inc.** (CARBON ESG), **MUFG Bank** (iDEAL), a Brazilian oil & gas major (via MZ Consult). The pattern: regulator franchises provide the reference credibility; filer products monetise the same standards expertise.",
        certainty: "FACT",
        sources: ["scanx-qatar-tax", "scanx-sarb", "newswire-gap-carbon", "iris-ideal-page"],
      },
      {
        heading: "5. Technology (10 min)",
        body:
          "XBRL data model (facts, contexts, dimensions, extensions), validation, ETL/transformation, cloud/SaaS (CARBON = Office 365), analytics (iConnect), and the **AI frontier** (no documented IRIS AI product; structured data positions it). Use each technology page's **docStatus** to separate documented fact from inference.",
        certainty: "COMPANY_CLAIM",
        sources: ["carbon-launch-office365", "iconnect-launch", "xbrl-what-is"],
      },
      {
        heading: "6. Competitors (5 min)",
        body:
          "Direct: Workiva, CoreFiling, Regnology, Toppan Merrill, DataTracks, ParsePort. Adjacent: Vizor, LucaNet, Wolters Kluwer, ClearTax, Adenza. Non-competitors: SAP, IBM, FIS, Finastra, Moody's, NICE Actimize, Broadridge. IRIS wins on standards depth, regulator trust and value; large rivals win on scale and enterprise penetration.",
        certainty: "ANALYST_VIEW",
        sources: ["stockanalysis-company-profile"],
      },
      {
        heading: "7. Financials & strategy (5 min)",
        body:
          "Revenue ~₹74 Cr (FY23) → ~₹128 Cr (FY26); FY26 profit inflated by a ~₹123 Cr divestment gain. Strategy: exit TaxTech, concentrate on RegTech/SupTech/DataTech, target **₹500 Cr**. Risks: succession, low promoter holding (~34.6%), customer concentration, post-divestment gap.",
        certainty: "FACT",
        sources: ["screener-iris", "scanx-500cr-target", "sovos-acquisition"],
      },
      {
        heading: "8. Open questions to carry forward",
        body:
          "Can the core replace divested TaxTech revenue? Will ESG/CSRD convert into CARBON revenue? Will the DataTech subsidiary scale? Keep these in mind as you finish with the **IRIS Deep Dive**.",
        certainty: "INFERENCE",
        sources: ["scanx-500cr-target", "scanx-datatech-subsidiary"],
      },
    ],
    entityRefs: [
      "company:iris",
      "company:sovos",
      "company:gap-inc",
      "company:mufg-bank",
      "company:workiva",
      "product:iris-ifile",
      "product:iris-ideal",
      "product:iris-carbon",
      "product:iris-iconnect",
      "product:iris-credixo",
      "concept:xbrl",
      "concept:regtech",
      "concept:suptech",
    ],
    sources: ["stockanalysis-company-profile", "screener-iris", "sovos-acquisition", "iris-ifile-page"],
  },

  // ====================================================================
  // SNAPSHOT — IRIS Deep Dive
  // ====================================================================
  {
    id: "iris-deep-dive",
    title: "IRIS DEEP DIVE",
    order: 104,
    track: "SNAPSHOT",
    summary:
      "The full analytical picture — why IRIS exists, the four evidential lenses, strategy, and positioning.",
    sections: [
      {
        heading: "Why IRIS exists — the value chain",
        body:
          "Walk the causal chain: **Industry problem** (reporting went machine-readable) → **Regulatory complexity** (rules multiplied post-2008) → **Data problem** (firms must map messy data onto taxonomies) → **Customer problem** (neither filers nor regulators had tooling) → **IRIS solution** (one vendor for both sides) → **Business value** (recurring revenue from a durable niche).",
        certainty: "INFERENCE",
        sources: ["xbrl-what-is", "fca-regtech", "stockanalysis-company-profile"],
      },
      {
        heading: "The four evidential lenses",
        body:
          "Separate **what IRIS says** (global RegTech/SupTech/DataTech leader, ₹500 Cr target), **what customers say** (Gap Inc., Qatar GTA, SARB repeat business; Central Banking Award), **what third parties say** (Screener flags low promoter holding and one-time-gain distortion; one service rates IRIS 'Sell'), and **what the evidence suggests** (real revenue growth, but modest underlying margins and a post-divestment gap).",
        certainty: "ANALYST_VIEW",
        sources: ["screener-iris", "iris-ifile-page", "newswire-gap-carbon"],
      },
      {
        heading: "Strategy across five axes",
        body:
          "- **Product:** own the data value chain (reporting + collection + analytics).\n- **Technology:** XBRL/iXBRL/SDMX depth as a moat.\n- **AI:** structured data as high-quality input for AI; ESG as the frontier.\n- **Geographic:** expand the regulator franchise (Middle East, Africa, LatAm).\n- **Growth:** exit TaxTech, concentrate on RegTech/SupTech/DataTech, target ₹500 Cr.",
        certainty: "COMPANY_CLAIM",
        sources: ["scanx-500cr-target", "sustainability-magazine-esg"],
      },
      {
        heading: "Market positioning",
        body:
          "A **small-cap (~₹492 Cr)** global niche player with 20+ years of domain depth, a rare dual-side product set, and international recognition (Central Banking Award 2024; a seat on the XBRL International board). Its edge is standards expertise and regulator trust; its challenge is scale and concentration.",
        certainty: "INFERENCE",
        sources: ["screener-iris", "theweek-central-banking-award", "theprint-xbrl-board"],
      },
      {
        heading: "What to watch next",
        body:
          "Can IRIS replace divested TaxTech revenue with RegTech/SupTech/DataTech growth? Will the ESG/CSRD wave convert into material CARBON revenue? Will the new DataTech subsidiary scale? These are the open questions that determine whether the ₹500 Cr target is reached.",
        certainty: "INFERENCE",
        sources: ["scanx-500cr-target", "scanx-datatech-subsidiary"],
      },
    ],
    entityRefs: [
      "company:iris",
      "company:sovos",
      "product:iris-ifile",
      "product:iris-carbon",
      "concept:regtech",
      "concept:suptech",
      "concept:datatech",
      "concept:esg-reporting",
      "concept:regulatory-taxonomies",
    ],
    sources: ["screener-iris", "stockanalysis-company-profile", "sovos-acquisition", "scanx-500cr-target"],
  },
];
