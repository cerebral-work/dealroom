---
title: "Wire — Collated Research Brief"
description: "Single-read synthesis of all research-harness findings: product, market, competition, GTM, pipeline, economics, compliance, and the open decisions."
status: active
updated: 2026-07-09
owner: JK
tags: [index, collation, executive]
freshness: quarterly
---

# Wire — Collated Research Brief

*Single-read synthesis of the research harness. Every claim links to its source file. Last collated 2026-07-09.*

---

## 1. What Wire is

**Context as a Service** — composable, portable, permissioned context containers that AI agents connect to over MCP or REST. Tagline: *Code has GitHub. Everything else has Wire.*

The fundamental unit is a **container**: a self-contained MCP server with its own content, access controls, and audit log. Five tools per container (`explore`, `search`, `navigate`, `write`, `delete`). Dual transport: MCP (primary, for Claude/Cursor/Windsurf/Codex) + REST (for automation/CI/CD). Per-container isolation — each container is its own database, addressable, portable. This is a security/compliance primitive, not just a feature.

Three tiers: **open-source container** (free, self-hostable, adoption engine) → **hosted product** (credit-based, usewire.io) → **enterprise** (SSO/SCIM, BYOC, single-tenant, audit export, custom DPA). No feature gates on the hosted product; enterprise differs on deployment posture and governance.

→ [`codebase/wire-container-crate-...md`](codebase/wire-container-crate-context-struct-permissions-mcp-transport-rest-api.md) · [`product/specs/wire-mcp-server-...md`](product/specs/wire-mcp-server-exposing-context-containers-as-mcp-resources-so-any-mcp-compatible-client-can-read-and-write-context.md) · [`marketing/brand.md`](marketing/brand.md)

---

## 2. Current state (2026-07-09)

- **Stage:** Pre-seed. Raising $375k; Cerebral anchored $150k.
- **Shipped:** Hosted MVP at usewire.io; `wire-memory` plugin (Claude Code); public SDK; `n8n-nodes-wire`; `wire-plugins`.
- **In active development:** Open-source `wire` container — approaching public release, test suite green, interfaces can still change. MCP server spec `fs-001` is in **draft** (acceptance criteria not met).
- **Pipeline:** 4 conversations — IndiaStox (hot, paid POC in motion), NELFT + Spring Health + Praxent (all warm/discovery).
- **Not yet in place:** SOC 2 Type I, GDPR readiness, HIPAA/BAA, UK GDPR + DPA 2018. These are the pre-seed blockers for every regulated deal.
- **Organic traction:** 23,316 GSC impressions / 90 days, now 800-1,000+/day, avg position 6.81. Corey Quinn cited Wire.

→ [`research/README.md`](README.md) (current state) · [`sales/strategy.md`](sales/strategy.md) (pipeline + blockers) · [`codebase/wire-container-crate-...md`](codebase/wire-container-crate-context-struct-permissions-mcp-transport-rest-api.md) (container health)

---

## 3. Market

### Sizing

| Layer | Value | Basis |
|-------|-------|-------|
| **TAM** (subscription + enterprise) | **$30-35B** | ~500M businesses × ~2% agent penetration × ~$2.5k ARPU = $25B sub; +$5-10B enterprise (Gartner: 33% of enterprise SW interactions via agents by 2028) |
| **SAM** (reachable today) | **$10-22B** | Developer/SMB $2-5B + mid-market $3-7B + regulated enterprise $5-10B |
| **SOM** (3-yr, 2026-2029) | **$18-42M ARR** | 2026: $0-150k → 2027: $425k-1.15M → 2028: $3.25-9.25M → 2029: $18.5-42.5M |

### Segments (6, two motions)

| # | Segment | Motion | ARPU | Priority |
|---|---------|--------|------|----------|
| 1 | Solo devs switching AI tools | Bottoms-up | $9-19/mo | 4 (funnel top) |
| 2 | Teams using AI for work | Bottoms-up | $199/mo | 3 |
| 3 | Cost-conscious API users | Bottoms-up | credit | 5 (later) |
| 4 | Regulated fintech | Top-down | $150-300k ACV | **1** (forced buyers) |
| 5 | Regulated healthcare | Top-down | $150-300k ACV | **1** (forced buyers) |
| 6 | Data-sensitive managed svc | Top-down + PLG | $50-150k ACV | 2 (IndiaStox live) |

