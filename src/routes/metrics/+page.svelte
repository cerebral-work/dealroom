<script lang="ts">
  import { economics, socialProof, market, wire } from "$lib/data/wire";

  let activeTab = $state("metrics");

  const tabs = [
    { id: "metrics", label: "Investor Metrics" },
    { id: "pricing", label: "Pricing Simulator" },
    { id: "projections", label: "Financial Projections" },
    { id: "opensource", label: "Open-Source Metrics" },
  ];

  // Pricing simulator state
  let simContainers = $state(50);
  let simTier = $state("Team");
  let simAnalysis = $state(1000); // analyses per month
  let simInferenceCost = $state(0.008); // $ per analysis

  const tierPrices: Record<string, { monthly: number; credits: number }> = {
    "Free": { monthly: 0, credits: 3000 },
    "Starter": { monthly: 9, credits: 10000 },
    "Pro": { monthly: 19, credits: 20000 },
    "Team": { monthly: 199, credits: 200000 },
  };

  let simMRR = $derived(simContainers * tierPrices[simTier].monthly);
  let simARR = $derived(simMRR * 12);
  let simInferenceSpend = $derived(simAnalysis * simInferenceCost * 30); // monthly
  let simGrossMargin = $derived(
    simMRR > 0 ? Math.round(((simMRR - simInferenceSpend) / simMRR) * 100) : 0
  );

  // Financial projections state
  let projYear = $state(3); // 1, 2, or 3
  let projGrowth = $state(15); // monthly growth rate % for PLG containers

  function projectedContainers(year: number): number {
    // Start at 10 containers, grow at projGrowth% per month
    let n = 10;
    const months = year * 12;
    for (let i = 0; i < months; i++) {
      n = Math.round(n * (1 + projGrowth / 100));
    }
    return n;
  }

  function projectedARR(year: number): number {
    const containers = projectedContainers(year);
    // Blend: 60% free, 25% starter, 10% pro, 5% team
    const blendedARPU =
      0.6 * 0 + 0.25 * 108 + 0.1 * 228 + 0.05 * 2388;
    return Math.round(containers * blendedARPU);
  }

  function projectedEnterprise(year: number): number {
    // Enterprise deals: 2 in Y1, 5 in Y2, 12 in Y3, avg $200k ACV
    const deals = year === 1 ? 2 : year === 2 ? 5 : 12;
    return deals * 200000;
  }

  function formatCurrency(n: number): string {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
    return `$${n}`;
  }

  // Open-source metrics (from socialProof + wire data)
  const ossMetrics = [
    { label: "GitHub Stars", value: "—", trend: "growing" },
    { label: "NPM Downloads", value: "—", trend: "n/a" },
    { label: "Contributors", value: "1 (founder)", trend: "seeking" },
    { label: "Forks", value: "—", trend: "n/a" },
    { label: "Discord Members", value: "—", trend: "n/a" },
    { label: "Issues Open", value: "—", trend: "n/a" },
  ];

  const trafficMetrics = socialProof;
</script>

