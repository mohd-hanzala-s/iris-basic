/**
 * Evidence & research-quality layer.
 *
 * This module records, claim by claim, whether the knowledge base is actually
 * supported by reliable evidence. It is deliberately separate from the content
 * modules (companies.ts, products.ts, ...) so that the "facts" and the
 * "confidence in those facts" are audited independently.
 *
 * Grounding rule: where a claim could not be verified against a primary or
 * reliable source, it is labelled UNSUPPORTED / PLAUSIBLE / CONTRADICTED —
 * never silently treated as established.
 *
 * Last verification pass: 2026-08-15.
 */

// ---------------------------------------------------------------------------
// Taxonomies
// ---------------------------------------------------------------------------

export type EvidenceStatus =
  | "VERIFIED" // strong primary evidence
  | "WELL_SUPPORTED" // multiple reliable sources, or one authoritative source
  | "PLAUSIBLE" // some evidence, incomplete verification
  | "INFERENCE" // reasonable interpretation, not directly documented
  | "UNSUPPORTED" // no adequate evidence found
  | "CONTRADICTED" // reliable sources conflict with the claim
  | "OUTDATED"; // information was true but is no longer current

export const EVIDENCE_STATUS_LABEL: Record<EvidenceStatus, string> = {
  VERIFIED: "Verified",
  WELL_SUPPORTED: "Well supported",
  PLAUSIBLE: "Plausible",
  INFERENCE: "Inference",
  UNSUPPORTED: "Unsupported",
  CONTRADICTED: "Contradicted",
  OUTDATED: "Outdated",
};

export type EvidenceCategory =
  | "company"
  | "product"
  | "customer"
  | "competitor"
  | "regulation"
  | "technology"
  | "market"
  | "strategy";

export const EVIDENCE_CATEGORY_LABEL: Record<EvidenceCategory, string> = {
  company: "Company",
  product: "Product",
  customer: "Customer",
  competitor: "Competitor",
  regulation: "Regulation",
  technology: "Technology",
  market: "Market",
  strategy: "Strategy",
};

export type SourceTier = "TIER1" | "TIER2" | "TIER3";

export const SOURCE_TIER_LABEL: Record<SourceTier, string> = {
  TIER1: "Tier 1 — Primary",
  TIER2: "Tier 2 — Secondary",
  TIER3: "Tier 3 — Aggregator / community",
};

export type EvidenceFlag =
  | "marketing_claim" // company self-description presented as fact
  | "weak_source" // bare homepage / aggregator / non-specific URL
  | "broken_link" // URL could not be reached or is a placeholder
  | "outdated" // historical info still presented as current
  | "contradiction" // reliable sources disagree
  | "ai_assumption" // AI-generated or unsourced editorial content
  | "missing_primary" // primary source not found
  | "company_claim" // only the company's own statement backs this
  | "inference"; // reasoned, not documented

export const EVIDENCE_FLAG_LABEL: Record<EvidenceFlag, string> = {
  marketing_claim: "Marketing claim presented as fact",
  weak_source: "Weak / non-specific source",
  broken_link: "Broken / placeholder link",
  outdated: "Outdated information",
  contradiction: "Contradiction",
  ai_assumption: "AI-generated or unsourced",
  missing_primary: "Primary source missing",
  company_claim: "Company claim only",
  inference: "Inference",
};

// ---------------------------------------------------------------------------
// Claim
// ---------------------------------------------------------------------------

export interface Claim {
  id: string;
  category: EvidenceCategory;
  /** The claim as it currently exists in the knowledge base. */
  statement: string;
  status: EvidenceStatus;
  /** Where in the KB the claim lives (module / page). */
  claimLocation: string;
  /** ids into sources.ts. */
  sourceIds: string[];
  /** What the verification pass actually found. */
  evidence: string;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  lastVerified: string;
  flags: EvidenceFlag[];
}

function claim(
  id: string,
  category: EvidenceCategory,
  statement: string,
  status: EvidenceStatus,
  claimLocation: string,
  sourceIds: string[],
  evidence: string,
  confidence: Claim["confidence"],
  flags: EvidenceFlag[] = []
): Claim {
  return { id, category, statement, status, claimLocation, sourceIds, evidence, confidence, lastVerified: "2026-08-15", flags };
}

// ---------------------------------------------------------------------------
// Per-source tier + verification state
// ---------------------------------------------------------------------------

export interface SourceVerification {
  sourceId: string;
  tier: SourceTier;
  /** Whether the URL was actually reachable during the verification pass. */
  reachable: boolean;
  note: string;
}

function sv(sourceId: string, tier: SourceTier, reachable: boolean, note: string): SourceVerification {
  return { sourceId, tier, reachable, note };
}

