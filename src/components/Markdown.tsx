import React from "react";
import { Link } from "react-router-dom";

/**
 * Minimal, dependency-free markdown renderer supporting the subset used in
 * the knowledge base: headings, paragraphs, bold/italic, inline code, links,
 * bullet and ordered lists, and blockquotes. Internal links of the form
 * [text](/path) become router Links; external links open in a new tab.
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // tokenize: **bold**, *italic*, `code`, [text](url)
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);
  parts.forEach((part, i) => {
    if (!part) return;
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(<strong key={key}>{part.slice(2, -2)}</strong>);
    } else if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      nodes.push(<em key={key}>{part.slice(1, -1)}</em>);
    } else if (part.startsWith("`") && part.endsWith("`")) {
      nodes.push(<code key={key}>{part.slice(1, -1)}</code>);
    } else if (part.startsWith("[") && part.includes("](")) {
      const m = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (m) {
        const [_, label, url] = m;
        if (url.startsWith("/")) {
          nodes.push(
            <Link key={key} to={url}>
              {label}
            </Link>
          );
        } else {
          nodes.push(
            <a key={key} href={url} target="_blank" rel="noreferrer">
              {label}
            </a>
          );
        }
      } else {
        nodes.push(part);
      }
    } else {
      nodes.push(part);
    }
  });
  return nodes;
}

export default function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let key = 0;

  const flushList = () => {
    if (listBuffer.length === 0) return;
    const items = listBuffer.map((item, i) => (
      <li key={`li-${key}-${i}`}>{renderInline(item, `li-${key}-${i}`)}</li>
    ));
    blocks.push(
      listType === "ol" ? (
        <ol key={`list-${key}`}>{items}</ol>
      ) : (
        <ul key={`list-${key}`}>{items}</ul>
      )
    );
    listBuffer = [];
    listType = null;
    key++;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.trim() === "") {
      flushList();
      continue;
    }
    const ulMatch = line.match(/^\s*[-*]\s+(.*)$/);
    const olMatch = line.match(/^\s*\d+\.\s+(.*)$/);
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    const quote = line.match(/^>\s?(.*)$/);

    if (ulMatch) {
      if (listType !== "ul") flushList();
      listType = "ul";
      listBuffer.push(ulMatch[1]);
    } else if (olMatch) {
      if (listType !== "ol") flushList();
      listType = "ol";
      listBuffer.push(olMatch[1]);
    } else {
      flushList();
      if (heading) {
        const level = heading[1].length;
        const content = heading[2];
        const Tag = (`h${Math.min(level + 1, 4)}` as "h2" | "h3" | "h4");
        blocks.push(<Tag key={`h-${key++}`}>{renderInline(content, `h-${key}`)}</Tag>);
      } else if (quote) {
        blocks.push(
          <blockquote key={`q-${key++}`}>{renderInline(quote[1], `q-${key}`)}</blockquote>
        );
      } else {
        blocks.push(<p key={`p-${key++}`}>{renderInline(line, `p-${key}`)}</p>);
      }
    }
  }
  flushList();

  return <div className="markdown">{blocks}</div>;
}
