<script lang="ts">
  import { wire, market, socialProof, product } from "$lib/data/wire";
</script>

<div class="hero">
  <div class="hero-content">
    <div class="mono-label">Inside the Wire</div>
    <h1 class="hero-title">{wire.tagline}</h1>
    <p class="hero-sub">{wire.taglineSecondary}</p>
    <div class="hero-meta">
      <span class="badge badge-accent">{wire.stage}</span>
      <span class="badge">Raising {wire.raise}</span>
      <span class="badge">{wire.anchor}</span>
    </div>
    <div class="hero-cta">
      <a href="/pitch" class="btn btn-primary">▶ Launch Pitch Deck</a>
      <a href="/data-room" class="btn btn-outline">Data Room</a>
      <a href="/compliance" class="btn btn-outline">Compliance Risk</a>
    </div>
    <p class="status-note">{wire.statusNote}</p>
  </div>

  <!-- Wire perimeter visualization -->
  <div class="perimeter-viz">
    <svg viewBox="0 0 400 400" class="perimeter-svg">
      <!-- Outer perimeter -->
      <circle cx="200" cy="200" r="180" fill="none" stroke="var(--accent)" stroke-width="1" stroke-opacity="0.1" />
      <circle cx="200" cy="200" r="140" fill="none" stroke="var(--accent)" stroke-width="2" stroke-opacity="0.3" />
      <!-- Container nodes -->
      <circle cx="200" cy="60" r="24" fill="none" stroke="var(--accent)" stroke-width="2" />
      <circle cx="60" cy="200" r="24" fill="none" stroke="var(--accent)" stroke-width="2" />
      <circle cx="200" cy="340" r="24" fill="none" stroke="var(--accent)" stroke-width="2" />
      <circle cx="340" cy="200" r="24" fill="none" stroke="var(--accent)" stroke-width="2" />
      <!-- Connections -->
      <line x1="200" y1="84" x2="200" y2="340" stroke="var(--accent)" stroke-width="1" stroke-opacity="0.2" />
      <line x1="84" y1="200" x2="340" y2="200" stroke="var(--accent)" stroke-width="1" stroke-opacity="0.2" />
      <!-- Central hub -->
      <circle cx="200" cy="200" r="48" fill="var(--accent-glow)" stroke="var(--accent)" stroke-width="2" />
      <text x="200" y="206" text-anchor="middle" fill="var(--accent)" font-family="var(--font-mono)" font-size="12" font-weight="600">WIRE</text>
      <!-- Labels -->
      <text x="200" y="50" text-anchor="middle" fill="var(--text-tertiary)" font-family="var(--font-mono)" font-size="9">CLAUDE</text>
      <text x="50" y="204" text-anchor="middle" fill="var(--text-tertiary)" font-family="var(--font-mono)" font-size="9">GPT</text>
      <text x="200" y="356" text-anchor="middle" fill="var(--text-tertiary)" font-family="var(--font-mono)" font-size="9">CURSOR</text>
      <text x="350" y="204" text-anchor="middle" fill="var(--text-tertiary)" font-family="var(--font-mono)" font-size="9">CODEX</text>
    </svg>
  </div>
</div>

<!-- Key stats -->
<section class="stats-grid">
  <div class="stat-card">
    <div class="stat-value">{market.tam}</div>
    <div class="stat-label">Total Addressable Market</div>
    <p class="stat-note">{market.tamBreakdown}</p>
  </div>
  <div class="stat-card">
    <div class="stat-value">{market.som3yr}</div>
    <div class="stat-label">3-Year Serviceable Obtainable</div>
    <p class="stat-note">Conservative, based on current pipeline</p>
  </div>
  <div class="stat-card">
    <div class="stat-value">{socialProof[0].metric}</div>
    <div class="stat-label">{socialProof[0].label}</div>
    <p class="stat-note">{socialProof[0].note}</p>
  </div>
  <div class="stat-card">
    <div class="stat-value">4</div>
    <div class="stat-label">Pipeline Conversations</div>
    <p class="stat-note">IndiaStox (paid POC), NELFT, Spring Health, Praxent</p>
  </div>
