<script lang="ts">
  import { roadmap } from "$lib/data/wire";

  const statusBadge = (status: string) => {
    switch (status) {
      case "in-flight": return { class: "badge-accent", label: "In Flight" };
      case "planned": return { class: "badge-warn", label: "Planned" };
      case "speculative": return { class: "", label: "Speculative" };
      default: return { class: "", label: status };
    }
  };

  const northstarColors = ["var(--accent)", "#34d399", "#3b82f6", "#a78bfa", "#f59e0b", "#ec4899"];
</script>

<div class="page">
  <div class="page-header">
    <div class="mono-label">Speculative Roadmap</div>
    <h1>From container to cryptographic security.</h1>
    <p>Grounded in current repo state, chasing northstars: BYOC → Audit → Observability → Cryptographic-Security → MCP.</p>
  </div>

  <!-- Northstar progression -->
  <div class="northstar-bar">
    {#each roadmap as phase, i}
      <div class="northstar-node" style="--color: {northstarColors[i]}">
        <div class="northstar-dot"></div>
        <div class="northstar-label">{phase.northstar}</div>
      </div>
      {#if i < roadmap.length - 1}
        <div class="northstar-line"></div>
      {/if}
    {/each}
  </div>

  <!-- Phase cards -->
  <div class="phases">
    {#each roadmap as phase, i}
      {@const badge = statusBadge(phase.status)}
      <div class="phase-card" style="--color: {northstarColors[i]}">
        <div class="phase-header">
          <div class="phase-number">Phase {i}</div>
          <span class="badge {badge.class}">{badge.label}</span>
        </div>
        <h3 class="phase-title">{phase.phase}</h3>
        <div class="phase-northstar">
          <span class="mono-label">Northstar</span>
          <span class="northstar-text">{phase.northstar}</span>
        </div>
        <ul class="phase-items">
          {#each phase.items as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  <!-- Open decisions -->
  <section class="section">
    <div class="callout">
      <div class="mono-label">Open Decisions</div>
      <h3>What needs the operator's call</h3>
      <ul class="decisions">
        <li><strong>SOC 2 + GDPR investment timing</strong> — pre-seed-round close or post? $20-35k, ~6 months. Gating blocker.</li>
        <li><strong>First paid contract price</strong> — IndiaStox POC conversion sets precedent for all future deals.</li>
        <li><strong>When to charge for analysis</strong> — currently 0 credits, AI inference is COGS. Must decide before seed.</li>
        <li><strong>Design partner recruitment</strong> — 3-5 across diverse sub-segments. Which become formal?</li>
        <li><strong>Open-source container release timing</strong> — gates the entire adoption engine. fs-001 acceptance criteria not yet met.</li>
        <li><strong>First AE hire</strong> — trigger: 3+ design partners converted or $300k+ pipeline.</li>
        <li><strong>HIPAA readiness + BAA</strong> — needed for Spring Health. Not yet on roadmap. When to add?</li>
        <li><strong>EU expansion timing</strong> — GDPR-driven demand; geographic expansion for UK NHS + EU.</li>
      </ul>
    </div>
  </section>
</div>

<style>
  .page { padding: var(--space-2xl) var(--space-xl); max-width: var(--max-content); margin: 0 auto; }
  .page-header { margin-bottom: var(--space-2xl); }
  .page-header h1 { margin: var(--space-sm) 0; }
  .page-header p { color: var(--text-secondary); max-width: 600px; }

  .northstar-bar {
    display: flex; align-items: center; gap: 0; margin-bottom: var(--space-2xl);
    padding: var(--space-lg); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--radius-lg);
    overflow-x: auto;
  }
  .northstar-node { display: flex; flex-direction: column; align-items: center; gap: var(--space-sm); flex-shrink: 0; }
  .northstar-dot {
    width: 16px; height: 16px; border-radius: 50%; background: var(--color);
    box-shadow: 0 0 12px var(--color);
  }
  .northstar-label {
    font-family: var(--font-mono); font-size: 10px; text-transform: uppercase;
    letter-spacing: 0.05em; color: var(--text-tertiary); white-space: nowrap;
  }
  .northstar-line { flex: 1; height: 1px; background: var(--border); min-width: 20px; margin: 0 -1px; }

  .phases { display: flex; flex-direction: column; gap: var(--space-lg); }
  .phase-card {
    padding: var(--space-xl); background: var(--bg-card);
    border: 1px solid var(--border); border-left: 3px solid var(--color);
    border-radius: var(--radius-md);
  }
  .phase-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm); }
  .phase-number { font-family: var(--font-mono); font-size: 12px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.1em; }
  .phase-title { font-size: 1.5rem; margin-bottom: var(--space-md); }
  .phase-northstar { display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-lg); }
  .northstar-text { font-size: 14px; color: var(--color); font-weight: 600; }

  .phase-items { list-style: none; display: flex; flex-direction: column; gap: var(--space-sm); }
  .phase-items li {
    font-size: 13px; color: var(--text-secondary); padding-left: var(--space-md);
    position: relative; line-height: 1.5;
  }
  .phase-items li::before {
    content: "→"; position: absolute; left: 0; color: var(--color);
  }

  .section { margin-top: var(--space-2xl); }
  .decisions { list-style: none; display: flex; flex-direction: column; gap: var(--space-sm); margin-top: var(--space-md); }
  .decisions li { font-size: 13px; color: var(--text-secondary); padding-left: var(--space-md); position: relative; }
  .decisions li::before { content: "•"; position: absolute; left: 0; color: var(--accent); }

  @media (max-width: 768px) {
    .northstar-bar { flex-wrap: wrap; gap: var(--space-sm); }
    .northstar-line { display: none; }
  }
</style>
