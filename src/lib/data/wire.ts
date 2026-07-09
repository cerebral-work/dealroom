// Wire PWA — structured research data
// Source: research/collated-research.md + underlying files

export const wire = {
  name: "Wire",
  tagline: "Code has GitHub. Everything else has Wire.",
  taglineSecondary: "Permissioned, portable containers of context that any agent can reach.",
  domain: "usewire.io",
  stage: "Pre-seed",
  raise: "$375k",
  anchor: "Cerebral ($150k anchored)",
  status: "early",
  statusNote: "The shape is settled and the test suite is green, but interfaces can still change.",
};

export const market = {
  tam: "$30-35B",
  tamBreakdown: "~10M accounts × ~$2.5k ARPU = $25B subscription + $5-10B enterprise",
  sam: "$10-22B",
  som3yr: "$18-42M ARR",
  gartnerSignal: "33% of enterprise software interactions will run through agents by 2028",
  aiScaling: "Only 7% of companies have fully scaled AI — early innings",
  genAIGrowth: "GenAI spend 3.2x YoY ($11.5B → $37B)",
  sizing: [
    { layer: "TAM (subscription + enterprise)", value: "$30-35B", basis: "~500M businesses × ~2% agent penetration × ~$2.5k ARPU = $25B sub; +$5-10B enterprise" },
    { layer: "SAM (reachable today)", value: "$10-22B", basis: "Developer/SMB $2-5B + mid-market $3-7B + regulated enterprise $5-10B" },
    { layer: "SOM (3-yr, 2026-2029)", value: "$18-42M ARR", basis: "2026: $0-150k → 2027: $425k-1.15M → 2028: $3.25-9.25M → 2029: $18.5-42.5M" },
  ],
  segments: [
    { id: 1, name: "Solo devs switching AI tools", motion: "Bottoms-up", arpu: "$9-19/mo", priority: 4 },
    { id: 2, name: "Teams using AI for work", motion: "Bottoms-up", arpu: "$199/mo", priority: 3 },
    { id: 3, name: "Cost-conscious API users", motion: "Bottoms-up", arpu: "credit", priority: 5 },
    { id: 4, name: "Regulated fintech", motion: "Top-down", arpu: "$150-300k ACV", priority: 1 },
    { id: 5, name: "Regulated healthcare", motion: "Top-down", arpu: "$150-300k ACV", priority: 1 },
    { id: 6, name: "Data-sensitive managed svc", motion: "Top-down + PLG", arpu: "$50-150k ACV", priority: 2 },
  ],
  timingSignals: [
    { signal: "Agent adoption accelerating", evidence: "Gartner: 33% of enterprise SW interactions via agents by 2028" },
    { signal: "Regulation creating buying gates", evidence: "CA CCPA ADMT (2027), CO AI Act, EU AI Act logging, CT AI Act" },
    { signal: "MCP as open standard", evidence: "From Anthropic, adopted by OpenAI + Google" },
    { signal: "Context becoming ownable asset", evidence: "Teams want to own/control agent context, not rent it from model vendors" },
    { signal: "Market in early innings", evidence: "Only 7% of companies have fully scaled AI; 62% still experimenting" },
    { signal: "Competitor validated the problem", evidence: "LangChain shipped context caching (session-scoped) — partial solution confirms demand" },
  ],
};

export const competition = {
  categories: [
    { name: "Systems of record building inward", who: "Salesforce, ServiceNow, Notion", disadvantage: "Can't be the neutral layer between themselves and a competitor" },
    { name: "Model labs + hyperscalers", who: "Anthropic, OpenAI, AWS, Google, MS", disadvantage: "Model vendors want context locked to their model (stickier)" },
    { name: "Horizontal AI infra libraries", who: "LangChain ($1.25B), LlamaIndex, CrewAI, Mastra", disadvantage: "Libraries, not products that replace context infra" },
    { name: "Build vs buy at enterprise", who: "Internal teams (vector DB + custom RAG + bespoke auth)", disadvantage: "$200-300k/yr per pipeline + dedicated engineer — the real competitor on every deal" },
  ],
  direct: [
    { name: "Smithery", category: "MCP server registry + connection manager", relation: "Complementary", note: "Holds no content; a Wire container could be published as a Smithery server" },
    { name: "Box", category: "Enterprise content management + MCP server", relation: "Incumbent", note: "40+ tools vs Wire's 5 (category error — Wire's 5 are generic primitives)" },
    { name: "Cognee", category: "Graph-based approach", relation: "Competitive", note: "Wire's per-container isolation vs Cognee's graph approach" },
    { name: "LangChain", category: "AI infra library + context caching", relation: "Validated problem", note: "Session-scoped caching only, not portable across agents or teams" },
  ],
  moats: [
    { name: "Open-source container as adoption engine", detail: "Inspectable, self-hostable. No closed vendor can offer this." },
    { name: "Neutral layer above MCP", detail: "Portable across model providers. Model vendors won't make this bet." },
    { name: "Audit-and-ownership from day one", detail: "The regulated buyer's requirement, built into the container not bolted on." },
    { name: "Hook architecture", detail: "Same artifact serves OSS and commercial. No fork, no privileged path." },
    { name: "Per-container isolation", detail: "Each container its own DB, addressable, portable. Security/compliance primitive." },
  ],
};

