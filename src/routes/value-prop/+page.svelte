<script lang="ts">
  import { brand, product, useCases } from "$lib/data/wire";

  // Expand/collapse state for problem cards
  let expandedId = $state<number | null>(brand.problems[0]?.id ?? null);

  function toggle(id: number) {
    expandedId = expandedId === id ? null : id;
  }

  // Severity → badge class mapping
  function severityClass(severity: string): string {
    if (severity.startsWith("High")) return "badge badge-danger";
    if (severity.startsWith("Med-High")) return "badge badge-warn";
    return "badge";
  }

  // Problem → Agitate → Solution → CTA framework steps
  const pasFramework = [
    {
      step: 1,
      label: "Problem",
      glyph: "⚠",
      content: "Name the pain plainly. AI vendor lock-in. Context you can't share. Token bills from reprocessing. A context window that's too small.",
    },
    {
      step: 2,
      label: "Agitate",
      glyph: "↯",
      content: "Spell out the cost of doing nothing. Your team re-downloads docs every session. Switching models means starting over. Audit gaps that fail review.",
    },
    {
      step: 3,
      label: "Solution",
      glyph: "◆",
      content: "Wire: the neutral, portable, permissioned context container. Sits between agents and systems of record. Own it, audit it, control it.",
    },
    {
      step: 4,
      label: "CTA",
      glyph: "→",
      content: "Deploy agents in weeks, not quarters. Start with one container — under 60 seconds to first MCP connection.",
    },
  ];
</script>

<svelte:head>
  <title>Wire — Value Proposition</title>
  <meta name="description" content="Wire value proposition canvas — positioning, core problems, PAS messaging framework, use cases, and container properties." />
</svelte:head>

