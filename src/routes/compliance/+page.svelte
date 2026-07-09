<script lang="ts">
  import { compliance, economics } from "$lib/data/wire";

  let selectedRegion = $state("all");
  let engineerCost = $state(225);
  let pipelines = $state(2);
  let platformCost = $state(30);

  let buildCost = $derived(engineerCost * pipelines + platformCost * pipelines);
  let wireCost = $derived(150); // mid-market managed ACV in $k
  let savings = $derived(buildCost - wireCost);
  let savingsPct = $derived(Math.round((savings / buildCost) * 100));

  const regions = [
    { id: "all", label: "All Jurisdictions" },
    { id: "us", label: "United States" },
    { id: "ca", label: "Canada" },
    { id: "mx", label: "Mexico" },
    { id: "eu", label: "European Union" },
  ];

  const penaltyData = [
    { region: "EU", regulation: "EU AI Act", penalty: "€35M / 7% global turnover", severity: 5, details: "4 risk tiers, Art. 12 automatic event logging, up to €35M or 7% of global annual turnover" },
    { region: "EU", regulation: "GDPR", penalty: "€20M / 4% global turnover", severity: 4, details: "Art. 30 ROPA, Art. 35 DPIA, Art. 32 security, Art. 22 automated decisions" },
    { region: "CA", regulation: "Quebec Law 25", penalty: "CAD$25M / 4%", severity: 3, details: "Mandatory privacy officer, mandatory PIA, explicit opt-in consent" },
    { region: "EU", regulation: "NIS2", penalty: "€10M / 2%", severity: 3, details: "Cybersecurity, 24h/72h/1-month incident reporting, personal executive liability" },
    { region: "US", regulation: "HIPAA", penalty: "$2.19M annual cap (Tier 4)", severity: 2, details: "PHI, BAA required, per-violation caps by tier" },
    { region: "US", regulation: "BIPA (Illinois)", penalty: "$5,000/violation per-person", severity: 2, details: "Retroactive — class action exposure, per-person damages" },
  ];

  let filteredPenalties = $derived(
    selectedRegion === "all"
      ? penaltyData
      : penaltyData.filter((p) => {
          if (selectedRegion === "us") return p.region === "US";
          if (selectedRegion === "ca") return p.region === "CA";
          if (selectedRegion === "eu") return p.region === "EU";
          return true;
        })
  );

  const severityColor = (s: number) => {
    if (s >= 5) return "var(--danger)";
    if (s >= 4) return "#f97316";
    if (s >= 3) return "var(--warn)";
    return "var(--text-tertiary)";
  };

  const severityLabel = (s: number) => {
    if (s >= 5) return "CRITICAL";
    if (s >= 4) return "SEVERE";
    if (s >= 3) return "HIGH";
    return "MODERATE";
  };

  // Regulatory countdown
  const regulations = [
    { name: "CA CCPA ADMT", date: "2027-01-01", desc: "Automated Decision-Making Technology regulations" },
    { name: "CO AI Act (SB 24-205)", date: "2026-02-01", desc: "Developer + deployer obligations, annual impact assessments" },
    { name: "EU AI Act — high-risk systems", date: "2027-08-02", desc: "High-risk AI system requirements in force" },
    { name: "CT AI Act (SB 5)", date: "2026-01-01", desc: "AEDT — Automated Employment Decision Tools" },
    { name: "NIS2 compliance deadline", date: "2024-10-17", desc: "Member state transposition (passed)" },
  ];

  function daysUntil(dateStr: string): number {
    const target = new Date(dateStr);
    const now = new Date("2026-07-09");
    return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }
</script>