export const compliance = {
  blockers: [
    { accreditation: "SOC 2 Type I + GDPR readiness", need: "All regulated EU/UK", cost: "$20-35k", timeline: "~6 months", blocks: "NELFT, Praxent" },
    { accreditation: "HIPAA readiness + BAA", need: "US healthcare", cost: "TBD", timeline: "TBD", blocks: "Spring Health" },
    { accreditation: "UK GDPR + DPA 2018", need: "UK (NELFT)", cost: "part of above", timeline: "parallel", blocks: "NELFT (NHS procurement)" },
  ],
  architectureMapping: [
    { feature: "Per-container isolation", mapsTo: "GDPR Art. 5 — purpose limitation, minimization; per-patient containers for healthcare" },
    { feature: "Audit trail", mapsTo: "GDPR Art. 30 (ROPA) + Art. 32 (logging) + AI Act Art. 12 (automatic event logging)" },
    { feature: "RBAC + per-container permissions", mapsTo: "Art. 32 security + Art. 22 human oversight" },
    { feature: "Portable single-file containers", mapsTo: "Art. 20 — data portability + ownership principle" },
    { feature: "BYOC", mapsTo: "Data residency; EU customer data stays in EU infra → Chapter V transfers" },
  ],
  penalties: [
    { regulation: "EU AI Act", maxPenalty: "€35M / 7% global turnover", severity: 5 },
    { regulation: "GDPR", maxPenalty: "€20M / 4% global turnover", severity: 4 },
    { regulation: "Quebec Law 25", maxPenalty: "CAD$25M / 4%", severity: 3 },
    { regulation: "NIS2", maxPenalty: "€10M / 2%", severity: 3 },
    { regulation: "HIPAA", maxPenalty: "$2.19M annual cap (Tier 4)", severity: 2 },
    { regulation: "BIPA (IL)", maxPenalty: "$5,000/violation per-person (retroactive)", severity: 2 },
  ],
  jurisdictions: [
    { region: "US Federal", key: "FTC Act §5 (AI claims substantiation, $50,120/violation), HIPAA (PHI, BAA, $2.19M cap)" },
    { region: "US States", key: "20 comprehensive privacy laws; AI-specific in CA (CCPA/CPRA + ADMT), CO (AI Act SB 24-205), TX (TRAIGA), CT (AI Act SB 5), IL (AIVIA + BIPA), NYC (Local Law 144)" },
    { region: "Canada", key: "PIPEDA (federal); Quebec Law 25 (strictest — mandatory PIA, opt-in consent); Ontario PHIPA (mandatory audit logs)" },
    { region: "Mexico", key: "LFPDPPP 2025 reform — processors now in scope; right to object to automated processing" },
    { region: "EU", key: "GDPR (Art. 30 ROPA, Art. 35 DPIA, Art. 28 DPA, Art. 32 security, Art. 22 automated decisions, Chapter V transfers); EU AI Act (4 risk tiers, Art. 12 logging); NIS2 (cybersecurity, executive liability)" },
    { region: "EU Members", key: "DE (BDSG + strict TIA), FR (CNIL AI guidance), IT (Law 132/2025 — first national AI law), ES (AESIA), NL (decentralized)" },
  ],
  marketRanking: [
    { rank: 1, market: "California", enterpriseSW: "$21.2B" },
    { rank: 2, market: "Texas", enterpriseSW: "$14.0B" },
    { rank: 3, market: "Germany", enterpriseSW: "$13.6B" },
    { rank: 4, market: "New York", enterpriseSW: "$11.8B" },
    { rank: 5, market: "France", enterpriseSW: "$11.2B" },
    { rank: 6, market: "Canada", enterpriseSW: "$9.9B" },
    { rank: 7, market: "Florida", enterpriseSW: "$8.8B" },
    { rank: 8, market: "Illinois", enterpriseSW: "$5.9B" },
    { rank: 9, market: "Mexico", enterpriseSW: "$5.8B" },
  ],
  gaps: ["DPA template (Art. 28)", "DPIA framework", "TIA documentation", "Container-level retention/deletion (Art. 17 erasure)", "Sub-processor disclosure flow"],
};

