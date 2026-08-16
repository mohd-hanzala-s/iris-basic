import { Link } from "react-router-dom";
import { getEntityName } from "@/data/index";
import { products } from "@/data/products";
import type { CompetitorProfile } from "@/data/types";
import CompetitionTierTag from "./CompetitionTierTag";
import CertaintyTag from "./CertaintyTag";
import Markdown from "./Markdown";
import SourceList from "./SourceList";

/**
 * Full competitor profile: the 20-part research dimensions, strengths,
 * weaknesses, customer sentiment and pricing, rendered with source
 * attribution and a tier badge.
 */
export default function CompetitorProfileView({ profile }: { profile: CompetitorProfile }) {
  const productName = new Map(products.map((p) => [p.id, p.name]));

  return (
    <article className="entity-detail">
      <header className="entity-detail-header">
        <h1>{getEntityName({ type: "company", id: profile.companyId })}</h1>
        <CompetitionTierTag tier={profile.tier} />
        <CertaintyTag certainty={profile.certainty} />
      </header>

      <p className="entity-summary">{profile.positioning}</p>

      {profile.overlapsWith.length > 0 && (
        <div className="tag-row">
          {profile.overlapsWith.map((pid) => (
            <Link key={pid} to={`/product/${pid}`} className="tag tag-link">
              Overlaps: {productName.get(pid) ?? pid}
            </Link>
          ))}
        </div>
      )}

      <section>
        <h2>Profile</h2>
        <div className="profile-dims">
          {profile.dimensions.map((dim) => (
            <div key={dim.heading} className="profile-dim">
              <div className="profile-dim-head">
                <h3>{dim.heading}</h3>
                {dim.certainty && <CertaintyTag certainty={dim.certainty} />}
              </div>
              <Markdown text={dim.body} />
              <SourceList sourceIds={dim.sources} inline />
            </div>
          ))}
        </div>
      </section>

      <div className="grid-2">
        <section>
          <h2>Strengths</h2>
          <ul className="bullet-list">
            {profile.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Weaknesses</h2>
          <ul className="bullet-list bullet-list-negative">
            {profile.weaknesses.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <h2>Customer sentiment</h2>
        <Markdown text={profile.customerSentiment} />
      </section>

      <section>
        <h2>Pricing</h2>
        <Markdown text={profile.pricing} />
      </section>

      <section>
        <h2>Sources</h2>
        <SourceList sourceIds={profile.sources} />
      </section>
    </article>
  );
}
