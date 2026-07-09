<script lang="ts">
  import { competition, product, integrations } from "$lib/data/wire";

  let activeFilter = $state("all");

  const matrix = [
    { feature: "Per-container isolation", wire: true, smithery: false, box: false, langchain: false, build: "Custom" },
    { feature: "Audit trail (immutable)", wire: true, smithery: false, box: "Partial", langchain: false, build: "Custom" },
    { feature: "Open-source container", wire: true, smithery: false, box: false, langchain: true, build: false },
    { feature: "MCP-native", wire: true, smithery: true, box: true, langchain: false, build: false },
    { feature: "Portable across model providers", wire: true, smithery: false, box: false, langchain: false, build: true },
    { feature: "BYOC (bring your own cloud)", wire: true, smithery: false, box: false, langchain: false, build: true },
    { feature: "RBAC per container", wire: true, smithery: false, box: "Partial", langchain: false, build: "Custom" },
    { feature: "Bidirectional (read + write)", wire: true, smithery: "Outbound", box: "Read + limited", langchain: true, build: true },
    { feature: "Self-hostable", wire: true, smithery: false, box: false, langchain: true, build: true },
    { feature: "REST API", wire: true, smithery: true, box: true, langchain: true, build: true },
    { feature: "Compliance-ready (SOC 2 path)", wire: "Building", smithery: false, box: true, langchain: false, build: "DIY" },
    { feature: "Context persistence across sessions", wire: true, smithery: false, box: true, langchain: "Session-scoped", build: "Custom" },
  ];

  const competitors = [
    { key: "wire", name: "Wire", note: "Context as a Service" },
    { key: "smithery", name: "Smithery", note: "MCP registry" },
    { key: "box", name: "Box", note: "Enterprise CMS" },
    { key: "langchain", name: "LangChain", note: "AI infra library" },
    { key: "build", name: "Build-your-own", note: "The real competitor" },
  ];

  function cellClass(val: any): string {
    if (val === true) return "yes";
    if (val === false) return "no";
    return "partial";
  }

  function cellText(val: any): string {
    if (val === true) return "✓";
    if (val === false) return "✕";
    return val;
  }

  // Security architecture layers
  const securityLayers = [
    { layer: "Perimeter", component: "BYOC deployment", description: "Data stays in customer's cloud. EU data stays in EU infra." },
    { layer: "Container boundary", component: "Per-container isolation", description: "Each container is its own database. No shared state. No escalation." },
    { layer: "Access control", component: "RBAC + scoped credentials", description: "Admin, member, viewer roles per container. Tool allowlists on top." },
    { layer: "Audit", component: "Immutable access trail", description: "Who read what, when, from which agent. GDPR Art. 30, 32. AI Act Art. 12." },
    { layer: "Transport", component: "MCP + REST dual transport", description: "MCP for agent interaction, REST for automation. Both secured." },
    { layer: "Data", component: "Portable single-file containers", description: "Exportable, inspectable. Art. 20 portability. Ownership by design." },
  ];
</script>