export const economics = {
  pricing: [
    { tier: "Free", price: "$0", credits: "3,000 starter", motion: "Self-serve" },
    { tier: "Starter", price: "$9/mo", credits: "10,000", motion: "PLG" },
    { tier: "Pro", price: "$19/mo", credits: "20,000", motion: "PLG" },
    { tier: "Team", price: "$199/mo", credits: "200,000", motion: "PLG + sales-assist" },
    { tier: "Credit packs", price: "$10-500", credits: "variable", motion: "One-time" },
    { tier: "Managed service", price: "$50-150k ACV", credits: "—", motion: "Sales-led" },
    { tier: "Enterprise BYOC", price: "$150-300k ACV", credits: "—", motion: "Founder-led / FDE" },
  ],
  creditCosts: [
    { action: "wire_search (hybrid retrieval)", credits: 5 },
    { action: "File download (MCP resources/read)", credits: 2 },
    { action: "Tool call (explore + navigate)", credits: 1 },
    { action: "Container storage", credits: "1 per 1,000 entries/day (capped 100/day)" },
    { action: "Account/container creation", credits: 0 },
    { action: "File uploads", credits: 0 },
    { action: "wire_write", credits: 0 },
    { action: "wire_delete", credits: 0 },
    { action: "Background analysis", credits: "0 (currently — margin risk)" },
  ],
  buildVsBuy: [
    { item: "Dedicated AI engineer", annual: "$185-265k" },
    { item: "Platform (vector DB, API, monitoring)", annual: "$20-40k" },
    { item: "Single production pipeline", annual: "$200-300k/yr" },
    { item: "Gartner first-implementation budget", annual: "$500k-1.5M" },
    { item: "Mid-market equivalent", annual: "$70-120k" },
  ],
  cac: [
    { segment: "Solo dev", motion: "PLG", cac: "~$0-50 (organic)", ltv: "$108-228/yr", payback: "~30 months" },
    { segment: "Team (SMB)", motion: "PLG + assist", cac: "$100-500", ltv: "$2,388/yr", payback: "~15 months" },
    { segment: "Mid-market managed", motion: "Sales-led", cac: "$5-20k", ltv: "$50-150k ACV", payback: "~3 months" },
    { segment: "Enterprise BYOC", motion: "Founder→AE", cac: "$20-80k", ltv: "$150-300k ACV", payback: "~3 months" },
  ],
  discountPolicy: [
    { scenario: "Standard pricing", discount: "0%", approval: "—" },
    { scenario: "Design partner pilot", discount: "50-100%", approval: "Founder" },
    { scenario: "Annual upfront", discount: "10-15%", approval: "AE" },
    { scenario: "Multi-year", discount: "15-20%", approval: "VP Sales" },
    { scenario: "Enterprise negotiation", discount: "case-by-case", approval: "Founder (pre-seed)" },
  ],
  riskNote: "Analysis is currently free (CREDITS_PER_ANALYSIS = 0). AI inference is COGS. Must charge before seed.",
};

export const pipeline = [
  {
    org: "IndiaStox",
    segment: "Managed service (financial markets, incubated by FlatironX)",
    stage: "Hot — paid POC in motion",
    motion: "Top-down",
    whyWire: "Don't want to own/run agent infra; Wire manages it. Custom feeds: influencer posts, India news, equity data.",
    blocker: "First paid deal sets pricing precedent",
    targetClose: "2026-Q3",
    dealSize: "TBD",
  },
  {
    org: "NELFT",
    segment: "Regulated healthcare (UK NHS forensic mental-health trust)",
    stage: "Warm — discovery",
    motion: "Top-down",
    whyWire: "Resolves failure modes of rolling own markdown context; per-container isolation = compliance primitive",
    blocker: "SOC 2 / UK GDPR not in place; NHS procurement 6-12 months",
    targetClose: "2027-Q1",
    dealSize: "$150-300k ACV",
  },
  {
    org: "Spring Health",
    segment: "Regulated healthcare (US mental health, HIPAA)",
    stage: "Warm — discovery",
    motion: "Top-down",
    whyWire: "Per-patient container isolation; audit built in; data-ownership concerns surfaced",
    blocker: "HIPAA readiness + BAA not on roadmap yet",
    targetClose: "2027-Q1",
    dealSize: "$150-300k ACV",
  },
  {
    org: "Praxent",
    segment: "Regulated fintech consultancy (US enterprise)",
    stage: "Warm — discovery",
    motion: "Top-down",
    whyWire: "BYOC data ownership; sync+audit demo landed interest. Multiplier: recommends Wire to fintech clients",
    blocker: "Security review; consultancy model = longer evaluation",
    targetClose: "2027-Q1",
    dealSize: "$150-300k ACV",
  },
];

