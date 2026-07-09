<script lang="ts">
  import { wire, market, brand, product, socialProof, objections } from "$lib/data/wire";

  type TabId = "investors" | "customers" | "developers" | "objections" | "why-now";

  let activeTab = $state<TabId>("investors");

  const tabs: { id: TabId; label: string; sub: string }[] = [
    { id: "investors", label: "For Investors", sub: "Thesis, market, moat, ask" },
    { id: "customers", label: "For Customers", sub: "Regulated enterprise" },
    { id: "developers", label: "For Developers", sub: "Try the container" },
    { id: "objections", label: "Objection Handling", sub: "5 hard questions" },
    { id: "why-now", label: "Why Now", sub: "Timing signals" },
  ];

  // Investment talking points derived from data
  const investorThesis = [
    "Code has GitHub. Everything else has Wire. — permissioned, portable containers of context that any agent can reach.",
    "Context is becoming an ownable asset. Teams want to own and control agent context, not rent it from model vendors.",
    "Wire is the neutral, portable, permissioned context container — sits between agents and systems of record, reachable over MCP or REST.",
    `${wire.stage} raising ${wire.raise}. ${wire.anchor}.`,
  ];

  const investorMarket = [
    `TAM: ${market.tam} (${market.tamBreakdown})`,
    `SAM (reachable today): ${market.sam}`,
    `SOM (3-yr): ${market.som3yr}`,
    `${market.gartnerSignal}.`,
    `Only ${market.aiScaling} — early innings.`,
    `GenAI spend 3.2× YoY: ${market.genAIGrowth}.`,
  ];

  const investorMoat = [
    "MCP is the open rail; Wire is the neutral layer above it. Model vendors want context locked to their model — Wire is the structurally opposite bet.",
    "Per-container isolation = compliance primitive. GDPR Art. 5 purpose limitation, Art. 30 ROPA, Art. 32 logging — built into the architecture, not bolted on.",
    "Audit-and-ownership from day one. What the regulated buyer demands today, the long tail expects tomorrow.",
    "Bring-your-own-cloud: data residency stays with the customer. EU customer data stays in EU infra.",
    "Build cost to replicate: $200–300k/yr per pipeline + a dedicated engineer. Wire replaces that at a fraction.",
  ];

  const investorTraction = socialProof.map((s) => `${s.metric} — ${s.label} (${s.note})`);

  const investorAsk = [
    `${wire.raise} pre-seed. ${wire.anchor}.`,
    "Use of funds: SOC 2 + GDPR readiness ($20–35k, ~6 months), first FDE embeds, open-source container release.",
    "Design partner motion: founder-led, 5–10 enterprise deals, 30–60 day cycles, $50–100k design partner pricing.",
    "Hiring discipline: no VP Sales or SDRs before Series A. Founder runs first deals and documents the playbook.",
  ];

  // Customer (regulated enterprise) talking points
  const customerProblem = [
    "Regulation is creating hard buying gates: CA CCPA ADMT (2027), CO AI Act, EU AI Act logging, CT AI Act. Penalties up to €35M / 7% global turnover.",
    "Teams are stalled: 62% still experimenting with AI. Only 7% have fully scaled. The blocker is context infrastructure, not models.",
    "Rolling your own markdown context fails the audit test. No per-container isolation, no provenance, no access log.",
    "Direct agent access to systems of record is a security non-starter. You need a layer that scopes, permissions, and audits.",
  ];

  const customerWhatWireGives = product.sixProperties.map((p) => `${p.name} — ${p.description}`);

  const customerDeployment = [
    "Bring-your-own-cloud: your infra, your data residency. EU customer data stays in EU.",
    "Per-container isolation: a container per person, team, project, down to a single session. Agents see only what's theirs.",
    "Scoped credentials with tool allowlists on top. Nothing escalates.",
    "Every access on the record: who read what, when, on whose authority.",
    "Portable single-file containers: export line by line, inspect, take anywhere. No lock-in.",
  ];

  const customerHonestStatus = [
    wire.statusNote,
    "SOC 2 Type I + GDPR readiness: in progress, ~6 months, $20–35k. Blocks EU/UK regulated deals (NELFT, Praxent).",
    "HIPAA readiness + BAA: not on roadmap yet. Blocks US healthcare (Spring Health).",
    "For design partners, we embed a forward-deployed engineer to shape the integration with your team.",
  ];

  // Developer talking points
  const devPain = brand.problems.map((p) => `${p.name} — ${p.oneLiner} (target: ${p.target})`);

  const devWhatWireDoes = [
    "5 tools — wire_explore, wire_search, wire_navigate, wire_write, wire_delete. Generic primitives; the intelligence is in the container.",
    "Any file type: PDF, Word, CSV, JSON, markdown. Everything lands in one structured source.",
    "Search agents can actually use, with provenance on every result.",
    "Always current as context changes. No stale snapshots, no re-exports.",
    "Compose with LangChain: it's the context slice beneath orchestration frameworks.",
  ];

  const devTryIt = [
    "Hosted MVP at usewire.io — free tier, 3,000 starter credits.",
    "wire-memory plugin for Claude Code, Cursor, and Codex.",
    "Public SDK: @usewire/sdk.",
    "n8n-nodes-wire integration for no-code pipelines.",
    "Activation metric: first container created + first MCP connection — under 60 seconds.",
  ];
