import type { Certainty } from "./types";

/**
 * The IRIS timeline, ordered ORIGIN → EVOLUTION → MAJOR MILESTONES →
 * PRODUCT EVOLUTION → CURRENT POSITION → FUTURE DIRECTION. Each event is
 * source-attributed and certainty-tagged so the narrative stays auditable.
 */
export type TimelinePhase =
  | "ORIGIN"
  | "EVOLUTION"
  | "MAJOR MILESTONES"
  | "PRODUCT EVOLUTION"
  | "CURRENT POSITION"
  | "FUTURE DIRECTION";

export interface TimelineEvent {
  id: string;
  /** Year (approximate if prefixed with "c."). Rendered as the date marker. */
  year: string;
  title: string;
  description: string;
  phase: TimelinePhase;
  sources: string[];
  certainty: Certainty;
}

export const TIMELINE_PHASES: { id: TimelinePhase; label: string; blurb: string }[] = [
  { id: "ORIGIN", label: "Origin", blurb: "How and why IRIS was founded." },
  { id: "EVOLUTION", label: "Evolution", blurb: "From XBRL pioneer to a listed global RegTech." },
  { id: "MAJOR MILESTONES", label: "Major milestones", blurb: "Contracts, awards, leadership and structural change." },
  { id: "PRODUCT EVOLUTION", label: "Product evolution", blurb: "How the product portfolio formed and then refocused." },
  { id: "CURRENT POSITION", label: "Current position", blurb: "Where the company stands today." },
  { id: "FUTURE DIRECTION", label: "Future direction", blurb: "Where management says it is heading." },
];