export const product = {
  tools: [
    { name: "wire_explore", function: "Discover entity types, fields, relationships", cost: "1 credit" },
    { name: "wire_search", function: "Fuzzy hybrid retrieval over raw content", cost: "5 credits" },
    { name: "wire_navigate", function: "Traverse from search match: adjacent chunks, full source, related entries", cost: "1 credit" },
    { name: "wire_write", function: "Save an entry (text, structured data, or markdown)", cost: "—" },
    { name: "wire_delete", function: "Remove an entry by ID", cost: "—" },
  ],
  sixProperties: [
    { name: "Add context", description: "Any file type: PDF, Word, CSV, JSON, markdown, and more. Everything lands in one structured source." },
    { name: "Scope", description: "A container per person, team, or project, down to a single session. Agents see only what's theirs." },
    { name: "Permission", description: "Scoped credentials with tool allowlists on top. Nothing escalates." },
    { name: "Retrieve", description: "Search agents can actually use, with provenance on every result." },
    { name: "Sync", description: "Always current as context changes. No stale snapshots, no re-exports." },
    { name: "Audit", description: "Every access on the record: who read what, when, on whose authority." },
  ],
  shipped: [
    "Hosted MVP at usewire.io",
    "wire-memory plugin (Claude Code, Cursor, Codex)",
    "Public SDK (@usewire/sdk)",
    "n8n-nodes-wire integration",
    "wire-plugins ecosystem",
  ],
  inFlight: [
    "Open-source wire container — approaching public release, test suite green, interfaces can still change",
    "MCP server spec fs-001 — draft, acceptance criteria not yet met",
  ],
  planned: [
    "rm-002: Enterprise SSO + SCIM (SAML 2.0 + OIDC + SCIM 2.0) — Series A, gated on SOC 2",
  ],
  activationMetric: "First container created + first MCP connection — under 60 seconds",
};

export const gtm = {
  dualMotion: [
    { dimension: "Entry", bottomsUp: "Open-source container, hosted free tier", topDown: "Founder-led sales call" },
    { dimension: "Buyer", bottomsUp: "Developer, team lead", topDown: "Platform lead, security lead, eng exec" },
    { dimension: "Price", bottomsUp: "$9-199/mo (credits)", topDown: "$150-300k ACV" },
    { dimension: "Cycle", bottomsUp: "Self-serve, days", topDown: "60-90 days evaluation + pilot" },
    { dimension: "Trigger", bottomsUp: "Team usage, managed sync, compliance asks", topDown: "Regulatory deadline, stalled rollout" },
    { dimension: "Deploy", bottomsUp: "Hosted (usewire.io)", topDown: "Bring-your-own-cloud" },
  ],
  salesOrg: [
    { phase: "Pre-seed (now)", arr: "$0-200k", team: "Founders only", hire: "None (founder = first FDE)", acv: "$50-100k design partner", cycle: "30-60 days" },
    { phase: "Seed", arr: "$200k-1M", team: "Founder + 1 AE + 1 FDE", hire: "First AE (closed $50k+ deals), first FDE (embeds with regulated partners)", acv: "$50-150k", cycle: "2-4 months" },
    { phase: "Series A", arr: "$1-3M", team: "VP Sales + 2-3 AEs + 2 SDRs + 2-3 FDEs + 1 SE", hire: "VP Sales (scaled $1M→$10M before, NOT a big-co VP)", acv: "$50-250k", cycle: "3-6 months" },
    { phase: "Series B", arr: "$3-10M", team: "VP + 5-8 AEs + 4-6 SDRs + 4-6 FDEs + 2 SEs + CS", hire: "Second leader, CS, RevOps", acv: "$100-500k", cycle: "4-6 months" },
  ],
  dontHire: "VP Sales or SDRs before Series A. Founder runs first 5-10 enterprise deals personally and documents the playbook.",
  pqlRule: "25+ active users from one domain OR expansion request >$25K → transfers to enterprise team",
};