</script>

<svelte:head>
  <title>Wire — Talking Points</title>
  <meta name="description" content="Audience-segmented talking points for investors, customers, developers, objection handling, and why now." />
</svelte:head>

<div class="page">
  <header class="page-header">
    <div class="mono-label">Inside the Wire / Talking Points</div>
    <h1>Talking Points</h1>
    <p class="lede">Audience-segmented. Pick the tab for who you're talking to. Every point is sourced from the research data — no improvisation.</p>
  </header>

  <!-- Tab bar -->
  <div class="tab-bar" role="tablist" aria-label="Audience segments">
    {#each tabs as tab (tab.id)}
      <button
        class="tab"
        class:active={activeTab === tab.id}
        role="tab"
        aria-selected={activeTab === tab.id}
        onclick={() => (activeTab = tab.id)}
      >
        <span class="tab-label">{tab.label}</span>
        <span class="tab-sub">{tab.sub}</span>
      </button>
    {/each}
  </div>

  <!-- Tab panels -->
  <div class="tab-panels">
    {#if activeTab === "investors"}
      <section class="panel animate-in" role="tabpanel">
        <div class="tp-grid">
          <div class="tp-block card">
            <h3>Thesis</h3>
            <ul>
              {#each investorThesis as pt}<li>{pt}</li>{/each}
            </ul>
          </div>
          <div class="tp-block card">
            <h3>Market</h3>
            <ul>
              {#each investorMarket as pt}<li>{pt}</li>{/each}
            </ul>
          </div>
          <div class="tp-block card">
            <h3>Moat</h3>
            <ul>
              {#each investorMoat as pt}<li>{pt}</li>{/each}
            </ul>
          </div>
          <div class="tp-block card">
            <h3>Traction</h3>
            <ul>
              {#each investorTraction as pt}<li>{pt}</li>{/each}
            </ul>
          </div>
          <div class="tp-block card card-accent">
            <h3>The Ask</h3>
            <ul>
              {#each investorAsk as pt}<li>{pt}</li>{/each}
            </ul>
          </div>
        </div>
      </section>

    {:else if activeTab === "customers"}
      <section class="panel animate-in" role="tabpanel">
        <div class="callout callout-danger">
          <strong>For regulated enterprise.</strong> The buying trigger is a regulatory deadline or a stalled rollout. Lead with pain, not features.
        </div>
        <div class="tp-grid">
          <div class="tp-block card">
            <h3>The Problem</h3>
            <ul>
              {#each customerProblem as pt}<li>{pt}</li>{/each}
            </ul>
          </div>
          <div class="tp-block card">
            <h3>What Wire Gives You</h3>
            <ul>
              {#each customerWhatWireGives as pt}<li>{pt}</li>{/each}
            </ul>
          </div>
          <div class="tp-block card">
            <h3>Deployment</h3>
            <ul>
              {#each customerDeployment as pt}<li>{pt}</li>{/each}
            </ul>
          </div>
          <div class="tp-block card">
            <h3>Honest Status</h3>
            <ul>
              {#each customerHonestStatus as pt}<li>{pt}</li>{/each}
            </ul>
          </div>
        </div>
      </section>

    {:else if activeTab === "developers"}
      <section class="panel animate-in" role="tabpanel">
        <div class="tp-grid">
          <div class="tp-block card">
            <h3>The Pain</h3>
            <ul>
              {#each devPain as pt}<li>{pt}</li>{/each}
            </ul>
          </div>
          <div class="tp-block card">
            <h3>What Wire Does</h3>
            <ul>
              {#each devWhatWireDoes as pt}<li>{pt}</li>{/each}
            </ul>
          </div>
          <div class="tp-block card card-accent">
            <h3>Try It</h3>
            <ul>
              {#each devTryIt as pt}<li>{pt}</li>{/each}
            </ul>
          </div>
        </div>
      </section>

    {:else if activeTab === "objections"}
      <section class="panel animate-in" role="tabpanel">
        <div class="qa-list">
          {#each objections as obj, i (i)}
            <div class="qa card">
              <div class="qa-q">
                <span class="qa-marker">Q{i + 1}</span>
                <p>{obj.q}</p>
              </div>
              <div class="qa-a">
                <span class="qa-marker qa-marker-a">A</span>
                <p>{obj.a}</p>
              </div>
            </div>
          {/each}
        </div>
      </section>

    {:else if activeTab === "why-now"}
      <section class="panel animate-in" role="tabpanel">
        <p class="lede">Six timing signals. Each one is a reason the window is open now, not next year.</p>
        <table>
          <thead>
            <tr>
              <th>Signal</th>
              <th>Evidence</th>
            </tr>
          </thead>
          <tbody>
            {#each market.timingSignals as ts (ts.signal)}
              <tr>
                <td class="signal-cell">{ts.signal}</td>
                <td>{ts.evidence}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </section>
    {/if}
  </div>
</div>

<style>
  .page {
    padding: var(--space-2xl) var(--space-xl);
    max-width: var(--max-content);
  }

  .page-header { margin-bottom: var(--space-xl); }
  .page-header h1 { font-size: 2.5rem; margin: var(--space-sm) 0; }
  .lede {
    font-size: 1rem;
    color: var(--text-secondary);
    max-width: 640px;
    margin-top: var(--space-sm);
  }

  /* Tab bar */
  .tab-bar {
    display: flex;
    gap: var(--space-xs);
    border-bottom: 1px solid var(--border);
    margin-bottom: var(--space-xl);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .tab {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: var(--space-md) var(--space-lg);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--text-secondary);
    cursor: pointer;
    text-align: left;
    white-space: nowrap;
    transition: all var(--transition-fast);
    font-family: var(--font-body);
  }
  .tab:hover { color: var(--text); background: var(--bg-secondary); }
  .tab.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }
  .tab-label { font-size: 13px; font-weight: 600; }
  .tab-sub { font-size: 11px; color: var(--text-tertiary); font-family: var(--font-mono); }
  .tab.active .tab-sub { color: var(--accent-dim); }

  /* Panels */
  .tab-panels { min-height: 400px; }
  .panel { animation: fade-in var(--transition) ease both; }

  /* Talking-points grid */
  .tp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: var(--space-lg);
  }
  .tp-block { padding: var(--space-lg); }
  .tp-block h3 {
    font-size: 1rem;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--border);
  }
  .tp-block ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .tp-block li {
    font-size: 13px;
    line-height: 1.5;
    color: var(--text-secondary);
    padding-left: var(--space-md);
    position: relative;
  }
  .tp-block li::before {
    content: "▸";
    position: absolute;
    left: 0;
    color: var(--accent);
    font-size: 11px;
    top: 2px;
  }

  /* Q&A */
  .qa-list { display: flex; flex-direction: column; gap: var(--space-lg); }
  .qa { padding: var(--space-lg); }
  .qa-q, .qa-a { display: flex; gap: var(--space-md); align-items: flex-start; }
  .qa-a { margin-top: var(--space-md); padding-top: var(--space-md); border-top: 1px solid var(--border); }
  .qa-marker {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
    color: var(--text-tertiary);
    background: var(--bg-elevated);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    flex-shrink: 0;
    line-height: 1.5;
  }
  .qa-marker-a { color: var(--accent); background: var(--accent-glow); }
  .qa-q p { font-size: 14px; font-weight: 600; color: var(--text); margin: 0; line-height: 1.5; }
  .qa-a p { font-size: 13px; color: var(--text-secondary); margin: 0; line-height: 1.6; }

  /* Why-now table tweaks */
  .signal-cell { font-weight: 600; color: var(--text); white-space: nowrap; }
  .panel table { width: 100%; }

  @media (max-width: 700px) {
    .page { padding: var(--space-xl) var(--space-md); }
    .tp-grid { grid-template-columns: 1fr; }
    .tab { padding: var(--space-md); }
    .tab-sub { display: none; }
  }
</style>