</section>

<!-- CISO scare callout -->
<section class="ciso-section">
  <div class="callout callout-danger">
    <div class="callout-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
      </svg>
    </div>
    <h3>Your agents are touching production data without an audit trail.</h3>
    <p>EU AI Act: up to <strong>€35M / 7% of global turnover</strong>. GDPR: <strong>€20M / 4%</strong>. HIPAA: <strong>$2.19M annual cap</strong>. BIPA: <strong>$5,000 per person, retroactive</strong>.</p>
    <p>Every agent access without an immutable audit record is a compliance exposure. Wire's per-container isolation and audit trail are properties of the substrate — not controls your code has to bolt on top.</p>
    <a href="/compliance" class="btn btn-outline btn-sm">Calculate your exposure →</a>
  </div>
</section>

<!-- Navigation cards -->
<section class="nav-grid">
  <a href="/pitch" class="nav-card card">
    <div class="mono-label">Pitch</div>
    <h3>Investor Narrative</h3>
    <p>Thesis → Market → Moat → Traction → Ask. Slide-capable.</p>
  </a>
  <a href="/value-prop" class="nav-card card">
    <div class="mono-label">Value Prop</div>
    <h3>Five Core Problems</h3>
    <p>Problem-first framework, positioning statement, use case gallery.</p>
  </a>
  <a href="/talking-points" class="nav-card card">
    <div class="mono-label">Talking Points</div>
    <h3>Audience-Segmented</h3>
    <p>Investors, customers, developers. Objection handling.</p>
  </a>
  <a href="/data-room" class="nav-card card">
    <div class="mono-label">Data Room</div>
    <h3>Hard Numbers</h3>
    <p>TAM/SAM/SOM, financials, term sheet, pipeline, risk register.</p>
  </a>
  <a href="/compliance" class="nav-card card">
    <div class="mono-label">Compliance</div>
    <h3>Risk Calculator</h3>
    <p>Jurisdiction penalties, regulatory timeline, architecture mapping.</p>
  </a>
  <a href="/roadmap" class="nav-card card">
    <div class="mono-label">Roadmap</div>
    <h3>Speculative Timeline</h3>
    <p>BYOC → Audit → Observability → Cryptographic-Security → MCP.</p>
  </a>
</section>

<style>
  .hero {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: var(--space-2xl);
    padding: var(--space-2xl) var(--space-xl);
    align-items: center;
    min-height: 70vh;
  }

  .hero-title {
    font-size: 3.5rem;
    line-height: 1.1;
    margin: var(--space-md) 0;
  }
  .hero-title span { color: var(--accent); }

  .hero-sub {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 500px;
  }

  .hero-meta { display: flex; gap: var(--space-sm); margin-top: var(--space-lg); flex-wrap: wrap; }
  .hero-cta { display: flex; gap: var(--space-md); margin-top: var(--space-lg); flex-wrap: wrap; }

  .status-note {
    margin-top: var(--space-lg);
    font-size: 12px;
    color: var(--text-tertiary);
    font-family: var(--font-mono);
    max-width: 500px;
  }

  .perimeter-viz { display: flex; justify-content: center; }
  .perimeter-svg { width: 100%; max-width: 400px; height: auto; }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-lg);
    padding: 0 var(--space-xl) var(--space-xl);
  }

  .stat-card {
    padding: var(--space-lg);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
  .stat-note { font-size: 12px; color: var(--text-tertiary); margin-top: var(--space-sm); }

  .ciso-section { padding: 0 var(--space-xl) var(--space-xl); }

  .nav-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-lg);
    padding: 0 var(--space-xl) var(--space-2xl);
  }

  .nav-card {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .nav-card h3 { font-size: 1.25rem; }
  .nav-card p { font-size: 13px; color: var(--text-secondary); }

  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr; }
    .perimeter-viz { order: -1; }
    .hero-title { font-size: 2.5rem; }
  }
</style>
