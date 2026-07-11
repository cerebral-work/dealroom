# Dealroom — Investor Data-Room PWA Template

A whitelabel investor data-room PWA. SvelteKit 5 + Bun + TypeScript + Cloudflare Workers.

All content is driven from a single data file: `src/lib/data/wire.ts`. Populate it with your startup's data and every route renders automatically.

## Quick Start

```bash
bun install
bun run dev          # http://localhost:5173
```

## Scaffold from Research

If you have a research directory with markdown files (see schema below), the scaffold CLI can generate a starter `wire.ts`:

```bash
bun run scaffold ../your-research-dir --out src/lib/data/wire.ts
```

The scaffold parses markdown files with YAML frontmatter and extracts:
- **Pipeline entries** from `customers/*.md` (one file per customer)
- **Market sizing** (TAM/SAM/SOM) from a collated research brief
- **Brand positioning** from `marketing/brand.md`
- **Research file index** from all markdown files in the directory

Sections it can't parse are left as empty arrays/objects — review and populate manually. See `src/lib/data/wire.example.ts` for a fully populated example.

## Deploy

```bash
bun alchemy login    # one-time CF auth
bun run deploy       # alchemy deploy → Workers
bun run destroy      # tear down
```

## Routes

15 routes, all driven from `wire.ts`:

| Route | What it covers |
|-------|---------------|
| `/` | Landing page |
| `/pitch` | Investor pitch deck (keyboard navigable, N-slide) |
| `/value-prop` | Core problems, positioning |
| `/talking-points` | Audience-segmented talking points |
| `/data-room` | TAM, financials, metrics |
| `/compliance` | Risk calculator, penalties by jurisdiction, architecture-to-obligation mapping |
| `/competitive` | Comparison matrix, moats |
| `/roadmap` | Product roadmap (phased, northstar progression) |
| `/gtm` | GTM execution plan (streams, timeline, budget, decisions) |
| `/product` | Architecture, tools, properties, shipped/in-flight/planned |
| `/metrics` | Investor metrics, pricing, CAC, projections |
| `/engage` | Demo booking, newsletter, search, share |
| `/community` | Team, partners, events, onboarding |
| `/research` | Research file index |
| `/brand` | Voice guide, positioning, tone rules |

## Data Schema

`wire.ts` exports 18 typed objects. Key exports:

| Export | Type | Content |
|--------|------|---------|
| `wire` | Object | Company identity (name, tagline, stage, raise) |
| `market` | Object | TAM/SAM/SOM, segments, timing signals |
| `competition` | Object | Competitor categories, direct competitors, moats |
| `compliance` | Object | Blockers, architecture mappings, penalties, jurisdictions |
| `economics` | Object | Pricing, credit costs, CAC, discount policy, GTM budget |
| `pipeline` | Array | Customer pipeline entries (org, stage, blocker, deal size) |
| `product` | Object | Tools, properties, shipped/in-flight/planned |
| `brand` | Object | Positioning, principles, problems, tone, never-say |
| `socialProof` | Array | Metrics and proof points |
| `objections` | Array | Q&A pairs for common objections |
| `glossary` | Array | Term definitions |
| `integrations` | Array | Integration status |
| `useCases` | Array | Use case descriptions by segment |
| `roadmap` | Array | Roadmap phases with items and northstars |
| `risks` | Array | Risk entries with impact, severity, mitigation |
| `researchFiles` | Array | Research file index |
| `gtmRoadmap` | Object | GTM streams, budget allocation, open decisions |
| `gtm` | Object | Dual-motion GTM, sales org, PQL rules |

## Scaffold CLI — Research Directory Schema

The scaffold CLI expects markdown files with YAML frontmatter:

### customers/*.md
```yaml
---
title: Customer Name
status: Hot — paid POC  # or: Warm — discovery, Cold
description: Segment description
motion: Top-down        # or: Bottoms-up
whyWire: Why they need your product
blocker: What's blocking the deal
targetClose: TBD        # or: 2026-Q3
dealSize: $150-300k ACV
note: Optional extra context
---
```

### marketing/brand.md
```yaml
---
title: Brand voice and positioning
description: ...
---
# Positioning
For teams putting agents into production workflows
Who need a context layer they can own, audit, and control
...
```

### collated-research.md
```yaml
---
title: Collated Research Brief
---
## What Wire is
Context as a Service — ... Tagline: *Code has GitHub. Everything else has Wire.*
...
## Market
TAM: $30-35B ...
SAM: $10-22B ...
SOM: $18-42M ARR ...
```

## Stack

| Tool | Role |
|------|------|
| **SvelteKit 5** | SPA framework (runes mode, client-side routing) |
| **Bun** | Runtime, package manager, dev server, static server |
| **TypeScript** | End-to-end type safety |
| **Alchemy** | Infrastructure-as-Code via `alchemy.run.ts` (no YAML, no Terraform) |
| **Cloudflare Workers** | Deploy target (static assets + edge runtime) |

## Commands

```bash
bun install                  # deps
bun run dev                  # Vite dev server (:5173)
bun run build                # static build → build/
bun run serve                # serve build/ (:8080)
bun run scaffold <dir>        # generate wire.ts from research directory
bun run deploy               # alchemy deploy
bun run destroy              # alchemy destroy
bun run check                # svelte-check type checking
```

## Customization

- **Design tokens**: `src/lib/styles.css` — CSS custom properties for colors, typography, spacing, radius
- **Logo**: `static/icons/icon.svg`
- **PWA manifest**: `static/manifest.json`
- **App HTML**: `src/app.html` — fonts, meta tags