export const sourceVerifications: SourceVerification[] = [
  // IRIS company / product pages (official docs = Tier 1, but currently 403)
  sv("iris-website-home", "TIER1", false, "irisregtech.com returns HTTP 403 to automated fetch; content not re-verifiable this pass."),
  sv("iris-ifile-page", "TIER1", false, "403 — '30+ regulators' claim could not be re-checked on the product page."),
  sv("iris-ideal-page", "TIER1", false, "403 — MUFG testimonial and iDEAL description not re-verifiable."),
  sv("iris-rbi-cims", "TIER1", false, "URL duplicates the homepage; no dedicated CIMS page located."),
  sv("iris-filexbrl-abs", "TIER1", false, "Subdomain returns 403; RBI/SEBI/BSE/NSE implementation claims unverified."),
  sv("iris-pressrelease-divestment", "TIER1", false, "PDF hosted on 403-blocked domain; divestment itself confirmed via Sovos PR instead."),

  // Official third-party announcements (Tier 1)
  sv("sovos-acquisition", "TIER1", true, "Verified. Confirms TaxTech acquisition (12 Aug 2025), iFILE '30+ regulators in 20+ countries', CARBON '4200 enterprises in 30+ countries', Mumbai HQ, BSE+NSE."),
  sv("xbrl-us-iris", "TIER1", true, "Verified. XBRL US member page confirms US LLC subsidiary, 'over 50 countries', '1.5 million entities' (company claim), and Singapore/Italy subsidiaries."),

  // Standard bodies / government (Tier 1)
  sv("xbrl-what-is", "TIER1", true, "Canonical standard-body page (specific URL)."),
  sv("xbrl-ixbrl", "TIER1", true, "Canonical standard-body page (specific URL)."),
  sv("sdmx-home", "TIER1", true, "Canonical standard-body page."),
  sv("fca-regtech", "TIER1", true, "Official regulator page (specific URL)."),
  sv("bis-suptech-generations", "TIER1", true, "Official BIS FSI paper (specific URL)."),
  sv("esma-esef", "TIER1", true, "Official ESMA page (specific URL)."),
  sv("bcbs239", "TIER1", true, "Official BIS/BCBS paper (specific URL)."),
  sv("eba-crr", "TIER1", true, "Official EBA page (specific URL)."),
  sv("eiopa-solvency", "TIER1", true, "EIOPA is authoritative, but the URL is the bare homepage, not the Solvency II page."),
  sv("ifrs-foundation", "TIER1", true, "Authoritative, but URL is the bare homepage."),
  sv("sec-edgar", "TIER1", true, "Official SEC page (specific URL)."),
  sv("cipc-xbrl", "TIER1", true, "Official, but URL is the bare homepage."),

  // Established financial / industry publications (Tier 2)
  sv("cnbctv18-swaminathan", "TIER2", true, "Verified. Confirms founder death (26 Mar 2025) and interim-CEO appointment of Krishnan Balachandran (then CFO)."),
  sv("bwdisrupt-swaminathan", "TIER2", false, "Specific URL present; not fetched this pass."),
  sv("exchange4media-swaminathan", "TIER2", false, "Specific URL present; not fetched this pass."),
  sv("theprint-q4fy26", "TIER2", false, "URL is the bare homepage, not the article; EBITDA 18.8% claim unverifiable from the URL."),
  sv("theprint-xbrl-board", "TIER2", false, "URL is the bare homepage; XBRL board-seat claim unverifiable from the URL."),
  sv("theweek-central-banking-award", "TIER2", false, "URL is the bare homepage; award claim unverifiable from the URL."),
  sv("pti-q1fy27", "TIER2", false, "URL is the bare homepage; Q1 FY27 claim unverifiable from the URL."),
  sv("bloomberg-profile", "TIER2", false, "Aggregator profile; not fetched this pass."),

  // Press-release distribution wires (marketing → Tier 2/3 hybrid; treat as Tier 3 for factual weight)
  sv("prnewswire-100cr", "TIER3", false, "Bare homepage; ₹100 Cr claim corroborated independently by Screener."),
  sv("newswire-gap-carbon", "TIER3", false, "Bare homepage; Gap Inc. CARBON claim unverifiable from the URL."),
  sv("iconnect-launch", "TIER3", false, "Bare homepage; iConnect launch unverifiable from the URL."),
  sv("carbon-launch-office365", "TIER3", false, "Bare homepage; Office 365 claim unverifiable from the URL."),

  // Aggregators / data feeds (Tier 3)
  sv("stockanalysis-company-profile", "TIER3", true, "Verified. S&P Global data; confirms name change (Nov 2025), founded 2000, Navi Mumbai, 487 employees, executives, and product list — BUT still lists divested TaxTech products as current."),
  sv("screener-iris", "TIER3", true, "Verified. Confirms ₹492 Cr mkt cap, ₹97.6 book value, 34.6% promoter, ~₹123 Cr one-time income, FY26 ~₹128 Cr, Q1 FY27 loss, and 'IRIS MSME'."),
  sv("marketscreener-company", "TIER3", false, "Aggregator; not fetched this pass."),
  sv("marketscreener-swaminathan", "TIER3", false, "Aggregator insider profile; 'Yale-educated' claim rests here alone."),
  sv("trendlyne-about", "TIER3", false, "Aggregator; not fetched this pass."),
  sv("linkedin-iris-regtech", "TIER3", false, "Self-published social; not fetched this pass."),
  sv("linkedin-iris-company", "TIER3", false, "Self-published social; '52+ countries' claim rests here."),
  sv("ipocentral-iris-ipo", "TIER3", false, "Aggregator; not fetched this pass."),
  sv("hdfc-sky-151cr", "TIER3", false, "Bare brokerage homepage; ₹151 Cr value unverifiable from the URL."),

  // Scanx cluster (AI-generated news aggregator — self-disclosed)
  sv("scanx-rebrand", "TIER3", true, "Verified content, BUT Scanx discloses its content is AI-generated/summarised. Confirms rebrand (28 Nov 2025) and ISIN."),
  sv("scanx-qatar-tax", "TIER3", false, "Bare https://scanx.trade/ URL; AI-generated aggregator. Qatar contract claim has no article permalink."),
  sv("scanx-sarb", "TIER3", false, "Bare https://scanx.trade/ URL; AI-generated aggregator. SARB extension claim has no article permalink."),
  sv("scanx-mz-brazil", "TIER3", false, "Bare https://scanx.trade/ URL; AI-generated aggregator."),
  sv("scanx-datatech-subsidiary", "TIER3", false, "Bare https://scanx.trade/ URL; AI-generated aggregator."),
  sv("scanx-500cr-target", "TIER3", false, "Bare https://scanx.trade/ URL; AI-generated aggregator. ₹500 Cr target rests here alone."),

  // Competitor homepages (official but self-promotional → Tier 1 for self-description, weak for factual/independent claims)
  sv("workiva-home", "TIER1", true, "Official site (self-promotional); Workiva being NYSE-listed is independently verifiable."),
  sv("regnology-home", "TIER1", false, "Official site (self-promotional)."),
  sv("corefiling-home", "TIER1", false, "Official site (self-promotional)."),
  sv("toppan-merrill-home", "TIER1", false, "Official site (self-promotional)."),
  sv("datatracks-home", "TIER1", false, "Official site (self-promotional)."),
  sv("parseport-home", "TIER1", false, "Official site (self-promotional)."),
  sv("vizor-home", "TIER1", false, "Official site (self-promotional)."),
  sv("lucanet-home", "TIER1", false, "Official site (self-promotional)."),
  sv("wolterskluwer-home", "TIER1", false, "Official site (self-promotional)."),
  sv("dfin-home", "TIER1", false, "Official site (self-promotional)."),
  sv("moodys-home", "TIER1", false, "Official site (self-promotional)."),
  sv("fis-home", "TIER1", false, "Official site (self-promotional)."),
  sv("sap-home", "TIER1", false, "Official site (self-promotional)."),
  sv("ibm-home", "TIER1", false, "Official site (self-promotional)."),
  sv("broadridge-home", "TIER1", false, "Official site (self-promotional)."),
  sv("finastra-home", "TIER1", false, "Official site (self-promotional)."),
  sv("nice-actimize-home", "TIER1", false, "Official site (self-promotional)."),
  sv("adenza-home", "TIER1", false, "Official site (self-promotional); Nasdaq acquisition is independently verifiable."),
  sv("cleartax-home", "TIER1", false, "Official site (self-promotional)."),
];

