/**
 * The Beginner's Guide — a zero-knowledge orientation handbook.
 *
 * Written for someone with no prior background in banking, regulators,
 * compliance, RegTech, XBRL, ESG, SaaS or enterprise software. It explains the
 * industry from absolute basics, builds up the ecosystem and the reporting
 * loop, and lands on the real-world problems IRIS products solve.
 *
 * Every key term follows the fixed pattern: Term -> Simple meaning ->
 * Real-world example -> Why it matters. Acronyms are always expanded.
 */

export interface GuideTerm {
  term: string;
  simple: string;
  example: string;
  why: string;
}

export interface GuideTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface GuideStep {
  title: string;
  text: string;
}

export type GuideBlock =
  | { kind: "prose"; text: string }
  | { kind: "terms"; items: GuideTerm[] }
  | { kind: "table"; table: GuideTable }
  | { kind: "steps"; items: GuideStep[] }
  | { kind: "callout"; title: string; text: string };

export interface GuideSection {
  id: string;
  eyebrow: string;
  title: string;
  blocks: GuideBlock[];
}

export interface BeginnerGuide {
  title: string;
  lede: string;
  sections: GuideSection[];
  takeaways: string[];
  sixtySecond: string;
}

export const beginnerGuide: BeginnerGuide = {
  title: "The Beginner's Guide",
  lede:
    "Everything about RegTech, regulatory reporting, XBRL, the ecosystem and the problems IRIS solves — explained from absolute zero, with no assumed background. Read it top to bottom; each section builds on the last.",

  sections: [
    // =====================================================================
    // 1. The industry
    // =====================================================================
    {
      id: "what-is-this-industry",
      eyebrow: "Part 1 · Orientation",
      title: "What is this industry, and why does it exist?",
      blocks: [
        {
          kind: "prose",
          text:
            "There is a whole industry whose job is to help large organisations — banks, insurers, listed companies — obey the rules that governments set for them, especially the rules about **telling the government what they are doing**. That industry is called **RegTech**, short for *regulatory technology*.",
        },
        {
          kind: "prose",
          text:
            "To understand why it exists, start from one simple fact: a modern economy runs on trust.\n\n- When you put money in a bank, you trust the bank to keep it safe and give it back.\n- When a company asks investors for money, investors trust the company is telling the truth about its finances.\n- When a government taxes businesses, it trusts businesses to report their income honestly.",
        },
        {
          kind: "prose",
          text:
            "That trust sometimes breaks. Banks fail. Companies exaggerate their numbers. People hide income from the tax office. When that happens, ordinary people lose money and the whole economy can wobble. So governments create **regulators** — official bodies whose job is to watch these organisations and keep the system safe.",
        },
        {
          kind: "prose",
          text:
            "And how do regulators watch? Mostly by **requiring reports**: \"send us your numbers, in this exact format, by this date, so we can check you are healthy and honest.\" The demand for RegTech comes from this one fact: being watched means being asked for a lot of paperwork, and the paperwork keeps growing.",
        },
        {
          kind: "terms",
          items: [
            {
              term: "Regulator",
              simple:
                "A government body that sets rules for an industry and checks that firms follow them.",
              example:
                "A central bank that watches banks, a tax office that collects tax, a securities commission that watches the stock market.",
              why: "Regulators create the demand for reporting, which is what this whole industry serves.",
            },
            {
              term: "Regulated firm",
              simple: "A company that must follow a regulator's rules and send it reports.",
              example:
                "A bank, an insurance company, or a company whose shares trade on a stock exchange.",
              why: "These firms are the customers who need help meeting the rules.",
            },
            {
              term: "Compliance",
              simple: "The work of following the rules — and being able to prove you did.",
              example:
                "A bank checks that none of its customers are money-laundering, and files its reports on time.",
              why: "Compliance is a big cost and a legal necessity, which is exactly why firms buy software for it.",
            },
            {
              term: "Reporting",
              simple:
                "Sending your numbers and facts to a regulator in the exact format and schedule it wants.",
              example: "A bank sends its central bank a monthly report on how much cash it holds.",
              why: "Reporting is the central job that this industry automates.",
            },
          ],
        },
        {
          kind: "callout",
          title: "The whole thing in one line",
          text:
            "Regulators exist to keep the financial system safe, and they do it mainly by requiring organisations to report data. RegTech is the industry that makes that reporting cheaper, faster and more reliable with software.",
        },
      ],
    },

    // =====================================================================
    // 2. The problem
    // =====================================================================
    {
      id: "the-problem",
      eyebrow: "Part 2 · The problem",
      title: "The problem RegTech solves",
      blocks: [
        {
          kind: "prose",
          text:
            "After the 2008 global financial crisis, governments decided banks and financial firms needed much closer watching. In the years that followed, the number of rules grew sharply — rules about how much cash a bank must hold, how much it can lend, how it treats customers, how it detects financial crime, and later, rules about climate and social impact.",
        },
        {
          kind: "prose",
          text:
            "Each new rule means more reporting. A large bank might file **hundreds of different reports a year** to several different regulators, each with its own format and its own deadline.",
        },
        {
          kind: "prose",
          text:
            "Here is how a company did this work **before software** — the world this guide keeps referring back to:",
        },
        {
          kind: "steps",
          items: [
            {
              title: "Collect",
              text: "Someone in finance gathers numbers from many different internal systems and spreadsheets.",
            },
            {
              title: "Copy",
              text: "They copy and paste those numbers into a template, by hand.",
            },
            {
              title: "Check",
              text: "They check the numbers line by line, because one mistake means the whole report is rejected.",
            },
            {
              title: "Convert",
              text: "They turn the finished spreadsheet into whatever file format the regulator demands.",
            },
            {
              title: "Submit",
              text: "They file it before the deadline and hope nothing was missed.",
            },
            {
              title: "Repeat",
              text: "When the rules change — and they change every year — they redo all of it.",
            },
          ],
        },
        {
          kind: "prose",
          text:
            "This is slow, expensive, error-prone and never-ending. Worse, the consequences of getting it wrong are serious (see Part 9). That is the problem RegTech exists to solve: turn this manual slog into software that does it **automatically, correctly and repeatably**.",
        },
        {
          kind: "table",
          table: {
            caption: "Reporting before software vs. with RegTech software",
            headers: ["Task", "Before software", "With RegTech software"],
            rows: [
              ["Collect data", "Copy-paste from many spreadsheets", "Pulled automatically from company systems"],
              ["Check for errors", "Human eyes, line by line", "Built-in validation rules catch mistakes instantly"],
              ["Format the file", "Build the required format by hand", "Software generates the structured format automatically"],
              ["Rule changes", "Redo everything by hand", "Update the mapping once and reuse it"],
              ["Prove compliance", "Printouts and manual records", "An automatic, auditable trail"],
            ],
          },
        },
      ],
    },

    // =====================================================================
    // 3. The ecosystem
    // =====================================================================
    {
      id: "the-ecosystem",
      eyebrow: "Part 3 · Who is involved",
      title: "The ecosystem: who is who",
      blocks: [
        {
          kind: "prose",
          text:
            "Five groups of people and organisations make up this world. It helps to see them clearly before going deeper.",
        },
        {
          kind: "table",
          table: {
            caption: "The five groups in the RegTech ecosystem",
            headers: ["Group", "Who they are", "What they want"],
            rows: [
              [
                "Regulators & supervisors",
                "Central banks, securities regulators, tax authorities, business registries, stock exchanges",
                "Clean, comparable data, on time, so they can spot risk early",
              ],
              [
                "Standard-setters",
                "Bodies like XBRL International, the IFRS Foundation, ESMA, the BIS, the IMF",
                "A shared \"language\" so everyone reports in a consistent way",
              ],
              [
                "Regulated firms",
                "Banks, insurers, listed companies, large corporates",
                "Meet the rules at the lowest cost and lowest risk",
              ],
              [
                "RegTech / SupTech vendors",
                "Software companies such as IRIS, Workiva, Regnology, CoreFiling",
                "Build the tools that make reporting and supervision possible",
              ],
              [
                "Investors & the public",
                "Shareholders, lenders, analysts, citizens",
                "Trustworthy information so they can make decisions",
              ],
            ],
          },
        },
        {
          kind: "prose",
          text:
            "Notice the two sides of the table: **firms report** and **regulators receive**. That split gives this industry two mirror-image words:\n\n- **RegTech** — technology that helps *firms* meet their obligations (reporting, monitoring, risk).\n- **SupTech** — technology that helps *regulators* collect, validate and analyse the data they receive.",
        },
        {
          kind: "callout",
          title: "A simple rule to remember",
          text:
            "Firms use RegTech. Regulators use SupTech. IRIS is unusual because it sells to **both** sides.",
        },
        {
          kind: "prose",
          text: "The whole ecosystem runs on one repeating loop:",
        },
        {
          kind: "steps",
          items: [
            { title: "Rule", text: "A regulator writes a rule." },
            { title: "Requirement", text: "The rule becomes a reporting requirement: what data, in what format, by what deadline." },
            { title: "Taxonomy", text: "The requirement is published as a taxonomy — a machine-readable dictionary of what must be reported." },
            { title: "Gather", text: "A firm gathers its own internal data." },
            { title: "Transform", text: "The firm maps (transforms) its data onto the taxonomy." },
            { title: "Validate", text: "The firm checks the data for errors before sending." },
            { title: "Submit", text: "The firm submits the structured report." },
            { title: "Collect & analyse", text: "The regulator collects, validates and analyses it." },
            { title: "Supervise", text: "The regulator acts on what it finds — and may write new rules. The loop repeats." },
          ],
        },
      ],
    },

    // =====================================================================
    // 4. The four -tech words
    // =====================================================================
    {
      id: "the-tech-words",
      eyebrow: "Part 4 · The vocabulary",
      title: "RegTech, SupTech, TaxTech, DataTech",
      blocks: [
        {
          kind: "prose",
          text:
            "This industry likes to name its corners by adding \"-tech\" (short for *technology*). Four of them come up constantly, and it is worth fixing each one clearly in your head.",
        },
        {
          kind: "terms",
          items: [
            {
              term: "RegTech (regulatory technology)",
              simple: "Technology that helps regulated firms meet their compliance and reporting obligations.",
              example:
                "Software that lets a bank build and submit its required reports to the central bank automatically.",
              why: "This is the firm-side demand: a large, non-negotiable cost that firms want to make cheaper and safer.",
            },
            {
              term: "SupTech (supervisory technology)",
              simple: "Technology used by regulators themselves to collect, validate and analyse data.",
              example:
                "A portal where every bank uploads its returns, which the system checks and flags for anomalies automatically.",
              why: "It is the mirror image of RegTech: regulators face the same volume problem from the other side.",
            },
            {
              term: "TaxTech (tax technology)",
              simple: "Technology applied to tax — filing, calculation, reconciliation and e-invoicing.",
              example:
                "Software that files a company's Goods and Services Tax (GST) return and issues electronic invoices.",
              why: "Tax is one of the most universal compliance burdens, so it became its own product category.",
            },
            {
              term: "DataTech (data technology)",
              simple: "Technology that turns structured data into insight — analytics, models and tools.",
              example:
                "A tool that lets an analyst compare the XBRL filings of thousands of companies in a spreadsheet.",
              why: "Once reporting data is structured, analysing it is where it becomes valuable.",
            },
          ],
        },
        {
          kind: "callout",
          title: "Where IRIS sits",
          text:
            "IRIS RegTech Solutions Limited operates across **SupTech, RegTech, TaxTech and DataTech** — though it sold its TaxTech business in 2025 to focus on the other three. This breadth across all four corners is one of the things that makes IRIS unusual.",
        },
      ],
    },

    // =====================================================================
    // 5. The data standards
    // =====================================================================
    {
      id: "the-data-standards",
      eyebrow: "Part 5 · The grammar",
      title: "The data standards: XBRL, iXBRL and SDMX",
      blocks: [
        {
          kind: "prose",
          text:
            "A report is only useful to a regulator if a computer can read it and compare it with thousands of others. A PDF does not allow that — a computer cannot reliably tell which number is \"revenue\" and which is \"cost\". So this industry built shared **standards** that give every number a machine-readable label.",
        },
        {
          kind: "prose",
          text:
            "The easiest way to think about it is the **barcode**. A barcode lets a scanner instantly know exactly what a product is, no matter the shop. These standards do the same for numbers in a report.",
        },
        {
          kind: "terms",
          items: [
            {
              term: "XBRL (eXtensible Business Reporting Language)",
              simple: "The open global standard that makes business reports computer-readable by tagging each number with its meaning.",
              example:
                "A company tags its revenue with the \"Revenue\" concept, so software can pull revenue for ten thousand companies and compare them instantly.",
              why: "It is the foundation of digital reporting, used in roughly 65 countries.",
            },
            {
              term: "iXBRL (Inline XBRL)",
              simple: "XBRL tags embedded inside a normal, human-readable document, so one file is both readable and machine-readable.",
              example:
                "An annual report that still looks like a designed document to a person, but carries invisible tags a computer can read.",
              why: "It is the dominant filing format for company reports in the US, UK, Japan and the European Union.",
            },
            {
              term: "SDMX (Statistical Data and Metadata eXchange)",
              simple: "The standard for exchanging aggregate statistical data between official organisations.",
              example:
                "A national statistics office publishes inflation data in SDMX; a central bank and the IMF read it directly into their systems.",
              why: "A useful rule of thumb: XBRL is for individual company reports, SDMX is for aggregate statistics.",
            },
            {
              term: "Taxonomy",
              simple: "A regulator's machine-readable dictionary of what must be reported and what each item is called.",
              example:
                "The European regulator ESMA publishes the ESEF taxonomy, so every EU-listed company tags the same items the same way.",
              why: "The taxonomy is the exact specification a firm must map its data onto — often the hardest part of reporting.",
            },
          ],
        },
        {
          kind: "callout",
          title: "Why these standards matter to you",
          text:
            "They are the \"grammar\" of this whole domain. RegTech products mostly exist to help firms turn their own messy data into these structured, correctly-labelled formats — and to help regulators collect them.",
        },
      ],
    },

    // =====================================================================
    // 6. The key concepts
    // =====================================================================
    {
      id: "the-key-concepts",
      eyebrow: "Part 6 · The concepts",
      title: "The key concepts, in plain language",
      blocks: [
        {
          kind: "prose",
          text:
            "These are the ideas that keep coming up. Each follows the same pattern: what it means, a concrete example, and why it matters.",
        },
        {
          kind: "terms",
          items: [
            {
              term: "Data transformation",
              simple: "Converting a firm's own data into the exact structure and labels the regulator requires.",
              example:
                "Mapping a bank's internal loan codes onto the regulator's asset-class codes before filing.",
              why: "Internal systems almost never match regulatory definitions, so translation is unavoidable — and it is the biggest cost and risk in reporting.",
            },
            {
              term: "Data validation",
              simple: "Checking that submitted data is complete, correct and in the right format.",
              example:
                "A filing is rejected because total assets do not equal liabilities plus equity.",
              why: "Catching errors before submission avoids rejection, resubmission and regulatory scrutiny.",
            },
            {
              term: "Data lineage",
              simple: "The recorded history of where each number came from and how it was transformed.",
              example:
                "A bank can trace a reported capital figure back to its source system and the formulas that produced it.",
              why: "Regulators increasingly require firms to prove their numbers are traceable and trustworthy.",
            },
            {
              term: "Disclosure management",
              simple: "Preparing, managing and publishing required reports in the correct formats.",
              example:
                "A company authors its annual report once and outputs it as iXBRL for the regulator and PDF for investors.",
              why: "Disclosure obligations are numerous and format-specific, so a managed process is essential.",
            },
            {
              term: "Digital reporting",
              simple: "Filing reports as structured, machine-readable data instead of paper or PDF.",
              example:
                "The EU requires listed companies to file annual reports as Inline XBRL, not PDF.",
              why: "It turns reporting from a document exercise into a data pipeline that can be validated and analysed at scale.",
            },
            {
              term: "Regulatory intelligence",
              simple: "Tracking what rules exist, how they change, and how they apply to you.",
              example:
                "A compliance team tracks a new sustainability directive and maps which reports it affects.",
              why: "Rules change constantly and across countries; missing a change can be costly.",
            },
            {
              term: "Compliance automation",
              simple: "Using software to do compliance work automatically instead of manually.",
              example: "Automatic screening of transactions for money laundering, or auto-generating a regulatory return.",
              why: "Manual compliance does not scale; automation provides consistency and an auditable trail.",
            },
            {
              term: "Regulatory change management",
              simple: "The governed process of adapting a company to new or changed rules.",
              example: "A bank runs a project to implement a new capital rule across systems, models and reports by the deadline.",
              why: "Regulatory change is constant and non-negotiable; a structured process reduces cost and the chance of missing deadlines.",
            },
            {
              term: "ESG (Environmental, Social, Governance)",
              simple: "Non-financial factors — climate, social and governance performance — that are increasingly reported in a standardised form.",
              example:
                "An EU company tags its emissions and workforce metrics in Inline XBRL alongside its financial statements.",
              why: "Sustainability reporting is moving from voluntary to mandatory, creating a fast-growing new compliance burden.",
            },
          ],
        },
      ],
    },

    // =====================================================================
    // 7. Corporate functions
    // =====================================================================
    {
      id: "who-does-this-work",
      eyebrow: "Part 7 · Inside a company",
      title: "Who inside a company does this work?",
      blocks: [
        {
          kind: "prose",
          text:
            "Regulatory reporting is not one person's job. Inside a large company, several different teams are involved — and understanding them helps you see who actually buys and uses RegTech software.",
        },
        {
          kind: "table",
          table: {
            caption: "Corporate functions involved in reporting",
            headers: ["Function", "What they do here"],
            rows: [
              ["Chief Financial Officer (CFO) & finance / controllership", "Own the financial numbers; responsible for the accuracy of what gets reported"],
              ["Compliance team", "Track the rules, make sure the company follows them, and prepare compliance evidence"],
              ["Risk team", "Measure and report the risks the company carries (especially in banks and insurers)"],
              ["Information Technology (IT) team", "Run the systems that hold the data and connect to reporting software"],
              ["Legal team", "Interpret new laws and advise what the company must do"],
              ["Investor relations", "Handle public disclosure to shareholders and the market"],
              ["Sustainability / ESG team", "Collect and report climate and social-impact data (a newer, fast-growing role)"],
            ],
          },
        },
        {
          kind: "prose",
          text:
            "The key point: for a large firm, reporting sits at the crossing of **finance, compliance, risk and IT**. That is why the software has to work for several different teams at once — and why the people who buy it range from finance directors to compliance officers to data teams.",
        },
      ],
    },

    // =====================================================================
    // 8. Customers
    // =====================================================================
    {
      id: "who-buys",
      eyebrow: "Part 8 · The customers",
      title: "Who buys RegTech software?",
      blocks: [
        {
          kind: "prose",
          text:
            "Two very different kinds of customer buy this software, and it is worth keeping them separate:",
        },
        {
          kind: "table",
          table: {
            caption: "The two customer sides",
            headers: ["Buyer", "What they buy", "Example"],
            rows: [
              [
                "Regulators",
                "Collection and analytics platforms (SupTech) to receive and analyse data from many firms",
                "A central bank that runs a portal where all banks submit their returns",
              ],
              [
                "Regulated firms",
                "Reporting and disclosure software (RegTech) to produce compliant reports",
                "A listed company that tags its annual report in iXBRL, or a bank that files supervisory returns",
              ],
            ],
          },
        },
        {
          kind: "prose",
          text:
            "Each side has a different problem. Regulators need to **collect and make sense of data at scale**. Firms need to **produce correct data at low cost**. A vendor that serves both — as IRIS does — sees the whole reporting relationship from both ends.",
        },
        {
          kind: "callout",
          title: "A concrete customer list (IRIS examples)",
          text:
            "On the regulator side: the Qatar Tax Authority, the South African Reserve Bank, and Indian regulators RBI, SEBI, MCA, NSE and BSE. On the firm side: Gap Inc. (sustainability reporting) and MUFG Bank (regulatory reporting). Repeat business from regulators is the strongest signal that the software works.",
        },
      ],
    },

    // =====================================================================
    // 9. Non-compliance
    // =====================================================================
    {
      id: "non-compliance",
      eyebrow: "Part 9 · The stakes",
      title: "What happens if you do not comply?",
      blocks: [
        {
          kind: "prose",
          text:
            "Compliance is not optional. The consequences of getting reporting wrong range from annoying to existential. This is why firms spend so much on getting it right — and why they are willing to pay for software that removes the risk.",
        },
        {
          kind: "prose",
          text: "The consequences, roughly in order of severity:",
        },
        {
          kind: "steps",
          items: [
            { title: "Rejection and rework", text: "A filing that fails validation is rejected; the firm must fix and resubmit, wasting time and effort." },
            { title: "Financial penalties", text: "Regulators can fine firms for late, inaccurate or missing reports." },
            { title: "Supervisory scrutiny", text: "Errors attract attention: examiners dig deeper, and the firm is watched more closely." },
            { title: "Reputational damage", text: "For public companies, restated or wrong numbers erode investor trust and can hit the share price." },
            { title: "Loss of licence", text: "In the worst cases, a regulator can restrict a firm's activities or revoke its licence to operate." },
          ],
        },
        {
          kind: "callout",
          title: "Why this matters for the business case",
          text:
            "Because compliance is mandated and the downside is severe, spending on it is largely **non-discretionary** — firms buy it even in a downturn. That stability is part of why RegTech is an attractive business to be in.",
        },
      ],
    },

    // =====================================================================
    // 10. Technology evolution
    // =====================================================================
    {
      id: "technology-evolution",
      eyebrow: "Part 10 · The history",
      title: "How the technology evolved",
      blocks: [
        {
          kind: "prose",
          text:
            "Reporting did not jump from paper to AI overnight. It moved through stages, and each stage explains why the current products look the way they do.",
        },
        {
          kind: "steps",
          items: [
            { title: "Paper", text: "Reports were printed and physically delivered. Slow, impossible to analyse at scale." },
            { title: "PDF and documents", text: "Reports became digital files — but a PDF is a picture of a page, so a computer still cannot read the numbers reliably." },
            { title: "Spreadsheets", text: "Companies tracked and reported using Excel. Better, but error-prone, manual, and hard to standardise across thousands of firms." },
            { title: "Structured data (XBRL / iXBRL)", text: "Reports became data with machine-readable labels, enabling automated validation and comparison. This is the current foundation." },
            { title: "SaaS and cloud", text: "Reporting software moved to the internet as a subscription service, so firms no longer install and maintain it themselves." },
            { title: "AI and analytics", text: "The next layer: using machine learning to spot anomalies, interpret rules and draft reports on top of structured data." },
          ],
        },
        {
          kind: "terms",
          items: [
            {
              term: "SaaS (Software as a Service)",
              simple: "Software you subscribe to and use over the internet, hosted by the vendor, rather than installing and running yourself.",
              example: "A disclosure platform where a finance team works in Word/Excel and the vendor hosts the tagging and filing engine in the cloud.",
              why: "SaaS is the dominant business model in RegTech: predictable subscription revenue for vendors, and no maintenance burden for customers.",
            },
            {
              term: "Enterprise software",
              simple: "Software sold to large organisations to run a core business process, usually with security, permission and audit requirements.",
              example: "A reporting platform used across a bank's finance, compliance and IT teams.",
              why: "RegTech products are enterprise software: they are bought by companies, not consumers, and must be reliable, secure and auditable.",
            },
          ],
        },
      ],
    },

    // =====================================================================
    // 11. The business problems IRIS solves
    // =====================================================================
    {
      id: "the-problems-iris-solves",
      eyebrow: "Part 11 · IRIS in one view",
      title: "The business problems IRIS products solve",
      blocks: [
        {
          kind: "prose",
          text:
            "IRIS RegTech Solutions Limited is an India-listed software company (NSE:IRIS / BSE:540735) founded in 2000, and a deep specialist in the structured-data standards this guide has described — XBRL, iXBRL and SDMX. Its products map directly onto the reporting loop.",
        },
        {
          kind: "table",
          table: {
            caption: "IRIS products mapped to the reporting loop",
            headers: ["Product", "Side", "Problem it solves"],
            rows: [
              ["IRIS CARBON", "Firm (RegTech)", "Author and publish financial, iXBRL and ESG disclosures in the right format"],
              ["IRIS iDEAL", "Firm (RegTech)", "Produce supervisory reports for banks and investment firms automatically"],
              ["IRIS iFILE", "Regulator (SupTech)", "Collect, validate and analyse data from supervised entities"],
              ["IRIS iConnect", "Both (DataTech)", "Analyse XBRL data directly in Excel"],
              ["IRIS Credixo", "Firm (DataTech)", "Build credit-analysis models"],
            ],
          },
        },
        {
          kind: "prose",
          text:
            "Notice the pattern: **CARBON and iDEAL** create structured filings (the firm side), **iFILE** collects and validates them (the regulator side), and **iConnect** analyses the resulting data. One vendor covering both ends of the loop is the structural signature of IRIS. See the [Products](/products) section for the full portfolio and each product's deep dive.",
        },
      ],
    },

    // =====================================================================
    // 12. Beginner glossary
    // =====================================================================
    {
      id: "beginner-glossary",
      eyebrow: "Part 12 · Quick reference",
      title: "A beginner's glossary",
      blocks: [
        {
          kind: "prose",
          text: "A compact reference of the terms from this guide, in one place.",
        },
        {
          kind: "table",
          table: {
            caption: "Beginner glossary",
            headers: ["Term", "Meaning"],
            rows: [
              ["RegTech", "Regulatory technology — software that helps firms comply and report"],
              ["SupTech", "Supervisory technology — software that helps regulators collect and analyse data"],
              ["TaxTech", "Tax technology — software for tax filing and e-invoicing"],
              ["DataTech", "Data technology — analytics and tools built on structured data"],
              ["Regulator", "A government body that sets and enforces rules for an industry"],
              ["Compliance", "Following the rules and being able to prove it"],
              ["Reporting", "Submitting required data to a regulator in a set format and schedule"],
              ["XBRL", "eXtensible Business Reporting Language — makes reports machine-readable"],
              ["iXBRL", "Inline XBRL — XBRL tags inside a human-readable document"],
              ["SDMX", "Statistical Data and Metadata eXchange — standard for aggregate statistics"],
              ["Taxonomy", "A regulator's machine-readable dictionary of what must be reported"],
              ["Data transformation", "Mapping a firm's data onto the regulator's structure"],
              ["Data validation", "Checking data is complete, correct and in the right format"],
              ["Data lineage", "The recorded history of where each number came from"],
              ["Digital reporting", "Filing reports as structured data instead of paper or PDF"],
              ["SaaS", "Software as a Service — subscription software hosted by the vendor"],
              ["Enterprise software", "Software sold to large organisations to run a core process"],
              ["ESG", "Environmental, Social, Governance — non-financial reporting factors"],
            ],
          },
        },
      ],
    },
  ],

  // =====================================================================
  // Summary
  // =====================================================================
  takeaways: [
    "Regulators exist to keep the financial system safe, and they do it mainly by requiring organisations to report data.",
    "After the 2008 crisis, regulation grew sharply, making reporting a large, permanent, error-prone burden.",
    "RegTech is the industry that turns that burden into software — cheaper, faster and more reliable.",
    "The ecosystem has two sides: firms report (RegTech), and regulators receive (SupTech).",
    "Structured-data standards — XBRL, iXBRL, SDMX — are the shared \"grammar\" that makes reports machine-readable and comparable.",
    "A taxonomy is a regulator's machine-readable dictionary; mapping data onto it is the hardest part of reporting.",
    "The reporting loop runs: rule → requirement → taxonomy → data → transform → validate → submit → collect → supervise.",
    "Compliance is non-discretionary spend with severe downsides for failure, which makes the demand stable.",
    "Reporting sits across finance, compliance, risk and IT — so the software must serve several teams at once.",
    "IRIS is a specialist that serves both sides: CARBON and iDEAL help firms report, iFILE helps regulators collect, and iConnect analyses the result.",
  ],

  sixtySecond:
    "Regulators exist to keep the financial system safe, and they do it mainly by requiring organisations to report data. After 2008 those rules multiplied, so reporting became a huge, expensive, error-prone manual burden. RegTech is the industry that turns that burden into software: firms use RegTech to produce reports correctly and automatically, while regulators use SupTech to collect and analyse them. The shared grammar is structured-data standards — XBRL and iXBRL for business reports, SDMX for statistics — which let computers read and compare reports at scale. IRIS is one such vendor, unusual for serving both sides: CARBON and iDEAL help firms report, iFILE helps regulators collect, and iConnect analyses the result. The whole loop — rule, taxonomy, data, transform, validate, submit, supervise — is the map this entire system is built around.",
};