<div class="page">
  <!-- Section 1: Positioning Statement -->
  <section class="positioning-section">
    <div class="mono-label">Value Proposition · Positioning</div>
    <div class="perimeter-accent positioning-card">
      <h1 class="positioning-title">
        For {brand.positioning.for}
      </h1>
      <p class="positioning-line">who {brand.positioning.who},</p>
      <p class="positioning-line">
        Wire is <span class="text-accent">{brand.positioning.wireIs}</span> —
      </p>
      <p class="positioning-line">{brand.positioning.that}.</p>
      <p class="positioning-line positioning-unlike">
        Unlike {brand.positioning.unlike},
      </p>
      <p class="positioning-line positioning-resolution">
        Wire {brand.positioning.wire}.
      </p>
    </div>
  </section>

  <!-- Section 2: Five Core Problems -->
  <section class="problems-section">
    <div class="section-header">
      <div class="mono-label">Five Core Problems</div>
      <h2 class="section-title">The pain we're built to solve</h2>
      <p class="section-sub">Each maps to a real audience feeling it now. Click to expand.</p>
    </div>
    <div class="problem-grid">
      {#each brand.problems as problem (problem.id)}
        <div class="card problem-card" class:expanded={expandedId === problem.id}>
          <button
            class="problem-header"
            onclick={() => toggle(problem.id)}
            aria-expanded={expandedId === problem.id}
            aria-controls={`problem-${problem.id}`}
          >
            <div class="problem-meta">
              <span class="problem-id">P{problem.id}</span>
              <span class={severityClass(problem.severity)}>{problem.severity}</span>
            </div>
            <h3 class="problem-name">{problem.name}</h3>
            <p class="problem-oneliner">{problem.oneLiner}</p>
            <div class="problem-target">
              <span class="target-label">Target</span>
              <span class="target-value">{problem.target}</span>
            </div>
            <span class="chevron" aria-hidden="true">{expandedId === problem.id ? "−" : "+"}</span>
          </button>
          {#if expandedId === problem.id}
            <div class="problem-detail" id={`problem-${problem.id}`}>
              <div class="detail-row">
                <span class="detail-key">Problem</span>
                <span class="detail-val">{problem.name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-key">One-liner</span>
                <span class="detail-val">{problem.oneLiner}</span>
              </div>
              <div class="detail-row">
                <span class="detail-key">Audience</span>
                <span class="detail-val">{problem.target}</span>
              </div>
              <div class="detail-row">
                <span class="detail-key">Severity</span>
                <span class="detail-val">
                  <span class={severityClass(problem.severity)}>{problem.severity}</span>
                </span>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </section>

  <!-- Section 3: PAS Framework -->
  <section class="framework-section">
    <div class="section-header">
      <div class="mono-label">Messaging Framework</div>
      <h2 class="section-title">Problem → Agitate → Solution → CTA</h2>
      <p class="section-sub">The four-step structure behind every Wire message.</p>
    </div>
    <div class="framework-flow">
      {#each pasFramework as step, i}
        <div class="framework-step">
          <div class="step-badge">{step.step}</div>
          <div class="step-glyph">{step.glyph}</div>
          <h3 class="step-label">{step.label}</h3>
          <p class="step-content">{step.content}</p>
        </div>
        {#if i < pasFramework.length - 1}
          <div class="flow-arrow" aria-hidden="true">→</div>
        {/if}
      {/each}
    </div>
  </section>

  <!-- Section 4: Use Case Gallery -->
  <section class="usecases-section">
    <div class="section-header">
      <div class="mono-label">Use Cases</div>
      <h2 class="section-title">Where the container lands</h2>
      <p class="section-sub">Six concrete deployments — regulated, portable, managed, and public.</p>
    </div>
    <div class="usecase-grid">
      {#each useCases as useCase, i}
        <div class="card usecase-card">
          <div class="usecase-index">UC{i + 1}</div>
          <div class="usecase-segment">{useCase.segment}</div>
          <h3 class="usecase-title">{useCase.title}</h3>
          <p class="usecase-desc">{useCase.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Section 5: Six Container Properties -->
  <section class="properties-section">
    <div class="section-header">
      <div class="mono-label">Container Properties</div>
      <h2 class="section-title">Six things a container does</h2>
      <p class="section-sub">The behavior surface — no infrastructure names, just capability.</p>
    </div>
    <div class="property-grid">
      {#each product.sixProperties as prop, i}
        <div class="card property-card">
          <div class="property-number">{String(i + 1).padStart(2, "0")}</div>
          <h3 class="property-name">{prop.name}</h3>
          <p class="property-desc">{prop.description}</p>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .page {
    max-width: var(--max-content);
    margin: 0 auto;
    padding: var(--space-xl) var(--space-xl) var(--space-2xl);
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);
  }

  /* Section headers */
  .section-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    margin-bottom: var(--space-lg);
  }
  .section-title {
    font-size: 1.75rem;
    margin: var(--space-xs) 0 0;
  }
  .section-sub {
    font-size: 13px;
    color: var(--text-secondary);
    margin: 0;
  }

  /* ── Positioning ── */
  .positioning-section { margin-top: var(--space-lg); }
  .positioning-card {
    padding: var(--space-2xl);
    border-radius: var(--radius-lg);
  }
  .positioning-title {
    font-size: 2.25rem;
    line-height: 1.15;
    margin: var(--space-md) 0 var(--space-lg);
    font-weight: 600;
  }
  .positioning-line {
    font-size: 1.2rem;
    line-height: 1.5;
    color: var(--text);
    margin: var(--space-sm) 0;
  }
  .positioning-unlike {
    color: var(--text-secondary);
    font-style: italic;
    margin-top: var(--space-lg);
  }
  .positioning-resolution {
    font-weight: 600;
    color: var(--text);
  }

  /* ── Problems grid ── */
  .problem-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: var(--space-lg);
  }
  .problem-card {
    padding: 0;
    overflow: hidden;
    transition: border-color var(--transition);
  }
  .problem-card.expanded {
    border-color: var(--accent);
    box-shadow: var(--shadow-glow);
  }
  .problem-header {
    all: unset;
    cursor: pointer;
    display: block;
    padding: var(--space-lg);
    position: relative;
    width: 100%;
    box-sizing: border-box;
  }
  .problem-header:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
    border-radius: var(--radius-md);
  }
  .problem-meta {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
  }
  .problem-id {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 0.05em;
    font-weight: 600;
  }
  .problem-name {
    font-size: 1.1rem;
    margin: 0 0 var(--space-xs);
    line-height: 1.3;
  }
  .problem-oneliner {
    font-size: 13px;
    color: var(--text-secondary);
    margin: 0 0 var(--space-md);
    line-height: 1.45;
  }
  .problem-target {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .target-label {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .target-value {
    font-size: 12px;
    color: var(--text-secondary);
  }
  .chevron {
    position: absolute;
    top: var(--space-lg);
    right: var(--space-lg);
    font-size: 1.5rem;
    color: var(--text-tertiary);
    font-family: var(--font-mono);
    line-height: 1;
    transition: color var(--transition);
  }
  .problem-header:hover .chevron { color: var(--accent); }

  .problem-detail {
    border-top: 1px solid var(--border);
    padding: var(--space-md) var(--space-lg) var(--space-lg);
    background: var(--bg-secondary);
  }
  .detail-row {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-xs) 0;
    font-size: 13px;
    align-items: flex-start;
  }
  .detail-key {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    min-width: 70px;
    padding-top: 2px;
    flex-shrink: 0;
  }
  .detail-val {
    color: var(--text);
    line-height: 1.45;
  }

  /* ── PAS Framework ── */
  .framework-flow {
    display: flex;
    align-items: stretch;
    gap: 0;
    overflow-x: auto;
  }
  .framework-step {
    flex: 1;
    min-width: 220px;
    padding: var(--space-lg);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    position: relative;
  }
  .framework-step:first-child {
    border-left: 3px solid var(--danger);
  }
  .framework-step:nth-child(3) {
    border-left: 3px solid var(--warn);
  }
  .framework-step:nth-child(5) {
    border-left: 3px solid var(--accent);
  }
  .framework-step:nth-child(7) {
    border-left: 3px solid var(--accent-bright);
  }
  .step-badge {
    position: absolute;
    top: var(--space-lg);
    right: var(--space-lg);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-tertiary);
    font-weight: 600;
  }
  .step-glyph {
    font-size: 1.5rem;
    color: var(--accent);
    line-height: 1;
  }
  .framework-step:first-child .step-glyph { color: var(--danger); }
  .framework-step:nth-child(3) .step-glyph { color: var(--warn); }
  .framework-step:nth-child(7) .step-glyph { color: var(--accent-bright); }
  .step-label {
    font-size: 1.1rem;
    margin: 0;
    font-weight: 600;
  }
  .step-content {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: var(--space-xs) 0 0;
  }
  .flow-arrow {
    display: flex;
    align-items: center;
    padding: 0 var(--space-sm);
    color: var(--text-tertiary);
    font-size: 1.5rem;
    font-family: var(--font-mono);
    flex-shrink: 0;
  }

  /* ── Use Cases ── */
  .usecase-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-lg);
  }
  .usecase-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    position: relative;
  }
  .usecase-index {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 0.05em;
    font-weight: 600;
  }
  .usecase-segment {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .usecase-title {
    font-size: 1.05rem;
    margin: var(--space-xs) 0 0;
    line-height: 1.3;
  }
  .usecase-desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: var(--space-xs) 0 0;
  }

  /* ── Six Properties ── */
  .property-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-lg);
  }
  .property-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    border-left: 3px solid var(--accent);
  }
  .property-number {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-tertiary);
    letter-spacing: 0.05em;
  }
  .property-name {
    font-size: 1.1rem;
    margin: var(--space-xs) 0 0;
    color: var(--accent);
    font-weight: 600;
  }
  .property-desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: var(--space-xs) 0 0;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .framework-flow {
      flex-direction: column;
      gap: var(--space-sm);
    }
    .flow-arrow {
      transform: rotate(90deg);
      padding: var(--space-xs) 0;
      justify-content: center;
    }
    .positioning-title {
      font-size: 1.75rem;
    }
    .positioning-line {
      font-size: 1.05rem;
    }
  }
</style>