<div class="page">
  <div class="page-header">
    <div class="mono-label">Compliance Risk</div>
    <h1>Every agent access is a compliance exposure.</h1>
    <p>Wire's per-container isolation and audit trail are properties of the substrate — not controls your code has to bolt on top.</p>
  </div>

  <!-- CISO Scare: Penalty Calculator -->
  <section class="section">
    <div class="section-header">
      <div class="mono-label">Maximum Exposure</div>
      <h2>Select your jurisdiction</h2>
    </div>

    <div class="filter-bar">
      {#each regions as r}
        <button
          class="filter-btn"
          class:active={selectedRegion === r.id}
          onclick={() => (selectedRegion = r.id)}
        >
          {r.label}
        </button>
      {/each}
    </div>

    <div class="penalty-grid">
      {#each filteredPenalties as p}
        <div class="penalty-card" style="--severity: {severityColor(p.severity)}">
          <div class="penalty-header">
            <span class="penalty-regulation">{p.regulation}</span>
            <span class="severity-badge" style="background: {severityColor(p.severity)}; border-color: {severityColor(p.severity)}">
              {severityLabel(p.severity)}
            </span>
          </div>
          <div class="penalty-value">{p.penalty}</div>
          <p class="penalty-details">{p.details}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Build-vs-Buy ROI Calculator -->
  <section class="section">
    <div class="section-header">
      <div class="mono-label">Build vs Buy</div>
      <h2>Calculate your exposure</h2>
    </div>

    <div class="roi-calculator">
      <div class="calc-inputs">
        <div class="calc-field">
          <label>AI engineer cost ($k/yr)</label>
          <input type="range" min="185" max="265" value={engineerCost} oninput={(e) => (engineerCost = +e.currentTarget.value)} />
          <span class="calc-value">${engineerCost}k</span>
        </div>
        <div class="calc-field">
          <label>Production pipelines</label>
          <input type="range" min="1" max="10" value={pipelines} oninput={(e) => (pipelines = +e.currentTarget.value)} />
          <span class="calc-value">{pipelines}</span>
        </div>
        <div class="calc-field">
          <label>Platform costs ($k/yr per pipeline)</label>
          <input type="range" min="20" max="40" value={platformCost} oninput={(e) => (platformCost = +e.currentTarget.value)} />
          <span class="calc-value">${platformCost}k</span>
        </div>
      </div>

      <div class="calc-results">
        <div class="calc-row">
          <div class="calc-label">Build it yourself</div>
          <div class="calc-amount danger">${buildCost}k<span class="calc-unit">/yr</span></div>
        </div>
        <div class="calc-row">
          <div class="calc-label">Wire managed service</div>
          <div class="calc-amount accent">${wireCost}k<span class="calc-unit">/yr</span></div>
        </div>
        <div class="calc-divider"></div>
        <div class="calc-row highlight">
          <div class="calc-label">Annual savings</div>
          <div class="calc-amount accent">${savings}k ({savingsPct}%)</div>
        </div>
      </div>
    </div>

    <div class="callout">
      <p>Gartner's first-implementation budget: <strong>$500k–$1.5M</strong>. Mid-market equivalent: <strong>$70–120k</strong>. Wire replaces this across the spectrum at a fraction.</p>
    </div>
  </section>

  <!-- Architecture Mapping -->
  <section class="section">
    <div class="section-header">
      <div class="mono-label">Architecture → Obligation</div>
      <h2>Wire's compliance is structural</h2>
    </div>

    <div class="mapping-grid">
      {#each compliance.architectureMapping as m}
        <div class="mapping-card card">
          <div class="mapping-feature">{m.feature}</div>
          <div class="mapping-arrow">→</div>
          <div class="mapping-obligation">{m.mapsTo}</div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Regulatory Countdown -->
  <section class="section">
    <div class="section-header">
      <div class="mono-label">Regulatory Timeline</div>
      <h2>Upcoming enforcement deadlines</h2>
    </div>

    <div class="timeline">
      {#each regulations as reg}
        {@const days = daysUntil(reg.date)}
        <div class="timeline-item" class:overdue={days < 0}>
          <div class="timeline-date">{reg.date}</div>
          <div class="timeline-body">
            <div class="timeline-name">{reg.name}</div>
            <div class="timeline-desc">{reg.desc}</div>
          </div>
          <div class="timeline-countdown">
            {#if days < 0}
              <span class="badge badge-danger">In effect</span>
            {:else}
              <span class="badge badge-warn">{days} days</span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Compliance Blockers -->
  <section class="section">
    <div class="section-header">
      <div class="mono-label">What Blocks Deals</div>
      <h2>Accreditation needed</h2>
    </div>

    <table>
      <thead>
        <tr><th>Accreditation</th><th>Need</th><th>Cost</th><th>Timeline</th><th>Blocks</th></tr>
      </thead>
      <tbody>
        {#each compliance.blockers as b}
          <tr>
            <td><strong>{b.accreditation}</strong></td>
            <td>{b.need}</td>
            <td>{b.cost}</td>
            <td>{b.timeline}</td>
            <td><span class="badge badge-danger">{b.blocks}</span></td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="callout callout-danger">
      <p><strong>Without SOC 2 Type I, regulated buyers won't sign.</strong> This is the single highest-leverage pre-seed investment. $20–35k, ~6 months.</p>
    </div>
  </section>

  <!-- Jurisdictional Coverage -->
  <section class="section">
    <div class="section-header">
      <div class="mono-label">Jurisdictional Coverage</div>
      <h2>Research scope</h2>
    </div>

    <div class="jurisdiction-grid">
      {#each compliance.jurisdictions as j}
        <div class="card jurisdiction-card">
          <div class="mono-label">{j.region}</div>
          <p>{j.key}</p>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .page { padding: var(--space-2xl) var(--space-xl); max-width: var(--max-content); margin: 0 auto; }
  .page-header { margin-bottom: var(--space-2xl); }
  .page-header h1 { margin: var(--space-sm) 0; }
  .page-header p { color: var(--text-secondary); max-width: 600px; }

  .section { margin-bottom: var(--space-2xl); }
  .section-header { margin-bottom: var(--space-lg); }

  .filter-bar { display: flex; gap: var(--space-sm); margin-bottom: var(--space-lg); flex-wrap: wrap; }
  .filter-btn {
    padding: 6px 14px; border-radius: var(--radius-full);
    border: 1px solid var(--border); background: var(--bg-card);
    color: var(--text-secondary); cursor: pointer; font-size: 13px;
    transition: all var(--transition-fast);
  }
  .filter-btn:hover { border-color: var(--border-bright); color: var(--text); }
  .filter-btn.active { background: var(--accent-glow); border-color: var(--accent); color: var(--accent); }

  .penalty-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-lg); }
  .penalty-card {
    padding: var(--space-lg); border: 1px solid var(--border);
    border-left: 3px solid var(--severity); border-radius: var(--radius-md);
    background: var(--bg-card);
  }
  .penalty-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-md); }
  .penalty-regulation { font-weight: 600; font-size: 15px; }
  .severity-badge {
    padding: 2px 8px; border-radius: var(--radius-sm); border: 1px solid;
    font-family: var(--font-mono); font-size: 10px; font-weight: 600;
    color: #fff; text-transform: uppercase; letter-spacing: 0.05em;
  }
  .penalty-value { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--severity); margin-bottom: var(--space-sm); }
  .penalty-details { font-size: 12px; color: var(--text-tertiary); line-height: 1.5; }

  .roi-calculator {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl);
    background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: var(--space-xl);
  }
  .calc-inputs { display: flex; flex-direction: column; gap: var(--space-lg); }
  .calc-field { display: flex; flex-direction: column; gap: var(--space-sm); }
  .calc-field label { font-size: 13px; color: var(--text-secondary); }
  .calc-field input[type="range"] { width: 100%; accent-color: var(--accent); }
  .calc-value { font-family: var(--font-mono); font-size: 14px; font-weight: 600; color: var(--accent); }

  .calc-results { display: flex; flex-direction: column; gap: var(--space-md); justify-content: center; }
  .calc-row { display: flex; justify-content: space-between; align-items: center; }
  .calc-label { font-size: 14px; color: var(--text-secondary); }
  .calc-amount { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; }
  .calc-amount.danger { color: var(--danger); }
  .calc-amount.accent { color: var(--accent); }
  .calc-unit { font-size: 14px; color: var(--text-tertiary); }
  .calc-divider { height: 1px; background: var(--border); margin: var(--space-sm) 0; }
  .calc-row.highlight .calc-label { color: var(--text); font-weight: 600; }

  .mapping-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: var(--space-md); }
  .mapping-card { display: flex; align-items: center; gap: var(--space-md); padding: var(--space-md); }
  .mapping-feature { font-weight: 600; flex-shrink: 0; }
  .mapping-arrow { color: var(--accent); font-size: 1.25rem; }
  .mapping-obligation { font-size: 12px; color: var(--text-tertiary); }

  .timeline { display: flex; flex-direction: column; gap: var(--space-sm); }
  .timeline-item {
    display: grid; grid-template-columns: 120px 1fr auto; gap: var(--space-lg);
    padding: var(--space-md); border: 1px solid var(--border); border-radius: var(--radius-md);
    background: var(--bg-card); align-items: center;
  }
  .timeline-item.overdue { opacity: 0.6; }
  .timeline-date { font-family: var(--font-mono); font-size: 13px; color: var(--accent); }
  .timeline-name { font-weight: 600; font-size: 14px; }
  .timeline-desc { font-size: 12px; color: var(--text-tertiary); margin-top: 2px; }

  .jurisdiction-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-md); }
  .jurisdiction-card p { font-size: 13px; color: var(--text-secondary); margin-top: var(--space-sm); line-height: 1.5; }

  @media (max-width: 768px) {
    .roi-calculator { grid-template-columns: 1fr; }
    .timeline-item { grid-template-columns: 1fr; gap: var(--space-sm); }
  }
</style>
