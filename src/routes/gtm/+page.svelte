<script lang="ts">
  import { gtmRoadmap } from "$lib/data/wire";
</script>

<div class="page">
  <div class="page-header">
    <div class="mono-label">GTM Execution Plan</div>
    <h1>Six streams, one critical path, 15-month runway.</h1>
    <p>{gtmRoadmap.criticalPath}</p>
  </div>

  <!-- Top metrics -->
  <div class="metrics-bar">
    <div class="metric card">
      <div class="mono-label">Runway</div>
      <div class="metric-val">{gtmRoadmap.runway}</div>
    </div>
    <div class="metric card">
      <div class="mono-label">Discretionary budget</div>
      <div class="metric-val">{gtmRoadmap.budget}</div>
    </div>
    <div class="metric card">
      <div class="mono-label">Northstar</div>
      <div class="metric-val small">{gtmRoadmap.northstar}</div>
    </div>
  </div>

  <!-- Stream swimlanes -->
  <div class="streams">
    {#each gtmRoadmap.streams as stream}
      <div class="stream-card" style="--color: {stream.color}">
        <div class="stream-header">
          <div class="stream-dot" style="background: {stream.color}"></div>
          <h3>{stream.name}</h3>
          <span class="stream-northstar">{stream.northstar}</span>
        </div>
        <div class="milestones">
          {#each stream.milestones as ms}
            <div class="milestone-row">
              <div class="milestone-month">M{ms.month}</div>
              <div class="milestone-body">
                <div class="milestone-item">{ms.item}</div>
                {#if ms.budget && ms.budget !== "$0" && ms.budget !== "—"}
                  <span class="milestone-budget">{ms.budget}</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <!-- Budget allocation -->
  <section class="section">
    <div class="section-header">
      <div class="mono-label">Budget Allocation</div>
      <h2>$142k discretionary pool</h2>
    </div>
    <div class="budget-table card">
      {#each gtmRoadmap.budgetAllocation as row}
        <div class="budget-row" class:total={row.bucket === "Total allocated"} class:reserve={row.bucket === "Reserve (runway lever)"}>
          <div class="budget-bucket">{row.bucket}</div>
          <div class="budget-amount">{row.amount}</div>
          <div class="budget-months">{row.months}</div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Open decisions -->
  <section class="section">
    <div class="section-header">
      <div class="mono-label">Open Decisions</div>
      <h2>16 forks — 11 resolved, 5 open</h2>
    </div>
    <div class="decisions-grid">
      {#each gtmRoadmap.openDecisions as d}
        <div class="decision-card card" class:resolved={d.status.startsWith("Resolved")}>
          <div class="decision-header">
            <span class="decision-id">#{d.id}</span>
            <span class="decision-status" class:resolved={d.status.startsWith("Resolved")}>
              {d.status.startsWith("Resolved") ? "✓ Resolved" : "Open"}
            </span>
          </div>
          <div class="decision-text">{d.decision}</div>
          <div class="decision-meta">
            <span class="decision-resolution">Target: {d.resolution}</span>
          </div>
          {#if !d.status.startsWith("Resolved")}
            <div class="decision-status-detail">{d.status}</div>
          {/if}
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .page { padding: var(--space-2xl) var(--space-xl); max-width: var(--max-content); margin: 0 auto; }
  .page-header { margin-bottom: var(--space-2xl); }
  .page-header h1 { margin: var(--space-sm) 0; }
  .page-header p { color: var(--text-secondary); max-width: 700px; font-size: 14px; }

  .metrics-bar { display: flex; gap: var(--space-md); margin-bottom: var(--space-2xl); flex-wrap: wrap; }
  .metric { padding: var(--space-md) var(--space-lg); flex: 1; min-width: 200px; }
  .metric-val { font-size: 1.1rem; font-weight: 600; margin-top: var(--space-xs); }
  .metric-val.small { font-size: 12px; font-weight: 400; color: var(--text-secondary); line-height: 1.4; }

  .streams { display: flex; flex-direction: column; gap: var(--space-lg); }
  .stream-card {
    padding: var(--space-xl); background: var(--bg-card);
    border: 1px solid var(--border); border-left: 3px solid var(--color);
    border-radius: var(--radius-md);
  }
  .stream-header { display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-lg); flex-wrap: wrap; }
  .stream-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 8px var(--color); }
  .stream-header h3 { font-size: 1.1rem; margin: 0; }
  .stream-northstar { font-size: 12px; color: var(--color); font-weight: 500; margin-left: auto; }

  .milestones { display: flex; flex-direction: column; gap: var(--space-xs); }
  .milestone-row { display: flex; gap: var(--space-md); align-items: flex-start; padding: var(--space-xs) 0; }
  .milestone-month {
    font-family: var(--font-mono); font-size: 11px; color: var(--color);
    text-transform: uppercase; letter-spacing: 0.05em; min-width: 40px; padding-top: 1px;
  }
  .milestone-body { flex: 1; display: flex; align-items: baseline; gap: var(--space-sm); flex-wrap: wrap; }
  .milestone-item { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }
  .milestone-budget { font-size: 11px; color: var(--text-tertiary); font-family: var(--font-mono); white-space: nowrap; }

  .section { margin-top: var(--space-2xl); }
  .section-header { margin-bottom: var(--space-lg); }
  .section-header h2 { font-size: 1.3rem; margin: var(--space-xs) 0; }

  .budget-table { display: flex; flex-direction: column; gap: 0; }
  .budget-row {
    display: flex; gap: var(--space-md); padding: var(--space-sm) var(--space-md);
    border-bottom: 1px solid var(--border); font-size: 13px;
  }
  .budget-row:last-child { border-bottom: none; }
  .budget-row.total { font-weight: 600; border-top: 2px solid var(--border); padding-top: var(--space-md); }
  .budget-row.reserve { color: var(--accent); font-weight: 600; }
  .budget-bucket { flex: 2; }
  .budget-amount { flex: 1; font-family: var(--font-mono); }
  .budget-months { flex: 1; color: var(--text-tertiary); font-size: 12px; }

  .decisions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-md); }
  .decision-card { padding: var(--space-md); }
  .decision-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xs); }
  .decision-id { font-family: var(--font-mono); font-size: 11px; color: var(--text-tertiary); }
  .decision-status { font-size: 10px; padding: 2px 8px; border-radius: var(--radius-sm); background: var(--bg-hover); color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em; }
  .decision-status.resolved { background: rgba(52, 211, 153, 0.15); color: #34d399; }
  .decision-text { font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: var(--space-xs); }
  .decision-resolution { font-size: 11px; color: var(--text-tertiary); font-family: var(--font-mono); }
  .decision-status-detail { font-size: 11px; color: var(--text-tertiary); margin-top: var(--space-xs); font-style: italic; }

  @media (max-width: 768px) {
    .metrics-bar { flex-direction: column; }
    .stream-northstar { margin-left: 0; width: 100%; }
    .decisions-grid { grid-template-columns: 1fr; }
  }
</style>
