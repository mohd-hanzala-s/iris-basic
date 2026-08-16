import type {
  HeadToHead,
  HeadToHeadRow,
  CompetitiveThreat,
  ProductMatrixRow,
  CompetitorMapSegment,
  WhyChooseNarrative,
} from "./types";

/**
 * Stage 6 — competitive intelligence: product-by-product head-to-heads, the
 * competitor map, product matrix, competitive threats, positioning and the
 * customer-choice narratives. Content is evidence-based; where public evidence
 * is thin we say so explicitly rather than inventing scores or specifics.
 */

function hh(
  id: string,
  irisProductId: string,
  competitorCompanyId: string,
  summary: string,
  rows: HeadToHeadRow[],
  irisEdges: string[],
  competitorEdges: string[],
  whyItMatters: string,
  evidence: string,
  sources: string[],
  certainty: HeadToHead["certainty"] = "ANALYST_VIEW"
): HeadToHead {
  return { id, irisProductId, competitorCompanyId, summary, rows, irisEdges, competitorEdges, whyItMatters, evidence, sources, certainty };
}

function row(
  dimension: string,
  iris: string,
  competitor: string,
  edge: HeadToHeadRow["edge"] = "NEUTRAL"
): HeadToHeadRow {
  return { dimension, iris, competitor, edge };
}