Pre-seed prioritization puts regulated enterprise (fintech + healthcare) first because regulatory clock + data constraint = forced buyers, then managed service (paid POC already live), then bottoms-up volume.

### Timing signals

- Gartner: 33% of enterprise SW interactions via agents by 2028.
- Global AI software $174.1B (2025), 25% CAGR. GenAI spend 3.2x YoY ($11.5B → $37B).
- Only 7% of companies have fully scaled AI — early innings.
- Regulation creating buying gates: CA CCPA ADMT (2027), CO AI Act, EU AI Act logging.
- MCP adopted by OpenAI + Google (from Anthropic) — open standard, not a vendor rail.

→ [`market/tam-model.md`](market/tam-model.md) · [`market/segments.md`](market/segments.md) · [`market/segment-ai-first-startups-...md`](market/segment-ai-first-startups-using-multiple-llm-providers-who-need-portable-context-across-tools-and-teams.md) · [`compliance/market-ranking.md`](compliance/market-ranking.md)

---

## 4. Competitive position

### Four categories, each with a structural disadvantage

| Category | Who | Why Wire wins |
|----------|-----|---------------|
| **Systems of record building inward** | Salesforce, ServiceNow, Notion | Can't be the neutral layer between themselves and a competitor; want context in their silo |
| **Model labs + hyperscalers** | Anthropic (MCP origin), OpenAI, AWS, Google, MS | Model vendors want context locked to their model; hyperscalers ship primitives not opinionated governance product. "An open Postgres did not stop Supabase." |
| **Horizontal AI infra libraries** | LangChain ($1.25B, $260M raised), LlamaIndex, CrewAI, Mastra | Libraries, not products that replace context infra. Wire composes with them. |
| **Build vs buy at enterprise** | Internal teams (vector DB + custom RAG + bespoke auth) | **The real competitor on every deal.** $200-300k/yr per pipeline + dedicated engineer. Wire at a fraction. |

### Direct feature competitors

- **Smithery** — MCP server registry + connection manager. Routing/auth layer, holds no content. Complementary: a Wire container could be published as a Smithery server.
- **Box** — enterprise content management + MCP server. Incumbent advantage (enterprises already have Box); 40+ tools vs Wire's 5, but that's a category error — Wire's 5 tools are generic primitives, intelligence is in the container's analysis pipeline.
- **Cognee** — graph-based approach vs Wire's per-container isolation.
- **mem0, Zep** — agent memory systems (not yet documented in harness).

### Wire's five structural moats

1. **Open-source container as adoption engine** — inspectable, self-hostable; no closed vendor can offer this.
2. **Neutral layer above MCP** — portable across model providers; model vendors won't make this bet.
3. **Audit-and-ownership from day one** — the regulated buyer's requirement, built into the container not bolted on.
4. **Hook architecture** — same artifact serves OSS and commercial; no fork, no privileged path.
5. **Per-container isolation** — each container its own DB, addressable, portable. Security/compliance primitive.

### Honest risk

- Box's incumbent advantage: enterprises add AI access to existing content without migration.
- Smithery's auth abstraction is lighter for "just connect a tool."
- LangChain released context caching — but **session-scoped only, not portable across agents or teams**. Direct validation of Wire's thesis; the gap between "cached within a session" and "owned as a container" is exactly the gap Wire occupies.

→ [`market/competitive-landscape.md`](market/competitive-landscape.md) · [`market/market-report-wire-vs-smithery-vs-box.md`](market/market-report-wire-vs-smithery-vs-box.md) · [`observations/2026-07-09-langchain-...md`](observations/2026-07-09-langchain-released-context-caching-but-it-is-session-scoped-only-not-portable-across-agents-or-teams-wire-s-container-approach-solves-this-by-making-context-a-shareable-artifact.md)

---

## 5. Go-to-market

### Dual motion, one artifact

Wire sells bottoms-up and top-down off the same container. These are different products with different motions, not a funnel:

| | Bottoms-up (PLG) | Top-down (sales-led) |
|---|---|---|
| Entry | OSS container, hosted free tier | Founder-led sales call |
| Buyer | Developer, team lead | Platform lead, security lead, eng exec |
| Price | $9-199/mo (credits) | $150-300k ACV |
| Cycle | Self-serve, days | 60-90 days eval + pilot |
| Trigger | Team usage, managed sync, compliance asks | Regulatory deadline, stalled rollout |
| Deploy | Hosted (usewire.io) | Bring-your-own-cloud |