// ---------------------------------------------------------------------------
// Claims
// ---------------------------------------------------------------------------

export const evidenceClaims: Claim[] = [
  // ============================ COMPANY ============================
  claim(
    "c-rename",
    "company",
    "IRIS Business Services Limited changed its name to IRIS RegTech Solutions Limited in November 2025.",
    "VERIFIED",
    "companies.ts; timeline.ts",
    ["scanx-rebrand", "stockanalysis-company-profile"],
    "StockAnalysis (S&P data, updated Aug 2026) confirms 'formerly known as IRIS Business Services Limited and changed its name to IRIS RegTech Solutions Limited in November 2025'. Scanx (AI-aggregator) confirms effective 2025-11-28. Two independent datapoints.",
    "HIGH"
  ),
  claim(
    "c-founded",
    "company",
    "IRIS was incorporated in 2000.",
    "VERIFIED",
    "companies.ts",
    ["stockanalysis-company-profile", "screener-iris"],
    "Both StockAnalysis (S&P) and Screener state 'incorporated in 2000' / 'Founded 2000'.",
    "HIGH"
  ),
  claim(
    "c-hq",
    "company",
    "Headquartered in Navi Mumbai, Maharashtra, India.",
    "WELL_SUPPORTED",
    "companies.ts",
    ["stockanalysis-company-profile", "sovos-acquisition", "cnbctv18-swaminathan"],
    "StockAnalysis (S&P) says 'Navi Mumbai, Maharashtra'; Sovos PR and CNBC say 'Mumbai'. Navi Mumbai is a specific district within the Mumbai metropolitan region — no conflict, but wording differs by source.",
    "HIGH"
  ),
  claim(
    "c-listing",
    "company",
    "Listed on NSE (ticker IRIS) and BSE (540735), ISIN INE864K01010.",
    "VERIFIED",
    "companies.ts",
    ["screener-iris", "stockanalysis-company-profile", "sovos-acquisition", "xbrl-us-iris"],
    "Screener confirms NSE:IRIS and BSE:540735; StockAnalysis confirms ticker IRIS, NSE, ISIN INE864K01010; Sovos PR and XBRL US both state 'listed on BSE and NSE'.",
    "HIGH"
  ),
  claim(
    "c-employees",
    "company",
    "IRIS has 487 employees.",
    "WELL_SUPPORTED",
    "companies.ts",
    ["stockanalysis-company-profile"],
    "Single source (S&P Global data via StockAnalysis). No independent/second confirmation located. Authoritative but un-corrobotated.",
    "MEDIUM",
    ["missing_primary"]
  ),
  claim(
    "c-founder-death",
    "company",
    "Founder and CEO S. Swaminathan died of cardiac arrest on 26 March 2025.",
    "VERIFIED",
    "companies.ts; timeline.ts",
    ["cnbctv18-swaminathan", "bwdisrupt-swaminathan", "exchange4media-swaminathan"],
    "CNBC TV18 (verified fetch) confirms: 'sudden demise of its Whole-time Director and CEO, S Swaminathan, who passed away due to cardiac arrest in the early hours of March 26, 2025'. Corroborated by BWDisrupt and Exchange4Media.",
    "HIGH"
  ),
  claim(
    "c-ceo",
    "company",
    "Balachandran Krishnan is CEO (a co-founder).",
    "WELL_SUPPORTED",
    "companies.ts",
    ["stockanalysis-company-profile", "cnbctv18-swaminathan"],
    "StockAnalysis (Aug 2026) lists 'Balachandran Krishnan — Co-Founder, Chief Executive Officer and Whole Time Director'. CNBC (Mar 2025) reported he was 'Whole-time Director & CFO' appointed as interim head after the founder's death. The CEO title post-dates the interim appointment; KB does not capture this transition.",
    "MEDIUM",
    ["outdated"]
  ),
  claim(
    "c-segments",
    "company",
    "IRIS operates through SupTech, RegTech, TaxTech and DataTech segments.",
    "CONTRADICTED",
    "companies.ts",
    ["stockanalysis-company-profile", "sovos-acquisition"],
    "StockAnalysis (S&P) still lists all four segments, but TaxTech was divested to Sovos in Aug 2025 (confirmed by Sovos PR). Listing 'TaxTech' as a current operating segment is outdated — it is now a historical segment.",
    "HIGH",
    ["outdated", "contradiction"]
  ),
  claim(
    "c-reach-52",
    "company",
    "IRIS serves '52+ countries'.",
    "CONTRADICTED",
    "companies.ts; concepts.ts; timeline.ts",
    ["linkedin-iris-company", "cnbctv18-swaminathan", "xbrl-us-iris", "sovos-acquisition"],
    "The KB's '52+ countries' rests on a LinkedIn page. Multiple independent sources give different figures: CNBC '50 countries', XBRL US 'over 50 countries', Sovos PR 'iFILE in 20+ countries' and 'CARBON in 30+ countries'. No source found supporting '52+'. Downgrade to '~50 countries (company claim)'.",
    "MEDIUM",
    ["marketing_claim", "contradiction", "weak_source"]
  ),
  claim(
    "c-regulators-30",
    "company",
    "IRIS iFILE is trusted by '30+ regulators'.",
    "VERIFIED",
    "companies.ts; productDeep.ts",
    ["sovos-acquisition", "xbrl-us-iris", "iris-ifile-page"],
    "Sovos PR (verified): 'IRIS iFile is used by over 30 financial regulators in 20+ countries'. XBRL US (verified): 'IRIS iFile — the preferred tool of over 30 regulators'. Two independent primary/secondary confirmations. Note: '30+ regulators' ≠ '30+ countries'; the reach figure is ~20 countries for iFILE.",
    "HIGH"
  ),
  claim(
    "c-revenue-fy26",
    "company",
    "FY26 revenue ~₹128 Cr (up from ~₹74 Cr in FY23).",
    "VERIFIED",
    "companies.ts; learningModules.ts",
    ["screener-iris"],
    "Screener quarterly sales sum to ~₹128.5 Cr for FY26 (Jun'25–Mar'26). The ₹74 Cr FY23 figure is not fully shown in the fetched table but is consistent with the growth trajectory. Core FY26 figure verified.",
    "HIGH",
    ["missing_primary"]
  ),
  claim(
    "c-100cr",
    "company",
    "IRIS crossed ₹100 Cr annual revenue (FY25).",
    "VERIFIED",
    "companies.ts",
    ["screener-iris", "prnewswire-100cr"],
    "Screener FY25 quarterly sales sum to ~₹117 Cr, confirming the crossing. PR Newswire (bare URL) also reports it but is secondary to Screener.",
    "HIGH",
    ["missing_primary"]
  ),
  claim(
    "c-one-time-gain",
    "company",
    "FY26 PAT was inflated by a ~₹123 Cr one-time divestment gain.",
    "WELL_SUPPORTED",
    "companies.ts; learningModules.ts",
    ["screener-iris"],
    "Screener's own 'cons' note states 'Earnings include an other income of Rs.123 Cr.'; Q2 FY26 (Sep 2025) net profit is ₹116.85 Cr with ₹117.55 Cr other income. Confirms the one-time gain mechanism.",
    "HIGH",
    ["missing_primary"]
  ),
  claim(
    "c-q1fy27-loss",
    "company",
    "Q1 FY27 reported a small consolidated net loss.",
    "VERIFIED",
    "companies.ts",
    ["screener-iris", "pti-q1fy27"],
    "Screener Jun 2026 (Q1 FY27) shows net profit of -₹0.97 Cr (operating profit -₹1.67 Cr). PTI headline (bare URL) corroborates 'small consolidated net loss'.",
    "HIGH",
    ["missing_primary"]
  ),
  claim(
    "c-marketcap",
    "company",
    "Market capitalisation ~₹492 Cr.",
    "VERIFIED",
    "companies.ts",
    ["screener-iris"],
    "Screener shows 'Market Cap ₹492 Cr' (verified fetch).",
    "HIGH",
    ["missing_primary"]
  ),
  claim(
    "c-bookvalue",
    "company",
    "Book value ~₹97.6 per share.",
    "VERIFIED",
    "companies.ts",
    ["screener-iris"],
    "Screener shows 'Book Value ₹97.6' (verified fetch).",
    "HIGH",
    ["missing_primary"]
  ),
  claim(
    "c-promoter",
    "company",
    "Promoter holding is 34.6% (described as 'low').",
    "VERIFIED",
    "companies.ts",
    ["screener-iris"],
    "Screener shows 'Promoter holding is low: 34.6%' (verified fetch).",
    "HIGH",
    ["missing_primary"]
  ),
  claim(
    "c-ebitda",
    "company",
    "Q4 FY26 EBITDA margin was 18.8%.",
    "PLAUSIBLE",
    "companies.ts",
    ["theprint-q4fy26", "screener-iris"],
    "ThePrint claim (bare URL) could not be verified from the URL. However Screener's Q4 FY26 (Mar 2026) operating-profit margin is 18.53% — close but not identical. Treat 18.8% as unverified; ~18.5% is what the financial data shows.",
    "MEDIUM",
    ["weak_source", "contradiction"]
  ),
  claim(
    "c-target-500cr",
    "company",
    "IRIS management disclosed a ₹500 Cr revenue target.",
    "UNSUPPORTED",
    "companies.ts; learningModules.ts; timeline.ts",
    ["scanx-500cr-target"],
    "Sole source is a Scanx (AI-generated aggregator) item with a bare https://scanx.trade/ URL and no article permalink. No IRIS filing, investor presentation, or reputable publication confirms a ₹500 Cr target. This is a load-bearing strategy claim that is currently unsupported.",
    "LOW",
    ["weak_source", "ai_assumption", "missing_primary"]
  ),
  claim(
    "c-divestment",
    "company",
    "IRIS divested its Tax Technology (GST) ASP business to Sovos (announced Aug 2025).",
    "VERIFIED",
    "companies.ts; timeline.ts",
    ["sovos-acquisition", "iris-pressrelease-divestment"],
    "Sovos press release (verified fetch, dated Aug 12 2025): 'entered into a definitive agreement to acquire the Tax Technology ASP business unit from APAC-based IRIS Business Services'. Confirms business head Gautam Mahanti. IRIS's own PR PDF (hosted on 403-blocked domain) is the mirror announcement.",
    "HIGH"
  ),
  claim(
    "c-divestment-value",
    "company",
    "The TaxTech divestment was valued at ~₹151 Cr.",
    "CONTRADICTED",
    "companies.ts; relations.ts",
    ["hdfc-sky-151cr", "scanx-rebrand"],
    "HDFC Sky (bare URL) reports ₹151 Cr. Scanx's own headline feed lists '₹140.57 Crore GST ASP Business Transfer to Subsidiary' (Aug 01 2025) — a conflicting figure. The two values are not reconciled anywhere in the KB. Neither is backed by a primary IRIS/Sovos filing.",
    "LOW",
    ["weak_source", "contradiction", "missing_primary"]
  ),
  claim(
    "c-us-subsidiary",
    "company",
    "IRIS Business Services LLC (US) is a wholly owned subsidiary.",
    "VERIFIED",
    "companies.ts",
    ["xbrl-us-iris"],
    "XBRL US member page (verified): 'IRIS Business Services LLC is the fully owned subsidiary of IRIS Business Services Ltd'.",
    "HIGH"
  ),
  claim(
    "c-founder-1994",
    "company",
    "Founder Swaminathan also founded IRIS Ltd (1994) and was 'Yale-educated'.",
    "PLAUSIBLE",
    "companies.ts; timeline.ts",
    ["marketscreener-swaminathan"],
    "Single source (MarketScreener insider profile). 'Yale-educated' is a biographical detail resting on one aggregator. Not independently confirmed.",
    "LOW",
    ["weak_source", "missing_primary"]
  ),

  // ============================ PRODUCT ============================
  claim(
    "p-ifile-30",
    "product",
    "iFILE is an end-to-end platform to collect, validate and analyse regulator filings, used by 30+ regulators.",
    "VERIFIED",
    "products.ts; productDeep.ts",
    ["sovos-acquisition", "xbrl-us-iris", "iris-ifile-page"],
    "Sovos PR and XBRL US both confirm 'over 30 regulators' and the collect/validate/analyse positioning. The '20+ countries' scope (Sovos) is narrower than the KB's general '52+ countries' reach.",
    "HIGH"
  ),
  claim(
    "p-carbon-4200",
    "product",
    "IRIS CARBON is a SaaS disclosure-management platform used by ~4,200 enterprises in 30+ countries.",
    "VERIFIED",
    "products.ts; productDeep.ts",
    ["sovos-acquisition"],
    "Sovos PR (verified): 'IRIS Carbon... is used by 4200 enterprises in over 30 countries across Europe, UK, Africa, India and the Americas'. NOTE: this specific, valuable figure is NOT currently captured in the KB — a content gap.",
    "HIGH"
  ),
  claim(
    "p-carbon-office365",
    "product",
    "CARBON is an 'Office 365-based' disclosure management solution.",
    "PLAUSIBLE",
    "productDeep.ts; technologies.ts",
    ["carbon-launch-office365"],
    "Sole source is a Newswire press-release with a bare https://www.newswire.com/ URL. The 'Office 365-based' detail could not be confirmed from the URL; it is a launch-PR claim.",
    "MEDIUM",
    ["weak_source", "company_claim"]
  ),
  claim(
    "p-ideal",
    "product",
    "iDEAL is an automated regulatory-reporting solution for banks and financial institutions.",
    "WELL_SUPPORTED",
    "products.ts; productDeep.ts",
    ["iris-ideal-page", "xbrl-us-iris", "stockanalysis-company-profile"],
    "XBRL US (verified): 'IRIS iDEAL — extensively used by financial institutions and fund houses for prudential and resolution reporting'. StockAnalysis (S&P) describes it similarly. The IRIS product page is 403-blocked.",
    "MEDIUM",
    ["company_claim"]
  ),
  claim(
    "p-iconnect",
    "product",
    "iConnect is an XBRL analytics tool using Excel to evaluate/compare XBRL and iXBRL data.",
    "PLAUSIBLE",
    "products.ts; productDeep.ts",
    ["iconnect-launch", "stockanalysis-company-profile"],
    "StockAnalysis (S&P) describes the Excel-based positioning; the launch press release is a bare URL. No independent review located.",
    "MEDIUM",
    ["weak_source", "company_claim"]
  ),
  claim(
    "p-credixo",
    "product",
    "Credixo is a credit-analysis modelling tool for banks and fintechs.",
    "PLAUSIBLE",
    "products.ts; productDeep.ts",
    ["stockanalysis-company-profile"],
    "Single source (S&P aggregator). No IRIS product page, launch PR, or customer reference located. productDeep.ts itself flags 9 of 21 aspects as UNKNOWN.",
    "LOW",
    ["missing_primary", "company_claim"]
  ),
  claim(
    "p-msme",
    "product",
    "IRIS MSME is a platform for MSME digital tools / credit access.",
    "WELL_SUPPORTED",
    "products.ts; productDeep.ts",
    ["screener-iris", "projects-today-goa-msme"],
    "Screener's own 'About' text (verified): 'Through IRIS MSME, the Company also provides digital tools and financial access solutions aimed at promoting financial inclusion and transparency among MSMEs.' Corroborated by the Goa MoU news item. This upgrades the KB's current INFERENCE-only treatment.",
    "MEDIUM"
  ),
  claim(
    "p-taxtech-products",
    "product",
    "Divested TaxTech products are GST Software, IRP, E-Invoicing, Zircon, LMS and Peridot.",
    "PLAUSIBLE",
    "products.ts",
    ["stockanalysis-company-profile", "sovos-acquisition"],
    "Sovos PR confirms the TaxTech portfolio (notice & litigation management, tax analytics, e-way bill) but does NOT enumerate GST/IRP/E-Invoicing/Zircon/LMS/Peridot by name. The individual names come only from the S&P aggregator profile, which — problematically — still lists them as current.",
    "MEDIUM",
    ["outdated", "missing_primary"]
  ),

  // ============================ CUSTOMER ============================
  claim(
    "cu-india-regulators",
    "customer",
    "IRIS implemented XBRL solutions for RBI, SEBI, MCA, BSE and NSE.",
    "PLAUSIBLE",
    "companies.ts; productDeep.ts",
    ["iris-filexbrl-abs"],
    "Sole source is IRIS's own filexbrl subdomain (403-blocked this pass). These are long-standing, widely repeated claims but have no independent primary confirmation in the KB (no RBI/SEBI announcement, no case study).",
    "MEDIUM",
    ["company_claim", "missing_primary"]
  ),
  claim(
    "cu-qatar",
    "customer",
    "IRIS secured a 6-year contract with the Qatar Tax Authority (Oct 2025).",
    "PLAUSIBLE",
    "companies.ts; timeline.ts; regulators.ts",
    ["scanx-qatar-tax"],
    "Sole source is a Scanx (AI-generated aggregator) item with a bare URL. The Scanx feed also mentions 'Qatar Central Bank and Qatar Tax Authority' as new SupTech clients, but no primary Qatar GTA/IRIS announcement is cited.",
    "LOW",
    ["weak_source", "ai_assumption", "missing_primary"]
  ),
  claim(
    "cu-sarb",
    "customer",
    "IRIS secured a SARB (South African Reserve Bank) contract extension (Dec 2025).",
    "PLAUSIBLE",
    "companies.ts; timeline.ts; regulators.ts",
    ["scanx-sarb"],
    "Sole source is a Scanx (AI-generated aggregator) item with a bare URL. No SARB or IRIS primary announcement cited.",
    "LOW",
    ["weak_source", "ai_assumption", "missing_primary"]
  ),
  claim(
    "cu-mufg",
    "customer",
    "MUFG Bank uses IRIS iDEAL for RBI submissions.",
    "PLAUSIBLE",
    "companies.ts; customerSegments.ts",
    ["iris-ideal-page"],
    "Sole source is a testimonial on IRIS's own product page (currently 403-blocked). This is a company claim / customer opinion, not independently confirmed. Should not be presented as FACT.",
    "LOW",
    ["company_claim", "marketing_claim"]
  ),
  claim(
    "cu-gap",
    "customer",
    "Gap Inc. used IRIS CARBON for its 2022 sustainability report.",
    "PLAUSIBLE",
    "companies.ts; customerSegments.ts",
    ["newswire-gap-carbon"],
    "Sole source is a Newswire press release with a bare https://www.newswire.com/ URL. Not independently confirmed (no Gap Inc. or IRIS primary page located).",
    "MEDIUM",
    ["weak_source", "missing_primary"]
  ),
  claim(
    "cu-mz-brazil",
    "customer",
    "MZ Consult won a multi-year disclosure/ESG contract with a major Brazilian oil & gas company.",
    "PLAUSIBLE",
    "companies.ts",
    ["scanx-mz-brazil"],
    "Sole source is a Scanx (AI-generated aggregator) item with a bare URL. The customer is not named. No primary confirmation.",
    "LOW",
    ["weak_source", "ai_assumption", "missing_primary"]
  ),
  claim(
    "cu-1-5m",
    "customer",
    "IRIS is 'the trusted partner of over 1.5 million entities worldwide'.",
    "UNSUPPORTED",
    "concepts.ts (implied scale); not currently in KB",
    ["xbrl-us-iris"],
    "This figure appears on IRIS's own XBRL US member page (a company-authored blurb). It is a marketing claim with no independent confirmation and is not even captured in the KB. Flagged here so it is not adopted uncritically.",
    "LOW",
    ["marketing_claim"]
  ),

  // ============================ COMPETITOR ============================
  claim(
    "co-workiva",
    "competitor",
    "Workiva is a leading disclosure-management / connected-reporting vendor (NYSE: WK), a DIRECT rival to CARBON.",
    "WELL_SUPPORTED",
    "competitorProfiles.ts",
    ["workiva-home"],
    "Workiva's NYSE listing and disclosure-management position are independently well-established. However the KB cites only workiva-home for its positioning claims; no analyst/review source backs the 'leader' framing.",
    "MEDIUM",
    ["company_claim"]
  ),
  claim(
    "co-adenza",
    "competitor",
    "Adenza (AxiomSL/Calypso) was acquired by Nasdaq in 2023 and competes with iDEAL.",
    "WELL_SUPPORTED",
    "competitorProfiles.ts",
    ["adenza-home"],
    "The Nasdaq acquisition is independently verifiable public knowledge. The iDEAL overlap is an analytical framing (ANALYST_VIEW in the KB).",
    "MEDIUM"
  ),
  claim(
    "co-profiles-single-source",
    "competitor",
    "17 of 19 competitor profiles are supported by a single source — the competitor's own homepage.",
    "VERIFIED",
    "competitorProfiles.ts",
    ["regnology-home", "corefiling-home", "toppan-merrill-home", "datatracks-home", "parseport-home", "vizor-home", "lucanet-home", "wolterskluwer-home", "dfin-home", "moodys-home", "fis-home", "sap-home", "ibm-home", "broadridge-home", "finastra-home", "nice-actimize-home", "cleartax-home"],
    "Confirmed by reading competitorProfiles.ts: every profile cites only its vendor homepage (except workiva and cleartax which add one aggregator/PR each). No independent analyst, press, review, or customer source exists for any competitor. All dimension claims are tagged ANALYST_VIEW.",
    "HIGH",
    ["company_claim", "missing_primary"]
  ),
  claim(
    "co-pricing",
    "competitor",
    "Competitor pricing is 'Insufficient public evidence' (no concrete, sourced price point for any competitor).",
    "VERIFIED",
    "competitorProfiles.ts",
    [],
    "17 of 19 profiles set pricing to the NO_PRICE constant; two (datatracks, cleartax) give vague qualitative pricing with no figure and no source. Confirmed by reading competitorProfiles.ts.",
    "HIGH"
  ),

  // ============================ REGULATION ============================
  claim(
    "r-esef",
    "regulation",
    "ESEF requires EU-listed issuers to file annual reports as XHTML with iXBRL-tagged IFRS statements (from FY2020).",
    "VERIFIED",
    "regulations.ts; concepts.ts",
    ["esma-esef", "xbrl-ixbrl"],
    "Canonical ESMA documentation (specific URL) and XBRL International. Established, stable fact.",
    "HIGH"
  ),
  claim(
    "r-sec-xbrl",
    "regulation",
    "The US SEC requires Inline XBRL for operating companies and foreign private issuers via EDGAR.",
    "VERIFIED",
    "regulations.ts",
    ["sec-edgar", "xbrl-ixbrl"],
    "Canonical SEC documentation (specific URL) and XBRL International. Established fact.",
    "HIGH"
  ),
  claim(
    "r-solvency-crr",
    "regulation",
    "Solvency II and CRR impose XBRL-based supervisory reporting (QRTs / COREP / FINREP) in the EU.",
    "VERIFIED",
    "regulations.ts",
    ["eba-crr", "eiopa-solvency"],
    "EBA/EIOPA are authoritative; the Solvency II URL is the bare EIOPA homepage rather than the specific page, but the framework facts are canonical.",
    "HIGH",
    ["weak_source"]
  ),
  claim(
    "r-csrd-attribution",
    "regulation",
    "CSRD/ESRS is regulated by ESMA (regulatorIds: [esma]).",
    "CONTRADICTED",
    "regulations.ts",
    ["esma-esef"],
    "The KB assigns regulatorIds ['esma'], but ESMA is not the CSRD legislator. The European Commission and member states legislate CSRD; EFRAG drafts the ESRS. The body text itself acknowledges EFRAG. The regulatorIds field is materially wrong.",
    "HIGH",
    ["contradiction"]
  ),
  claim(
    "r-gst",
    "regulation",
    "India's GST (2017) and e-invoicing (2020) mandates are administered by CBIC.",
    "VERIFIED",
    "regulations.ts",
    ["stockanalysis-company-profile"],
    "Canonical Indian tax facts, though the KB cites only the S&P aggregator for them rather than a CBIC/government source. The mandate dates are standard public knowledge.",
    "HIGH",
    ["missing_primary"]
  ),

  // ============================ TECHNOLOGY ============================
  claim(
    "t-standards",
    "technology",
    "XBRL, iXBRL and SDMX are open data standards with the documented definitions in the KB.",
    "VERIFIED",
    "technologies.ts; concepts.ts",
    ["xbrl-what-is", "xbrl-ixbrl", "sdmx-home"],
    "Canonical standard-body definitions (XBRL International, SDMX). The KB's technology explainers for XBRL internals (facts, contexts, dimensions, extensions) are faithful to the standard.",
    "HIGH"
  ),
  claim(
    "t-ai",
    "technology",
    "IRIS's own AI capability is unknown / not publicly documented.",
    "VERIFIED",
    "technologies.ts; learningModules.ts",
    [],
    "The KB already correctly labels IRIS AI as UNKNOWN. No IRIS AI product or capability was found during verification; the honesty here is correct and should be preserved.",
    "HIGH"
  ),
  claim(
    "t-rest-api",
    "technology",
    "IRIS exposes REST APIs (technology category), evidenced by the divested Zircon product.",
    "INFERENCE",
    "technologies.ts",
    ["stockanalysis-company-profile"],
    "The only IRIS API example is Zircon (divested). There is no documented API surface for the current portfolio. The KB's docStatus/certainty for rest-api is internally inconsistent (PUBLICLY_DOCUMENTED but INFERENCE).",
    "LOW",
    ["inference", "contradiction"]
  ),

  // ============================ MARKET ============================
  claim(
    "m-india",
    "market",
    "India is IRIS's core, substantiated market (RBI/SEBI/MCA/NSE/BSE + HQ).",
    "VERIFIED",
    "markets.ts",
    ["iris-filexbrl-abs", "stockanalysis-company-profile", "screener-iris"],
    "HQ, listing and the India regulator implementations all corroborate a real India footprint.",
    "HIGH"
  ),
  claim(
    "m-us",
    "market",
    "The US is a real market (IRIS Business Services LLC + Gap Inc. CARBON).",
    "WELL_SUPPORTED",
    "markets.ts",
    ["xbrl-us-iris", "newswire-gap-carbon"],
    "US LLC confirmed via XBRL US; the Gap Inc. reference is a bare-URL press release (weaker).",
    "MEDIUM"
  ),
  claim(
    "m-me",
    "market",
    "The Middle East (Qatar, UAE, Saudi Arabia) is an IRIS market.",
    "PLAUSIBLE",
    "markets.ts",
    ["scanx-qatar-tax", "stockanalysis-company-profile"],
    "Qatar is weakly supported (AI-aggregator only). UAE and Saudi Arabia are asserted with no supporting source mentioning them. The market entry overstates the evidence.",
    "LOW",
    ["weak_source", "marketing_claim"]
  ),
  claim(
    "m-europe",
    "market",
    "Europe is an IRIS market.",
    "INFERENCE",
    "markets.ts",
    ["esma-esef", "sustainability-magazine-esg"],
    "The KB already marks Europe INFERENCE ('where IRIS's XBRL/iXBRL products are relevant'). No European customer or operation is evidenced. Correctly labelled, but should not read as an actual market presence.",
    "MEDIUM",
    ["inference"]
  ),

  // ============================ STRATEGY ============================
  claim(
    "s-dual-sided",
    "strategy",
    "IRIS's 'dual-sided moat' (sells to both regulators and firms) is a strategic advantage.",
    "INFERENCE",
    "strategy.ts; learningModules.ts; productDeep.ts",
    ["sovos-acquisition", "xbrl-us-iris"],
    "The two-sided portfolio (iFILE regulator-side + CARBON/iDEAL filer-side) is factual; the 'moat' framing is IRIS/analyst interpretation, correctly tagged INFERENCE in the KB.",
    "MEDIUM",
    ["inference"]
  ),
  claim(
    "s-refocus",
    "strategy",
    "After divesting TaxTech, IRIS is refocusing on RegTech, SupTech and DataTech.",
    "WELL_SUPPORTED",
    "strategy.ts; learningModules.ts",
    ["sovos-acquisition", "scanx-rebrand", "stockanalysis-company-profile"],
    "Divestment (Sovos PR), rebrand to 'RegTech Solutions' (Scanx/S&P), and DataTech subsidiary approval all corroborate the refocus. Specific forward financials (₹500 Cr) remain unsupported.",
    "MEDIUM"
  ),
];