export const brand = {
  positioning: {
    for: "teams putting agents into production workflows",
    who: "need a context layer they can own, audit, and control",
    wireIs: "the neutral, portable, permissioned context container",
    that: "sits between agents and systems of record, reachable over MCP or REST",
    unlike: "building it by hand, managing markdown, or giving agents direct access to systems of record",
    wire: "lets teams deploy agents in weeks not quarters, with audit trails and data governance built in",
  },
  principles: [
    { name: "Lead with pain, not features", detail: "Users don't care about 'composable context containers' until they feel the pain of not having them." },
    { name: "Behavior, not implementation", detail: "Describe behavior and capability, not infrastructure. Say 'isolated per-container state,' not 'Cloudflare Durable Object.'" },
    { name: "Engineer register, not marketing register", detail: "No invented names, no metaphors in technical content. Specific, factual, load-bearing language." },
    { name: "Portable, not proprietary", detail: "Users own their context, can take it anywhere, inspect it line by line. The brand is not about lock-in." },
    { name: "Audit and ownership as first principles", detail: "What the regulated buyer demands today, the long tail expects tomorrow. Lead with trust, audit, and ownership." },
  ],
  problems: [
    { id: 1, name: "AI vendor lock-in", oneLiner: "Try different models without losing your context", target: "Power users switching tools", severity: "High" },
    { id: 2, name: "Team context distribution", oneLiner: "Stop hoping your team downloaded the latest docs", target: "Teams using AI for work", severity: "High" },
    { id: 3, name: "Token costs from reprocessing", oneLiner: "Stop reprocessing the same context every session", target: "API users, cost-conscious devs", severity: "Med-High" },
    { id: 4, name: "Context window limits", oneLiner: "Your context is too big for the agent", target: "Large knowledge base owners", severity: "High" },
    { id: 5, name: "Public context distribution", oneLiner: "Let anyone learn about your product via MCP", target: "Dev advocates, OSS maintainers", severity: "Med (emerging)" },
  ],
  tone: [
    { quality: "Confident, not arrogant", detail: "Wire is the fourth option after three bad ones. State it plainly." },
    { quality: "Technical, not jargon-filled", detail: "MCP, REST, containers, audit trails — precise terms, not buzzwords." },
    { quality: "Direct, not verbose", detail: "Short sentences. No filler." },
    { quality: "Honest about limitations", detail: "'Status: early. The shape is settled and the test suite is green, but interfaces can still change.' Say it." },
  ],
  neverSay: [
    "Never name infrastructure providers in customer-facing copy (Cloudflare, Neon, Gemini — describe behavior instead)",
    "Never name discovery/fetch vendors in customer-facing copy (Exa, Firecrawl — describe behavior instead)",
    "Never claim compliance certifications we don't have (SOC 2, GDPR are 'building toward,' not 'certified')",
    "Never use 'AI-powered' as a feature — everything is AI-native, that's the point",
  ],
};

export const socialProof = [
  { metric: "23,316", label: "Google Search Console impressions (90 days)", note: "Now 800-1,000+/day, avg position 6.81" },
  { metric: "4", label: "Pipeline conversations", note: "IndiaStox (paid POC), NELFT, Spring Health, Praxent" },
  { metric: "Corey Quinn", label: "Cited Wire in analyst piece", note: "Industry recognition" },
  { metric: "MCP", label: "Open standard adopted by OpenAI + Google", note: "From Anthropic — not a vendor rail" },
];

export const objections = [
  {
    q: "MCP came from Anthropic — why won't they commoditize this?",
    a: "MCP is the open rail; Wire is the neutral layer above it. A model vendor wants context locked to its model (stickier). An open, portable, self-hostable container is the structurally opposite bet they will not make. Hyperscalers ship primitives, not the opinionated governance-and-audit product on top — that layer is always left to independent vendors.",
  },
  {
    q: "Box already does this — 40+ tools, enterprise-grade.",
    a: "Box is an access layer over an existing content repository. Wire creates a new data layer purpose-built for AI consumption — bidirectional from creation. Tool count is a category error: Wire's 5 tools are generic primitives; the intelligence is in the container. They're complementary — Box content can be uploaded to a Wire container.",
  },
  {
    q: "Why not just use LangChain?",
    a: "LangChain is a library for building context plumbing, not a product that replaces context infrastructure. Their context caching is session-scoped only — not portable across agents or teams. Wire composes with LangChain: it's the context slice beneath orchestration frameworks.",
  },
  {
    q: "We'll just build it ourselves.",
    a: "That's the real competitor on every deal. Build cost: $200-300k/yr per pipeline + a dedicated engineer. Usually missing the audit piece. Wire replaces that at a fraction, with SOC 2 + GDPR roadmap and audit-and-ownership from day one.",
  },
  {
    q: "Is it production-ready?",
    a: "The shape is settled and the test suite is green, but interfaces can still change. We're honest about that. For design partners, we embed a forward-deployed engineer to shape the integration with your team.",
  },
];

