import { knowledgeBase, masteryPath } from "@/data/index";
import type { QuickQuestion } from "@/components/QuickCheck";

/**
 * Curated micro-knowledge checks for each mastery level.
 * Falls back to matching quiz questions or section-derived questions.
 */
export const MODULE_QUICK_CHECKS: Record<string, QuickQuestion[]> = {
  "regtech-from-zero": [
    {
      id: "qc-l1-1",
      prompt: "What is the core distinction between RegTech and SupTech?",
      options: [
        "RegTech is for banks; SupTech is for tax authorities only",
        "RegTech is used by regulated firms to comply; SupTech is used by supervisors to monitor",
        "RegTech is manual; SupTech is fully automated",
        "They are two brand names for the exact same software",
      ],
      correctIndex: 1,
      explanation:
        "RegTech is compliance technology for firms, while SupTech (Supervisory Technology) is used by regulators to collect, validate, and analyse supervisory data.",
      entityRefs: ["concept:regtech", "concept:suptech"],
    },
    {
      id: "qc-l1-2",
      prompt: "What is Inline XBRL (iXBRL)?",
      options: [
        "A private database format used only in the US",
        "Machine-readable tags embedded directly inside human-readable HTML",
        "An encrypted protocol for inter-bank wire transfers",
        "A PDF-only file compression format",
      ],
      correctIndex: 1,
      explanation:
        "iXBRL embeds structured XML tags inside XHTML documents, making the report simultaneously human-readable in any browser and machine-readable by automated data parsers.",
      entityRefs: ["concept:ixbrl"],
    },
  ],
  "level-2-regulatory-reporting": [
    {
      id: "qc-l2-1",
      prompt: "Where does the highest operational cost and compliance risk concentrate in the reporting lifecycle?",
      options: [
        "Drafting the legal rule by the regulator",
        "Internal data gathering, transformation, and validation (stages 4–6)",
        "The email receipt sent by the supervisor",
        "Browsing the regulator's public website",
      ],
      correctIndex: 1,
      explanation:
        "Stages 4–6 (gathering source data, transforming it to match the taxonomy, and running mathematical/cross-table validation rules) are where data quality breaks and compliance costs soar.",
      entityRefs: ["concept:regulatory-reporting"],
    },
  ],
  "level-3-data-standards": [
    {
      id: "qc-l3-1",
      prompt: "What is the primary function of a Regulatory Taxonomy in XBRL?",
      options: [
        "To charge subscription fees to reporting entities",
        "To provide a machine-readable dictionary of concepts, relationships, and validation rules",
        "To store physical paper files in archival vaults",
        "To act as an operating system kernel",
      ],
      correctIndex: 1,
      explanation:
        "A taxonomy acts as the official dictionary defining the exact reporting schema, accounting concept IDs, calculation formulas, and validation rules.",
      entityRefs: ["concept:regulatory-taxonomies", "concept:xbrl"],
    },
  ],
  "level-4-iris-company": [
    {
      id: "qc-l4-1",
      prompt: "Which of the following describes IRIS's unique positioning across the reporting landscape?",
      options: [
        "It only sells tax software to retail consumers",
        "It provides solutions to both regulators (SupTech) and reporting enterprises (RegTech)",
        "It is strictly a hardware networking vendor",
        "It only operates in a single country",
      ],
      correctIndex: 1,
      explanation:
        "IRIS is uniquely positioned with platforms on both sides of the table: collecting and supervising data for regulators (IRIS iDEAS) and generating compliant filings for enterprises (IRIS CARBON).",
      entityRefs: ["company:iris", "product:iris-ideas", "product:iris-carbon"],
    },
  ],
  "level-5-iris-products": [
    {
      id: "qc-l5-1",
      prompt: "What is the primary role of IRIS CARBON®?",
      options: [
        "Calculating company vehicle carbon emissions",
        "Cloud-based collaborative authoring, review, and iXBRL tagging for regulatory filings (e.g. ESEF, SEC)",
        "Database hosting for central banks only",
        "Consumer mobile payment processing",
      ],
      correctIndex: 1,
      explanation:
        "IRIS CARBON® is a premier collaborative SaaS platform for disclosure management, financial statement authoring, and automated iXBRL tagging.",
      entityRefs: ["product:iris-carbon"],
    },
  ],
};

/**
 * Returns micro-check questions for a given module ID.
 * Generates dynamic questions if not explicitly defined above.
 */
export function getQuickCheckForModule(moduleId: string): QuickQuestion[] {
  if (MODULE_QUICK_CHECKS[moduleId]) {
    return MODULE_QUICK_CHECKS[moduleId];
  }

  // Check matching quizzes in knowledgeBase
  const matchingQuiz = knowledgeBase.quizzes.find(
    (q) => q.id.includes(moduleId) || moduleId.includes(q.id)
  );
  if (matchingQuiz && matchingQuiz.questions.length > 0) {
    return matchingQuiz.questions.slice(0, 2).map((q) => ({
      id: q.id,
      prompt: q.prompt,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      entityRefs: q.entityRefs,
    }));
  }

  // Fallback to module's first section
  const mod = knowledgeBase.learningModules.find((m) => m.id === moduleId);
  if (mod && mod.sections.length > 0) {
    const s = mod.sections[0];
    return [
      {
        id: `qc-${mod.id}-auto`,
        prompt: `Core takeaway regarding ${s.heading}:`,
        options: [
          s.body.split(". ")[0] + ".",
          "This standard is solely optional and rarely enforced.",
          "It applies only to manual paper submissions.",
          "None of the above.",
        ],
        correctIndex: 0,
        explanation: `${s.heading}: ${s.body.split(". ")[0]}.`,
        entityRefs: mod.entityRefs.slice(0, 3),
      },
    ];
  }

  return [];
}

/**
 * Fast-track definitions for time-conscious learners.
 */
export interface FastTrack {
  id: string;
  title: string;
  badge: string;
  duration: string;
  description: string;
  targetAudience: string;
  moduleIds: string[];
}

export const FAST_TRACKS: FastTrack[] = [
  {
    id: "executive",
    title: "15-Minute Executive Briefing",
    badge: "⚡ FAST TRACK",
    duration: "15 mins",
    description: "Get up to speed immediately on RegTech fundamentals, IRIS positioning, and core product capabilities.",
    targetAudience: "Leaders, Investors & New Team Members",
    moduleIds: ["snapshot-5-minute-iris", "snapshot-15-minute-iris", "regtech-from-zero"],
  },
  {
    id: "commercial",
    title: "1-Hour Analyst & Commercial Kit",
    badge: "📊 COMMERCIAL TRACK",
    duration: "45-60 mins",
    description: "Deep dive into IRIS products (CARBON, iDEAS, GST), competitors (Workiva, Wolters Kluwer), and regulatory mandates.",
    targetAudience: "Product Managers, Sales & Market Analysts",
    moduleIds: [
      "regtech-from-zero",
      "level-4-iris-company",
      "level-5-iris-products",
      "level-7-competitors",
      "level-9-strategy",
    ],
  },
  {
    id: "mastery",
    title: "Full 10-Level Domain Mastery",
    badge: "🏆 COMPREHENSIVE",
    duration: "3-4 hours",
    description: "The complete curriculum from foundational RegTech concepts through structured data standards, products, and advanced strategy.",
    targetAudience: "Domain Specialists & Compliance Experts",
    moduleIds: masteryPath.levels.map((l) => l.moduleId),
  },
];
