<script lang="ts">
  import { market, economics, pipeline, socialProof, risks, gtm } from "$lib/data/wire";

  // Pipeline stage badge class — hot = accent (green), warm = neutral
  function stageClass(stage: string): string {
    if (stage.toLowerCase().startsWith("hot")) return "badge badge-accent";
    return "badge";
  }

  // Risk severity → badge class. Critical=red, High=orange(warn), Medium=yellow(warn)
  function severityClass(severity: string): string {
    const s = severity.toLowerCase();
    if (s === "critical") return "badge badge-danger";
    if (s === "high") return "badge badge-warn";
    return "badge badge-warn";
  }

  // Priority label: 1 = highest. P1 = accent, P2 = neutral-warm, rest = neutral
  function priorityBadge(priority: number): { label: string; cls: string } {
    if (priority === 1) return { label: "P1 — top", cls: "badge badge-accent" };
    if (priority === 2) return { label: "P2", cls: "badge badge-warn" };
    return { label: `P${priority}`, cls: "badge" };
  }
</script>

<svelte:head>
  <title>Wire — Data Room</title>
  <meta name="description" content="Investor data room: market sizing, economics, pipeline, social proof, risk register, GTM." />
</svelte:head>

<div class="room">
  <header class="room-header">
    <div class="mono-label">Inside the Wire / Data Room</div>
    <h1>Investor Data Room</h1>
    <p class="room-sub">Market sizing, unit economics, pipeline, social proof, risk register, and go-to-market. Numbers are honest, including where they're thin.</p>
  </header>

  <!-- ============================================================ -->
  <!-- 1. MARKET SIZING                                              -->
  <!-- ============================================================ -->
  <section class="room-section">
    <div class="section-head">
      <span class="section-num">01</span>
      <h2>Market Sizing</h2>
      <span class="section-note">TAM / SAM / SOM + priority-ranked segments</span>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Layer</th><th>Value</th><th>Basis</th></tr>
        </thead>
        <tbody>
          {#each market.sizing as row}
            <tr>
              <td class="td-strong">{row.layer}</td>
              <td class="td-mono">{row.value}</td>
              <td>{row.basis}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <h3 class="sub-h">Target Segments</h3>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>#</th><th>Segment</th><th>Motion</th><th>ARPU</th><th>Priority</th></tr>
        </thead>
        <tbody>
          {#each market.segments as seg}
            {@const pb = priorityBadge(seg.priority)}
            <tr>
              <td class="td-mono">{seg.id}</td>
              <td class="td-strong">{seg.name}</td>
              <td>{seg.motion}</td>
              <td class="td-mono">{seg.arpu}</td>
              <td>
                <span class={pb.cls}>{pb.label}</span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- ============================================================ -->
  <!-- 2. ECONOMICS                                                 -->
  <!-- ============================================================ -->
  <section class="room-section">
    <div class="section-head">
      <span class="section-num">02</span>
      <h2>Economics</h2>
      <span class="section-note">Pricing tiers, build-vs-buy, CAC, discount policy</span>
    </div>

    <h3 class="sub-h">Pricing Tiers</h3>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Tier</th><th>Price</th><th>Credits</th><th>Motion</th></tr>
        </thead>
        <tbody>
          {#each economics.pricing as row}
            <tr>
              <td class="td-strong">{row.tier}</td>
              <td class="td-mono">{row.price}</td>
              <td>{row.credits}</td>
              <td>{row.motion}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <h3 class="sub-h">Build vs Buy</h3>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Line item</th><th>Annual cost</th></tr>
        </thead>
        <tbody>
          {#each economics.buildVsBuy as row}
            <tr>
              <td class="td-strong">{row.item}</td>
              <td class="td-mono">{row.annual}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <h3 class="sub-h">Customer Acquisition Cost</h3>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Segment</th><th>Motion</th><th>CAC</th><th>LTV</th><th>Payback</th></tr>
        </thead>
        <tbody>
          {#each economics.cac as row}
            <tr>
              <td class="td-strong">{row.segment}</td>
              <td>{row.motion}</td>
              <td class="td-mono">{row.cac}</td>
              <td class="td-mono">{row.ltv}</td>
              <td class="td-mono">{row.payback}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <h3 class="sub-h">Discount Policy</h3>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Scenario</th><th>Discount</th><th>Approval</th></tr>
        </thead>
        <tbody>
          {#each economics.discountPolicy as row}
            <tr>
              <td class="td-strong">{row.scenario}</td>
              <td class="td-mono">{row.discount}</td>
              <td>{row.approval}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="callout callout-danger">
      <div class="callout-body">
        <div class="mono-label">Risk Note</div>
        <p>{economics.riskNote}</p>
      </div>
    </div>
  </section>

  <!-- ============================================================ -->
  <!-- 3. PIPELINE                                                  -->
  <!-- ============================================================ -->
  <section class="room-section">
    <div class="section-head">
      <span class="section-num">03</span>
      <h2>Pipeline</h2>
      <span class="section-note">{pipeline.length} active conversations</span>
    </div>

    <div class="pipeline-grid">
      {#each pipeline as deal}
        <div class="card deal-card">
          <div class="deal-head">
            <h3 class="deal-org">{deal.org}</h3>
            <span class={stageClass(deal.stage)}>{deal.stage}</span>
          </div>
          <p class="deal-segment">{deal.segment}</p>

          <dl class="deal-meta">
            <div class="deal-row">
              <dt>Motion</dt>
              <dd>{deal.motion}</dd>
            </div>
            <div class="deal-row">
              <dt>Why Wire</dt>
              <dd>{deal.whyWire}</dd>
            </div>
            <div class="deal-row">
              <dt>Blocker</dt>
              <dd class="deal-blocker">{deal.blocker}</dd>
            </div>
            <div class="deal-row deal-row-foot">
              <div>
                <dt>Target close</dt>
                <dd class="td-mono">{deal.targetClose}</dd>
              </div>
              <div>
                <dt>Deal size</dt>
                <dd class="td-mono">{deal.dealSize}</dd>
              </div>
            </div>
          </dl>
        </div>
      {/each}
    </div>
  </section>

  <!-- ============================================================ -->
  <!-- 4. SOCIAL PROOF                                              -->
  <!-- ============================================================ -->
  <section class="room-section">
    <div class="section-head">
      <span class="section-num">04</span>
      <h2>Social Proof</h2>
      <span class="section-note">Early signals — not yet at scale</span>
    </div>

    <div class="proof-grid">
      {#each socialProof as proof}
        <div class="card stat-card">
          <div class="stat">
            <span class="stat-value">{proof.metric}</span>
            <span class="stat-label">{proof.label}</span>
          </div>
          <p class="stat-note">{proof.note}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- ============================================================ -->
  <!-- 5. RISK REGISTER                                             -->
  <!-- ============================================================ -->
  <section class="room-section">
    <div class="section-head">
      <span class="section-num">05</span>
      <h2>Risk Register</h2>
      <span class="section-note">{risks.length} tracked risks with mitigations</span>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Risk</th><th>Impact</th><th class="th-narrow">Severity</th><th>Mitigation</th></tr>
        </thead>
        <tbody>
          {#each risks as risk}
            <tr>
              <td class="td-strong">{risk.risk}</td>
              <td>{risk.impact}</td>
              <td><span class={severityClass(risk.severity)}>{risk.severity}</span></td>
              <td>{risk.mitigation}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- ============================================================ -->
  <!-- 6. GTM                                                       -->
  <!-- ============================================================ -->
  <section class="room-section">
    <div class="section-head">
      <span class="section-num">06</span>
      <h2>Go-to-Market</h2>
      <span class="section-note">Dual motion + sales org build sequence</span>
    </div>

    <h3 class="sub-h">Dual Motion — Bottoms-up vs Top-down</h3>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Dimension</th><th>Bottoms-up</th><th>Top-down</th></tr>
        </thead>
        <tbody>
          {#each gtm.dualMotion as row}
            <tr>
              <td class="td-strong">{row.dimension}</td>
              <td>{row.bottomsUp}</td>
              <td>{row.topDown}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <h3 class="sub-h">Sales Org Build Sequence</h3>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Phase</th><th>ARR</th><th>Team</th><th>Next hire</th>
            <th>ACV</th><th>Cycle</th>
          </tr>
        </thead>
        <tbody>
          {#each gtm.salesOrg as row}
            <tr>
              <td class="td-strong">{row.phase}</td>
              <td class="td-mono">{row.arr}</td>
              <td>{row.team}</td>
              <td>{row.hire}</td>
              <td class="td-mono">{row.acv}</td>
              <td class="td-mono">{row.cycle}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="callout-grid">
      <div class="callout callout-danger">
        <div class="callout-body">
          <div class="mono-label">Don't Hire</div>
          <p>{gtm.dontHire}</p>
        </div>
      </div>
      <div class="callout callout-accent">
        <div class="callout-body">
          <div class="mono-label">PQL Rule</div>
          <p>{gtm.pqlRule}</p>
        </div>
      </div>
    </div>
  </section>

  <footer class="room-foot">
    <div class="perimeter perimeter-accent"></div>
    <p>Data sourced from <span class="td-mono">$lib/data/wire</span> — structured research layer. Status: early.</p>
  </footer>
</div>

<style>
  .room {
    max-width: var(--max-content);
    margin: 0 auto;
    padding: var(--space-2xl) var(--space-xl) var(--space-xl);
  }

  /* Header */
  .room-header { margin-bottom: var(--space-2xl); }
  .room-header h1 { margin: var(--space-sm) 0 var(--space-sm); }
  .room-sub {
    font-size: 1.05rem;
    color: var(--text-secondary);
    max-width: 640px;
  }

  /* Sections */
  .room-section { margin-bottom: var(--space-2xl); }
  .section-head {
    display: flex;
    align-items: baseline;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--border);
  }
  .section-num {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--accent);
    letter-spacing: 0.1em;
  }
  .section-head h2 { font-size: 1.5rem; margin: 0; }
  .section-note {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-tertiary);
    margin-left: auto;
  }

  .sub-h {
    font-size: 1rem;
    color: var(--text-secondary);
    margin: var(--space-lg) 0 var(--space-sm);
    padding-left: var(--space-xs);
    border-left: 2px solid var(--accent);
  }

  /* Tables */
  .table-wrap {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow-x: auto;
  }
  .table-wrap table { margin: 0; }
  .table-wrap td { vertical-align: top; }
  .td-strong { color: var(--text); font-weight: 600; }
  .td-mono { font-family: var(--font-mono); white-space: nowrap; }
  .th-narrow { width: 90px; }

  /* Pipeline cards */
  .pipeline-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: var(--space-lg);
  }
  .deal-card { display: flex; flex-direction: column; gap: var(--space-sm); padding: var(--space-lg); }
  .deal-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-sm);
    flex-wrap: wrap;
  }
  .deal-org { font-size: 1.2rem; margin: 0; }
  .deal-segment {
    font-size: 12px;
    color: var(--text-tertiary);
    font-family: var(--font-mono);
    margin: 0;
  }

  .deal-meta {
    margin: var(--space-sm) 0 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .deal-row {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .deal-row dt {
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-tertiary);
  }
  .deal-row dd {
    margin: 0;
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.4;
  }
  .deal-blocker { color: var(--danger); }
  .deal-row-foot {
    display: flex;
    gap: var(--space-lg);
    border-top: 1px solid var(--border);
    padding-top: var(--space-sm);
    margin-top: var(--space-xs);
  }
  .deal-row-foot > div { display: flex; flex-direction: column; gap: 2px; }
  .deal-row-foot dd { color: var(--text); }

  /* Social proof */
  .proof-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--space-lg);
  }
  .stat-card { padding: var(--space-lg); }
  .stat-note {
    font-size: 12px;
    color: var(--text-tertiary);
    margin: var(--space-sm) 0 0;
    line-height: 1.4;
  }

  /* Callouts */
  .callout-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-lg);
    margin-top: var(--space-lg);
  }
  .callout-body { display: flex; flex-direction: column; gap: var(--space-sm); }
  .callout-body p { margin: 0; font-size: 14px; line-height: 1.5; color: var(--text-secondary); }

  /* Footer */
  .room-foot {
    margin-top: var(--space-2xl);
    padding-top: var(--space-lg);
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }
  .room-foot p {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-tertiary);
    margin: 0;
  }

  @media (max-width: 768px) {
    .room { padding: var(--space-xl) var(--space-md); }
    .section-note { display: none; }
    .callout-grid { grid-template-columns: 1fr; }
    .deal-row-foot { flex-direction: column; gap: var(--space-sm); }
  }
</style>