export const glossary = [
  { term: "Context Container", definition: "A self-contained MCP server with its own content, access controls, and audit log. The fundamental unit of Wire." },
  { term: "MCP", definition: "Model Context Protocol — open standard from Anthropic, adopted by OpenAI and Google. The protocol AI agents use to access external context." },
  { term: "BYOC", definition: "Bring Your Own Cloud — enterprise deployment where Wire runs in the customer's own cloud infrastructure. Data never leaves the perimeter." },
  { term: "Per-container isolation", definition: "Each container is its own database with its own audit trail. No shared state between containers. Security and compliance primitive." },
  { term: "Audit trail", definition: "Immutable record of who accessed what, when, from which agent. Maps to GDPR Art. 30 (ROPA), Art. 32 (logging), AI Act Art. 12." },
  { term: "RBAC", definition: "Role-based access control — admin, member, viewer roles per container. Scoped credentials with tool allowlists." },
  { term: "Portability", definition: "Containers are exportable, inspectable, self-hostable. You own your context — not locked into a model vendor or platform." },
  { term: "PQL", definition: "Product-qualified lead — 25+ active users from one domain or expansion request >$25K triggers enterprise handoff." },
  { term: "FDE", definition: "Forward-deployed engineer — embeds with design partners to shape context and integration. Palantir model." },
  { term: "Hook architecture", definition: "Same artifact serves open-source and commercial. No fork, no privileged path. Wire dogfoods the seam." },
];

export const integrations = [
  { name: "Claude Desktop", type: "MCP client", status: "Working" },
  { name: "Claude Code", type: "MCP client", status: "Working" },
  { name: "Cursor", type: "MCP client", status: "Working" },
  { name: "Codex", type: "MCP client", status: "Working" },
  { name: "Cline", type: "MCP client", status: "Working" },
  { name: "n8n", type: "No-code automation", status: "Working (n8n-nodes-wire)" },
  { name: "@usewire/sdk", type: "Developer SDK", status: "Working" },
  { name: "wire-memory", type: "Claude Code plugin", status: "Working" },
  { name: "wire-plugins", type: "Plugin ecosystem", status: "Working" },
  { name: "REST API", type: "HTTP transport", status: "Working" },
];

export const useCases = [
  { title: "Fintech per-client isolation", description: "Each client gets their own container — their data, their audit trail, their access controls. Agents see only what's theirs.", segment: "Regulated fintech" },
  { title: "Healthcare per-patient containers", description: "Per-patient containers with HIPAA-grade isolation. Audit trail for every access. Data ownership by design.", segment: "Regulated healthcare" },
  { title: "Developer portability across Claude/GPT", description: "Switch from Claude to GPT, connect to the same container, resume with full context intact. No re-processing.", segment: "Solo devs / teams" },
  { title: "Managed service context delivery", description: "Don't want to own and run agent context infrastructure? Wire manages it — custom feeds, agents consume over MCP.", segment: "IndiaStox (live POC)" },
  { title: "Agency multi-client context", description: "Each agency client gets their own container. One Wire account, many isolated contexts. Switch between clients without context bleed.", segment: "AI agencies" },
  { title: "Public context distribution", description: "Flip a container to public for read-only access. Any agent can connect and learn about your product via MCP.", segment: "Dev advocates / OSS" },
];

