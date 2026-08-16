import { Link } from "react-router-dom";
import {
  companiesByType,
  knowledgeBase,
  whyIrisExists,
  irisPerspectives,
  competitorProfiles,
  COMPETITION_TIER_LABEL,
} from "@/data/index";
import type { Product } from "@/data/types";
import Markdown from "@/components/Markdown";
import CertaintyTag from "@/components/CertaintyTag";
import SourceList from "@/components/SourceList";
import LifecycleTag from "@/components/LifecycleTag";
import EntityCard from "@/components/EntityCard";
import Timeline from "@/components/Timeline";
import FlowChain from "@/components/FlowChain";

const SEGMENTS: {
  key: string;
  mark: string;
  title: string;
  blurb: string;
  productIds: string[];
  divested?: boolean;
}[] = [
  {
    key: "SupTech",
    mark: "S",
    title: "SupTech",
    blurb:
      "Technology for regulators to collect, validate and analyse data from the entities they oversee — led by IRIS iFILE.",
    productIds: ["iris-ifile"],
  },
  {
    key: "RegTech",
    mark: "R",
    title: "RegTech",
    blurb:
      "Compliance and reporting technology for regulated firms — disclosure (CARBON) and supervisory reporting (iDEAL).",
    productIds: ["iris-carbon", "iris-ideal"],
  },
  {
    key: "DataTech",
    mark: "D",
    title: "DataTech",
    blurb:
      "XBRL analytics, credit analytics and MSME data tools — iConnect, Credixo and the IRIS MSME platform.",
    productIds: ["iris-iconnect", "iris-credixo", "iris-msme"],
  },
  {
    key: "TaxTech",
    mark: "T",
    title: "TaxTech",
    blurb:
      "GST, e-invoicing, e-way bill and tax-litigation technology. Divested to Sovos in August 2025 (~₹151 Cr).",
    productIds: ["iris-gst", "iris-irp", "iris-einvoicing", "iris-zircon", "iris-lms", "iris-peridot"],
    divested: true,
  },
];

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-tile">
      <div className="stat-tile-value">{value}</div>
      <div className="stat-tile-label">{label}</div>
    </div>
  );
}

function Narrative({
  num,
  title,
  lead,
  children,
}: {
  num: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="narrative">
      <div className="narrative-head">
        <span className="narrative-num">{num}</span>
        <h2 className="narrative-title">{title}</h2>
      </div>
      {lead && <p className="narrative-lead">{lead}</p>}
      {children}
    </section>
  );
}

function productById(id: string): Product | undefined {
  return knowledgeBase.products.find((p) => p.id === id);
}

