import { Link, useParams } from "react-router-dom";
import { getCompetitorProfile } from "@/data/index";
import { headToHeads } from "@/data/competitorIntelligence";
import CompetitorProfileView from "@/components/CompetitorProfile";
import HeadToHeadView from "@/components/HeadToHead";

export default function CompetitorDetail() {
  const { id } = useParams();
  const profile = id ? getCompetitorProfile(id) : undefined;

  if (!profile) {
    return (
      <div className="page">
        <p className="muted">No deep competitor profile for this company.</p>
        <Link to="/competitors" className="btn">
          ← Back to competitors
        </Link>
      </div>
    );
  }

  const matchups = headToHeads.filter((h) => h.competitorCompanyId === id);

  return (
    <div className="page">
      <nav className="breadcrumb">
        <Link to="/competitors">← Back to competitive landscape</Link>
      </nav>
      <CompetitorProfileView profile={profile} />

      {matchups.length > 0 && (
        <section>
          <h2>IRIS vs this competitor (head-to-head)</h2>
          <div className="h2h-list">
            {matchups.map((m) => (
              <HeadToHeadView key={m.id} hh={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
