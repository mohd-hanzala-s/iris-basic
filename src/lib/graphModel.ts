import {
  sources,
  relations,
  customerSegments,
  headToHeads,
  getEntity,
} from "@/data/index";
import type { RelationKind, EntityRef } from "@/data/types";

/**
 * The knowledge graph, normalised for the interactive explorer. It merges the
 * explicit `relations` edges with two synthesized layers:
 *   - "Problems" — customer segments (each carries a `problem` statement) and
 *     the products/entities they involve.
 *   - "Sources" — every entity cites its sources.
 * and adds product→competitor edges from the Stage 6 head-to-heads.
 */

export type GraphNodeType =
  | "iris"
  | "product"
  | "customer"
  | "problem"
  | "regulation"
  | "regulator"
  | "technology"
  | "competitor"
  | "market"
  | "concept"
  | "glossary"
  | "company"
  | "source";

export interface GraphNode {
  key: string;
  type: GraphNodeType;
  id: string;
  label: string;
  subtitle: string;
  href: string;
  group: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  label: string;
}

export const GROUP_ORDER: { id: string; label: string }[] = [
  { id: "IRIS", label: "IRIS" },
  { id: "Products", label: "Products" },
  { id: "Customers", label: "Customers" },
  { id: "Problems", label: "Problems" },
  { id: "Regulations", label: "Regulations" },
  { id: "Regulators", label: "Regulators" },
  { id: "Technology", label: "Technology" },
  { id: "Competitors", label: "Competitors" },
  { id: "Markets", label: "Markets" },
  { id: "Concepts", label: "Concepts" },
  { id: "Glossary", label: "Glossary" },
  { id: "Sources", label: "Sources" },
];

const RELATION_LABEL: Record<RelationKind, string> = {
  serves: "serves",
  competesWith: "competes with",
  makes: "makes",
  compliesWith: "complies with",
  enforces: "enforces",
  builtWith: "built with",
  operatesIn: "operates in",
  uses: "uses",
  supports: "supports",
  relatedTo: "related to",
  partnerOf: "partner of",
  owns: "owns",
  divestedTo: "divested to",
};

function hrefFor(type: GraphNodeType, id: string): string {
  switch (type) {
    case "iris":
    case "customer":
    case "competitor":
    case "company":
      return `/company/${id}`;
    case "product":
      return `/product/${id}`;
    case "regulation":
      return `/regulation/${id}`;
    case "regulator":
      return `/regulator/${id}`;
    case "technology":
      return `/technology/${id}`;
    case "market":
      return `/market/${id}`;
    case "concept":
      return `/concept/${id}`;
    case "glossary":
      return `/glossary/${id}`;
    case "problem":
      return "/customers";
    case "source":
      return "/sources";
    default:
      return "/";
  }
}

function groupOf(type: GraphNodeType, companyType?: string): string {
  if (type === "iris") return "IRIS";
  if (type === "product") return "Products";
  if (type === "customer") return "Customers";
  if (type === "problem") return "Problems";
  if (type === "regulation") return "Regulations";
  if (type === "regulator") return "Regulators";
  if (type === "technology") return "Technology";
  if (type === "competitor") return "Competitors";
  if (type === "market") return "Markets";
  if (type === "concept") return "Concepts";
  if (type === "glossary") return "Glossary";
  if (type === "source") return "Sources";
  if (type === "company") return companyType === "COMPETITOR" ? "Competitors" : "Companies";
  return "Companies";
}

function typeOfRef(ref: EntityRef, companyType?: string): GraphNodeType {
  switch (ref.type) {
    case "company":
      if (ref.id === "iris") return "iris";
      if (companyType === "COMPETITOR") return "competitor";
      if (companyType === "CUSTOMER") return "customer";
      if (companyType === "REGULATOR") return "regulator";
      return "company";
    case "product":
      return "product";
    case "regulation":
      return "regulation";
    case "regulator":
      return "regulator";
    case "technology":
      return "technology";
    case "market":
      return "market";
    case "concept":
      return "concept";
    case "glossary":
      return "glossary";
    case "useCase":
      return "problem";
    default:
      return "company";
  }
}