The dual motion is the strategy, not a compromise: OSS builds developer mindshare and generates PQL signals; enterprise sales converts those into $100K+ deals with regulated buyers needing compliance + embedded implementation.

### Sales org plan (research-synthesized)

Wire maps closest to **Pattern B** (HashiCorp/MongoDB/Databricks: open-source → enterprise sales early) with elements of **Pattern D** (agent frameworks: VP Sales at $3M+ ARR). The regulated-enterprise focus adds an FDE-style embedded implementation motion.

| Phase | ARR | Team | Key hires | ACV | Cycle |
|-------|------|------|-----------|-----|-------|
| **Pre-seed** (now) | $0-200k | Founders only | None (founder = first FDE) | $50-100k design partner | 30-60 days |
| **Seed** | $200k-1M | Founder + 1 AE + 1 FDE | First AE (closed $50k+ deals, technically credible), first FDE (embeds with regulated partners) | $50-150k | 2-4 months |
| **Series A** | $1-3M | VP Sales + 2-3 AEs + 2 SDRs + 2-3 FDEs + 1 SE | VP Sales (scaled $1M→$10M before, NOT a big-co VP) | $50-250k | 3-6 months |
| **Series B** | $3-10M | VP + 5-8 AEs + 4-6 SDRs + 4-6 FDEs + 2 SEs + CS | Second leader, CS, RevOps | $100-500k | 4-6 months |

**Do NOT hire:** VP Sales or SDRs before Series A. Founder runs first 5-10 enterprise deals personally and documents the playbook. VP hired at month 3 has 25% success rate; at right timing, 70%+ 2-year success.

**PQL handoff rule:** 25+ active users from one domain OR expansion request >$25K → transfers to enterprise team.

