---
title: "Wire — Talking Points"
description: "Audience-segmented talking points for fundraising, customer conversations, developer adoption, and objection handling. Sourced from the collated research brief."
status: active
updated: 2026-07-09
owner: JK
tags: [marketing, talking-points, fundraising, sales]
freshness: quarterly
---

# Wire — Talking Points

*Audience-segmented talking points pulled from the [collated research brief](collated-research.md). Use what you need for the room you're in.*

---

## The one-liner

**"Code has GitHub. Everything else has Wire."**

Wire is Context as a Service — portable, permissioned context containers that AI agents connect to over MCP or REST. The same context follows your agent whether you're using Claude, GPT, Cursor, or Codex.

---

## For investors (fundraising)

### The thesis
- AI agents are going into production workflows, but **context isn't portable** — it lives and dies with the session or tool that created it. There's no owned, auditable artifact for agent context.
- Wire creates a **new category**: context as a first-class, portable, owned artifact. Not enterprise content management (Box), not tool connectivity (Smithery) — purpose-built context infrastructure.
- Gartner projects **33% of enterprise software interactions will run through agents by 2028**. The context layer is the missing infrastructure for that shift.

### The market
- **$30-35B TAM** (subscription + enterprise contracts). Bottoms-up: ~10M addressable accounts × ~$2.5k ARPU = $25B. Enterprise adds $5-10B.
- **$18-42M SOM** over 3 years (conservative, based on current pipeline and GTM capacity).
- Only **7% of companies have fully scaled AI** — market is in early innings. First-mover advantage to platforms that solve context before agent adoption reaches scale.

### The moat
1. **Open-source container as adoption engine** — inspectable, self-hostable. No closed vendor can offer a context layer a team can inspect line by line.
2. **Neutral layer above MCP** — portable across model providers. Model vendors want context locked to their model (stickier); Wire is the structurally opposite bet they won't make. "An open Postgres did not stop Supabase."
3. **Audit-and-ownership from day one** — the regulated buyer's requirement, built into the container, not bolted on.
4. **Per-container isolation** — each container is its own database, addressable, portable. Security/compliance primitive, not just a feature.

### The traction
- Hosted MVP live at usewire.io. Open-source container in active development (test suite green, approaching public release). wire-memory plugin, public SDK, n8n integration shipped.
- **4 pipeline conversations**: IndiaStox (paid POC in motion — first paid engagement), NELFT (UK NHS), Spring Health (US mental health), Praxent (US fintech consultancy).
- 23,316 Google Search Console impressions in 90 days, now 800-1,000/day, avg position 6.81. Corey Quinn cited Wire in analyst piece.

### The ask
- Raising **$375k pre-seed** (Cerebral anchored $150k).
- Funds: open-source container to public release (adoption engine), SOC 2 Type I + GDPR readiness (accredits the regulated-buyer value prop), founder-led conversion of current pipeline into deployed design partners.

### The proof the problem is real
- **LangChain** ($1.25B valuation, 110K+ GitHub stars) released context caching — but it's **session-scoped only, not portable across agents or teams**. The closest competitor validated the problem and shipped a partial solution. The gap between "cached within a session" and "owned as a container" is exactly the gap Wire occupies.

---

## For prospective customers (regulated enterprise)

### The problem you have
- Your agents need context that's governed, auditable, and doesn't leave your perimeter. Right now you're either stitching together vector databases and custom RAG, or managing piles of markdown files.
- **Build-vs-buy math**: a single production context pipeline costs $200-300k/yr + a dedicated engineer ($185-265k/yr). Gartner's first-implementation budget is $500k-1.5M.

### What Wire gives you
- **Per-container isolation** — each container is its own database with its own audit trail. This is a compliance primitive: data segregation by purpose, by compliance scope, or by data subject (per-patient containers for healthcare, per-client for fintech).
- **Audit trail built in** — who accessed what, when, from which agent. Maps directly to GDPR Article 30 (ROPA), Article 32 (security logging), and EU AI Act Article 12 (automatic event logging).
- **Bring-your-own-cloud** — data stays in your perimeter. EU customer data stays in EU infrastructure.
- **Portable** — containers are exportable, inspectable, self-hostable. You own your context; you're not locked in.

### The deployment
- Weeks, not quarters. Same container serves open-source self-hosting and the hosted platform — no fork, no privileged path.
- Enterprise tier: SSO (SAML/OIDC), SCIM provisioning, single-tenant isolation, audit log export, custom DPA, dedicated SLAs.

