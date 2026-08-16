import type { Quiz } from "./types";

/**
 * Quizzes. Seeded with one foundations quiz to demonstrate the engine; more
 * quizzes are added as modules and research deepen.
 */
export const quizzes: Quiz[] = [
  {
    id: "quiz-foundations-1",
    title: "RegTech Foundations",
    description: "Core definitions to verify you have the domain vocabulary.",
    questions: [
      {
        id: "q-regtech",
        prompt: "RegTech primarily helps which party manage regulatory compliance?",
        options: ["Regulators", "Regulated firms", "Auditors only", "Investors"],
        correctIndex: 1,
        explanation:
          "RegTech (Regulatory Technology) is technology used by regulated firms to manage compliance. Technology used by regulators is SupTech.",
        entityRefs: ["glossary:regtech", "glossary:suptech"],
      },
      {
        id: "q-xbrl",
        prompt: "What does the 'X' in XBRL stand for?",
        options: ["Extended", "eXtensible", "External", "eXecutable"],
        correctIndex: 1,
        explanation: "XBRL = eXtensible Business Reporting Language.",
        entityRefs: ["glossary:xbrl"],
      },
      {
        id: "q-iris-segments",
        prompt: "Which of these is NOT one of IRIS's four operating segments?",
        options: ["SupTech", "RegTech", "TaxTech", "InsurTech"],
        correctIndex: 3,
        explanation:
          "IRIS operates through SupTech, RegTech, TaxTech and DataTech segments. InsurTech is not an IRIS segment.",
        entityRefs: ["company:iris"],
        sources: ["stockanalysis-company-profile"],
      },
    ],
  },
  {
    id: "quiz-domain-1",
    title: "RegTech Domain",
    description: "Verify your understanding of the RegTech ecosystem, standards and data concepts.",
    questions: [
      {
        id: "qd-supertch",
        prompt: "Which technology is used by regulators and supervisors themselves?",
        options: ["RegTech", "SupTech", "FinTech", "DataTech"],
        correctIndex: 1,
        explanation:
          "SupTech (Supervisory Technology) is the use of technology — especially big data and AI — by financial authorities for supervision, as defined by the BIS.",
        entityRefs: ["concept:suptech", "glossary:suptech"],
        sources: ["bis-suptech-generations"],
      },
      {
        id: "qd-ixbrl",
        prompt: "What makes iXBRL different from plain XBRL?",
        options: [
          "It only works for banks",
          "Tags are embedded in a human-readable HTML report",
          "It is a synonym for SDMX",
          "It requires PDF output",
        ],
        correctIndex: 1,
        explanation:
          "Inline XBRL embeds XBRL tags inside a human-readable HTML document, so a single filing is both human- and machine-readable.",
        entityRefs: ["concept:ixbrl", "glossary:ixbrl"],
        sources: ["xbrl-ixbrl"],
      },
      {
        id: "qd-sdmx",
        prompt: "SDMX is primarily the standard for exchanging what?",
        options: [
          "Entity-level financial statements",
          "Aggregate statistical data and metadata between official organisations",
          "Payment messages between banks",
          "Identity verification data",
        ],
        correctIndex: 1,
        explanation:
          "SDMX (ISO 17369) standardises the exchange of statistical/aggregate data and metadata, used heavily by central banks and statistical offices.",
        entityRefs: ["concept:sdmx", "glossary:sdmx"],
        sources: ["sdmx-home"],
      },
      {
        id: "qd-esef",
        prompt: "What does the EU's ESEF mandate require of listed issuers?",
        options: [
          "File annual reports in XHTML with IFRS statements tagged in Inline XBRL",
          "File only in PDF",
          "File in SDMX",
          "Nothing — it is voluntary",
        ],
        correctIndex: 0,
        explanation:
          "ESEF (European Single Electronic Format) requires EU listed issuers to file annual reports as XHTML with consolidated IFRS statements tagged in iXBRL.",
        entityRefs: ["concept:regulatory-reporting"],
        sources: ["esma-esef"],
      },
      {
        id: "qd-lineage",
        prompt: "Data lineage refers to:",
        options: [
          "A chart of company ownership",
          "The recorded trail of a data point's origin, movement and transformations",
          "The storage capacity of a database",
          "A list of regulatory deadlines",
        ],
        correctIndex: 1,
        explanation:
          "Data lineage is the auditable, end-to-end record of where data came from and how it changed — central to BCBS 239 compliance.",
        entityRefs: ["concept:data-lineage"],
        sources: ["bcbs239"],
      },
      {
        id: "qd-validation",
        prompt: "In regulatory reporting, data validation means:",
        options: [
          "Encrypting the report before sending",
          "Running taxonomy rules and cross-checks to catch errors before submission",
          "Manually proofreading a PDF",
          "Backing up the report",
        ],
        correctIndex: 1,
        explanation:
          "Validation runs the machine-readable rules embedded in a taxonomy (required fields, calculations, cross-checks) to catch errors.",
        entityRefs: ["concept:data-validation"],
        sources: ["xbrl-what-is", "esma-esef"],
      },
      {
        id: "qd-fintech",
        prompt: "Which statement best distinguishes FinTech from RegTech?",
        options: [
          "FinTech is for regulators, RegTech is for firms",
          "FinTech is innovation in financial services delivery; RegTech is technology for regulatory compliance",
          "They are identical",
          "RegTech is a subset of payments only",
        ],
        correctIndex: 1,
        explanation:
          "FinTech broadly covers innovation in financial products and delivery; RegTech is specifically technology to manage regulatory compliance.",
        entityRefs: ["concept:fintech-vs-regtech"],
        sources: ["fca-regtech"],
      },
      {
        id: "qd-iris-datatech",
        prompt: "Which IRIS products are part of the DataTech segment?",
        options: ["iFILE and iDEAL", "iConnect and Credixo", "CARBON and GST", "E-Invoicing and CARBON"],
        correctIndex: 1,
        explanation:
          "IRIS iConnect (XBRL/iXBRL data analytics) and Credixo (credit data) are named as DataTech products.",
        entityRefs: ["concept:datatech", "product:iris-iconnect", "product:iris-credixo"],
        sources: ["stockanalysis-company-profile"],
      },
    ],
  },
  {
    id: "quiz-iris-1",
    title: "IRIS: The Company",
    description: "Verify your understanding of IRIS as a company — history, structure, strategy and evidence.",
    questions: [
      {
        id: "qi-founder",
        prompt: "Who founded IRIS, and what happened in March 2025?",
        options: [
          "Balachandran Krishnan; he retired",
          "S. Swaminathan, a former journalist; he passed away",
          "Deepta Rangarajan; he became Chairman",
          "Anand Padmanabhan; he left the company",
        ],
        correctIndex: 1,
        explanation:
          "IRIS was founded by S. Swaminathan, a former journalist and Yale-educated entrepreneur; he died of cardiac arrest in March 2025, after which co-founder Balachandran Krishnan led the company.",
        entityRefs: ["company:iris"],
        sources: ["cnbctv18-swaminathan", "marketscreener-swaminathan"],
      },
      {
        id: "qi-xbrl-india",
        prompt: "Which Indian institutions has IRIS built XBRL solutions for?",
        options: [
          "RBI, SEBI, BSE and NSE",
          "Only the Ministry of Corporate Affairs",
          "Only private banks",
          "NITI Aayog and ISRO",
        ],
        correctIndex: 0,
        explanation:
          "IRIS implemented XBRL solutions for the RBI, SEBI, BSE and NSE, establishing itself as India's XBRL specialist.",
        entityRefs: ["company:iris"],
        sources: ["iris-filexbrl-abs"],
      },
      {
        id: "qi-ipo",
        prompt: "How and when did IRIS first list on a stock exchange?",
        options: [
          "Main-board NSE IPO in 2010",
          "SME IPO on NSE Emerge in 2017",
          "BSE direct listing in 2020",
          "It has never listed",
        ],
        correctIndex: 1,
        explanation:
          "IRIS listed via an SME IPO on the NSE Emerge platform (2017), later migrating to the NSE/BSE main board.",
        entityRefs: ["company:iris"],
        sources: ["ipocentral-iris-ipo"],
      },
      {
        id: "qi-divest",
        prompt: "What did IRIS divest in 2025, and to whom?",
        options: [
          "Its SupTech business to the RBI",
          "Its APAC Tax Technology (GST) business to Sovos",
          "Its US subsidiary to Workiva",
          "Its DataTech business to MZ Consult",
        ],
        correctIndex: 1,
        explanation:
          "IRIS sold its APAC Tax Technology (GST) business (IRIS Logix Solutions Pvt Ltd) to US-based Sovos for ~₹151 Cr to focus on RegTech/SupTech/DataTech.",
        entityRefs: ["company:iris", "company:sovos"],
        sources: ["sovos-acquisition", "hdfc-sky-151cr"],
      },
      {
        id: "qi-ifile",
        prompt: "IRIS iFILE is best described as:",
        options: [
          "A firm-side tax filing app",
          "A regulator-side platform to collect, validate and analyse data",
          "A CRM for banks",
          "A cryptocurrency compliance tool",
        ],
        correctIndex: 1,
        explanation:
          "iFILE is a SupTech platform for regulators — 'trusted by over 30 regulators worldwide'.",
        entityRefs: ["product:iris-ifile", "concept:suptech"],
        sources: ["iris-ifile-page"],
      },
      {
        id: "qi-profit",
        prompt: "Why is IRIS's FY26 reported net profit a poor guide to ongoing earnings?",
        options: [
          "It is entirely from recurring subscription revenue",
          "It includes a ~₹123 Cr one-time gain from the TaxTech divestment",
          "It was audited incorrectly",
          "It excludes the DataTech subsidiary",
        ],
        correctIndex: 1,
        explanation:
          "FY26 PAT (~₹127 Cr) is inflated by a ~₹123 Cr one-time gain from the Sovos divestment; underlying operating profit is far smaller.",
        entityRefs: ["company:iris"],
        sources: ["screener-iris", "theprint-q4fy26"],
      },
      {
        id: "qi-segments",
        prompt: "Which statement about IRIS's strategy is best supported by the evidence?",
        options: [
          "IRIS is doubling down on TaxTech",
          "IRIS is exiting TaxTech to concentrate on RegTech, SupTech and DataTech",
          "IRIS is leaving the regulator market",
          "IRIS is pivoting to hardware",
        ],
        correctIndex: 1,
        explanation:
          "The Sovos divestment, the DataTech subsidiary formation and the ₹500 Cr target all point to concentrating on RegTech/SupTech/DataTech.",
        entityRefs: ["company:iris", "company:sovos"],
        sources: ["sovos-acquisition", "scanx-datatech-subsidiary", "scanx-500cr-target"],
      },
      {
        id: "qi-promoter",
        prompt: "What is IRIS's promoter (founder/family) holding, and what concern does it raise?",
        options: [
          "~75% — highly concentrated control",
          "~34.6% — flagged by analysts as low",
          "0% — fully institutional",
          "~51% — standard majority",
        ],
        correctIndex: 1,
        explanation:
          "Promoter holding is ~34.6%, which data providers flag as low — a governance/control consideration.",
        entityRefs: ["company:iris"],
        sources: ["screener-iris"],
      },
    ],
  },
  {
    id: "quiz-scenarios",
    title: "Scenario Drills",
    description:
      "Situational questions. You are put in a real decision-maker's seat — the goal is judgement, not recall.",
    questions: [
      {
        id: "sc-central-bank",
        kind: "scenario",
        scenario:
          "You are the CTO of a national central bank. You must collect, validate and analyse prudential returns from 400 banks, in a country where data is currently filed as spreadsheets by email. Your budget is modest and you need something live within two years.",
        prompt: "Which approach best fits your situation, and why?",
        options: [
          "Build a custom collection platform from scratch in-house",
          "License a SupTech data-collection platform (e.g. IRIS iFILE) and configure it to your taxonomies",
          "Ask banks to file via a shared spreadsheet template",
          "Outsource the entire supervision function to a consultant",
        ],
        correctIndex: 1,
        explanation:
          "A regulator-side platform that collects, validates and analyses structured data (SupTech, like IRIS iFILE) addresses the core need — scale, validation on entry, and structured data — faster and cheaper than a bespoke build, and far better than spreadsheet templates. IRIS's iFILE is precisely this: 'an end-to-end electronic filing platform to collect, validate, and analyze any type of data from entities', used by 30+ regulators.",
        entityRefs: ["product:iris-ifile", "concept:suptech", "concept:regulatory-data-collection"],
        sources: ["iris-ifile-page"],
      },
      {
        id: "sc-esef-cfo",
        kind: "scenario",
        scenario:
          "You are the CFO of a company listed on an EU regulated market. The ESEF mandate requires your next annual report to be filed as XHTML with IFRS statements tagged in Inline XBRL. Your finance team works in Microsoft Word and Excel and has no XBRL expertise.",
        prompt: "What is the most practical way to comply?",
        options: [
          "Hire a team of XBRL engineers to hand-code the taxonomy tags",
          "File a PDF and hope the regulator accepts it",
          "Use an Office 365-based disclosure platform that tags and renders XBRL/iXBRL from your existing documents",
          "Outsource to a competitor and never touch the filing again",
        ],
        correctIndex: 2,
        explanation:
          "Disclosure-management software that works inside familiar Office tools (like IRIS CARBON, which is Office 365-based) lets non-specialist finance teams author once and render ESEF-compliant iXBRL plus PDF — avoiding both hand-coding and non-compliance. This is exactly the gap disclosure products fill.",
        entityRefs: ["product:iris-carbon", "regulation:esef", "concept:disclosure-management", "concept:ixbrl"],
        sources: ["carbon-launch-office365", "esma-esef"],
      },
      {
        id: "sc-rbi-bank",
        kind: "scenario",
        scenario:
          "You head regulatory reporting at an Indian bank. The RBI has centralised its returns under the CIMS programme, and your bank's manual reporting process keeps producing errors that draw supervisory queries.",
        prompt: "Which move most directly reduces error risk and effort?",
        options: [
          "Add more headcount to the reporting team",
          "Adopt automated regulatory-reporting software that maps internal data to the RBI taxonomy and validates before submission",
          "Ask the RBI for exemptions",
          "Switch to annual-only reporting",
        ],
        correctIndex: 1,
        explanation:
          "Automated reporting software (IRIS iDEAL is a regulatory-reporting solution for banks, used for RBI submissions — e.g. MUFG Bank) maps source data onto the regulator's taxonomy and validates before submission, directly reducing the transformation and validation errors that cause queries. Headcount doesn't fix a data-mapping problem.",
        entityRefs: ["product:iris-ideal", "regulation:rbi-returns", "concept:data-transformation", "concept:data-validation"],
        sources: ["iris-ideal-page", "iris-rbi-cims"],
      },
      {
        id: "sc-analyst-strategy",
        kind: "scenario",
        scenario:
          "You are an equity analyst. IRIS has just sold its TaxTech business to Sovos for ~₹151 Cr and reported FY26 profit that looks impressive — but you notice it includes a ~₹123 Cr one-time gain.",
        prompt: "What is the correct analytical move?",
        options: [
          "Treat the reported FY26 profit as the run-rate and extrapolate it forward",
          "Strip out the one-time divestment gain and assess whether the remaining RegTech/SupTech/DataTech core can grow into the revenue gap",
          "Ignore financials because IRIS is a 'story' stock",
          "Assume TaxTech was loss-making and the sale changes nothing",
        ],
        correctIndex: 1,
        explanation:
          "The honest analysis separates one-time gains from operating performance. The real question is whether the remaining core (RegTech/SupTech/DataTech, targeting ₹500 Cr) can replace the divested TaxTech revenue — a genuine post-divestment risk. This is the 'four evidential lenses' discipline: separate what the company says from what the evidence suggests.",
        entityRefs: ["company:iris", "company:sovos", "concept:datatech"],
        sources: ["screener-iris", "theprint-q4fy26", "sovos-acquisition"],
      },
      {
        id: "sc-regulator-vendor",
        kind: "scenario",
        scenario:
          "You are a procurement lead at a securities regulator in an emerging market. Two vendors bid for your XBRL collection and analytics platform: a large global enterprise vendor with strong brand but generic product, and a specialist with deep XBRL/iXBRL expertise and 20+ years of regulator implementations (IRIS).",
        prompt: "What should drive the decision?",
        options: [
          "Brand size alone",
          "Which vendor can map your jurisdiction's specific taxonomies, validate filer data correctly, and support you through mandate changes",
          "Whichever has the lowest licence fee, regardless of domain fit",
          "Whichever has the most marketing collateral",
        ],
        correctIndex: 1,
        explanation:
          "For a regulator, the differentiator is domain depth: taxonomy development/testing, validation correctness, and support across mandate changes. IRIS's competitive edge is exactly standards expertise plus regulator trust (RBI/SEBI/MCA/NSE/BSE heritage, 30+ regulators), while large rivals win on scale and brand. The right choice depends on your priority: specialist fit vs. enterprise reach.",
        entityRefs: ["company:iris", "company:workiva", "company:corefiling", "product:iris-ifile"],
        sources: ["iris-filexbrl-abs", "iris-ifile-page"],
      },
    ],
  },
];