export const headToHeads: HeadToHead[] = [
  // ==========================================================================
  // iFILE (SupTech)
  // ==========================================================================
  hh(
    "ifile-vs-vizor",
    "iris-ifile",
    "vizor",
    "IRIS iFILE vs Vizor — two regulator-side data-collection (SupTech) platforms. The decisive difference is that IRIS also sells firm-side products, giving its regulator customers a pre-validated filer ecosystem.",
    [
      row("Capability", "Collects, validates and analyses structured/XBRL returns from 30+ regulators.", "Supervision, data collection and risk-based analytics for regulators.", "IRIS"),
      row("Product depth", "Deep XBRL/structured-data collection plus validation and analytics.", "Broader supervision workflow but less XBRL/taxonomy depth.", "NEUTRAL"),
      row("Regulatory expertise", "20+ years in XBRL and regulator filing; RBI/SEBI/MCA heritage.", "Central-bank supervision domain expertise.", "NEUTRAL"),
      row("Geographic coverage", "52+ countries; strong India, Middle East, Africa, LatAm.", "Global incl. emerging markets.", "NEUTRAL"),
      row("Ease of use", "Filer-side products (iDEAL/CARBON) make submission easy for regulated firms.", "Regulator-centric UI.", "IRIS"),
      row("Enterprise capabilities", "Dual-side model links filer and regulator.", "Regulator-side only.", "IRIS"),
      row("Integrations", "XBRL/SDMX standards-based; filer ecosystem.", "Regulator system integration.", "NEUTRAL"),
      row("Automation", "Automated validation on entry.", "Automated collection workflow.", "NEUTRAL"),
      row("AI", "Not publicly documented.", "Some supervision analytics/AI.", "COMPETITOR"),
      row("Analytics", "iConnect complements collected data with analytics.", "Built-in supervision analytics.", "COMPETITOR"),
      row("Customer experience", "Long regulator relationships (Qatar, SARB, RBI).", "Regulator relationships.", "NEUTRAL"),
      row("Implementation", "Regulator project deployments.", "Regulator project deployments.", "NEUTRAL"),
      row("Pricing/value", "Not published.", "Not published.", "UNKNOWN"),
      row("Market presence", "30+ regulators via iFILE.", "Niche SupTech specialist.", "NEUTRAL"),
    ],
    [
      "Dual-side model: a regulator buying iFILE also gets a ready ecosystem of filers (iDEAL/CARBON).",
      "Deep XBRL/taxonomy expertise and standards credibility (XBRL International board seat).",
      "Proven regulator franchise (RBI, SEBI, MCA, Qatar GTA, SARB).",
    ],
    [
      "Vizor's supervision/analytics workflow may be richer for pure supervisory use cases.",
      "Single-minded SupTech focus can be a selling point for regulators who want a specialist.",
    ],
    "For a central bank or registry, the choice is often between a pure SupTech specialist and a vendor that also controls the filer-side tooling. IRIS's dual-side position can reduce ecosystem friction, but a regulator prioritising advanced supervision analytics may prefer a pure SupTech player.",
    "Based on public positioning: IRIS claims 30+ regulators for iFILE (iris-ifile-page) and RBI/SEBI/MCA implementations (iris-filexbrl-abs); Vizor's SupTech focus is from its public site (vizor-home). Direct feature-by-feature comparison is Insufficient public evidence.",
    ["iris-ifile-page", "iris-filexbrl-abs", "vizor-home"]
  ),

  hh(
    "ifile-vs-regnology",
    "iris-ifile",
    "regnology",
    "IRIS iFILE vs Regnology (Rcloud/Abacus regulator tools). Regnology brings European depth and a firm-side Abacus franchise; IRIS brings XBRL standards depth and emerging-market regulator reach.",
    [
      row("Capability", "XBRL/structured collection and validation for 30+ regulators.", "Supervisory data collection (Rcloud) plus firm-side Abacus.", "NEUTRAL"),
      row("Product depth", "Deep XBRL; lighter on bank-specific regimes.", "Deep European bank/insurer reporting regimes.", "COMPETITOR"),
      row("Regulatory expertise", "XBRL/standards-led.", "EBA/ECB/Eurosystem-led.", "NEUTRAL"),
      row("Geographic coverage", "India, Middle East, Africa, LatAm, 52+ countries.", "Europe-strong, expanding.", "NEUTRAL"),
      row("Ease of use", "Standardised, lighter-weight regulator deployments.", "Enterprise-grade but heavier.", "IRIS"),
      row("Enterprise capabilities", "Dual-side but smaller firm-side footprint.", "Large firm-side Abacus franchise.", "COMPETITOR"),
      row("Integrations", "Standards-based (XBRL/SDMX).", "Broad bank data integration.", "COMPETITOR"),
      row("Automation", "Automated validation on entry.", "Strong automation across regimes.", "NEUTRAL"),
      row("AI", "Not publicly documented.", "Emerging regulatory intelligence.", "COMPETITOR"),
      row("Analytics", "iConnect complements.", "Built-in supervisory analytics.", "COMPETITOR"),
      row("Customer experience", "Nimble, regulator-focused.", "Enterprise service model.", "NEUTRAL"),
      row("Implementation", "Regulator projects.", "Regulator projects, larger scale.", "NEUTRAL"),
      row("Pricing/value", "Not published.", "Not published.", "UNKNOWN"),
      row("Market presence", "30+ regulators.", "Strong European regulator presence.", "NEUTRAL"),
    ],
    [
      "XbRL standards depth and a broad emerging-market regulator franchise.",
      "Lighter-weight, more cost-effective regulator deployments.",
      "Filer-side ecosystem (iDEAL/CARBON) for smoother adoption.",
    ],
    [
      "Regnology's European bank-reporting depth (EBA/ECB) is hard to match.",
      "Larger firm-side franchise and scale to invest across regimes.",
    ],
    "A European banking supervisor will likely weigh Regnology heavily; a central bank in the Middle East, Africa or Asia may value IRIS's XBRL depth and cost-effective, standards-based approach.",
    "Based on public positioning: Regnology's European focus (regnology-home) vs IRIS's 52-country/30-regulator claims (iris-filexbrl-abs, iris-ifile-page). Detailed capability comparison is Insufficient public evidence.",
    ["iris-filexbrl-abs", "iris-ifile-page", "regnology-home"]
  ),

  hh(
    "ifile-vs-corefiling",
    "iris-ifile",
    "corefiling",
    "IRIS iFILE vs CoreFiling — both are XBRL-native and trusted by regulators. CoreFiling is a taxonomy/tooling specialist; IRIS is a fuller product company.",
    [
      row("Capability", "End-to-end collection platform.", "XBRL processing/tooling plus services.", "IRIS"),
      row("Product depth", "Broader product (collection, validation, analytics).", "Deeper on taxonomy/XBRL engines.", "NEUTRAL"),
      row("Regulatory expertise", "20+ years regulator implementations.", "Standards/authority credibility.", "NEUTRAL"),
      row("Geographic coverage", "52+ countries.", "UK/Europe-centred.", "IRIS"),
      row("Ease of use", "Turnkey platform.", "Technical tooling.", "IRIS"),
      row("Enterprise capabilities", "Full platform + filer ecosystem.", "Tooling/services.", "IRIS"),
      row("Integrations", "XBRL/SDMX.", "XBRL APIs.", "NEUTRAL"),
      row("Automation", "Automated validation.", "Engine automation.", "NEUTRAL"),
      row("AI", "Not documented.", "Minimal.", "NEUTRAL"),
      row("Analytics", "iConnect complements.", "Magnify analytics.", "NEUTRAL"),
      row("Customer experience", "Product-led.", "Services-led.", "NEUTRAL"),
      row("Implementation", "Regulator projects.", "Project-based.", "NEUTRAL"),
      row("Pricing/value", "Not published.", "Not published.", "UNKNOWN"),
      row("Market presence", "30+ regulators.", "Regulators/standard bodies.", "NEUTRAL"),
    ],
    [
      "A full product (not just tooling) with validation and analytics built in.",
      "Broader geographic and regulator franchise.",
    ],
    [
      "CoreFiling's taxonomy-development expertise is unmatched; regulators building custom taxonomies may prefer it.",
    ],
    "For a regulator that mainly needs XBRL tooling or taxonomy work, CoreFiling is compelling; for a turnkey collection platform with a filer ecosystem, IRIS is stronger.",
    "Based on public positioning (iris-ifile-page, corefiling-home). Head-to-head feature detail is Insufficient public evidence.",
    ["iris-ifile-page", "corefiling-home"]
  ),

  // ==========================================================================
  // iDEAL (bank regulatory reporting)
  // ==========================================================================
  hh(
    "ideal-vs-regnology",
    "iris-ideal",
    "regnology",
    "IRIS iDEAL vs Regnology Abacus. Regnology is the European bank-reporting benchmark; iDEAL is a leaner, XBRL-native alternative with proven RBI (India) credentials.",
    [
      row("Capability", "Automated XBRL/structured reporting for banks (RBI CIMS).", "Broad European bank/insurer reporting (COREP/FINREP).", "COMPETITOR"),
      row("Product depth", "Focused on reporting + validation.", "Deep multi-regime coverage.", "COMPETITOR"),
      row("Regulatory expertise", "RBI/India + XBRL depth; less European breadth.", "EBA/ECB/Eurosystem depth.", "COMPETITOR"),
      row("Geographic coverage", "India, Middle East, Africa, APAC.", "Europe-strong.", "NEUTRAL"),
      row("Ease of use", "Lean, standards-based.", "Enterprise-grade, heavier.", "IRIS"),
      row("Enterprise capabilities", "Suitable for banks and investment firms.", "Large-bank scale.", "COMPETITOR"),
      row("Integrations", "XBRL + core-banking connectors.", "Broad data integration.", "COMPETITOR"),
      row("Automation", "Strong report automation.", "Strong.", "NEUTRAL"),
      row("AI", "Not documented.", "Emerging.", "COMPETITOR"),
      row("Analytics", "Basic; iConnect complements.", "Built-in analytics.", "COMPETITOR"),
      row("Customer experience", "MUFG testimonial; leaner.", "Enterprise service model.", "NEUTRAL"),
      row("Implementation", "Lighter.", "Heavier.", "IRIS"),
      row("Pricing/value", "Not published (likely lower).", "Not published (premium).", "IRIS"),
      row("Market presence", "India niche + emerging markets.", "European leader.", "COMPETITOR"),
    ],
    [
      "Cost-effective, lighter deployment for non-European banks.",
      "XBRL-native and proven against RBI's CIMS.",
      "Favourable for banks that also need disclosure/ESG (bundle with CARBON).",
    ],
    [
      "Regnology's European regulatory breadth (EBA/ECB) is the benchmark.",
      "Scale and a large firm-side franchise.",
    ],
    "A European bank will default to Regnology/Wolters Kluwer/Adenza; a bank in India, the Middle East or Africa — especially one reporting to RBI-style regimes — may find iDEAL a leaner, cheaper, XBRL-native fit.",
    "iDEAL's RBI/MUFG positioning (iris-ideal-page, iris-rbi-cims) vs Regnology's European depth (regnology-home). Regime-by-regime capability comparison is Insufficient public evidence.",
    ["iris-ideal-page", "iris-rbi-cims", "regnology-home"]
  ),

  hh(
    "ideal-vs-adenza",
    "iris-ideal",
    "adenza",
    "IRIS iDEAL vs AxiomSL/Adenza. Adenza is the tier-1 bank reporting engine with strong data lineage; iDEAL is leaner and XBRL-native.",
    [
      row("Capability", "Automated structured reporting.", "Data-driven reporting + treasury/risk (Calypso).", "COMPETITOR"),
      row("Product depth", "Focused.", "Very deep, global regimes.", "COMPETITOR"),
      row("Regulatory expertise", "RBI/India + XBRL.", "Global (Fed, EBA, APAC).", "COMPETITOR"),
      row("Geographic coverage", "India/emerging markets.", "Global tier-1.", "COMPETITOR"),
      row("Ease of use", "Lean.", "Complex.", "IRIS"),
      row("Enterprise capabilities", "Mid-size banks.", "Large global banks.", "COMPETITOR"),
      row("Integrations", "XBRL + connectors.", "Deep data lineage.", "COMPETITOR"),
      row("Automation", "Strong.", "Strong.", "NEUTRAL"),
      row("AI", "Not documented.", "Emerging.", "COMPETITOR"),
      row("Analytics", "Basic.", "Risk/finance analytics.", "COMPETITOR"),
      row("Customer experience", "Leaner.", "Enterprise.", "NEUTRAL"),
      row("Implementation", "Lighter.", "Heavier.", "IRIS"),
      row("Pricing/value", "Not published (lower).", "Not published (premium).", "IRIS"),
      row("Market presence", "Niche.", "Tier-1 leader.", "COMPETITOR"),
    ],
    [
      "Lower total cost and lighter implementation for non-tier-1 banks.",
      "XBRL-native and RBI-proven.",
    ],
    [
      "Adenza's data lineage and global tier-1 footprint dominate the high end.",
    ],
    "The high end of bank reporting is Adenza/Regnology/WK territory; IRIS's edge is the mid-market and RBI-style regimes where cost and XBRL depth matter more than tier-1 scale.",
    "iDEAL positioning (iris-ideal-page) vs Adenza's data-lineage/tier-1 positioning (adenza-home). Detailed comparison is Insufficient public evidence.",
    ["iris-ideal-page", "adenza-home"]
  ),

  hh(
    "ideal-vs-wolterskluwer",
    "iris-ideal",
    "wolters-kluwer",
    "IRIS iDEAL vs Wolters Kluwer OneSumX. OneSumX is a global-scale bank reporting/finance suite; iDEAL is a lean, XBRL-native specialist.",
    [
      row("Capability", "Automated structured reporting.", "Full reporting + finance suite.", "COMPETITOR"),
      row("Product depth", "Focused.", "Very broad.", "COMPETITOR"),
      row("Regulatory expertise", "RBI/India + XBRL.", "Global regulatory content.", "COMPETITOR"),
      row("Geographic coverage", "India/emerging markets.", "Global.", "COMPETITOR"),
      row("Ease of use", "Lean.", "Enterprise.", "IRIS"),
      row("Enterprise capabilities", "Mid-size banks.", "Large banks.", "COMPETITOR"),
      row("Integrations", "XBRL + connectors.", "Broad ERP integration.", "COMPETITOR"),
      row("Automation", "Strong.", "Strong.", "NEUTRAL"),
      row("AI", "Not documented.", "Emerging.", "COMPETITOR"),
      row("Analytics", "Basic.", "Strong finance analytics.", "COMPETITOR"),
      row("Customer experience", "Leaner.", "Enterprise.", "NEUTRAL"),
      row("Implementation", "Lighter.", "Heavier.", "IRIS"),
      row("Pricing/value", "Not published (lower).", "Not published (premium).", "IRIS"),
      row("Market presence", "Niche.", "Global leader.", "COMPETITOR"),
    ],
    [
      "Cost and simplicity for mid-size/emerging-market banks.",
      "XBRL-native, RBI-proven.",
    ],
    [
      "WK's scale, global regulatory content and finance breadth.",
    ],
    "WK wins on global scale and breadth; iDEAL wins on cost, simplicity and XBRL/RBI depth for a specific buyer profile.",
    "iDEAL (iris-ideal-page) vs WK OneSumX (wolterskluwer-home). Detailed capability comparison is Insufficient public evidence.",
    ["iris-ideal-page", "wolterskluwer-home"]
  ),

  // ==========================================================================
  // CARBON (disclosure management / ESG)
  // ==========================================================================
  hh(
    "carbon-vs-workiva",
    "iris-carbon",
    "workiva",
    "IRIS CARBON vs Workiva. Workiva is the enterprise disclosure/ESG leader; CARBON is an Office 365-based, XBRL-native challenger. This is IRIS's most important competitive matchup.",
    [
      row("Capability", "Office 365-based disclosure/XBRL/iXBRL authoring (ESEF, SEC, ESG).", "Connected reporting + ESG + GRC platform.", "COMPETITOR"),
      row("Product depth", "Deep XBRL/iXBRL; focused disclosure/ESG.", "Broader (reporting + ESG + GRC + data prep).", "COMPETITOR"),
      row("Regulatory expertise", "XBRL/ESEF/IFRS taxonomy depth.", "Broad US/EU disclosure + ESG frameworks.", "NEUTRAL"),
      row("Geographic coverage", "India + global (Gap Inc., Brazil via MZ).", "US-centric + growing EU.", "NEUTRAL"),
      row("Ease of use", "Familiar Office 365 UI.", "Powerful but complex.", "IRIS"),
      row("Enterprise capabilities", "Suitable for corporates; smaller enterprise footprint.", "Enterprise scale, audit/controls, partner ecosystem.", "COMPETITOR"),
      row("Integrations", "Office 365-native; ERP connectors.", "Broad ERP/GRC integration.", "COMPETITOR"),
      row("Automation", "XBRL rendering/tagging automation.", "Strong workflow automation.", "NEUTRAL"),
      row("AI", "Not publicly documented.", "GenAI drafting features (maturing).", "COMPETITOR"),
      row("Analytics", "Basic; pairs with iConnect.", "Dashboards; not XBRL-specialist analytics.", "NEUTRAL"),
      row("Customer experience", "Leaner, more personal support.", "Enterprise service model.", "IRIS"),
      row("Implementation", "Lighter (Office 365).", "Heavier, partner-led.", "IRIS"),
      row("Pricing/value", "Not published (likely lower).", "Premium enterprise.", "IRIS"),
      row("Market presence", "Niche with proof points (Gap, Brazil).", "Market leader.", "COMPETITOR"),
    ],
    [
      "Office 365 familiarity lowers adoption friction and cost.",
      "XBRL/ESEF/IFRS-taxonomy depth is a genuine specialist moat.",
      "More accessible pricing and lighter implementation for mid-market.",
    ],
    [
      "Workiva's enterprise scale, brand, ESG+GRC breadth and partner ecosystem dominate the high end.",
      "GenAI roadmap and audit/controls are ahead of CARBON.",
    ],
    "A Fortune 500 with complex ESG+GRC needs will default to Workiva; a mid-market company (or one with strong XBRL/taxonomy requirements in India, LatAm or ESEF) may prefer CARBON's cost, simplicity and XBRL depth.",
    "CARBON is Office 365-based (carbon-launch-office365) with Gap Inc./Brazil proof points (newswire-gap-carbon, scanx-mz-brazil); Workiva's enterprise/ESG leadership is public (workiva-home). Direct capability comparison is Insufficient public evidence.",
    ["carbon-launch-office365", "newswire-gap-carbon", "scanx-mz-brazil", "workiva-home"]
  ),

  hh(
    "carbon-vs-dfin",
    "iris-carbon",
    "dfin",
    "IRIS CARBON vs DFIN ActiveDisclosure. DFIN is a US disclosure/filing leader; CARBON is an XBRL-native, Office 365-based alternative.",
    [
      row("Capability", "XBRL/iXBRL disclosure authoring.", "ActiveDisclosure + SEC filing + data rooms.", "COMPETITOR"),
      row("Product depth", "Disclosure/ESG focused.", "Disclosure + capital-markets services.", "COMPETITOR"),
      row("Regulatory expertise", "XBRL/ESEF/IFRS.", "US SEC depth.", "NEUTRAL"),
      row("Geographic coverage", "India + global.", "US-centric.", "NEUTRAL"),
      row("Ease of use", "Office 365.", "Enterprise SaaS.", "IRIS"),
      row("Enterprise capabilities", "Mid-market.", "Enterprise + services.", "COMPETITOR"),
      row("Integrations", "Office 365 + ERP.", "Broad.", "COMPETITOR"),
      row("Automation", "Strong tagging automation.", "Strong.", "NEUTRAL"),
      row("AI", "Not documented.", "Emerging.", "COMPETITOR"),
      row("Analytics", "Basic.", "Some.", "NEUTRAL"),
      row("Customer experience", "Leaner.", "Services-led.", "NEUTRAL"),
      row("Implementation", "Lighter.", "Services-led.", "IRIS"),
      row("Pricing/value", "Not published (lower).", "Not published.", "UNKNOWN"),
      row("Market presence", "Niche.", "US leader.", "COMPETITOR"),
    ],
    [
      "Cost and simplicity, especially outside the US.",
      "XBRL/taxonomy depth.",
    ],
    [
      "DFIN's US SEC filing depth, services and capital-markets reach.",
    ],
    "US public companies with filing+services needs favour DFIN; non-US/ESEF and cost-conscious buyers may favour CARBON.",
    "CARBON (carbon-launch-office365) vs DFIN (dfin-home). Detailed comparison is Insufficient public evidence.",
    ["carbon-launch-office365", "dfin-home"]
  ),

  hh(
    "carbon-vs-datatracks",
    "iris-carbon",
    "datatracks",
    "IRIS CARBON vs DataTracks. DataTracks competes on price via a managed filing service; CARBON is a self-serve platform.",
    [
      row("Capability", "Self-serve disclosure platform.", "Managed tagging/filing service.", "NEUTRAL"),
      row("Product depth", "Platform with workflow.", "Service bureau.", "IRIS"),
      row("Regulatory expertise", "XBRL/taxonomy depth.", "Broad filing coverage.", "NEUTRAL"),
      row("Geographic coverage", "India + global.", "US/UK/EU/India/ME/SA.", "NEUTRAL"),
      row("Ease of use", "Office 365 self-serve.", "Outsource — minimal effort.", "COMPETITOR"),
      row("Enterprise capabilities", "Platform.", "Limited.", "IRIS"),
      row("Integrations", "ERP/Office.", "Limited.", "IRIS"),
      row("Automation", "Tagging automation.", "Service.", "NEUTRAL"),
      row("AI", "Not documented.", "Minimal.", "NEUTRAL"),
      row("Analytics", "Basic.", "Limited.", "IRIS"),
      row("Customer experience", "Product-led.", "Service-led.", "NEUTRAL"),
      row("Implementation", "Self-serve.", "None (managed).", "COMPETITOR"),
      row("Pricing/value", "Not published.", "Low-cost per filing.", "COMPETITOR"),
      row("Market presence", "Niche.", "High-volume filers.", "NEUTRAL"),
    ],
    [
      "Control, collaboration and audit workflow (a platform, not a service).",
      "XBRL/taxonomy depth and ESG capability.",
    ],
    [
      "DataTracks wins on price and convenience for filers who want it done for them.",
    ],
    "The choice is 'do it yourself with a platform' vs 'pay someone to file'. Cost-sensitive SMEs favour DataTracks; companies wanting control, ESG or multi-format authoring favour CARBON.",
    "CARBON (carbon-launch-office365) vs DataTracks service model (datatracks-home). Pricing specifics are Insufficient public evidence.",
    ["carbon-launch-office365", "datatracks-home"]
  ),

  hh(
    "carbon-vs-parseport",
    "iris-carbon",
    "parseport",
    "IRIS CARBON vs ParsePort. ParsePort is self-service ESEF conversion; CARBON is a fuller disclosure-authoring product.",
    [
      row("Capability", "Full disclosure authoring + XBRL.", "ESEF conversion + validation.", "IRIS"),
      row("Product depth", "Broader (authoring, ESG, multi-format).", "Focused on conversion.", "IRIS"),
      row("Regulatory expertise", "XBRL/ESEF/IFRS.", "ESEF-focused.", "NEUTRAL"),
      row("Geographic coverage", "India + global.", "EU.", "IRIS"),
      row("Ease of use", "Office 365 authoring.", "Very simple conversion.", "COMPETITOR"),
      row("Enterprise capabilities", "More.", "Less.", "IRIS"),
      row("Integrations", "Office/ERP.", "API.", "NEUTRAL"),
      row("Automation", "Tagging automation.", "Conversion automation.", "NEUTRAL"),
      row("AI", "Not documented.", "Minimal.", "NEUTRAL"),
      row("Analytics", "Basic.", "XBRL data analytics.", "COMPETITOR"),
      row("Customer experience", "Product-led.", "Self-serve.", "NEUTRAL"),
      row("Implementation", "Light.", "Very light.", "COMPETITOR"),
      row("Pricing/value", "Not published.", "Per-report SaaS.", "UNKNOWN"),
      row("Market presence", "Niche.", "ESEF niche.", "NEUTRAL"),
    ],
    [
      "A fuller product (authoring + ESG + multi-format) beyond conversion.",
      "Global (non-EU) footprint.",
    ],
    [
      "ParsePort's simplicity and API for pure ESEF conversion.",
    ],
    "For pure, one-off ESEF conversion ParsePort is hard to beat on speed/simplicity; for ongoing disclosure management, ESG and multi-jurisdiction work, CARBON is broader.",
    "CARBON (carbon-launch-office365) vs ParsePort (parseport-home). Detailed comparison is Insufficient public evidence.",
    ["carbon-launch-office365", "parseport-home"]
  ),

  hh(
    "carbon-vs-lucanet",
    "iris-carbon",
    "lucanet",
    "IRIS CARBON vs LucaNet. LucaNet owns consolidation + disclosure at the finance layer; CARBON is a disclosure/ESG specialist.",
    [
      row("Capability", "Disclosure/XBRL/ESG authoring.", "Consolidation + planning + ESEF disclosure.", "NEUTRAL"),
      row("Product depth", "Deep disclosure/XBRL.", "Deep consolidation, lighter XBRL.", "NEUTRAL"),
      row("Regulatory expertise", "XBRL/ESEF/IFRS.", "ESEF/IFRS via consolidation.", "NEUTRAL"),
      row("Geographic coverage", "India + global.", "Europe-strong.", "NEUTRAL"),
      row("Ease of use", "Office 365.", "Finance-user friendly.", "NEUTRAL"),
      row("Enterprise capabilities", "Disclosure/ESG.", "Group consolidation.", "COMPETITOR"),
      row("Integrations", "Office/ERP.", "Deep ERP.", "COMPETITOR"),
      row("Automation", "Tagging automation.", "Consolidation automation.", "NEUTRAL"),
      row("AI", "Not documented.", "Emerging.", "COMPETITOR"),
      row("Analytics", "Basic.", "Finance analytics.", "COMPETITOR"),
      row("Customer experience", "Product-led.", "Finance-led.", "NEUTRAL"),
      row("Implementation", "Light.", "Moderate.", "IRIS"),
      row("Pricing/value", "Not published.", "Mid-market.", "UNKNOWN"),
      row("Market presence", "Niche.", "Mid-market consolidation leader.", "COMPETITOR"),
    ],
    [
      "XBRL/ESEF/IFRS taxonomy depth and ESG.",
      "More affordable for disclosure-only needs.",
    ],
    [
      "LucaNet owns the consolidation source data, giving it a natural foothold in ESEF disclosure.",
    ],
    "If a company already consolidates in LucaNet, its built-in ESEF disclosure is attractive; if disclosure/ESG and XBRL depth matter more than consolidation, CARBON is the specialist.",
    "CARBON (carbon-launch-office365) vs LucaNet (lucanet-home). Detailed comparison is Insufficient public evidence.",
    ["carbon-launch-office365", "lucanet-home"]
  ),

  hh(
    "carbon-vs-corefiling",
    "iris-carbon",
    "corefiling",
    "IRIS CARBON vs CoreFiling. CoreFiling is XBRL tooling; CARBON is a disclosure product. They compete where a filer needs XBRL depth.",
    [
      row("Capability", "Disclosure authoring + XBRL.", "XBRL processors/taxonomy/tooling.", "NEUTRAL"),
      row("Product depth", "Disclosure/ESG product.", "Deeper XBRL/taxonomy engine.", "NEUTRAL"),
      row("Regulatory expertise", "XBRL/ESEF/IFRS.", "Standards authority.", "COMPETITOR"),
      row("Geographic coverage", "India + global.", "UK/EU.", "IRIS"),
      row("Ease of use", "Office 365 product.", "Technical tooling.", "IRIS"),
      row("Enterprise capabilities", "More.", "Less.", "IRIS"),
      row("Integrations", "Office/ERP.", "XBRL APIs.", "NEUTRAL"),
      row("Automation", "Tagging automation.", "Engine automation.", "NEUTRAL"),
      row("AI", "Not documented.", "Minimal.", "NEUTRAL"),
      row("Analytics", "Basic.", "Magnify.", "NEUTRAL"),
      row("Customer experience", "Product-led.", "Services-led.", "NEUTRAL"),
      row("Implementation", "Light.", "Project.", "IRIS"),
      row("Pricing/value", "Not published.", "Not published.", "UNKNOWN"),
      row("Market presence", "Niche.", "Regulators/standard bodies.", "NEUTRAL"),
    ],
    [
      "A usable end-product vs raw tooling.",
      "Broader disclosure/ESG and geographic reach.",
    ],
    [
      "CoreFiling's unmatched taxonomy/XBRL engineering depth.",
    ],
    "For deep, custom XBRL/taxonomy work CoreFiling is the reference; for a finished disclosure product CARBON is more accessible.",
    "CARBON (carbon-launch-office365) vs CoreFiling (corefiling-home). Detailed comparison is Insufficient public evidence.",
    ["carbon-launch-office365", "corefiling-home"]
  ),

  // ==========================================================================
  // iConnect (XBRL analytics)
  // ==========================================================================
  hh(
    "iconnect-vs-parseport",
    "iris-iconnect",
    "parseport",
    "IRIS iConnect vs ParsePort analytics — two XBRL data-analytics tools with different delivery models.",
    [
      row("Capability", "XBRL analytics in Excel.", "XBRL analytics + API.", "NEUTRAL"),
      row("Product depth", "Excel-native, business-user friendly.", "Developer/API-oriented.", "NEUTRAL"),
      row("Regulatory expertise", "XBRL depth.", "XBRL depth.", "NEUTRAL"),
      row("Geographic coverage", "Global (XBRL data).", "EU-centric.", "IRIS"),
      row("Ease of use", "Excel — low learning curve.", "API — developer-oriented.", "IRIS"),
      row("Enterprise capabilities", "End-user analytics.", "Embeddable analytics.", "NEUTRAL"),
      row("Integrations", "Excel.", "API.", "NEUTRAL"),
      row("Automation", "Analysis automation.", "Conversion/analysis automation.", "NEUTRAL"),
      row("AI", "Not documented.", "Minimal.", "NEUTRAL"),
      row("Analytics", "Business-user analytics.", "Data analytics.", "NEUTRAL"),
      row("Customer experience", "Self-serve Excel.", "Self-serve API.", "NEUTRAL"),
      row("Implementation", "Very light.", "Very light.", "NEUTRAL"),
      row("Pricing/value", "Not published.", "Per-report/API.", "UNKNOWN"),
      row("Market presence", "Niche.", "Niche.", "NEUTRAL"),
    ],
    [
      "Excel-native UX for business users and analysts.",
    ],
    [
      "ParsePort's API is better for embedding XBRL analytics in other software.",
    ],
    "Business analysts will prefer iConnect's Excel familiarity; developers embedding XBRL data into products will prefer ParsePort's API.",
    "iConnect launch framing (iconnect-launch) vs ParsePort API (parseport-home). Detailed comparison is Insufficient public evidence.",
    ["iconnect-launch", "parseport-home"]
  ),

  // ==========================================================================
  // DataTech — credit analytics
  // ==========================================================================
  hh(
    "credixo-vs-moodys",
    "iris-credixo",
    "moodys",
    "IRIS Credixo/MSME vs Moody's — a niche Indian MSME credit tool vs a global credit-data/analytics giant.",
    [
      row("Capability", "Credit-analysis modelling for MSME credit access.", "Global credit ratings/data/analytics.", "COMPETITOR"),
      row("Product depth", "Niche MSME credit tool.", "Very deep credit data/analytics.", "COMPETITOR"),
      row("Regulatory expertise", "India MSME credit context.", "Global credit/risk frameworks.", "COMPETITOR"),
      row("Geographic coverage", "India.", "Global.", "COMPETITOR"),
      row("Ease of use", "Lightweight.", "Enterprise analytics.", "NEUTRAL"),
      row("Enterprise capabilities", "Limited.", "Extensive.", "COMPETITOR"),
      row("Integrations", "Limited (India data).", "Data feeds/APIs.", "COMPETITOR"),
      row("Automation", "Limited.", "Strong.", "COMPETITOR"),
      row("AI", "Not documented.", "Emerging.", "COMPETITOR"),
      row("Analytics", "Basic credit analysis.", "Industry-leading.", "COMPETITOR"),
      row("Customer experience", "Niche, India-focused.", "Global enterprise.", "NEUTRAL"),
      row("Implementation", "Light.", "Data/API onboarding.", "NEUTRAL"),
      row("Pricing/value", "Not published (lower).", "Not published (premium).", "IRIS"),
      row("Market presence", "Niche.", "Global leader.", "COMPETITOR"),
    ],
    [
      "Focused on India's MSME credit-access gap (Goa MoU model) at low cost.",
      "Govt/state partnership approach.",
    ],
    [
      "Moody's global credit-data and analytics scale dominates institutional credit decisions.",
    ],
    "These barely overlap: Moody's is a global credit-data giant; Credixo/MSME is an Indian financial-inclusion play. A lender choosing between them is not choosing between substitutes.",
    "Credixo/MSME are thinly documented (screener-iris, projects-today-goa-msme) vs Moody's (moodys-home). Detailed comparison is Insufficient public evidence.",
    ["projects-today-goa-msme", "moodys-home"]
  ),

  // ==========================================================================
  // Divested TaxTech (historical)
  // ==========================================================================
  hh(
    "gst-vs-cleartax",
    "iris-gst",
    "cleartax",
    "IRIS GST/e-invoicing (divested) vs ClearTax — the historical India tax rivalry, now moot after IRIS exited to Sovos.",
    [
      row("Capability", "GST software, e-invoicing, IRP, Zircon APIs.", "GST software, e-invoicing, e-way bill.", "NEUTRAL"),
      row("Product depth", "Full GST/e-invoicing/IRP stack.", "Full GST/e-invoicing stack.", "NEUTRAL"),
      row("Regulatory expertise", "Strong (GST pioneer, IRP).", "Strong (GST leader).", "NEUTRAL"),
      row("Geographic coverage", "India.", "India.", "NEUTRAL"),
      row("Ease of use", "Good.", "Good.", "NEUTRAL"),
      row("Enterprise capabilities", "Enterprise + IRP (regulator-side).", "Enterprise + SME.", "NEUTRAL"),
      row("Integrations", "ERP connectors, APIs.", "ERP integration.", "NEUTRAL"),
      row("Automation", "Strong.", "Strong.", "NEUTRAL"),
      row("AI", "Limited.", "Some (document AI).", "COMPETITOR"),
      row("Analytics", "Basic.", "Some.", "NEUTRAL"),
      row("Customer experience", "Enterprise/CA focus.", "SME/CA reach.", "COMPETITOR"),
      row("Implementation", "Moderate.", "Self-serve.", "COMPETITOR"),
      row("Pricing/value", "Not published.", "Low/mid subscription.", "COMPETITOR"),
      row("Market presence", "Niche (exited).", "Market leader.", "COMPETITOR"),
    ],
    [
      "IRIS's IRP (Invoice Registration Portal) connector and regulator-side angle were differentiating.",
    ],
    [
      "ClearTax's brand, distribution and SME reach won the volume market.",
    ],
    "This is now a historical comparison: IRIS divested its TaxTech business to Sovos in 2025, ceding the India tax market.",
    "IRIS TaxTech divestment (sovos-acquisition, hdfc-sky-151cr) vs ClearTax positioning (cleartax-home).",
    ["sovos-acquisition", "hdfc-sky-151cr", "cleartax-home"]
  ),
];