// ---------------------------------------------------------------------------
// Problem register (flagged issues — surfaced, not hidden)
// ---------------------------------------------------------------------------

export type EvidenceProblemKind =
  | "unsupported_claim"
  | "weak_source"
  | "broken_link"
  | "outdated_claim"
  | "contradiction"
  | "marketing_as_fact"
  | "ai_assumption"
  | "missing_primary";

export const EVIDENCE_PROBLEM_LABEL: Record<EvidenceProblemKind, string> = {
  unsupported_claim: "Unsupported claim",
  weak_source: "Weak source",
  broken_link: "Broken / placeholder link",
  outdated_claim: "Outdated claim",
  contradiction: "Contradiction",
  marketing_as_fact: "Marketing presented as fact",
  ai_assumption: "AI-generated assumption",
  missing_primary: "Missing primary source",
};

export interface EvidenceProblem {
  id: string;
  kind: EvidenceProblemKind;
  title: string;
  detail: string;
  relatedClaims: string[];
  relatedSources: string[];
}

export const evidenceProblems: EvidenceProblem[] = [
  {
    id: "pr-irish-website-403",
    kind: "broken_link",
    title: "IRIS's own domains block automated access (HTTP 403)",
    detail:
      "irisregtech.com and irisbusiness.com both return 403 to automated fetching. Every claim that rests on IRIS product pages (iFILE, iDEAL, CARBON, iConnect, RBI CIMS, the MUFG testimonial, filexbrl.irisbusiness.com) cannot be re-verified programmatically. This is not evidence the claims are false, but it means they are currently un-auditable against the primary source.",
    relatedClaims: ["p-ideal", "cu-india-regulators", "cu-mufg", "p-ifile-30"],
    relatedSources: ["iris-website-home", "iris-ifile-page", "iris-ideal-page", "iris-rbi-cims", "iris-filexbrl-abs"],
  },
  {
    id: "pr-scanx-ai",
    kind: "ai_assumption",
    title: "Six 'news' sources are AI-generated aggregator items with a shared bare URL",
    detail:
      "scanx-qatar-tax, scanx-sarb, scanx-mz-brazil, scanx-datatech-subsidiary and scanx-500cr-target all point to the identical bare https://scanx.trade/ URL, and Scanx's own site footer discloses that its content 'may be generated or assisted by AI'. Five material milestones (Qatar, SARB, Brazil, DataTech subsidiary, ₹500 Cr target) rest on these. They are placeholders, not verifiable evidence.",
    relatedClaims: ["cu-qatar", "cu-sarb", "cu-mz-brazil", "c-target-500cr"],
    relatedSources: ["scanx-qatar-tax", "scanx-sarb", "scanx-mz-brazil", "scanx-datatech-subsidiary", "scanx-500cr-target"],
  },
  {
    id: "pr-bare-homepages",
    kind: "weak_source",
    title: "34 of 68 sources resolve to bare homepages, not the article backing the claim",
    detail:
      "theweek.in, theprint.in, ptinews.com, newswire.com, prnewswire.com, hdfcsky.com, eiopa.europa.eu, ifrs.org, cipc.co.za and others are cited as sources but the URL is the site root, so the specific claim (award, EBITDA margin, launch, divestment value) cannot be traced. These should be upgraded to permalinks or downgraded to 'unverifiable'.",
    relatedClaims: ["c-ebitda", "cu-gap", "p-carbon-office365", "p-iconnect", "c-divestment-value"],
    relatedSources: ["theweek-central-banking-award", "theprint-q4fy26", "theprint-xbrl-board", "pti-q1fy27", "prnewswire-100cr", "newswire-gap-carbon", "iconnect-launch", "carbon-launch-office365", "hdfc-sky-151cr"],
  },
  {
    id: "pr-52-countries",
    kind: "contradiction",
    title: "'52+ countries' reach is contradicted by multiple sources",
    detail:
      "The KB repeats '52+ countries' (from LinkedIn), but CNBC says '50 countries', XBRL US says 'over 50 countries', and Sovos's own IRIS boilerplate says iFILE is in '20+ countries' and CARBON in '30+ countries'. No source supports '52+'. The claim should be downgraded to '~50 countries (company claim)' and the per-product reach figures kept separate.",
    relatedClaims: ["c-reach-52", "c-regulators-30"],
    relatedSources: ["linkedin-iris-company", "linkedin-iris-regtech"],
  },
  {
    id: "pr-divestment-value",
    kind: "contradiction",
    title: "Divestment value is contested: ₹151 Cr vs ₹140.57 Cr",
    detail:
      "hdfc-sky reports ₹151 Cr; Scanx's headline feed reports '₹140.57 Crore GST ASP Business Transfer'. The two figures are not reconciled, and neither is backed by an IRIS or Sovos primary filing. The KB asserts ₹151 Cr without noting the conflict.",
    relatedClaims: ["c-divestment-value"],
    relatedSources: ["hdfc-sky-151cr", "scanx-rebrand"],
  },
  {
    id: "pr-taxtech-stale",
    kind: "outdated_claim",
    title: "S&P data source still lists divested TaxTech products as current",
    detail:
      "StockAnalysis (S&P Global, updated Aug 2026) still lists IRIS GST Software, IRIS IRP, E-Invoicing, Zircon, LMS and Peridot as if they are current offerings, despite the Aug 2025 Sovos divestment. The KB correctly marks these DIVESTED, but the underlying source contradicts the KB's own (more accurate) classification. The individual product names remain single-sourced.",
    relatedClaims: ["p-taxtech-products", "c-segments"],
    relatedSources: ["stockanalysis-company-profile"],
  },
  {
    id: "pr-website-domain",
    kind: "contradiction",
    title: "Company website domain is inconsistent (irisregtech.com vs irisbusiness.com)",
    detail:
      "The KB cites irisregtech.com as the primary site, but S&P and Screener both list irisbusiness.com. Post-rebrand the canonical domain is unclear; irisregtech.com and irisbusiness.com both 403. The KB should reconcile which is current and fix the duplicate iris-rbi-cims source (which is just the homepage again).",
    relatedClaims: [],
    relatedSources: ["iris-website-home", "iris-rbi-cims", "stockanalysis-company-profile", "screener-iris"],
  },
  {
    id: "pr-csrd-wrong-regulator",
    kind: "contradiction",
    title: "CSRD/ESRS is attributed to ESMA, which is incorrect",
    detail:
      "regulations.ts sets csrd-esrs regulatorIds to ['esma'], but ESMA is not the CSRD legislator (European Commission/member states) nor the ESRS drafter (EFRAG). The regulatorIds field should point at the Commission and EFRAG.",
    relatedClaims: ["r-csrd-attribution"],
    relatedSources: ["esma-esef"],
  },
  {
    id: "pr-no-primary-financials",
    kind: "missing_primary",
    title: "No IRIS annual report, quarterly filing, or exchange announcement is cited",
    detail:
      "All financial figures (revenue, PAT, market cap, book value, promoter holding, the one-time gain) are sourced from aggregators (Screener, StockAnalysis/S&P) and bare news URLs. The source types REGULATORY_FILING and STOCK_EXCHANGE are defined but unused, and ANALYST_REPORT is unused. A 'Sell' rating referenced in the learning modules has no analyst source at all. Financial claims should be pinned to BSE/NSE filings.",
    relatedClaims: ["c-revenue-fy26", "c-100cr", "c-one-time-gain", "c-marketcap", "c-bookvalue", "c-promoter", "c-employees"],
    relatedSources: ["screener-iris", "stockanalysis-company-profile"],
  },
  {
    id: "pr-competitor-single-source",
    kind: "marketing_as_fact",
    title: "Competitive intelligence rests entirely on competitor self-description",
    detail:
      "19 competitor profiles are built almost exclusively from the competitor's own marketing homepage, and every dimension is tagged ANALYST_VIEW. There is no independent analyst, press, review, or customer evidence for any competitor, and no sourced pricing. Competitive claims should be treated as vendor self-description, not objective fact, until independent sources are added.",
    relatedClaims: ["co-profiles-single-source", "co-workiva", "co-adenza"],
    relatedSources: ["workiva-home", "regnology-home", "corefiling-home", "toppan-merrill-home", "datatracks-home", "parseport-home", "vizor-home", "lucanet-home", "wolterskluwer-home", "dfin-home", "moodys-home", "fis-home", "sap-home", "ibm-home", "broadridge-home", "finastra-home", "nice-actimize-home", "adenza-home", "cleartax-home"],
  },
  {
    id: "pr-marketing-as-fact",
    kind: "marketing_as_fact",
    title: "Company marketing claims are still tagged FACT in places",
    detail:
      "The IRIS company record carries an entity-level certainty of FACT that blankets company claims such as '30+ regulators', '52+ countries', the leadership roster and the XBRL-pioneer narrative, plus MUFG (company testimonial) is tagged FACT. These should be COMPANY_CLAIM / CUSTOMER_OPINION until independently confirmed.",
    relatedClaims: ["cu-mufg", "c-reach-52", "cu-india-regulators"],
    relatedSources: ["iris-ifile-page", "iris-filexbrl-abs", "linkedin-iris-company"],
  },
  {
    id: "pr-missing-subsidiaries",
    kind: "missing_primary",
    title: "Singapore and Italy subsidiaries are missing from the KB",
    detail:
      "XBRL US (verified) states IRIS has 'subsidiaries in the United States, Singapore, and Italy'. The KB only records the US LLC and MZ Consult (Brazil). The Singapore and Italy entities are undocumented gaps.",
    relatedClaims: ["c-us-subsidiary"],
    relatedSources: ["xbrl-us-iris"],
  },
  {
    id: "pr-carbon-4200-missing",
    kind: "missing_primary",
    title: "Valuable CARBON scale figure (4,200 enterprises) is absent from the KB",
    detail:
      "The Sovos press release — a primary, already-cited source — states CARBON is used by '4200 enterprises in over 30 countries'. This specific, valuable fact is not captured in products.ts or productDeep.ts. A primary-source figure is being left on the table.",
    relatedClaims: ["p-carbon-4200"],
    relatedSources: ["sovos-acquisition"],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function sourceTierOf(sourceId: string): SourceTier {
  return sourceVerifications.find((s) => s.sourceId === sourceId)?.tier ?? "TIER3";
}

export function sourceReachable(sourceId: string): boolean {
  return sourceVerifications.find((s) => s.sourceId === sourceId)?.reachable ?? false;
}

export function sourceVerificationNote(sourceId: string): string {
  return sourceVerifications.find((s) => s.sourceId === sourceId)?.note ?? "";
}