function addEntityNode(
  nodes: Map<string, GraphNode>,
  ref: EntityRef
): GraphNode | undefined {
  const key = `${ref.type}:${ref.id}`;
  if (nodes.has(key)) return nodes.get(key);

  const entity = getEntity(ref);
  if (!entity) return undefined;

  const companyType = ref.type === "company" ? (entity as { companyType?: string }).companyType : undefined;
  const type = typeOfRef(ref, companyType);
  const node: GraphNode = {
    key,
    type,
    id: ref.id,
    label: entity.name,
    subtitle: entity.summary ?? "",
    href: hrefFor(type, ref.id),
    group: groupOf(type, companyType),
  };
  nodes.set(key, node);
  return node;
}

export interface GraphModel {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
}

export function buildGraph(): GraphModel {
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];

  const edge = (from: GraphNode | undefined, to: GraphNode | undefined, label: string) => {
    if (!from || !to) return;
    if (from.key === to.key) return;
    edges.push({ from: from.key, to: to.key, label });
  };

  // 1. Explicit relations
  for (const r of relations) {
    const a = addEntityNode(nodes, r.from);
    const b = addEntityNode(nodes, r.to);
    edge(a, b, RELATION_LABEL[r.kind]);
  }

  // 2. "Problems" — customer segments
  for (const seg of customerSegments) {
    const key = `problem:${seg.id}`;
    if (!nodes.has(key)) {
      nodes.set(key, {
        key,
        type: "problem",
        id: seg.id,
        label: `${seg.name} — ${seg.chain.problem}`,
        subtitle: seg.chain.problem,
        href: "/customers",
        group: "Problems",
      });
    }
    const problem = nodes.get(key)!;
    for (const pid of seg.productIds) {
      const p = addEntityNode(nodes, { type: "product", id: pid });
      edge(problem, p, "solved by");
    }
    for (const ref of seg.entityRefs) {
      const e = addEntityNode(nodes, ref);
      edge(problem, e, "involves");
    }
  }

  // 3. Product → competitor edges from head-to-heads
  for (const hh of headToHeads) {
    const p = addEntityNode(nodes, { type: "product", id: hh.irisProductId });
    const c = addEntityNode(nodes, { type: "company", id: hh.competitorCompanyId });
    edge(p, c, "competes with");
  }

  // 4. Sources — every entity cites its sources
  for (const node of [...nodes.values()]) {
    const entity = node.type === "problem" ? undefined : getEntity({ type: nodeEntityType(node), id: node.id });
    if (!entity || !entity.sources || entity.sources.length === 0) continue;
    for (const sid of entity.sources) {
      const skey = `source:${sid}`;
      if (!nodes.has(skey)) {
        const src = sources.find((s) => s.id === sid);
        nodes.set(skey, {
          key: skey,
          type: "source",
          id: sid,
          label: src ? src.title : sid,
          subtitle: src ? src.publisher : "",
          href: "/sources",
          group: "Sources",
        });
      }
      edge(node, nodes.get(skey)!, "cited by");
    }
  }

  return { nodes, edges };
}

function nodeEntityType(node: GraphNode): EntityRef["type"] {
  switch (node.type) {
    case "iris":
    case "customer":
    case "competitor":
    case "company":
      return "company";
    case "product":
      return "product";
    case "regulation":
      return "regulation";
    case "regulator":
      return "regulator";
    case "technology":
      return "technology";
    case "market":
      return "market";
    case "concept":
      return "concept";
    case "glossary":
      return "glossary";
    default:
      return "concept";
  }
}

/** Neighbours of a node, deduplicated and grouped by node type. */
export function neighborsOf(model: GraphModel, key: string): { node: GraphNode; label: string }[] {
  const out = new Map<string, { node: GraphNode; label: string }>();
  for (const e of model.edges) {
    if (e.from === key && model.nodes.has(e.to)) {
      out.set(e.to, { node: model.nodes.get(e.to)!, label: e.label });
    } else if (e.to === key && model.nodes.has(e.from)) {
      out.set(e.from, { node: model.nodes.get(e.from)!, label: e.label });
    }
  }
  return [...out.values()];
}

export const builtGraph: GraphModel = buildGraph();