// ---------------------------------------------------------------------------
// Competitor map (segment → competitors)
// ---------------------------------------------------------------------------
export const competitorMap: CompetitorMapSegment[] = [
  {
    segment: "SupTech — regulator data collection (iFILE)",
    description:
      "Regulators (central banks, registries, securities/tax authorities) buying collection/validation/analytics platforms. IRIS iFILE competes here.",
    competitorIds: ["vizor", "regnology", "corefiling", "fis"],
  },
  {
    segment: "RegTech — bank regulatory reporting (iDEAL)",
    description:
      "Banks and investment firms filing supervisory returns (COREP/FINREP, RBI returns). IRIS iDEAL competes here.",
    competitorIds: ["regnology", "adenza", "wolters-kluwer", "fis"],
  },
  {
    segment: "RegTech — disclosure management & ESG (CARBON)",
    description:
      "Corporates filing digital (XBRL/iXBRL) financial and sustainability reports (SEC, ESEF, ESG). IRIS CARBON competes here.",
    competitorIds: ["workiva", "dfin", "toppan-merrill", "corefiling", "datatracks", "parseport", "lucanet", "sap"],
  },
  {
    segment: "DataTech — XBRL analytics & credit tools (iConnect, Credixo, MSME)",
    description:
      "Analytics over structured/XBRL data and MSME credit access. IRIS iConnect/Credixo/MSME compete (partially) here.",
    competitorIds: ["parseport", "corefiling", "moodys", "ibm"],
  },
  {
    segment: "TaxTech — GST / e-invoicing (divested)",
    description:
      "India tax compliance — IRIS exited to Sovos in 2025. Shown for completeness; no longer part of IRIS's portfolio.",
    competitorIds: ["sovos", "cleartax"],
  },
];

