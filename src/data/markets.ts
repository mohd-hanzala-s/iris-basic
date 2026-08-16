import type { Market } from "./types";

/**
 * Markets IRIS operates in. India is the home market; the rest reflect the
 * geographic footprint disclosed in company descriptions (India, Middle East,
 * Asia Pacific, Africa, US, Europe, UK).
 */
export const markets: Market[] = [
  {
    id: "india",
    name: "India",
    summary:
      "IRIS's home market and headquarters location; a large market for GST compliance, corporate reporting (XBRL via MCA) and regulator data-collection systems.",
    certainty: "FACT",
    sources: ["stockanalysis-company-profile", "iris-filexbrl-abs"],
    region: "Asia Pacific",
    countries: ["India"],
    tags: ["home-market", "gst", "xbrl"],
  },
  {
    id: "middle-east",
    name: "Middle East",
    summary:
      "Growth region for IRIS's regulator franchise — anchored by the 6-year Qatar Tax Authority contract.",
    certainty: "FACT",
    sources: ["scanx-qatar-tax", "stockanalysis-company-profile"],
    region: "Middle East",
    countries: ["Qatar", "UAE", "Saudi Arabia"],
    tags: ["sup-tech", "tax"],
  },
  {
    id: "asia-pacific",
    name: "Asia Pacific",
    summary:
      "IRIS's base region beyond India; home of its (since-divested) APAC Tax Technology business and much of its regulator clientele.",
    certainty: "FACT",
    sources: ["stockanalysis-company-profile", "sovos-acquisition"],
    region: "Asia Pacific",
    countries: ["India", "Singapore", "Malaysia", "Australia"],
    tags: ["regtech", "sup-tech"],
  },
  {
    id: "africa",
    name: "Africa",
    summary:
      "A SupTech market for IRIS, evidenced by the South African Reserve Bank engagement.",
    certainty: "FACT",
    sources: ["scanx-sarb", "stockanalysis-company-profile"],
    region: "Africa",
    countries: ["South Africa"],
    tags: ["sup-tech"],
  },
  {
    id: "north-america",
    name: "United States / North America",
    summary:
      "Served via the fully-owned US subsidiary IRIS Business Services LLC; home to customers such as Gap Inc. (IRIS CARBON).",
    certainty: "FACT",
    sources: ["xbrl-us-iris", "newswire-gap-carbon"],
    region: "North America",
    countries: ["United States"],
    tags: ["xbcrl", "esg"],
  },
  {
    id: "europe",
    name: "Europe",
    summary:
      "A digital-reporting market (ESEF/ESG) where IRIS's XBRL/iXBRL products are relevant; ESG strategy focus.",
    certainty: "INFERENCE",
    sources: ["esma-esef", "sustainability-magazine-esg"],
    region: "Europe",
    countries: ["United Kingdom", "European Union"],
    tags: ["esef", "esg", "xbrl"],
  },
];