<div class="page">
  <div class="page-header">
    <div class="mono-label">Metrics</div>
    <h1>Numbers, honestly.</h1>
    <p>Investor metrics, pricing simulator, financial projections, and open-source traction. All interactive — adjust the sliders.</p>
  </div>

  <div class="tab-bar">
    {#each tabs as tab}
      <button
        class="tab-btn"
        class:active={activeTab === tab.id}
        onclick={() => (activeTab = tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  {#if activeTab === "metrics"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Traction Signals</div>
        <h2>What we can prove today</h2>
      </div>
      <div class="metrics-grid">
        {#each trafficMetrics as m}
          <div class="stat-card card">
            <div class="stat-value">{m.metric}</div>
            <div class="stat-label">{m.label}</div>
            {#if m.note}
              <div class="stat-note">{m.note}</div>
            {/if}
          </div>
        {/each}
      </div>

      <div class="section-header" style="margin-top: var(--space-xl);">
        <div class="mono-label">Market Sizing</div>
        <h2>TAM / SAM / SOM</h2>
      </div>
      <div class="tam-grid">
        <div class="tam-card card">
          <div class="mono-label">TAM</div>
          <div class="tam-value">{market.tam}</div>
          <div class="tam-detail">{market.tamBreakdown}</div>
        </div>
        <div class="tam-card card">
          <div class="mono-label">SAM</div>
          <div class="tam-value">{market.sam}</div>
          <div class="tam-detail">Regulated industries + AI-native teams</div>
        </div>
        <div class="tam-card card">
          <div class="mono-label">SOM</div>
          <div class="tam-value">{market.som3yr}</div>
          <div class="tam-detail">3-year reachable: PLG + managed service + early enterprise</div>
        </div>
      </div>

      <div class="callout">
        <div class="mono-label">Honest Frame</div>
        <p>Wire is pre-revenue with a 4-deal pipeline and growing organic search presence. The metrics above are what we can prove. The projections below are what we believe — with the assumptions stated.</p>
      </div>
    </section>

  {:else if activeTab === "pricing"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Pricing Simulator</div>
        <h2>Model PLG revenue under different scenarios</h2>
      </div>

      <div class="sim-controls">
        <div class="control-group">
          <label for="containers">Containers: <strong>{simContainers}</strong></label>
          <input id="containers" type="range" min="1" max="500" bind:value={simContainers} />
        </div>

        <div class="control-group">
          <label for="tier">Pricing tier:</label>
          <select id="tier" bind:value={simTier}>
            <option value="Free">Free ($0)</option>
            <option value="Starter">Starter ($9/mo)</option>
            <option value="Pro">Pro ($19/mo)</option>
            <option value="Team">Team ($199/mo)</option>
          </select>
        </div>

        <div class="control-group">
          <label for="analysis">Analyses/month: <strong>{simAnalysis}</strong></label>
          <input id="analysis" type="range" min="0" max="10000" step="100" bind:value={simAnalysis} />
        </div>

        <div class="control-group">
          <label for="inference">Inference cost/analysis: <strong>${simInferenceCost.toFixed(3)}</strong></label>
          <input id="inference" type="range" min="0.001" max="0.05" step="0.001" bind:value={simInferenceCost} />
        </div>
      </div>

      <div class="sim-results">
        <div class="result-card card">
          <div class="mono-label">Monthly Recurring Revenue</div>
          <div class="result-value">{formatCurrency(simMRR)}</div>
        </div>
        <div class="result-card card">
          <div class="mono-label">Annual Recurring Revenue</div>
          <div class="result-value">{formatCurrency(simARR)}</div>
        </div>
        <div class="result-card card">
          <div class="mono-label">Monthly Inference COGS</div>
          <div class="result-value danger">{formatCurrency(simInferenceSpend)}</div>
        </div>
        <div class="result-card card">
          <div class="mono-label">Gross Margin</div>
          <div class="result-value" class:danger={simGrossMargin < 50} class:accent={simGrossMargin >= 70}>
            {simGrossMargin}%
          </div>
        </div>
      </div>

      <div class="callout callout-danger">
        <div class="mono-label">Reality Check</div>
        <p>{economics.riskNote}</p>
      </div>

      <h3>Credit Economics</h3>
      <table>
        <thead><tr><th>Action</th><th>Credits</th></tr></thead>
        <tbody>
          {#each economics.creditCosts as c}
            <tr><td><code>{c.action}</code></td><td>{c.credits}</td></tr>
          {/each}
        </tbody>
      </table>
    </section>

  {:else if activeTab === "projections"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Financial Projections</div>
        <h2>3-year model — assumptions stated, not hidden</h2>
      </div>

      <div class="proj-controls">
        <div class="control-group">
          <label for="growth">Monthly PLG growth: <strong>{projGrowth}%</strong></label>
          <input id="growth" type="range" min="5" max="30" bind:value={projGrowth} />
        </div>
        <div class="control-group">
          <label for="year">Projection year:</label>
          <select id="year" bind:value={projYear}>
            <option value={1}>Year 1</option>
            <option value={2}>Year 2</option>
            <option value={3}>Year 3</option>
          </select>
        </div>
      </div>

      <div class="proj-results">
        <div class="result-card card">
          <div class="mono-label">PLG Containers (Year {projYear})</div>
          <div class="result-value">{projectedContainers(projYear).toLocaleString()}</div>
          <div class="result-detail">Starting from 10, growing {projGrowth}%/month</div>
        </div>
        <div class="result-card card">
          <div class="mono-label">PLG ARR (Year {projYear})</div>
          <div class="result-value">{formatCurrency(projectedARR(projYear))}</div>
          <div class="result-detail">Blended ARPU: 60% free, 25% starter, 10% pro, 5% team</div>
        </div>
        <div class="result-card card">
          <div class="mono-label">Enterprise ARR (Year {projYear})</div>
          <div class="result-value accent">{formatCurrency(projectedEnterprise(projYear))}</div>
          <div class="result-detail">{projYear === 1 ? 2 : projYear === 2 ? 5 : 12} deals @ $200k avg ACV</div>
        </div>
        <div class="result-card card">
          <div class="mono-label">Total ARR (Year {projYear})</div>
          <div class="result-value accent">{formatCurrency(projectedARR(projYear) + projectedEnterprise(projYear))}</div>
          <div class="result-detail">PLG + Enterprise combined</div>
        </div>
      </div>

      <h3>3-Year Trajectory</h3>
      <div class="trajectory">
        {#each [1, 2, 3] as y}
          <div class="traj-row card">
            <div class="traj-year">Year {y}</div>
            <div class="traj-data">
              <span class="traj-item">{projectedContainers(y).toLocaleString()} containers</span>
              <span class="traj-item">PLG: {formatCurrency(projectedARR(y))}</span>
              <span class="traj-item">Ent: {formatCurrency(projectedEnterprise(y))}</span>
              <span class="traj-item accent">Total: {formatCurrency(projectedARR(y) + projectedEnterprise(y))}</span>
            </div>
          </div>
        {/each}
      </div>

      <div class="callout">
        <div class="mono-label">Key Assumptions</div>
        <ul>
          <li>PLG starts at 10 containers, grows at {projGrowth}%/month (adjustable)</li>
          <li>PLG tier mix: 60% Free, 25% Starter, 10% Pro, 5% Team (blended ARPU ~$117/yr)</li>
          <li>Enterprise: 2 deals Y1 → 5 Y2 → 12 Y3, avg $200k ACV (founder-led)</li>
          <li>No managed service revenue modeled (conservative)</li>
          <li>Does not account for churn (conservative for early stage)</li>
        </ul>
      </div>
    </section>

  {:else if activeTab === "opensource"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Open-Source Metrics</div>
        <h2>Community traction — early but real</h2>
      </div>

      <div class="oss-grid">
        {#each ossMetrics as m}
          <div class="oss-card card">
            <div class="oss-value">{m.value}</div>
            <div class="oss-label">{m.label}</div>
            <div class="oss-trend" data-trend={m.trend}>{m.trend}</div>
          </div>
        {/each}
      </div>

      <div class="section-header" style="margin-top: var(--space-xl);">
        <div class="mono-label">Organic Discovery</div>
        <h2>Search traction</h2>
      </div>
      <div class="metrics-grid">
        {#each trafficMetrics as m}
          <div class="stat-card card">
            <div class="stat-value">{m.metric}</div>
            <div class="stat-label">{m.label}</div>
            {#if m.note}<div class="stat-note">{m.note}</div>{/if}
          </div>
        {/each}
      </div>

      <div class="callout">
        <div class="mono-label">Honest Frame</div>
        <p>The repo is single-founder, pre-community. The traction signal is organic search discovery — 23k impressions in 90 days, growing to 800-1k/day. The open-source metrics dashboard will populate as the community forms. We're not pretending we have a community we don't.</p>
      </div>
    </section>
  {/if}
</div>

<style>
  .page { padding: var(--space-2xl) var(--space-xl); max-width: var(--max-content); margin: 0 auto; }
  .page-header { margin-bottom: var(--space-xl); }
  .page-header h1 { margin: var(--space-sm) 0; }
  .page-header p { color: var(--text-secondary); }

  .tab-bar { display: flex; gap: 4px; border-bottom: 1px solid var(--border); margin-bottom: var(--space-xl); overflow-x: auto; }
  .tab-btn { padding: 10px 16px; background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-secondary); cursor: pointer; font-size: 13px; font-family: var(--font-body); white-space: nowrap; transition: all var(--transition-fast); }
  .tab-btn:hover { color: var(--text); }
  .tab-btn.active { color: var(--accent); border-bottom-color: var(--accent); }

  .section { margin-bottom: var(--space-2xl); }
  .section-header { margin-bottom: var(--space-lg); }
  h3 { margin: var(--space-xl) 0 var(--space-md); }

  .metrics-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--space-md); }
  .stat-card { padding: var(--space-lg); }
  .stat-value { font-family: var(--font-display); font-size: 2rem; font-weight: 700; color: var(--accent); }
  .stat-label { font-size: 12px; color: var(--text-secondary); margin-top: 4px; }
  .stat-note { font-size: 11px; color: var(--text-tertiary); margin-top: var(--space-xs); }

  .tam-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-lg); }
  .tam-card { padding: var(--space-lg); }
  .tam-value { font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; color: var(--accent); margin: var(--space-xs) 0; }
  .tam-detail { font-size: 12px; color: var(--text-secondary); line-height: 1.5; }

  .sim-controls, .proj-controls { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-lg); margin-bottom: var(--space-xl); }
  .control-group { display: flex; flex-direction: column; gap: var(--space-xs); }
  .control-group label { font-size: 13px; color: var(--text-secondary); }
  .control-group input[type="range"] { width: 100%; accent-color: var(--accent); cursor: pointer; }
  .control-group select { padding: 8px 12px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); font-size: 13px; cursor: pointer; }

  .sim-results, .proj-results { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-lg); }
  .result-card { padding: var(--space-lg); }
  .result-value { font-family: var(--font-display); font-size: 2rem; font-weight: 700; color: var(--text); margin-top: var(--space-xs); }
  .result-value.danger { color: var(--danger); }
  .result-value.accent { color: var(--accent); }
  .result-detail { font-size: 11px; color: var(--text-tertiary); margin-top: 4px; }

  .trajectory { display: flex; flex-direction: column; gap: var(--space-sm); margin-bottom: var(--space-lg); }
  .traj-row { display: flex; align-items: center; gap: var(--space-lg); padding: var(--space-md) var(--space-lg); }
  .traj-year { font-family: var(--font-display); font-weight: 700; font-size: 1.1rem; color: var(--accent); min-width: 80px; }
  .traj-data { display: flex; gap: var(--space-lg); flex-wrap: wrap; }
  .traj-item { font-size: 13px; color: var(--text-secondary); }
  .traj-item.accent { color: var(--accent); font-weight: 600; }

  .oss-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: var(--space-md); }
  .oss-card { padding: var(--space-lg); text-align: center; }
  .oss-value { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--text); }
  .oss-label { font-size: 12px; color: var(--text-secondary); margin-top: 4px; }
  .oss-trend { font-size: 10px; margin-top: var(--space-xs); padding: 2px 8px; border-radius: 10px; display: inline-block; background: var(--bg); color: var(--text-tertiary); }

  code { font-family: var(--font-mono); font-size: 13px; color: var(--accent); }
</style>