// Speculative roadmap — grounded in current repo state, chasing northstars
export const roadmap = [
  {
    phase: "Current State (2026-07)",
    status: "in-flight",
    items: [
      "Open-source wire container — test suite green, interfaces stabilizing",
      "Hosted MVP live at usewire.io",
      "MCP server spec fs-001 — draft, acceptance criteria not met",
      "4 pipeline conversations (IndiaStox POC hot)",
    ],
    northstar: "Ship the container",
  },
  {
    phase: "Phase 1: Foundation (2026 Q3-Q4)",
    status: "planned",
    items: [
      "Open-source container public release — adoption engine",
      "MCP spec fs-001 acceptance criteria met (Claude + Cursor + 1 more, <60s setup)",
      "SOC 2 Type I + GDPR readiness ($20-35k, ~6 months) — gating blocker for regulated deals",
      "3-5 design partners deployed in production on their own data",
      "First paid contract converted (IndiaStox POC → annual)",
    ],
    northstar: "BYOC + Audit",
  },
  {
    phase: "Phase 2: Accreditation (2027 Q1-Q2)",
    status: "planned",
    items: [
      "SOC 2 Type I achieved — regulated buyers can sign",
      "BYOC deployment path production-ready — data stays in customer perimeter",
      "Audit trail export (CSV/JSON) — maps to GDPR Art. 30 ROPA, AI Act Art. 12",
      "DPA template, DPIA framework, TIA documentation",
      "HIPAA readiness + BAA for US healthcare (Spring Health)",
      "Enterprise tier pricing + packaging defined",
    ],
    northstar: "Audit + Observability",
  },
  {
    phase: "Phase 3: Governance (2027 Q3-Q4)",
    status: "speculative",
    items: [
      "Enterprise SSO + SCIM (rm-002) — SAML 2.0 + OIDC + SCIM 2.0",
      "Container-level observability dashboard — real-time access patterns, anomaly detection",
      "Retention/deletion policies (GDPR Art. 17 erasure) — automated container lifecycle",
      "Sub-processor disclosure flow",
      "EU data residency — pinned region deployment for EU customers",
      "Seed round closed, first AE + FDE hired",
    ],
    northstar: "Observability + Cryptographic-Security",
  },
  {
    phase: "Phase 4: Hardening (2028 H1)",
    status: "speculative",
    items: [
      "Cryptographic container integrity — signed access trails, tamper-evident audit",
      "Container-level encryption at rest + in transit (BYOC-native)",
      "EU AI Act compliance — Art. 12 automatic event logging, risk classification",
      "Multi-region BYOC — US, EU, UK data residency",
      "Channel partnerships — Salesforce/ServiceNow agents pulling from Wire",
    ],
    northstar: "Cryptographic-Security + MCP",
  },
  {
    phase: "Phase 5: Scale (2028 H2+)",
    status: "speculative",
    items: [
      "MCP ecosystem leadership — Wire containers as the standard context layer for MCP agents",
      "Wire University certification — MongoDB model",
      "Wire Context Week — Supabase launch-week model",
      "Series A — sales org scaling, geographic expansion",
      "30,000-40,000 Minimum Viable Audience (HashiCorp threshold)",
    ],
    northstar: "MCP ecosystem",
  },
];

export const risks = [
  { risk: "SOC 2 / GDPR not in place", impact: "Blocks every regulated deal (NELFT, Praxent, Spring Health)", severity: "Critical", mitigation: "$20-35k investment, ~6 months — pre-seed round funds this" },
  { risk: "First paid contract price sets precedent", impact: "IndiaStox POC conversion — too low anchors all future deals", severity: "High", mitigation: "Founder approves; design partner pricing 50-100% off only with explicit terms" },
  { risk: "Analysis is currently free (COGS)", impact: "AI inference is COGS — margin risk as usage grows", severity: "High", mitigation: "Must charge for analysis before seed round" },
  { risk: "Box incumbent advantage", impact: "Enterprises add AI access to existing content without migration", severity: "Medium", mitigation: "Wire creates new data layer, not access layer — complementary, not competitive" },
  { risk: "MCP commoditization by model labs", impact: "Anthropic could ship competing context layer", severity: "Medium", mitigation: "Model vendors want context locked to their model — structurally opposite bet" },
  { risk: "Open-source container release delay", impact: "Gates the entire bottoms-up PLG motion", severity: "High", mitigation: "fs-001 acceptance criteria: 3 MCP clients, <60s setup, context persistence" },
  { risk: "Heterogeneous deals", impact: "Non-standard terms per deal compound operational cost", severity: "Medium", mitigation: "Standard terms non-negotiable; variable terms limited to deal size, residency, compliance, integration scope" },
];