**Design partner program:** 3-5 partners across diverse sub-segments (1 fintech payments, 1 healthcare EHR, 1 legal tech, 1 AI agent platform, 1 insurtech — diversity reveals what's universal). Charge $5-15k/month (5-15% of ACV), 100% credited to full contract. 60-90 days, one success metric, weekly review, give-get. No free pilots — "if you don't charge, it's an extended demo." Disciplined pilots convert 60-90%.

### Marketing plan (research-synthesized)

Wire already has a problem-first framework (`GROWTH_PROBLEMS.md`) — a significant asset most companies build retroactively.

**Five core problems:**
1. AI vendor lock-in — "Try different models without losing your context" (High)
2. Team context distribution — "Stop hoping your team downloaded the latest docs" (High)
3. Token costs from reprocessing — "Stop reprocessing the same context every session" (Med-High)
4. Context window limits — "Your context is too big for the agent" (High)
5. Public context distribution — "Let anyone learn about your product via MCP" (Med, emerging)

**Phase 1 (months 0-6): Foundation.** OSS container launch on GitHub (clear README, 3-5 MCP integrations, plugin architecture for extensibility, 48-hr PR response, weekly updates). Docs as primary marketing asset (Stripe model — interactive, copy-paste, "try it out", target: container + MCP connection in <60s). Problem-first blog, 2 posts/month, 3000-4000 words, technical founders not copywriters. GitHub Discussions as primary community (zero friction). Twitter retweet model (Supabase). **Do NOT Product Hunt yet** — build 1,000+ email subscribers first.

**Phase 2 (months 6-12): Community + Launch.** "Wire Context Week" every 3-4 months (Supabase launch-week model). Product Hunt launch at month 8-9 (1,000+ subscribers, 2,000+ stars, 100+ supporters in first 30 min, 10-min comment response). Coin a context-layer stack ("MCP+Wire Stack" — MongoDB MEAN stack play). Start meetups in 2-3 cities (MongoDB benchmark: $50k → 13 groups → 3,900 members). Launch hosted product with freemium + hybrid pricing (12-month CAC payback).

**Phase 3 (months 12-24): Enterprise + Scale.** Enterprise tier (SOC 2, ISO 27001, SSO, RBAC, audit). Top-down + bottoms-up dual motion (Cloudflare model). "Wire University" certification (MongoDB model). "Context Engineering Guide" book (Stripe model). WireConf first conference (HashiCorp waited until 10 employees, 350 attendees). Target Minimum Viable Audience: 30,000-40,000 people (HashiCorp threshold). DevRel ~35% of marketing headcount, half on content.

**Key transferable lessons from 7 comparable companies:**
- **Supabase:** zero-paid-marketing community growth; single activation event (for Wire: first container created + first MCP connection)
- **Vercel:** "open source as speedrun to PMF"; intent-based sales (let devs try quietly, engage on signal); integrations as indirect sales channels
- **HashiCorp:** bottom-up → enterprise; plugin system for contributors; Minimum Viable Audience 30-40k; open-core monetize platform teams not practitioners
- **Stripe:** docs-as-marketing; "seven lines of code" → Wire's "connect your agent in 5 lines"; fill content voids per problem
- **MongoDB:** stack co-marketing (MEAN → MCP+Wire); user-group ROI; ambassador program
- **LangChain:** GitHub-first launch; founder-led low-bureaucracy content; OSS → enterprise observability monetization (LangSmith $16M ARR)
- **Cloudflare:** education over promotion; dual-engine growth; Developer Week batching

→ [`sales/strategy.md`](sales/strategy.md) · [`sales/sales-strategies-research.md`](sales/sales-strategies-research.md) · [`marketing/marketing-strategies-research.md`](marketing/marketing-strategies-research.md) · [`marketing/channel-strategy.md`](marketing/channel-strategy.md) · [`marketing/campaign-problem-first-content-series-...md`](marketing/campaign-problem-first-content-series-targeting-developers-frustrated-by-context-loss-when-switching-ai-tools.md)

---

## 6. Pipeline (4 conversations)

| Org | Segment | Stage | Motion | Why Wire | Blocker |
|-----|---------|-------|--------|----------|---------|
| **IndiaStox** | Managed service (financial markets, incubated by FlatironX) | **Hot — paid POC in motion** | Top-down | Don't want to own/run agent infra; Wire manages it. Custom feeds: influencer posts, India news, equity data. | First paid deal sets pricing precedent |
| **NELFT** | Regulated healthcare (UK NHS forensic mental-health trust) | Warm — discovery | Top-down | Resolves failure modes of rolling own markdown context; per-container isolation = compliance primitive | SOC 2 / UK GDPR not in place; NHS procurement 6-12 months. Champion also founded Psylligent (100-participant study featuring Wire) |
| **Spring Health** | Regulated healthcare (US mental health, HIPAA) | Warm — discovery | Top-down | Per-patient container isolation; audit built in; data-ownership concerns surfaced | HIPAA readiness + BAA not on roadmap yet |
| **Praxent** | Regulated fintech consultancy (US enterprise) | Warm — discovery | Top-down | BYOC data ownership; sync+audit demo landed interest. Potential multiplier: recommends Wire to fintech clients | Security review; consultancy model = longer evaluation (self + clients) |

**Pre-seed goal:** 3 design partners deployed in production on their own data/agents, documented usage, at least 1 converted to paid contract.

→ [`customers/indiastox.md`](customers/indiastox.md) · [`customers/nelft.md`](customers/nelft.md) · [`customers/spring-health.md`](customers/spring-health.md) · [`customers/praxent.md`](customers/praxent.md) · [`sessions/2026-07-09-discovery-call-...nelft...md`](sessions/2026-07-09-discovery-call-with-nelft-regulated-financial-services-firm-about-compliance-documentation.md)

---

## 7. Economics

### Pricing (current)

| Tier | Price | Credits | Motion |
|------|-------|---------|--------|
| Free | $0 | 3,000 starter | Self-serve |
| Starter | $9/mo | 10,000 | PLG |
| Pro | $19/mo | 20,000 | PLG |
| Team | $199/mo | 200,000 | PLG + sales-assist |
| Credit packs | $10-500 | variable | One-time |
| Managed service | $50-150k ACV | — | Sales-led |
| Enterprise BYOC | $150-300k ACV | — | Founder-led / FDE |

**Credit economics risk:** `wire_search` = 5 credits, explore/navigate = 1, file download = 2. `wire_write`, `wire_delete`, uploads, account/container creation, and **background analysis** are all 0 credits. Analysis is currently free — AI inference is COGS. Must charge for analysis before seed.

### CAC

| Segment | Motion | Est. CAC | Target deal | LTV:CAC | Payback |
|---------|--------|----------|-------------|---------|---------|
| Solo dev | PLG | ~$0-50 (organic) | $108-228/yr | 3:1+ | ~30 months (volume) |
| Team (SMB) | PLG + assist | $100-500 | $2,388/yr | 3:1+ | ~15 months |
| Mid-market managed | Sales-led | $5-20k | $50-150k ACV | 5:1+ | ~3 months |
| Enterprise BYOC | Founder→AE | $20-80k | $150-300k ACV | 3:1+ | ~3 months |

**GTM budget (pre-seed):** ~$142k discretionary = GTM/marketing $20-40k + contractors $25-50k + travel $5-12k, single pool.

**Benchmarks that shape the model:**
- Hybrid pricing (usage + subscription) → 12-month CAC payback vs 17 months (pure usage) or 14 months (pure subscription).
- Community-driven customers: 40% lower CAC, 60% higher LTV, 40% better conversion.
- Free-to-paid: industry 2-5%, best-in-class 10-15%. Most decisions within 72 hours — trigger upgrades after activation milestones.
- 78% of developers use ad blockers; specialized platforms (GitHub, Stack Overflow) 3-5x better than general. Ads with real code examples +68% engagement.

### Build-vs-buy reference (the real competitor)

| Build | Annual | Source |
|-------|--------|--------|
| Dedicated AI engineer | $185-265k | Pin, MRJ Recruitment 2026 |
| Platform line items (vector DB, API, monitoring) | $20-40k | memo-yc |
| **Single production pipeline** | **$200-300k/yr** | memo-yc |
| Gartner first-implementation budget | $500k-1.5M | memo-yc |
| Mid-market equivalent | $70-120k | memo-yc |

### Discount policy

Standard 0%. Design partner 50-100% (founder approval). Annual upfront 10-15%. Multi-year 15-20%. Enterprise negotiation case-by-case (founder pre-seed). **Avoid heterogeneous deals** — non-standard terms compound: legal review per deal burns the $10-25k/yr legal budget, no reusable support playbook, unpredictable revenue (hurts seed raise), audit complexity, lock-in to bad precedent.

→ [`sales/deal-economics.md`](sales/deal-economics.md) · [`sales/cac-model.md`](sales/cac-model.md) · [`marketing/marketing-strategies-research.md`](marketing/marketing-strategies-research.md) (Part 2: CAC benchmarks)

---

## 8. Compliance (the gating blocker)

### What blocks every regulated deal

Wire's value prop is permissioning, audit, and data governance — but those claims need **accreditation**:

| Accreditation | Need | Cost | Timeline | Blocks |
|---------------|------|------|----------|--------|
| SOC 2 Type I + GDPR readiness | All regulated EU/UK | $20-35k | ~6 months | NELFT, Praxent |
| HIPAA readiness + BAA | US healthcare | TBD | TBD | Spring Health |
| UK GDPR + DPA 2018 | UK (NELFT) | part of above | parallel | NELFT (NHS procurement) |

Without SOC 2 Type I, regulated buyers won't sign. This is the single highest-leverage pre-seed investment. SSO/SCIM (`rm-002`, Series A) is gated on SOC 2 — it's moot without it.

### How Wire's architecture maps to obligations

Wire's per-container isolation is a **compliance primitive**, not just a feature:

- **Per-container isolation** = data segregation by purpose/scope → GDPR Art. 5 (purpose limitation, minimization); per-patient containers for healthcare (Spring Health).
- **Audit trail** (who accessed what, when, from which agent) = GDPR Art. 30 (ROPA) + Art. 32 (logging) + AI Act Art. 12 (automatic event logging). Primary value driver for NELFT.
- **RBAC + per-container permissions** = Art. 32 security + Art. 22 human oversight.
- **Portable single-file containers** = Art. 20 (data portability) + ownership principle.
- **BYOC** = data residency; EU customer data stays in EU infra → addresses Chapter V transfer restrictions at architectural level.

### Jurisdictional coverage (research-complete)

The harness covers **US (federal + 50 states), Canada, Mexico, EU + 27 member states** — the full audit/compliance matrix is in [`compliance/audit-requirements.md`](compliance/audit-requirements.md) (312 lines, 60+ sources). Key obligations by region:

- **US Federal:** FTC Act §5 (AI claims substantiation, $50,120/violation), HIPAA (PHI, BAA, $2.19M annual cap Tier 4).
- **US States:** 20 comprehensive privacy laws; AI-specific in CA (CCPA/CPRA + pending ADMT), CO (AI Act SB 24-205 — developer+deployer obligations, annual impact assessments), TX (TRAIGA), CT (AI Act SB 5 — AEDT), IL (AIVIA + BIPA + HB 3773), NYC (Local Law 144 — annual bias audit, public posting).
- **Canada:** PIPEDA (federal, no AI law — AIDA died with Bill C-27); Quebec Law 25 (strictest — mandatory privacy officer, mandatory PIA, explicit opt-in consent, equivalent-protection assessment for cross-border); Ontario PHIPA (mandatory electronic audit logs).
- **Mexico:** LFPDPPP 2025 reform — processors now in scope; right to object to automated processing; enforcement in transition (INAI dissolved → SABG).
- **EU:** GDPR (Art. 30 ROPA, Art. 35 DPIA, Art. 28 processor DPA, Art. 32 security, Art. 22 automated decisions, Chapter V transfers, up to €20M / 4% global turnover); EU AI Act (4 risk tiers, Art. 12 event logging, up to €35M / 7%); NIS2 (cybersecurity, 24h/72h/1-month incident reporting, personal executive liability). Member-state specifics in DE (BDSG + 17 authorities + strict TIA), FR (CNIL AI guidance), IT (Law 132/2025 — first EU national AI law), ES (AESIA + public-sector AI inventory), NL (decentralized supervision).

**Penalty severity (max exposure):** EU AI Act €35M/7% > GDPR €20M/4% > Quebec Law 25 CAD$25M/4% > NIS2 €10M/2% > HIPAA $2.19M cap > BIPA $5,000/violation per-person (retroactive).

**Market ranking** for prioritization: CA $21.2B enterprise SW > TX $14.0B > Germany $13.6B > NY $11.8B > France $11.2B > Canada $9.9B > FL $8.8B > IL $5.9B > Mexico $5.8B ... (full 50-state + province + EU27 ranking in [`compliance/market-ranking.md`](compliance/market-ranking.md)).

**Key compliance gaps to build:** DPA template (Art. 28), DPIA framework, TIA documentation, container-level retention/deletion (Art. 17 erasure), sub-processor disclosure flow.

→ [`compliance/audit-requirements.md`](compliance/audit-requirements.md) · [`compliance/gdpr-data-processing-requirements-...md`](compliance/gdpr-data-processing-requirements-for-context-containers-hosting-eu-user-data.md) · [`compliance/market-ranking.md`](compliance/market-ranking.md)

---

## 9. Product

### Shipped / in-flight

- **`wire` open-source container** (TypeScript/Node) — in active development, approaching public release. Four modules: Context struct, Permissions (RBAC admin/member/viewer), MCP transport, REST API. Per-container isolation, hook architecture (same artifact OSS + commercial, no fork). Test suite green; interfaces can still change. **This gates the entire bottoms-up PLG motion.**
- **MCP server spec `fs-001`** — draft. Exposes containers as MCP resources (`wire://containers/{id}`), tools (`wire_search`/`wire_write`/`wire_delete`/`explore`/`navigate`), implements `resources/list`, `resources/read`, `tools/list`, `tools/call`. Acceptance criteria: Claude + Cursor + 1 more MCP client connect, context persists across sessions, full setup <60s, concurrent multi-client connections. **Not yet met.**
- **`wire-memory`** plugin — working example (Claude Code, Cursor, Codex).
- **`wire-sdk`**, **`n8n-nodes-wire`**, **`wire-plugins`** — ecosystem surface.

### Planned

- **`rm-002` Enterprise SSO + SCIM** — Series A, P1, target 2026-Q4. SAML 2.0 + OIDC + SCIM 2.0. Enterprise-tier only (buyer feature, not developer). Gated on SOC 2 Type I, enterprise tier pricing, RBAC, and ≥1 converted enterprise customer requesting SSO (avoid premature enterprise machinery). Success: 3+ enterprise customers using SSO in 6 months, unblocks NELFT/Spring Health/Praxent.

### Activation metric

**"First container created + first MCP connection"** — the single activation event (Supabase initialization model). Full connection setup (generate API key → configure client → first context available) must complete in under 60 seconds.

### User story (foundational)

**us-001:** "When I switch between Claude and GPT, I want to carry my project context with me so that I don't lose conversation history and project knowledge." Persona: solo dev / power user, multi-model by necessity. This is the individual-developer precursor to the team-distribution story; the adoption engine for the OSS container; maps to Segment 1.

→ [`product/user-stories/when-i-switch-between-claude-and-gpt-...md`](product/user-stories/when-i-switch-between-claude-and-gpt-i-want-to-carry-my-project-context-with-me-so-that-i-don-t-lose-conversation-history-and-project-knowledge.md) · [`product/specs/wire-mcp-server-...md`](product/specs/wire-mcp-server-exposing-context-containers-as-mcp-resources-so-any-mcp-compatible-client-can-read-and-write-context.md) · [`product/roadmap/enterprise-sso-and-scim-...md`](product/roadmap/enterprise-sso-and-scim-provisioning-for-managed-context-containers.md)

---

## 10. Open decisions (what needs the operator's call)

These are the forks where the operator's choice changes what happens next. Captured from the "Open questions" sections across the harness:

### Now / pre-seed
1. **First paid contract price** (IndiaStox POC conversion). Sets precedent for all future deals. [deal-economics.md]
2. **When to charge for analysis** — currently 0 credits, AI inference is COGS. Must decide before seed. [deal-economics.md]
3. **SOC 2 Type I + GDPR readiness investment** ($20-35k, ~6 months) — the gating blocker for NELFT, Praxent, and all regulated pipeline. Do we commit pre-seed-round close or post? [strategy.md, nelft.md]
4. **Design partner recruitment** — 3-5 across diverse sub-segments. Currently 4 conversations, all warm. Which become formal design partners? [sales-strategies-research.md §4]
5. **Open-source container public release timing** — gates the entire adoption engine. MCP spec `fs-001` acceptance criteria not yet met. [codebase analysis, fs-001]

### Near-term / seed
6. **First AE hire** — trigger: 3+ design partners converted or $300k+ pipeline. Profile: closed $50k+ deals in dev tools/AI infra, technically credible. [strategy.md, sales-strategies-research.md]
7. **First FDE hire** — embed with regulated design partners. Founder should be first FDE; dedicated hire when pattern validated. Reports to engineering, not sales. [sales-strategies-research.md §FDE]
8. **HIPAA readiness + BAA** — needed for Spring Health. Not yet on roadmap. When to add? [spring-health.md]
9. **Open-source license** — container is Apache-2.0 per codebase analysis. MongoDB moved AGPL→SSPL and revenue grew 10x. Does Wire need a clearer open-core boundary from day one? [marketing-strategies-research.md §risks]

### Series A
10. **VP Sales hire** — profile: scaled $1M→$10M before, understands open-core, NOT a big-co enterprise VP. Timing: $1-3M ARR. [sales-strategies-research.md §4]
11. **Enterprise tier pricing + packaging** — must be defined before building SSO/SCIM behind the paywall. [rm-002]
12. **EU expansion timing** — GDPR-driven demand; geographic expansion for UK NHS + EU. [strategy.md]

### Product
13. **stdio MCP server for OSS self-hosted** — fully local dev without network dependency, or is local HTTP sufficient? [fs-001, codebase analysis]
14. **Container permissions at MCP resource level** — via resource annotations, tool availability, or both? [fs-001]
15. **MCP prompts** — expose pre-configured context-loading prompts per container type, or resources+tools sufficient for v1? [fs-001]
16. **Container export/import format** — how to maintain context integrity across environments? [codebase analysis]

---

## 11. Health of the harness itself

The derivation record ([`ops/derivation.md`](ops/derivation.md)) flagged these failure modes:

| Mode | Risk | Status |
|------|------|--------|
| Collector's Fallacy | HIGH | ~30 open TODOs + empty indexes = scaffold waiting to be filled. TODOs tracked, not hidden. |
| Schema Erosion | HIGH | Templates define schema; no automated enforcement yet — convention only. |
| Productivity Porn | MEDIUM | 40 files created, 2 observations captured (now). Expected at seed stage; 25% budget rule applies. |
| Temporal Staleness | MEDIUM | `freshness:` field tracks temporal validity; manual review needed. No automated sweep. |

**Substantive content vs. scaffold:** The two deep research docs (marketing 827 lines / 50+ sources, sales 855 lines / 40+ sources) and the compliance matrix (312 lines / 60+ sources) are the highest-density artifacts. The customer profiles, segment profiles, and strategy docs are decision-ready. The product specs and codebase analysis are drafts approaching completion. The observations and sessions directories are thin (2 and 1 respectively) — the system is capturing structure faster than raw signal.

---

*This collation is a synthesis, not a replacement for source files. For any decision, follow the links to the source document.*