export const timeline: TimelineEvent[] = [
  // --- ORIGIN -------------------------------------------------------------
  {
    id: "t-1994-iris-name",
    year: "1994",
    title: "The IRIS name is born",
    description:
      "Founder S. Swaminathan earlier founded Investment Research & Information Services Ltd (1994) — a financial information business whose acronym gives the 'IRIS' name that the later RegTech company carries.",
    phase: "ORIGIN",
    sources: ["marketscreener-swaminathan"],
    certainty: "FACT",
  },
  {
    id: "t-2000-founding",
    year: "2000",
    title: "IRIS Business Services incorporated",
    description:
      "IRIS Business Services Limited is incorporated in India (now Navi Mumbai, Maharashtra). The founding thesis: business reporting was moving from paper to structured data, and someone had to build the tooling.",
    phase: "ORIGIN",
    sources: ["stockanalysis-company-profile", "screener-iris"],
    certainty: "FACT",
  },
  {
    id: "t-2000s-xbrl-india",
    year: "2000s",
    title: "XBRL pioneer for Indian institutions",
    description:
      "IRIS implements XBRL solutions for India's core institutions — the RBI, SEBI, BSE and NSE — establishing itself as the country's XBRL specialist and later serving regulators in over a dozen countries.",
    phase: "ORIGIN",
    sources: ["iris-filexbrl-abs"],
    certainty: "COMPANY_CLAIM",
  },

  // --- EVOLUTION ----------------------------------------------------------
  {
    id: "t-2017-ipo",
    year: "2017",
    title: "IPO on the NSE Emerge (SME) platform",
    description:
      "IRIS Business Services lists via a SME IPO (opened 29 Sep 2017, listed 11 Oct 2017, ~₹16 Cr), later migrating to the NSE/BSE main board (BSE code 540735).",
    phase: "EVOLUTION",
    sources: ["ipocentral-iris-ipo"],
    certainty: "FACT",
  },
  {
    id: "t-global-expansion",
    year: "2017–2024",
    title: "Global SupTech/RegTech expansion",
    description:
      "IRIS grows a worldwide footprint — compliance, data and analytics solutions across 52+ countries — and builds a SupTech client base of 30+ regulators via iFILE.",
    phase: "EVOLUTION",
    sources: ["linkedin-iris-company", "iris-ifile-page"],
    certainty: "COMPANY_CLAIM",
  },
  {
    id: "t-2024-recognition",
    year: "2024",
    title: "Industry recognition",
    description:
      "IRIS wins the Central Banking 'Global Central Banking Award 2024' for Technology Services; IRIS's US President Anand Padmanabhan is elected to the XBRL International board.",
    phase: "EVOLUTION",
    sources: ["theweek-central-banking-award", "theprint-xbrl-board"],
    certainty: "FACT",
  },

  // --- MAJOR MILESTONES ---------------------------------------------------
  {
    id: "t-2025-02-goa",
    year: "Feb 2025",
    title: "Goa government MoU (MSME credit)",
    description:
      "IRIS signs an MoU with the Goa government to improve MSME credit access — an early signal of the IRIS MSME financial-inclusion push.",
    phase: "MAJOR MILESTONES",
    sources: ["projects-today-goa-msme"],
    certainty: "FACT",
  },
  {
    id: "t-2025-03-founder",
    year: "Mar 2025",
    title: "Founder & CEO S. Swaminathan passes away",
    description:
      "Founder, Promoter and CEO Subramaniam Swaminathan — a former journalist who built IRIS from 2000 — dies of cardiac arrest. Co-founder Balachandran Krishnan steps up to lead the company.",
    phase: "MAJOR MILESTONES",
    sources: ["cnbctv18-swaminathan", "bwdisrupt-swaminathan", "exchange4media-swaminathan"],
    certainty: "FACT",
  },
  {
    id: "t-2025-08-divest",
    year: "Aug 2025",
    title: "Divestment of TaxTech to Sovos",
    description:
      "IRIS sells its APAC Tax Technology (GST/e-invoicing) ASP business — IRIS Logix Solutions Pvt Ltd — to US-based Sovos for ~₹151 Cr, exiting the TaxTech segment to focus on RegTech/SupTech/DataTech.",
    phase: "MAJOR MILESTONES",
    sources: ["sovos-acquisition", "iris-pressrelease-divestment", "hdfc-sky-151cr"],
    certainty: "FACT",
  },
  {
    id: "t-2025-10-qatar",
    year: "Oct 2025",
    title: "6-year Qatar Tax Authority contract",
    description:
      "IRIS secures a strategic six-year contract with Qatar's General Tax Authority.",
    phase: "MAJOR MILESTONES",
    sources: ["scanx-qatar-tax"],
    certainty: "FACT",
  },
  {
    id: "t-2025-11-rebrand",
    year: "Nov 2025",
    title: "Rebrand to IRIS RegTech Solutions Limited",
    description:
      "Following shareholder and Ministry of Corporate Affairs approval, IRIS Business Services Limited becomes IRIS RegTech Solutions Limited, sharpening the RegTech identity.",
    phase: "MAJOR MILESTONES",
    sources: ["scanx-rebrand", "stockanalysis-company-profile"],
    certainty: "FACT",
  },
  {
    id: "t-2025-12-sarb",
    year: "Dec 2025",
    title: "South African Reserve Bank extension",
    description:
      "IRIS secures a contract extension for a South African Reserve Bank project — continued SupTech work with a major central bank.",
    phase: "MAJOR MILESTONES",
    sources: ["scanx-sarb"],
    certainty: "FACT",
  },
  {
    id: "t-2026-02-datatech",
    year: "Feb 2026",
    title: "DataTech subsidiary formation approved",
    description:
      "With Q3 FY26 results, the board approves formation of a dedicated DataTech subsidiary, signalling intent to scale the data/analytics business.",
    phase: "MAJOR MILESTONES",
    sources: ["scanx-datatech-subsidiary"],
    certainty: "FACT",
  },

  // --- PRODUCT EVOLUTION --------------------------------------------------
  {
    id: "t-prod-reporting",
    year: "2000s–2010s",
    title: "Reporting & disclosure tooling",
    description:
      "IRIS CARBON (disclosure management / XBRL-iXBRL) and IRIS iDEAL (regulatory reporting for banks and investment firms) form the RegTech core.",
    phase: "PRODUCT EVOLUTION",
    sources: ["stockanalysis-company-profile"],
    certainty: "COMPANY_CLAIM",
  },
  {
    id: "t-prod-suptech",
    year: "2010s",
    title: "SupTech: IRIS iFILE",
    description:
      "iFILE becomes the regulator-side platform — 'trusted by over 30 regulators worldwide' — for collecting, validating and analysing structured data from supervised entities.",
    phase: "PRODUCT EVOLUTION",
    sources: ["iris-ifile-page"],
    certainty: "COMPANY_CLAIM",
  },
  {
    id: "t-prod-taxtech",
    year: "2017–2025",
    title: "TaxTech rise (then exit)",
    description:
      "India's GST launch (2017) drives IRIS's GST software, e-invoicing, IRP connector and Zircon APIs. This TaxTech business is divested to Sovos in 2025.",
    phase: "PRODUCT EVOLUTION",
    sources: ["sovos-acquisition", "stockanalysis-company-profile"],
    certainty: "FACT",
  },
  {
    id: "t-prod-datatech",
    year: "2020s",
    title: "DataTech: iConnect, Credixo, MSME",
    description:
      "IRIS builds its DataTech layer — iConnect (XBRL analytics in Excel), Credixo (credit models for banks/fintechs) and IRIS MSME (financial access for small firms).",
    phase: "PRODUCT EVOLUTION",
    sources: ["stockanalysis-company-profile", "screener-iris"],
    certainty: "COMPANY_CLAIM",
  },

  // --- CURRENT POSITION ---------------------------------------------------
  {
    id: "t-2026-current",
    year: "FY2026",
    title: "Current position",
    description:
      "FY26 revenue ~₹128 Cr (23% YoY), with a one-time gain from the TaxTech divestment inflating reported PAT to ~₹127 Cr. Four segments (SupTech, RegTech, TaxTech — being exited — and DataTech), ~487 employees, promoter holding ~34.6%, market cap ~₹492 Cr.",
    phase: "CURRENT POSITION",
    sources: ["screener-iris", "theprint-q4fy26", "scanx-500cr-target"],
    certainty: "FACT",
  },

  // --- FUTURE DIRECTION ---------------------------------------------------
  {
    id: "t-future-target",
    year: "Forward",
    title: "₹500 Cr revenue target",
    description:
      "Management has publicly targeted ₹500 Cr revenue, to be reached by scaling RegTech and SupTech and the newly-formed DataTech subsidiary.",
    phase: "FUTURE DIRECTION",
    sources: ["scanx-500cr-target"],
    certainty: "COMPANY_CLAIM",
  },
  {
    id: "t-future-esg",
    year: "Forward",
    title: "ESG / CSRD digital reporting",
    description:
      "IRIS positions CARBON and its disclosure stack for the coming wave of digital sustainability reporting (EU CSRD/ESRS, ESEF extension) — ESG data 'at the core of business strategy'.",
    phase: "FUTURE DIRECTION",
    sources: ["sustainability-magazine-esg", "newswire-gap-carbon"],
    certainty: "COMPANY_CLAIM",
  },
  {
    id: "t-future-suptech",
    year: "Forward",
    title: "SupTech & regulator platform expansion",
    description:
      "Contract wins with the Qatar Tax Authority and South African Reserve Bank point to continued expansion of the regulator (SupTech) franchise internationally.",
    phase: "FUTURE DIRECTION",
    sources: ["scanx-qatar-tax", "scanx-sarb"],
    certainty: "INFERENCE",
  },
];
