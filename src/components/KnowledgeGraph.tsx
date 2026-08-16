import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { builtGraph, neighborsOf, GROUP_ORDER } from "@/lib/graphModel";
import type { GraphNode } from "@/lib/graphModel";

/**
 * The interactive knowledge graph: a dependency-free, clickable explorer over
 * the normalised graph model. Start at IRIS and click through products →
 * customers → problems → regulations → technology → competitors → markets →
 * sources. Every node navigates to its detail page.
 */
export default function KnowledgeGraph() {
  const [focusKey, setFocusKey] = useState("company:iris");
  const [trail, setTrail] = useState<string[]>(["company:iris"]);
  const [hidden, setHidden] = useState<Set<string>>(new Set(["Sources"]));

  const focus = builtGraph.nodes.get(focusKey);
  const neighbors = useMemo(() => neighborsOf(builtGraph, focusKey), [focusKey]);

  const groupCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const n of builtGraph.nodes.values()) {
      counts.set(n.group, (counts.get(n.group) ?? 0) + 1);
    }
    return counts;
  }, []);

  const grouped = useMemo(() => {
    const g = new Map<string, { node: GraphNode; label: string }[]>();
    for (const n of neighbors) {
      if (hidden.has(n.node.group)) continue;
      const arr = g.get(n.node.group) ?? [];
      arr.push(n);
      g.set(n.node.group, arr);
    }
    return g;
  }, [neighbors, hidden]);

  const orderedGroups = [...grouped.entries()].sort((a, b) => {
    const ia = GROUP_ORDER.findIndex((g) => g.id === a[0]);
    const ib = GROUP_ORDER.findIndex((g) => g.id === b[0]);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  function focusNode(key: string) {
    setFocusKey(key);
    setTrail((t) => {
      const idx = t.indexOf(key);
      if (idx >= 0) return t.slice(0, idx + 1);
      return [...t, key];
    });
  }

  function toggleGroup(id: string) {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function reset() {
    setFocusKey("company:iris");
    setTrail(["company:iris"]);
  }

  return (
    <div className="kgraph">
      <div className="kgraph-groups">
        {GROUP_ORDER.map((g) => {
          const on = !hidden.has(g.id);
          return (
            <button
              key={g.id}
              className={`kgroup-toggle ${on ? "on" : "off"}`}
              onClick={() => toggleGroup(g.id)}
            >
              {g.label} <span className="kgroup-count">{groupCounts.get(g.id) ?? 0}</span>
            </button>
          );
        })}
      </div>

      <div className="kgraph-trail">
        <button className="linklike" onClick={reset}>IRIS</button>
        {trail.map((k) => {
          const n = builtGraph.nodes.get(k);
          if (!n) return null;
          return (
            <span key={k} className="kgraph-crumb">
              <span className="kgraph-crumb-sep">›</span>
              <button className="linklike" onClick={() => focusNode(k)}>
                {n.label}
              </button>
            </span>
          );
        })}
      </div>

      {focus && (
        <div className="kgraph-focus">
          <div className="kgraph-focus-head">
            <span className="kgraph-focus-group">{focus.group}</span>
            <h2>{focus.label}</h2>
            <Link to={focus.href} className="btn btn-sm">Open page →</Link>
          </div>
          {focus.subtitle && <p className="muted">{focus.subtitle}</p>}
        </div>
      )}

      <div className="kgraph-neighbors">
        {orderedGroups.length === 0 && (
          <p className="muted">No visible connections. Toggle groups above, or click another node.</p>
        )}
        {orderedGroups.map(([group, items]) => (
          <div key={group} className="kgraph-neighbor-group">
            <h3>{group}</h3>
            <div className="kgraph-chips">
              {items.map((it) => (
                <button key={`${it.node.key}|${it.label}`} className="kgraph-chip" onClick={() => focusNode(it.node.key)}>
                  <span className="kgraph-chip-rel">{it.label}</span>
                  <span className="kgraph-chip-name">{it.node.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
