import { useParams, Link } from "react-router-dom";
import { followPaths } from "@/data/index";
import FollowPathView from "@/components/FollowPath";

export default function FollowPage() {
  const { mode } = useParams();
  const path = followPaths.find((p) => p.mode === mode);

  if (!path) {
    return (
      <div className="page">
        <p className="muted">Unknown follow mode.</p>
        <Link to="/learning" className="btn">← Learning</Link>
      </div>
    );
  }

  const other = followPaths.find((p) => p.mode !== mode);

  return (
    <div className="page">
      <nav className="breadcrumb">
        <Link to="/learning">← Learning</Link>
      </nav>
      <FollowPathView path={path} />
      {other && (
        <p className="follow-switch">
          Or switch to <Link to={`/follow/${other.mode}`}>{other.title}</Link>.
        </p>
      )}
    </div>
  );
}