export const researchFiles = [
  { path: "collated-research.md", domain: "root", title: "Collated Research Brief", size: "30KB", description: "Single-read synthesis of all harness findings" },
  { path: "talking-points.md", domain: "root", title: "Talking Points", size: "10KB", description: "Audience-segmented talking points" },
  { path: "README.md", domain: "root", title: "Research Index", size: "5KB", description: "Master index of all research" },
  { path: "market/tam-model.md", domain: "market", title: "TAM / SAM / SOM Model", size: "5KB", description: "$30-35B TAM, $10-22B SAM, $18-42M 3yr SOM" },
  { path: "market/competitive-landscape.md", domain: "market", title: "Competitive Landscape", size: "5KB", description: "4 competitor categories, 5 structural moats" },
  { path: "market/segments.md", domain: "market", title: "Target Segments", size: "4KB", description: "6 segments across 2 motions" },
  { path: "market/market-report-wire-vs-smithery-vs-box.md", domain: "market", title: "Wire vs Smithery vs Box", size: "18KB", description: "Direct competitor comparison" },
  { path: "market/segment-ai-first-startups-...md", domain: "market", title: "AI-First Startups Segment", size: "14KB", description: "Deep segment profile" },
  { path: "sales/strategy.md", domain: "sales", title: "Sales Strategy", size: "4KB", description: "Dual-motion GTM, pipeline, blockers" },
  { path: "sales/deal-economics.md", domain: "sales", title: "Deal Economics", size: "4KB", description: "Pricing tiers, credit costs, discount policy" },
  { path: "sales/cac-model.md", domain: "sales", title: "CAC Model", size: "4KB", description: "Customer acquisition cost by segment" },
  { path: "sales/sales-strategies-research.md", domain: "sales", title: "Sales Strategies Research", size: "69KB", description: "10 comparable companies → sales org plan" },
  { path: "marketing/brand.md", domain: "marketing", title: "Brand Voice & Positioning", size: "5KB", description: "Voice, positioning, 5 problems, tone rules" },
  { path: "marketing/channel-strategy.md", domain: "marketing", title: "Channel Strategy", size: "5KB", description: "7 channels by priority" },
  { path: "marketing/marketing-strategies-research.md", domain: "marketing", title: "Marketing Strategies Research", size: "86KB", description: "7 comparable companies → marketing plan" },
  { path: "marketing/campaign-problem-first-content-series-...md", domain: "marketing", title: "Problem-First Content Series", size: "11KB", description: "Campaign targeting developers" },
  { path: "customers/indiastox.md", domain: "customers", title: "IndiaStox", size: "2KB", description: "Hot — paid POC, managed service" },
  { path: "customers/nelft.md", domain: "customers", title: "NELFT", size: "2KB", description: "Warm — UK NHS, regulated healthcare" },
  { path: "customers/spring-health.md", domain: "customers", title: "Spring Health", size: "2KB", description: "Warm — US mental health, HIPAA" },
  { path: "customers/praxent.md", domain: "customers", title: "Praxent", size: "2KB", description: "Warm — US fintech consultancy" },
  { path: "compliance/audit-requirements.md", domain: "compliance", title: "Audit Requirements", size: "64KB", description: "60+ sources, multi-jurisdiction compliance matrix" },
  { path: "compliance/gdpr-data-processing-requirements-...md", domain: "compliance", title: "GDPR Data Processing Requirements", size: "9KB", description: "GDPR deep-dive for context containers" },
  { path: "compliance/market-ranking.md", domain: "compliance", title: "Market Ranking", size: "60KB", description: "50 states + CA + MX + EU27 ranking" },
  { path: "observations/2026-07-09-langchain-...md", domain: "observations", title: "LangChain Context Caching", size: "3KB", description: "Competitive validation — session-scoped only" },
  { path: "observations/2026-07-09-ars-contexta-tooling-research.md", domain: "observations", title: "Ars Contexta Tooling Research", size: "67KB", description: "Plugin analysis (meta)" },
  { path: "sessions/2026-07-09-discovery-call-...nelft...md", domain: "sessions", title: "NELFT Discovery Call", size: "6KB", description: "Discovery call notes" },
  { path: "product/specs/wire-mcp-server-...md", domain: "product", title: "MCP Server Spec (fs-001)", size: "7KB", description: "Feature spec — draft" },
  { path: "product/roadmap/enterprise-sso-and-scim-...md", domain: "product", title: "Enterprise SSO + SCIM (rm-002)", size: "5KB", description: "Roadmap item — planned" },
  { path: "product/user-stories/when-i-switch-between-claude-and-gpt-...md", domain: "product", title: "Context Portability (us-001)", size: "4KB", description: "User story — foundational" },
  { path: "codebase/wire-container-crate-...md", domain: "codebase", title: "Wire Container Crate Analysis", size: "9KB", description: "TypeScript, Apache-2.0, approaching release" },
  { path: "ops/derivation.md", domain: "ops", title: "Derivation Record", size: "6KB", description: "8 configuration dimensions" },
];