### The honest status
- "Status: early. The shape is settled and the test suite is green, but interfaces can still change." We say it plainly.
- SOC 2 Type I + GDPR readiness in progress. HIPAA + BAA on roadmap. We won't claim certifications we don't have.

---

## For developers (bottoms-up adoption)

### The pain you feel
- Every time you switch from Claude to GPT (or Cursor, or Codex), you start from scratch. Conversation history, accumulated project knowledge, decisions — locked to the tool that created it.
- You copy-paste, re-explain, re-upload. You lose time and nuance degrades in translation.
- Token costs grow because you re-process the same context every session.

### What Wire does
- Project context lives in a **Wire container** — portable, model-agnostic, reachable over MCP or REST.
- Switch from Claude to GPT: connect to the same container, resume with full context intact. No re-processing, no re-explanation.
- **Five tools per container**: `explore` (discover structure), `search` (hybrid retrieval), `navigate` (traverse), `write` (save), `delete` (remove). The intelligence is in the container's analysis pipeline, not in a bloated tool surface.
- Open-source. Self-hostable. Inspect it line by line. Own your context.

### Try it
- Free tier: 3,000 starter credits, no credit card. Ephemeral containers last 7 days.
- Activation goal: create a container + connect an MCP-compatible tool in under 60 seconds.

---

## Objection handling

### "MCP came from Anthropic — why won't they commoditize this?"
MCP is the open rail; Wire is the neutral layer above it. A model vendor wants context locked to its model (stickier). An open, portable, self-hostable container is the structurally opposite bet they will not make. Hyperscalers ship primitives (object storage, vector index), not the opinionated governance-and-audit product on top — that layer is always left to independent vendors.

### "Box already does this — 40+ tools, enterprise-grade."
Box is an access layer over an existing content repository. The content already lives in Box; MCP makes it reachable to AI. Wire creates a **new** data layer purpose-built for AI consumption — bidirectional from creation, not read-heavy access to files and folders. Tool count is a category error: Wire's 5 tools are generic primitives; the intelligence is in the container. They're complementary — Box content can be uploaded to a Wire container.

### "Why not just use LangChain?"
LangChain is a library for building context plumbing, not a product that replaces context infrastructure. Their context caching is session-scoped only — not portable across agents or teams. Wire composes with LangChain: it's the context slice beneath orchestration frameworks.

### "We'll just build it ourselves."
That's the real competitor on every deal. Build cost: $200-300k/yr per pipeline + a dedicated engineer. Usually missing the audit piece. Wire replaces that across the spectrum at a fraction of the cost, with SOC 2 + GDPR roadmap and audit-and-ownership from day one.

### "Is it production-ready?"
The shape is settled and the test suite is green, but interfaces can still change. We're honest about that. For design partners, we embed a forward-deployed engineer to shape the integration with your team.

---

## Why now (the timing case)

| Signal | Evidence |
|--------|----------|
| Agent adoption accelerating | Gartner: 33% of enterprise SW interactions via agents by 2028 |
| Regulation creating buying gates | CA CCPA ADMT (2027), CO AI Act, EU AI Act logging, CT AI Act |
| MCP as open standard | From Anthropic, adopted by OpenAI + Google |
| Context becoming ownable asset | Teams want to own/control agent context, not rent it from model vendors |
| Market in early innings | Only 7% of companies have fully scaled AI; 62% still experimenting |
| Competitor validated the problem | LangChain shipped context caching (session-scoped) — partial solution confirms demand |

---

## Related

- [Collated Research Brief](collated-research.md) — full synthesis of all harness findings
- [Brand voice and positioning](marketing/brand.md) — voice rules, what we never say
- [Competitive landscape](market/competitive-landscape.md) — four-category framework, structural moats
- [Market report: Wire vs Smithery vs Box](market/market-report-wire-vs-smithery-vs-box.md) — direct competitor comparison
- [TAM model](market/tam-model.md) — market sizing
- [Sales strategy](sales/strategy.md) — dual-motion GTM, pipeline, blockers
- [LangChain observation](observations/2026-07-09-langchain-released-context-caching-but-it-is-session-scoped-only-not-portable-across-agents-or-teams-wire-s-container-approach-solves-this-by-making-context-a-shareable-artifact.md) — competitive validation