export default function Iris() {
  const iris = companiesByType("IRIS")[0];
  if (!iris) return <div className="page"><p className="muted">No company data.</p></div>;

  const details = iris.details ?? {};
  const currentProducts = knowledgeBase.products.filter(
    (p) => p.companyId === iris.id && p.lifecycle !== "DIVESTED"
  );
  const divestedProducts = knowledgeBase.products.filter(
    (p) => p.companyId === iris.id && p.lifecycle === "DIVESTED"
  );
  const irisPaths = knowledgeBase.learningModules
    .filter((m) => m.id.startsWith("iris-"))
    .sort((a, b) => a.order - b.order);

  const direct = competitorProfiles.filter((p) => p.tier === "DIRECT");
  const adjacent = competitorProfiles.filter((p) => p.tier === "ADJACENT");
  const landscape = [...direct, ...adjacent];

  const namedCustomers = knowledgeBase.companies.filter((c) => c.companyType === "CUSTOMER");

  return (
    <div className="page">
      {/* --- Hero --------------------------------------------------------- */}
      <header className="page-hero">
        <span className="eyebrow">Company profile</span>
        <h1 className="page-hero-title">IRIS RegTech Solutions Limited</h1>
        <p className="page-hero-lede">{iris.summary}</p>
        <div className="page-hero-meta">
          <CertaintyTag certainty={iris.certainty} />
          <span>{iris.aliases?.slice(1).join(" · ")}</span>
        </div>
        <div className="stat-strip">
          <StatTile value="2000" label="Founded" />
          <StatTile value="52+" label="Countries" />
          <StatTile value="487" label="Employees" />
          <StatTile value="30+" label="Regulators (iFILE)" />
          <StatTile value="₹128 Cr" label="FY26 revenue" />
          <StatTile value="4" label="Segments" />
        </div>
      </header>

      {/* --- 01 Who IRIS is ------------------------------------------------ */}
      <Narrative
        num="01"
        title="Who IRIS is"
        lead="An India-listed software company that turns regulatory and supervisory data flows into products."
      >
        {iris.description && (
          <div className="prose-panel">
            <Markdown text={iris.description} />
          </div>
        )}
        <dl className="fact-list">
          <div className="fact-item"><dt>Founded</dt><dd>{iris.founded ?? "—"}</dd></div>
          <div className="fact-item"><dt>Headquarters</dt><dd>{iris.headquarters ?? "—"}</dd></div>
          <div className="fact-item"><dt>Ticker</dt><dd>{iris.ticker ?? "—"} · {iris.exchange ?? ""}</dd></div>
          <div className="fact-item"><dt>Employees</dt><dd>{iris.employees ?? "—"}</dd></div>
          <div className="fact-item"><dt>Website</dt><dd>{iris.website ? <a href={iris.website} target="_blank" rel="noreferrer">irisregtech.com ↗</a> : "—"}</dd></div>
        </dl>
        {iris.tags && iris.tags.length > 0 && (
          <div className="tag-row">
            {iris.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}
      </Narrative>

      {/* --- 02 Why IRIS exists ------------------------------------------- */}
      <Narrative
        num="02"
        title="Why IRIS exists"
        lead="The causal chain from an industry-wide problem to a durable software business."
      >
        <FlowChain steps={whyIrisExists} />
      </Narrative>

      {/* --- 03 What IRIS does --------------------------------------------- */}
      <Narrative
        num="03"
        title="What IRIS does"
        lead="Four operating segments spanning both sides of the market — regulator and regulated firm."
      >
        <div className="grid-2">
          {SEGMENTS.map((s) => (
            <div key={s.key} className={`segment-card${s.divested ? " is-divested" : ""}`}>
              <div className="segment-head">
                <div className="segment-mark">{s.mark}</div>
                {s.divested && <span className="tag">Divested 2025</span>}
              </div>
              <h3>{s.title}</h3>
              <p>{s.blurb}</p>
              <div className="segment-products">
                {s.productIds.map((pid) => {
                  const p = productById(pid);
                  if (!p) return null;
                  return (
                    <Link key={pid} to={`/product/${pid}`} className="tag tag-link">
                      {p.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Narrative>

      {/* --- 04 Who it serves ---------------------------------------------- */}
      <Narrative
        num="04"
        title="Who it serves"
        lead="Two very different customers, one shared problem: conforming messy data to a regulator's taxonomy."
      >
        <div className="split">
          <div className="prose-panel">
            <h3>Regulators &amp; supervisors</h3>
            {details["Major regulators served"] ? (
              <Markdown text={details["Major regulators served"]} />
            ) : (
              <p className="muted">Regulator detail not recorded.</p>
            )}
          </div>
          <div className="prose-panel">
            <h3>Enterprises &amp; financial institutions</h3>
            {details["Major customers"] ? (
              <Markdown text={details["Major customers"]} />
            ) : (
              <p className="muted">Customer detail not recorded.</p>
            )}
          </div>
        </div>
        {namedCustomers.length > 0 && (
          <div className="entity-grid" style={{ marginTop: "1rem" }}>
            {namedCustomers.map((c) => (
              <EntityCard key={c.id} entity={c} href={`/company/${c.id}`} />
            ))}
          </div>
        )}
      </Narrative>

      {/* --- 05 Product ecosystem ------------------------------------------ */}
      <Narrative
        num="05"
        title="Product ecosystem"
        lead="The current portfolio (SupTech, RegTech, DataTech) plus the divested TaxTech line, for the full picture."
      >
        <h3>Current portfolio</h3>
        <div className="entity-grid">
          {currentProducts.map((p) => (
            <EntityCard
              key={p.id}
              entity={p}
              href={`/product/${p.id}`}
              meta={p.category.join(" · ")}
              badge={<LifecycleTag lifecycle={p.lifecycle} />}
            />
          ))}
        </div>
        {divestedProducts.length > 0 && (
          <>
            <h3 style={{ marginTop: "1.75rem" }}>Divested — TaxTech (to Sovos, 2025)</h3>
            <div className="entity-grid">
              {divestedProducts.map((p) => (
                <EntityCard
                  key={p.id}
                  entity={p}
                  href={`/product/${p.id}`}
                  meta={p.category.join(" · ")}
                  badge={<LifecycleTag lifecycle={p.lifecycle} />}
                />
              ))}
            </div>
          </>
        )}
      </Narrative>

      {/* --- 06 Company evolution ------------------------------------------ */}
      <Narrative
        num="06"
        title="Company evolution"
        lead="Origin, evolution, milestones and product evolution — filter by phase to focus on one arc of the story."
      >
        <Timeline />
        {details["Acquisitions & divestments"] && (
          <div className="prose-panel" style={{ marginTop: "1.5rem" }}>
            <h3>Acquisitions &amp; divestments</h3>
            <Markdown text={details["Acquisitions & divestments"]} />
          </div>
        )}
      </Narrative>

      {/* --- 07 Global presence -------------------------------------------- */}
      <Narrative
        num="07"
        title="Global presence"
        lead="A 52+ country footprint built on a standards-led (XBRL / iXBRL / SDMX) moat."
      >
        <dl className="fact-list">
          <div className="fact-item"><dt>Regions</dt><dd>India · Middle East · Asia Pacific · Africa · US · Europe · UK</dd></div>
          <div className="fact-item"><dt>Subsidiaries</dt><dd>IRIS Business Services LLC (US) · MZ Consult (Brazil)</dd></div>
          <div className="fact-item"><dt>DataTech subsidiary</dt><dd>Approved Feb 2026</dd></div>
          <div className="fact-item"><dt>XBRL board seat</dt><dd>XBRL International (US President, 2024)</dd></div>
        </dl>
        {details["Geography & offices"] && (
          <div className="prose-panel">
            <h3>Geography &amp; offices</h3>
            <Markdown text={details["Geography & offices"]} />
          </div>
        )}
      </Narrative>

      {/* --- 08 IRIS today -------------------------------------------------- */}
      <Narrative
        num="08"
        title="IRIS today"
        lead="The current financial, strategic and leadership picture — including the caveats the data forces us to make."
      >
        <div className="split">
          {details["Revenue & business model"] && (
            <div className="prose-panel">
              <h3>Revenue &amp; business model</h3>
              <Markdown text={details["Revenue & business model"]} />
            </div>
          )}
          {details["Strategy"] && (
            <div className="prose-panel">
              <h3>Strategy</h3>
              <Markdown text={details["Strategy"]} />
            </div>
          )}
        </div>
        <div className="split" style={{ marginTop: "1.25rem" }}>
          {details["Risks"] && (
            <div className="prose-panel">
              <h3>Risks</h3>
              <Markdown text={details["Risks"]} />
            </div>
          )}
          {details["Opportunities"] && (
            <div className="prose-panel">
              <h3>Opportunities</h3>
              <Markdown text={details["Opportunities"]} />
            </div>
          )}
        </div>
        {details["What management says about the future"] && (
          <div className="callout">
            <div className="callout-icon" aria-hidden="true">→</div>
            <div className="callout-body">
              <p className="callout-title">What management says about the future</p>
              <Markdown text={details["What management says about the future"]} />
            </div>
          </div>
        )}
      </Narrative>

      {/* --- 09 Competitive landscape -------------------------------------- */}
      <Narrative
        num="09"
        title="Competitive landscape"
        lead="Direct and adjacent competitors, and where IRIS overlaps with each."
      >
        <div className="entity-grid">
          {landscape.map((prof) => {
            const company = knowledgeBase.companies.find((c) => c.id === prof.companyId);
            if (!company) return null;
            return (
              <Link key={prof.companyId} to={`/competitor/${prof.companyId}`} className="landscape-card">
                <div className="landscape-head">
                  <h3>{company.name}</h3>
                  <span className="tag">{COMPETITION_TIER_LABEL[prof.tier]}</span>
                </div>
                <p>{prof.positioning}</p>
                <div className="landscape-meta">
                  Overlaps: {prof.overlapsWith
                    .map((pid) => productById(pid)?.name ?? pid)
                    .join(", ")}
                </div>
              </Link>
            );
          })}
        </div>
        <p className="muted" style={{ marginTop: "1rem" }}>
          <Link to="/competitors">Open the full competitive landscape →</Link>
        </p>
      </Narrative>

      {/* --- 10 A balanced view -------------------------------------------- */}
      <Narrative
        num="10"
        title="A balanced view"
        lead="Separating what the company says from what customers, third parties and the evidence say — so the picture stays balanced, not promotional."
      >
        <div className="grid-2">
          {irisPerspectives.map((p) => (
            <div key={p.id} className="perspective-card">
              <h3>{p.label}</h3>
              <p className="muted">{p.speaker}</p>
              <ul>
                {p.points.map((pt, i) => (
                  <li key={i}>
                    {pt.text}
                    <span className="perspective-meta">
                      <CertaintyTag certainty={pt.certainty} />
                      <SourceList sourceIds={pt.sources} inline />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Narrative>

      {/* --- 11 Deep dive: the full company record -------------------------- */}
      <Narrative
        num="11"
        title="Deep dive"
        lead="The complete company record — every researched dimension, kept in full and openable on demand."
      >
        {[
          "Company history",
          "Founding & original business",
          "Leadership",
          "Corporate structure & ownership",
          "Subsidiaries",
          "Partnerships",
          "Business segments",
          "Market positioning",
        ].map((key) => {
          const body = details[key];
          if (!body) return null;
          return (
            <details key={key} className="fold">
              <summary>{key}</summary>
              <div className="fold-body">
                <Markdown text={body} />
              </div>
            </details>
          );
        })}
      </Narrative>

      {/* --- 12 Explore further -------------------------------------------- */}
      <Narrative
        num="12"
        title="Explore further"
        lead="Keep going — study IRIS at three depths, or dive into the surrounding research."
      >
        {irisPaths.length > 0 && (
          <>
            <h3>Study paths for IRIS</h3>
            <div className="entity-grid">
              {irisPaths.map((m) => (
                <Link key={m.id} to={`/learning/${m.id}`} className="explore-card">
                  <h3>{m.title}</h3>
                  <p>{m.summary}</p>
                  <span className="explore-cta">Start lesson →</span>
                </Link>
              ))}
            </div>
          </>
        )}

        <div className="explore-grid" style={{ marginTop: "1.5rem" }}>
          <Link to="/products" className="explore-card">
            <h3>Products</h3>
            <p>Every IRIS product — what it does, who uses it, and how it works.</p>
            <span className="explore-cta">Browse products →</span>
          </Link>
          <Link to="/regtech" className="explore-card">
            <h3>RegTech domain</h3>
            <p>The industry IRIS operates in — standards, data flows and the ecosystem.</p>
            <span className="explore-cta">Learn the domain →</span>
          </Link>
          <Link to="/strategy" className="explore-card">
            <h3>Strategy</h3>
            <p>Where IRIS is betting next — ESG, SupTech and the DataTech subsidiary.</p>
            <span className="explore-cta">Read the strategy →</span>
          </Link>
          <Link to="/glossary" className="explore-card">
            <h3>Glossary</h3>
            <p>XBRL, iXBRL, SDMX, ESEF and every other term, explained simply.</p>
            <span className="explore-cta">Open the glossary →</span>
          </Link>
        </div>

        <section style={{ marginTop: "2rem" }}>
          <h2>Sources</h2>
          {iris.sources.length > 0 ? (
            <SourceList sourceIds={iris.sources} />
          ) : (
            <p className="muted">No sources recorded yet.</p>
          )}
        </section>
      </Narrative>
    </div>
  );
}