<div class="page">
  <div class="page-header">
    <div class="mono-label">Competitive Position</div>
    <h1>Four categories. Each with a structural disadvantage.</h1>
    <p>Wire doesn't compete on features — it competes on shape.</p>
  </div>

  <!-- Category overview -->
  <section class="section">
    {#each competition.categories as cat}
      <div class="category-card card">
        <div class="category-header">
          <h3>{cat.name}</h3>
          <span class="badge">{cat.who}</span>
        </div>
        <div class="category-disadvantage">
          <span class="mono-label">Why Wire wins</span>
          <p>{cat.disadvantage}</p>
        </div>
      </div>
    {/each}
  </section>

  <!-- Feature comparison matrix -->
  <section class="section">
    <div class="section-header">
      <div class="mono-label">Feature Matrix</div>
      <h2>Wire vs the alternatives</h2>
    </div>

    <div class="table-wrap">
      <table class="matrix-table">
        <thead>
          <tr>
            <th>Capability</th>
            {#each competitors as c}
              <th class="col-{c.key}">
                <div class="comp-name">{c.name}</div>
                <div class="comp-note">{c.note}</div>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each matrix as row}
            <tr>
              <td class="feature-cell">{row.feature}</td>
              {#each competitors as c}
                <td class="matrix-cell {cellClass(row[c.key as keyof typeof row])}">{cellText(row[c.key as keyof typeof row])}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="legend">
      <span class="legend-item"><span class="legend-dot yes"></span> Full support</span>
      <span class="legend-item"><span class="legend-dot partial"></span> Partial / limited</span>
      <span class="legend-item"><span class="legend-dot no"></span> Not available</span>
    </div>
  </section>

  <!-- Security architecture diagram -->
  <section class="section">
    <div class="section-header">
      <div class="mono-label">Security Architecture</div>
      <h2>Inside the wire — layered containment</h2>
    </div>

    <div class="security-stack">
      {#each securityLayers as layer, i}
        <div class="security-layer" style="--delay: {i * 50}ms">
          <div class="layer-number">{i + 1}</div>
          <div class="layer-body">
            <div class="layer-name">{layer.layer}</div>
            <div class="layer-component">{layer.component}</div>
            <div class="layer-desc">{layer.description}</div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Structural moats -->
  <section class="section">
    <div class="section-header">
      <div class="mono-label">Structural Moats</div>
      <h2>Five moats that compound</h2>
    </div>

    <div class="moats-grid">
      {#each competition.moats as moat, i}
        <div class="moat-card card card-accent">
          <div class="moat-number">{i + 1}</div>
          <h4>{moat.name}</h4>
          <p>{moat.detail}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Integration showcase -->
  <section class="section">
    <div class="section-header">
      <div class="mono-label">Integrations</div>
      <h2>MCP-compatible ecosystem</h2>
    </div>

    <div class="integrations-grid">
      {#each integrations as integ}
        <div class="integration-card card">
          <div class="integ-name">{integ.name}</div>
          <div class="integ-type">{integ.type}</div>
          <span class="badge badge-accent">{integ.status}</span>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .page { padding: var(--space-2xl) var(--space-xl); max-width: var(--max-content); margin: 0 auto; }
  .page-header { margin-bottom: var(--space-2xl); }
  .page-header h1 { margin: var(--space-sm) 0; }
  .page-header p { color: var(--text-secondary); }

  .section { margin-bottom: var(--space-2xl); }
  .section-header { margin-bottom: var(--space-lg); }

  .category-card { margin-bottom: var(--space-md); display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg); }
  .category-header { display: flex; flex-direction: column; gap: var(--space-sm); }
  .category-disadvantage p { font-size: 14px; color: var(--text-secondary); margin-top: var(--space-sm); }

  .table-wrap { overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius-md); }
  .matrix-table { min-width: 700px; }
  .matrix-table th { text-align: center; padding: var(--space-md); }
  .matrix-table th:first-child { text-align: left; }
  .comp-name { font-family: var(--font-display); font-size: 14px; font-weight: 600; color: var(--text); }
  .comp-note { font-size: 10px; color: var(--text-tertiary); font-weight: 400; }
  .col-wire { background: var(--accent-glow); }
  .feature-cell { text-align: left; font-weight: 500; color: var(--text); }

  .matrix-cell { text-align: center; font-family: var(--font-mono); font-size: 13px; }
  .matrix-cell.yes { color: var(--accent); font-weight: 700; }
  .matrix-cell.no { color: var(--text-tertiary); }
  .matrix-cell.partial { color: var(--warn); font-size: 11px; }

  .legend { display: flex; gap: var(--space-lg); margin-top: var(--space-md); }
  .legend-item { display: flex; align-items: center; gap: var(--space-sm); font-size: 12px; color: var(--text-tertiary); }
  .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
  .legend-dot.yes { background: var(--accent); }
  .legend-dot.partial { background: var(--warn); }
  .legend-dot.no { background: var(--text-tertiary); }

  .security-stack { display: flex; flex-direction: column; gap: 2px; }
  .security-layer {
    display: flex; gap: var(--space-lg); padding: var(--space-lg);
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: var(--radius-md); align-items: start;
    animation: slide-in var(--transition) ease both;
    animation-delay: var(--delay);
  }
  .layer-number {
    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: var(--accent-glow); color: var(--accent);
    font-family: var(--font-mono); font-weight: 700; font-size: 14px;
  }
  .layer-body { display: flex; flex-direction: column; gap: 2px; }
  .layer-name { font-weight: 600; font-size: 14px; color: var(--text); }
  .layer-component { font-family: var(--font-mono); font-size: 12px; color: var(--accent); }
  .layer-desc { font-size: 12px; color: var(--text-tertiary); margin-top: var(--space-xs); }

  .moats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-md); }
  .moat-card { position: relative; }
  .moat-number {
    position: absolute; top: var(--space-md); right: var(--space-md);
    font-family: var(--font-display); font-size: 2rem; font-weight: 700;
    color: var(--accent-dim); opacity: 0.5;
  }
  .moat-card h4 { margin-bottom: var(--space-sm); }
  .moat-card p { font-size: 13px; color: var(--text-secondary); }

  .integrations-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--space-md); }
  .integration-card { display: flex; flex-direction: column; gap: var(--space-sm); padding: var(--space-md); }
  .integ-name { font-weight: 600; font-size: 14px; }
  .integ-type { font-size: 12px; color: var(--text-tertiary); }

  @media (max-width: 768px) {
    .category-card { grid-template-columns: 1fr; }
  }
</style>
