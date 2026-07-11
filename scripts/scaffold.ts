#!/usr/bin/env bun
/**
 * Scaffold CLI — reads a research directory and generates wire.ts
 *
 * Usage:
 *   bun run scaffold <research-dir> [--out <output-path>]
 *
 * The research directory should contain markdown files organized by domain:
 *   research/
 *     collated-research.md     — synthesis brief (parsed for market sizing, competitive)
 *     market/                   — TAM/SAM/SOM, segments, competitive landscape
 *     customers/                — pipeline entries (one .md per customer)
 *     sales/                    — pricing, deal economics, CAC
 *     marketing/                — brand voice, positioning, channel strategy
 *     compliance/               — audit requirements, penalties, jurisdictions
 *     product/                  — specs, roadmap, user stories
 *     sessions/                 — discovery call notes
 *     observations/             — competitive intelligence
 *
 * Each markdown file can have YAML frontmatter with structured fields.
 * The scaffold parses what it can and leaves the rest as TODO placeholders.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, basename, relative } from "path";

// ── Types ─────────────────────────────────────────────────────────────

type MarkdownDoc = {
  path: string;
  domain: string;
  title: string;
  frontmatter: Record<string, string>;
  body: string;
  sections: Map<string, string>;
};

type GeneratedData = {
  wire: Record<string, string>;
  market: Record<string, unknown>;
  competition: Record<string, unknown>;
  compliance: Record<string, unknown>;
  economics: Record<string, unknown>;
  pipeline: unknown[];
  product: Record<string, unknown>;
  brand: Record<string, unknown>;
  socialProof: unknown[];
  researchFiles: unknown[];
};

// ── Markdown parsing ──────────────────────────────────────────────────

function parseFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return { frontmatter: {}, body: content };

  const frontmatter: Record<string, string> = {};
  for (const line of fmMatch[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key) frontmatter[key] = value;
  }
  return { frontmatter, body: fmMatch[2] };
}

function parseSections(body: string): Map<string, string> {
  const sections = new Map<string, string>();
  const lines = body.split("\n");
  let currentHeader = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentHeader) sections.set(currentHeader, currentContent.join("\n").trim());
      currentHeader = line.replace(/^##\s+/, "").trim();
      currentContent = [];
    } else if (currentHeader) {
      currentContent.push(line);
    }
  }
  if (currentHeader) sections.set(currentHeader, currentContent.join("\n").trim());
  return sections;
}

function loadDoc(filePath: string, domain: string): MarkdownDoc | null {
  try {
    const content = readFileSync(filePath, "utf-8");
    const { frontmatter, body } = parseFrontmatter(content);
    const title = frontmatter.title || basename(filePath, ".md");
    const sections = parseSections(body);
    return { path: filePath, domain, title, frontmatter, body, sections };
  } catch {
    return null;
  }
}

function loadResearchDir(researchDir: string): MarkdownDoc[] {
  const docs: MarkdownDoc[] = [];
  if (!existsSync(researchDir)) return docs;

  function walk(dir: string, domain: string) {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        const subDomain = domain === "root" ? entry : `${domain}/${entry}`;
        walk(fullPath, subDomain);
      } else if (entry.endsWith(".md")) {
        const doc = loadDoc(fullPath, domain);
        if (doc) docs.push(doc);
      }
    }
  }

  walk(researchDir, "root");
  return docs;
}

// ── Data extraction ───────────────────────────────────────────────────

function extractMarketSizing(doc: MarkdownDoc): Record<string, string> {
  const sizing: Record<string, string> = {};
  const tamMatch = doc.body.match(/TAM[^$]*\$?([\d.]+[BMK])/i);
  const samMatch = doc.body.match(/SAM[^$]*\$?([\d.]+[BMK])/i);
  const somMatch = doc.body.match(/SOM[^$]*\$?([\d.]+[BMK])/i);
  if (tamMatch) sizing.tam = `$${tamMatch[1]}`;
  if (samMatch) sizing.sam = `$${samMatch[1]}`;
  if (somMatch) sizing.som3yr = `$${somMatch[1]}`;
  return sizing;
}

function extractPipelineFromCustomers(docs: MarkdownDoc[]): unknown[] {
  const pipeline: unknown[] = [];
  for (const doc of docs) {
    if (doc.domain !== "customers") continue;
    const org = doc.title;
    const stage = doc.frontmatter.status || "";
    const segment = doc.frontmatter.description || "";
    pipeline.push({
      org,
      segment,
      stage,
      motion: doc.frontmatter.motion || "",
      whyWire: doc.frontmatter.whyWire || "",
      blocker: doc.frontmatter.blocker || "",
      targetClose: doc.frontmatter.targetClose || "TBD",
      dealSize: doc.frontmatter.dealSize || "",
      note: doc.frontmatter.note || "",
    });
  }
  return pipeline;
}

function extractBrand(doc: MarkdownDoc | undefined): Record<string, unknown> {
  if (!doc) return {};
  const positioningMatch = doc.body.match(/For\s+(.+?)\nWho\s+(.+?)\n.*?Wire is\s+(.+?)\nThat\s+(.+?)\nUnlike\s+(.+?)\n.*?Wire\s+(.+)/s);
  const positioning = positioningMatch
    ? {
        for: positioningMatch[1].trim(),
        who: positioningMatch[2].trim(),
        wireIs: positioningMatch[3].trim(),
        that: positioningMatch[4].trim(),
        unlike: positioningMatch[5].trim(),
        wire: positioningMatch[6].trim(),
      }
    : {};
  return { positioning };
}

function extractResearchFiles(docs: MarkdownDoc[], researchDir: string): unknown[] {
  return docs.map((doc) => ({
    path: relative(researchDir, doc.path),
    domain: doc.domain,
    title: doc.title,
    size: `${Math.round(doc.body.length / 1024)}KB`,
    description: doc.frontmatter.description || "",
  }));
}

// ── Code generation ────────────────────────────────────────────────────

function stringifyValue(value: unknown, indent: number): string {
  const pad = "  ".repeat(indent);
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((v) => `${pad}  ${stringifyValue(v, indent + 1)}`);
    return `[\n${items.join(",\n")}\n${pad}]`;
  }
  if (typeof value === "object" && value) {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const items = entries.map(([k, v]) => `${pad}  ${k}: ${stringifyValue(v, indent + 1)}`);
    return `{\n${items.join(",\n")}\n${pad}}`;
  }
  return '""';
}

function generateWireTs(data: GeneratedData): string {
  const lines: string[] = [
    "// Generated by `bun run scaffold` — review and edit before deploying.",
    "// Source: research directory markdown files parsed into structured data.",
    "",
  ];

  lines.push("export const wire = {");
  for (const [key, value] of Object.entries(data.wire)) {
    lines.push(`  ${key}: ${JSON.stringify(value || "")},`);
  }
  lines.push("};");
  lines.push("");

  lines.push("export const market = " + stringifyValue(data.market, 0) + ";");
  lines.push("export const competition = " + stringifyValue(data.competition, 0) + ";");
  lines.push("export const compliance = " + stringifyValue(data.compliance, 0) + ";");
  lines.push("export const economics = " + stringifyValue(data.economics, 0) + ";");
  lines.push("export const pipeline = " + stringifyValue(data.pipeline, 0) + ";");
  lines.push("export const product = " + stringifyValue(data.product, 0) + ";");
  lines.push("export const gtm = " + stringifyValue({}, 0) + ";");
  lines.push("export const brand = " + stringifyValue(data.brand, 0) + ";");
  lines.push("export const socialProof = " + stringifyValue(data.socialProof, 0) + ";");
  lines.push("export const objections = [];");
  lines.push("export const glossary = [];");
  lines.push("export const integrations = [];");
  lines.push("export const useCases = [];");
  lines.push("export const roadmap = [];");
  lines.push("export const risks = [];");
  lines.push("export const researchFiles = " + stringifyValue(data.researchFiles, 0) + ";");
  lines.push("export const gtmRoadmap = " + stringifyValue({}, 0) + ";");
  lines.push("");

  return lines.join("\n");
}

// ── Main ──────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: bun run scaffold <research-dir> [--out <output-path>]");
    process.exit(1);
  }

  const researchDir = args[0];
  let outPath = "src/lib/data/wire.ts";

  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--out" && args[i + 1]) {
      outPath = args[i + 1];
      i++;
    }
  }

  console.log(`Scaffolding dealbook from: ${researchDir}`);
  const docs = loadResearchDir(researchDir);
  console.log(`Found ${docs.length} markdown files`);

  // Find key docs by title/domain
  const collated = docs.find((d) => d.path.includes("collated-research") || d.title.includes("Collated"));
  const brandDoc = docs.find((d) => d.domain === "marketing" && d.title.toLowerCase().includes("brand"));
  const marketDocs = docs.filter((d) => d.domain === "market" || (collated && d === collated));

  // Extract data
  const marketSizing = collated ? extractMarketSizing(collated) : {};
  const pipeline = extractPipelineFromCustomers(docs);
  const brand = extractBrand(brandDoc);
  const researchFiles = extractResearchFiles(docs, researchDir);

  const data: GeneratedData = {
    wire: {
      name: "",
      tagline: "",
      taglineSecondary: "",
      domain: "",
      stage: "",
      raise: "",
      anchor: "",
      status: "",
      statusNote: "",
    },
    market: {
      ...marketSizing,
      sizing: [],
      segments: [],
      timingSignals: [],
    },
    competition: { categories: [], direct: [], moats: [] },
    compliance: { blockers: [], architectureMapping: [], penalties: [], jurisdictions: [], marketRanking: [], gaps: [] },
    economics: { pricing: [], creditCosts: [], buildVsBuy: [], cac: [], discountPolicy: [], riskNote: "", gtmBudget: { total: "", breakdown: [] } },
    pipeline,
    product: { tools: [], sixProperties: [], shipped: [], inFlight: [], planned: [], activationMetric: "" },
    brand,
    socialProof: [],
    researchFiles,
  };

  // If a collated research brief exists, try to extract wire identity from it
  if (collated) {
    const taglineMatch = collated.body.match(/Tagline:\s*\*([^*]+)\*/);
    if (taglineMatch) data.wire.tagline = taglineMatch[1].trim();

    const stageMatch = collated.body.match(/Stage:\s*(\w[\w\s-]*)/);
    if (stageMatch) data.wire.stage = stageMatch[1].trim();

    const raiseMatch = collated.body.match(/\$(\d+)k.*raise|raise.*\$(\d+)k/i);
    if (raiseMatch) data.wire.raise = `$${raiseMatch[1] || raiseMatch[2]}k`;
  }

  const output = generateWireTs(data);
  writeFileSync(outPath, output, "utf-8");
  console.log(`Generated: ${outPath}`);
  console.log(`  Pipeline entries: ${pipeline.length}`);
  console.log(`  Research files indexed: ${researchFiles.length}`);
  console.log("");
  console.log("Review and populate the empty sections. See wire.example.ts for a full example.");
}

main();