// ---------------------------------------------------------------------------
// Product matrix (product × competitors)
// ---------------------------------------------------------------------------
export const productMatrix: ProductMatrixRow[] = [
  {
    productId: "iris-ifile",
    cells: [
      { competitorId: "vizor", tier: "DIRECT", note: "Pure SupTech rival." },
      { competitorId: "regnology", tier: "DIRECT", note: "Supervisor-side Rcloud." },
      { competitorId: "corefiling", tier: "DIRECT", note: "Regulator XBRL tooling." },
      { competitorId: "fis", tier: "ADJACENT", note: "Banking suite module." },
    ],
  },
  {
    productId: "iris-ideal",
    cells: [
      { competitorId: "regnology", tier: "DIRECT", note: "Abacus benchmark." },
      { competitorId: "adenza", tier: "DIRECT", note: "AxiomSL reporting engine." },
      { competitorId: "wolters-kluwer", tier: "DIRECT", note: "OneSumX." },
      { competitorId: "fis", tier: "ADJACENT", note: "Reporting module." },
    ],
  },
  {
    productId: "iris-carbon",
    cells: [
      { competitorId: "workiva", tier: "DIRECT", note: "Enterprise disclosure/ESG leader." },
      { competitorId: "dfin", tier: "DIRECT", note: "US disclosure/filing." },
      { competitorId: "toppan-merrill", tier: "DIRECT", note: "Disclosure + services." },
      { competitorId: "corefiling", tier: "DIRECT", note: "XBRL depth." },
      { competitorId: "datatracks", tier: "DIRECT", note: "Low-cost managed filing." },
      { competitorId: "parseport", tier: "DIRECT", note: "ESEF conversion." },
      { competitorId: "lucanet", tier: "ADJACENT", note: "Consolidation + ESEF." },
      { competitorId: "sap", tier: "ADJACENT", note: "ERP/consolidation layer." },
    ],
  },
  {
    productId: "iris-iconnect",
    cells: [
      { competitorId: "parseport", tier: "DIRECT", note: "XBRL analytics/API." },
      { competitorId: "corefiling", tier: "DIRECT", note: "XBRL tooling." },
      { competitorId: "ibm", tier: "ADJACENT", note: "Platform analytics." },
    ],
  },
  {
    productId: "iris-credixo",
    cells: [
      { competitorId: "moodys", tier: "ADJACENT", note: "Global credit analytics." },
    ],
  },
  {
    productId: "iris-gst",
    cells: [
      { competitorId: "cleartax", tier: "DIRECT", note: "Historical — divested." },
      { competitorId: "sovos", tier: "DIRECT", note: "Acquired IRIS TaxTech." },
    ],
  },
];

