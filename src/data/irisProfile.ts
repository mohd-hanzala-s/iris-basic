import type { Certainty } from "./types";

/**
 * Two structured datasets that explain IRIS as a company:
 *  1. `whyIrisExists` — the problem → solution → value chain.
 *  2. `irisPerspectives` — the four evidential lenses:
 *     WHAT IRIS SAYS, WHAT CUSTOMERS SAY, WHAT THIRD PARTIES SAY,
 *     WHAT THE EVIDENCE SUGGESTS.
 */

export interface ChainStep {
  id: string;
  label: string;
  title: string;
  body: string;
  sources: string[];
  certainty: Certainty;
}

export const whyIrisExists: ChainStep[] = [
  {
    id: "industry-problem",
    label: "Industry problem",
    title: "Reporting kept moving to machines",
    body:
      "After 2008, regulators worldwide began demanding business data as structured, machine-readable files rather than paper or PDF. This is a global, decades-long shift.",
    sources: ["xbrl-what-is", "esma-esef"],
    certainty: "FACT",
  },
  {
    id: "regulatory-complexity",
    label: "Regulatory complexity",
    title: "Rules multiplied and kept changing",
    body:
      "Capital, liquidity, conduct, AML, tax and (now) ESG rules grew faster than firms' ability to comply manually — creating a permanent, expensive compliance burden.",
    sources: ["fca-regtech", "bcbs239"],
    certainty: "FACT",
  },
  {
    id: "data-problem",
    label: "Data problem",
    title: "Data had to conform to taxonomies",
    body:
      "To report, a firm must map its messy internal data onto the regulator's 'dictionary' (XBRL/iXBRL/SDMX taxonomy), validate it, and file on time — a hard, standards-heavy engineering problem.",
    sources: ["xbrl-what-is", "esma-esef"],
    certainty: "FACT",
  },
  {
    id: "customer-problem",
    label: "Customer problem",
    title: "Both sides lacked the tooling",
    body:
      "Regulated firms had no easy way to produce conformant reports; regulators had no easy way to collect and analyse them. Both needed specialist software.",
    sources: ["iris-ifile-page", "stockanalysis-company-profile"],
    certainty: "COMPANY_CLAIM",
  },
  {
    id: "iris-solution",
    label: "IRIS solution",
    title: "One vendor for both sides",
    body:
      "IRIS built reporting/disclosure products for firms (CARBON, iDEAL) and collection/analytics platforms for regulators (iFILE) — unusual breadth across SupTech, RegTech, TaxTech and DataTech.",
    sources: ["stockanalysis-company-profile", "iris-ifile-page"],
    certainty: "COMPANY_CLAIM",
  },
  {
    id: "business-value",
    label: "Business value",
    title: "Recurring revenue from a durable niche",
    body:
      "This position yields subscription/licensing revenue from regulators and enterprises in 52+ countries — a ~₹128 Cr business (FY26) with a ₹500 Cr stated ambition.",
    sources: ["linkedin-iris-company", "screener-iris", "scanx-500cr-target"],
    certainty: "FACT",
  },
];

export interface Perspective {
  id: string;
  label: string;
  /** Short framing of who is speaking. */
  speaker: string;
  points: { text: string; sources: string[]; certainty: Certainty }[];
}

export const irisPerspectives: Perspective[] = [
  {
    id: "what-iris-says",
    label: "What IRIS says",
    speaker: "Company website, press releases, management commentary",
    points: [
      {
        text: "IRIS positions itself as a global RegTech/SupTech/DataTech company with 20+ years of expertise in structured data standards (XBRL and SDMX), serving regulators, enterprises and financial institutions worldwide.",
        sources: ["stockanalysis-company-profile", "screener-iris"],
        certainty: "COMPANY_CLAIM",
      },
      {
        text: "iFILE is 'trusted by over 30 regulators worldwide'; solutions are deployed in 52+ countries.",
        sources: ["iris-ifile-page", "linkedin-iris-company"],
        certainty: "COMPANY_CLAIM",
      },
      {
        text: "Management targets ₹500 Cr revenue, to be driven by RegTech, SupTech and the new DataTech subsidiary.",
        sources: ["scanx-500cr-target"],
        certainty: "COMPANY_CLAIM",
      },
      {
        text: "On founder Swaminathan's passing, the company framed him as 'the very foundation of the company' and committed to carrying his vision forward.",
        sources: ["bwdisrupt-swaminathan"],
        certainty: "COMPANY_CLAIM",
      },
    ],
  },
  {
    id: "what-customers-say",
    label: "What customers say",
    speaker: "Named customers, awards bodies, and revealed preference",
    points: [
      {
        text: "Gap Inc. adopted IRIS CARBON to publish its sustainability report digitally, citing transparency and ease of access.",
        sources: ["newswire-gap-carbon"],
        certainty: "CUSTOMER_OPINION",
      },
      {
        text: "The Qatar Tax Authority signed a six-year contract (2025) and the South African Reserve Bank extended its project — repeat/long-term engagements that signal regulator satisfaction.",
        sources: ["scanx-qatar-tax", "scanx-sarb"],
        certainty: "FACT",
      },
      {
        text: "IRIS won the Central Banking 'Global Central Banking Award 2024' for Technology Services — an industry recognition awarded in London.",
        sources: ["theweek-central-banking-award"],
        certainty: "FACT",
      },
    ],
  },
  {
    id: "what-third-parties-say",
    label: "What third parties say",
    speaker: "Analysts, data providers, financial media",
    points: [
      {
        text: "Screener's machine-generated checklist flags strengths (near debt-free, strong 5-yr profit CAGR, high ROE) and weaknesses (no dividend, low promoter holding ~34.6%, FY26 profit inflated by ₹123 Cr other income).",
        sources: ["screener-iris"],
        certainty: "ANALYST_VIEW",
      },
      {
        text: "One analyst-rating service rated IRIS 'Sell'; simplywall.st described a strong earnings trajectory while questioning valuation headroom.",
        sources: ["screener-iris"],
        certainty: "ANALYST_VIEW",
      },
      {
        text: "Financial media note marquee investor interest — Madhusudan Kela and Narayana Murthy's fund have held/bought the stock — and rising FII ownership.",
        sources: ["screener-iris"],
        certainty: "ANALYST_VIEW",
      },
    ],
  },
  {
    id: "what-evidence-suggests",
    label: "What the evidence suggests",
    speaker: "Audited/standardised financial data",
    points: [
      {
        text: "Revenue grew from ~₹74 Cr (FY23) to ~₹128 Cr (FY26); the company crossed ₹100 Cr in FY25 and is roughly debt-free.",
        sources: ["screener-iris", "prnewswire-100cr"],
        certainty: "FACT",
      },
      {
        text: "FY26 reported PAT (~₹127 Cr) is inflated by a ~₹123 Cr one-time gain from the TaxTech divestment; underlying operating profit (ex-gain) is far smaller, and Q1 FY27 posted a small net loss on higher costs.",
        sources: ["screener-iris", "pti-q1fy27"],
        certainty: "FACT",
      },
      {
        text: "The TaxTech exit (₹151 Cr to Sovos) removes a material revenue line, meaning near-term reported growth depends on scaling RegTech/SupTech/DataTech.",
        sources: ["sovos-acquisition", "hdfc-sky-151cr"],
        certainty: "INFERENCE",
      },
    ],
  },
];