// ---------------------------------------------------------------------------
// Competitive threats
// ---------------------------------------------------------------------------
export const competitiveThreats: CompetitiveThreat[] = [
  {
    id: "threat-workiva-disclosure",
    title: "Workiva/DFIN enterprise disclosure dominance squeezes CARBON's enterprise motion",
    severity: "HIGH",
    description:
      "Workiva and DFIN own the high end of disclosure/ESG. They have larger enterprise footprints, partner ecosystems and (in Workiva's case) a GenAI roadmap. IRIS CARBON risks being locked out of large-enterprise deals and competing mainly on price/niche.",
    affectedProductIds: ["iris-carbon"],
    competitorIds: ["workiva", "dfin", "toppan-merrill"],
    evidence:
      "Workiva is publicly the market leader in connected reporting/ESG (workiva-home); DFIN leads US disclosure (dfin-home). IRIS's disclosure proof points are smaller (Gap Inc., Brazil via MZ — newswire-gap-carbon, scanx-mz-brazil).",
  },
  {
    id: "threat-bank-reporting-scale",
    title: "Regnology/Adenza/Wolters Kluwer scale crowds iDEAL in bank reporting",
    severity: "HIGH",
    description:
      "In bank regulatory reporting, Regnology, Adenza (AxiomSL) and Wolters Kluwer (OneSumX) have global scale, deep European content and tier-1 credibility. iDEAL's addressable market risks being confined to India and cost-sensitive emerging-market banks.",
    affectedProductIds: ["iris-ideal"],
    competitorIds: ["regnology", "adenza", "wolters-kluwer"],
    evidence:
      "The trio's bank-reporting leadership is public positioning (regnology-home, adenza-home, wolterskluwer-home); IRIS's own evidence is RBI/MUFG (iris-rbi-cims, iris-ideal-page).",
  },
  {
    id: "threat-parseport-bundling",
    title: "Workiva's ParsePort acquisition lets it bundle low-cost ESEF with enterprise ESG",
    severity: "MEDIUM",
    description:
      "Workiva now owns ParsePort, giving it a low-cost, self-service ESEF on-ramp to upsell into its enterprise ESG platform. This spans the price spectrum IRIS CARBON sits in, squeezing CARBON from both ends.",
    affectedProductIds: ["iris-carbon", "iris-iconnect"],
    competitorIds: ["workiva", "parseport"],
    evidence:
      "ParsePort is a Workiva company (parseport-home); the strategic overlap is a reasonable inference, not a documented IRIS-specific threat.",
  },
  {
    id: "threat-datatracks-price",
    title: "DataTracks-style low-cost filing services undercut CARBON for SMEs",
    severity: "MEDIUM",
    description:
      "Managed filing services (DataTracks) win price-sensitive, low-complexity filers who will never buy a disclosure platform. This caps CARBON's down-market expansion.",
    affectedProductIds: ["iris-carbon"],
    competitorIds: ["datatracks"],
    evidence:
      "DataTracks positions as a low-cost managed filing service (datatracks-home); CARBON is a platform (carbon-launch-office365).",
  },
  {
    id: "threat-regulator-insourcing",
    title: "Regulators insourcing XBRL/taxonomy capability or standardising away differentiation",
    severity: "LOW",
    description:
      "If regulators standardise on shared taxonomies/tools (or build in-house), IRIS's XBRL depth could become less of a moat over time. CoreFiling's taxonomy authority also commoditises this layer.",
    affectedProductIds: ["iris-ifile", "iris-carbon"],
    competitorIds: ["corefiling"],
    evidence:
      "Speculative: XBRL is an open standard (xbrl-what-is) and taxonomy work is contestable (corefiling-home). Insufficient public evidence of an imminent IRIS-specific impact.",
  },
  {
    id: "threat-erp-native-disclosure",
    title: "SAP/LucaNet native consolidation+disclosure reduces need for standalone tools",
    severity: "LOW",
    description:
      "Enterprises that consolidate in SAP Group Reporting or LucaNet get disclosure/ESEF built-in, reducing the pull for a standalone disclosure product like CARBON at the data layer.",
    affectedProductIds: ["iris-carbon"],
    competitorIds: ["sap", "lucanet"],
    evidence:
      "SAP Group Reporting and LucaNet's ESEF disclosure are public (sap-home, lucanet-home); the threat to IRIS specifically is inference.",
  },
];

// ---------------------------------------------------------------------------
// Competitive positioning
// ---------------------------------------------------------------------------
export interface PositioningNote {
  title: string;
  body: string;
}

export const competitivePositioning: PositioningNote[] = [
  {
    title: "IRIS's overall position",
    body:
      "IRIS is a **global niche specialist in structured regulatory data (XBRL/iXBRL/SDMX)** with a rare **dual-side model**: it sells disclosure/reporting to firms (CARBON, iDEAL) and data-collection platforms to regulators (iFILE). This lets it serve both ends of the reporting pipeline — a position none of its direct rivals fully occupies. Its moat is 20+ years of XBRL/taxonomy depth, a 52-country footprint and a regulator franchise (RBI, SEBI, MCA, Qatar, SARB). Its constraint is scale: at ~₹128 Cr revenue it is an order of magnitude smaller than Workiva, Wolters Kluwer or Moody's.",
  },
  {
    title: "Where IRIS wins",
    body:
      "- **Regulator (SupTech) franchise** — iFILE's 30+ regulators, plus the filer ecosystem that comes with it.\n- **XBRL/taxonomy depth** — a standards-first moat competitors treat as a feature.\n- **Cost and simplicity** — Office 365-based CARBON and lean iDEAL are lighter and cheaper than enterprise suites.\n- **Emerging-market reach** — India, Middle East, Africa, LatAm, where the big Western vendors are thin.",
  },
  {
    title: "Where IRIS is exposed",
    body:
      "- **Enterprise disclosure/ESG** — Workiva/DFIN dominate; CARBON lacks their scale, brand and GenAI.\n- **Bank reporting** — Regnology/Adenza/WK own the tier-1 and European regimes.\n- **Analytics/AI** — largely undocumented for IRIS; rivals are investing visibly.\n- **Pricing power** — IRIS competes down-market on price against DataTracks/ParsePort, and up-market on capability against Workiva.",
  },
  {
    title: "The strategic bet",
    body:
      "IRIS is betting that the market rewards a specialist who owns the data standards layer (XBRL/SDMX) and the regulator relationship, then expands into ESG/CSRD digital reporting and DataTech. If that bet holds, IRIS is a credible challenger in a growing niche; if enterprise scale and AI become the deciding factors, the larger platforms will dominate.",
  },
];

// ---------------------------------------------------------------------------
// Customer-choice narratives
// ---------------------------------------------------------------------------
export const whyChoose: WhyChooseNarrative[] = [
  {
    id: "why-choose-regulator",
    perspective: "If I were a regulator (central bank / registry / securities or tax authority)",
    chooseIris: [
      "IRIS has actually run regulator systems before — RBI, SEBI, MCA, and iFILE is live with 30+ regulators worldwide, so it is proven at the thing I am buying.",
      "It is XBRL/SDMX-native and standards-led, which lowers the risk my data model diverges from international norms.",
      "Its filer-side products (iDEAL/CARBON) mean my regulated entities already know how to submit cleanly, reducing adoption friction.",
      "It is typically lighter-weight and more cost-effective than enterprise SupTech suites.",
    ],
    chooseCompetitor: [
      "If I need deep European bank-reporting content (EBA/ECB), Regnology's Abacus/Rcloud is the more established choice.",
      "If I want a pure SupTech specialist with advanced supervision analytics, Vizor is a focused alternative.",
      "If I need bespoke taxonomy work from the people who help write the standard, CoreFiling is the reference.",
    ],
    sources: ["iris-filexbrl-abs", "iris-ifile-page", "regnology-home", "vizor-home", "corefiling-home"],
  },
  {
    id: "why-choose-bank",
    perspective: "If I were a bank filing supervisory returns",
    chooseIris: [
      "iDEAL is proven against the RBI/CIMS regime my local supervisor uses, with a named bank (MUFG) using it.",
      "It is leaner and cheaper to implement than OneSumX or AxiomSL, which matters if I am not a tier-1 global bank.",
      "I can bundle it with CARBON for disclosure/ESG from one vendor.",
    ],
    chooseCompetitor: [
      "If I am a European bank, Regnology (Abacus) or Wolters Kluwer (OneSumX) cover EBA/ECB regimes far more deeply.",
      "If I am a tier-1 global bank, Adenza/AxiomSL's data lineage and global coverage are the safe choice.",
    ],
    sources: ["iris-ideal-page", "iris-rbi-cims", "regnology-home", "adenza-home", "wolterskluwer-home"],
  },
  {
    id: "why-choose-corporate",
    perspective: "If I were a listed company or large corporate filing disclosure/ESG",
    chooseIris: [
      "CARBON lives in Office 365, so my finance team can use tools they already know.",
      "It is XBRL/ESEF/IFRS-taxonomy native — I get correct, validated tags, not just a document editor.",
      "It is more affordable than the enterprise suites, which matters if I am mid-market or cost-conscious.",
    ],
    chooseCompetitor: [
      "If I am a large enterprise with complex ESG + GRC + audit needs, Workiva's platform and partner ecosystem are the market standard.",
      "If I am a US filer wanting filing + services + capital-markets support, DFIN or Toppan Merrill are strong.",
      "If I just want my report converted and filed cheaply, DataTracks or ParsePort are simpler.",
      "If I already consolidate in LucaNet, its built-in ESEF disclosure is convenient.",
    ],
    sources: ["carbon-launch-office365", "workiva-home", "dfin-home", "datatracks-home", "parseport-home", "lucanet-home"],
  },
  {
    id: "why-choose-analyst",
    perspective: "If I were an analyst or data user consuming structured/XBRL data",
    chooseIris: [
      "iConnect brings XBRL data into Excel, which is where I already work.",
      "IRIS's XBRL/taxonomy depth means the data is clean and correctly interpreted.",
    ],
    chooseCompetitor: [
      "If I want to embed XBRL data into my own software, ParsePort's API is the better fit.",
    ],
    sources: ["iconnect-launch", "parseport-home"],
  },
];
