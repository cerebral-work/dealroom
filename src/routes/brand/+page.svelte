<script lang="ts">
  import { brand } from "$lib/data/wire";
</script>

<svelte:head>
  <title>Brand Voice — Wire</title>
  <meta name="description" content="Wire brand voice guide — positioning, principles, tone, and what we never say." />
</svelte:head>

<div class="page">
  <div class="mono-label">Brand Voice Guide</div>

  <!-- 1. Tagline -->
  <section class="tagline-section">
    <h1 class="tagline">
      Code has <span class="text-accent">GitHub</span>.<br />
      Everything else has <span class="text-accent">Wire</span>.
    </h1>
    <p class="tagline-note">The one sentence every piece of copy should be able to point back to.</p>
  </section>

  <!-- 2. Positioning Statement -->
  <section class="section">
    <h2 class="section-title">Positioning Statement</h2>
    <div class="card positioning-card">
      <div class="positioning-block">
        <div class="pos-row">
          <span class="pos-label">For</span>
          <span class="pos-text">{brand.positioning.for}</span>
        </div>
        <div class="pos-row">
          <span class="pos-label">Who</span>
          <span class="pos-text">{brand.positioning.who}</span>
        </div>
        <div class="pos-row">
          <span class="pos-label">Wire is</span>
          <span class="pos-text">{brand.positioning.wireIs}</span>
        </div>
        <div class="pos-row">
          <span class="pos-label">That</span>
          <span class="pos-text">{brand.positioning.that}</span>
        </div>
        <div class="pos-row">
          <span class="pos-label">Unlike</span>
          <span class="pos-text">{brand.positioning.unlike}</span>
        </div>
        <div class="pos-row pos-row-final">
          <span class="pos-label">Wire</span>
          <span class="pos-text pos-text-accent">{brand.positioning.wire}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Brand Voice Principles -->
  <section class="section">
    <h2 class="section-title">Brand Voice Principles</h2>
    <div class="principles-grid">
      {#each brand.principles as principle}
        <div class="card principle-card">
          <h3 class="principle-name">{principle.name}</h3>
          <p class="principle-detail">{principle.detail}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- 4. Tone -->
  <section class="section">
    <h2 class="section-title">Tone</h2>
    <div class="tone-grid">
      {#each brand.tone as tone}
        <div class="card tone-card">
          <div class="tone-quality">{tone.quality}</div>
          <p class="tone-detail">{tone.detail}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- 5. What We Never Say -->
  <section class="section">
    <h2 class="section-title">What We Never Say</h2>
    <div class="callout callout-danger never-say-callout">
      <div class="never-say-icon">⛔</div>
      <ul class="never-say-list">
        {#each brand.neverSay as rule}
          <li>{rule}</li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- 6. Five Core Problems -->
  <section class="section">
    <h2 class="section-title">Five Core Problems</h2>
    <div class="card problems-card">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Problem</th>
            <th>One-liner</th>
            <th>Target</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {#each brand.problems as problem}
            <tr>
              <td class="cell-mono">{problem.id}</td>
              <td class="cell-name">{problem.name}</td>
              <td class="cell-liner">{problem.oneLiner}</td>
              <td class="cell-target">{problem.target}</td>
              <td>
                <span class="badge {problem.severity === 'High' ? 'badge-danger' : 'badge-accent'}">
                  {problem.severity}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</div>

<style>
  .page {
    max-width: var(--max-content);
    margin: 0 auto;
    padding: var(--space-2xl) var(--space-xl);
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);
  }

  /* Tagline */
  .tagline-section {
    padding: var(--space-xl) 0;
    border-bottom: 1px solid var(--border);
  }
  .tagline {
    font-family: var(--font-display);
    font-size: 3.5rem;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin: var(--space-md) 0;
  }
  .tagline-note {
    font-size: 13px;
    color: var(--text-tertiary);
    font-family: var(--font-mono);
  }

  /* Section */
  .section {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }
  .section-title {
    font-size: 1.5rem;
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--border);
  }

  /* Positioning */
  .positioning-card {
    padding: var(--space-xl);
  }
  .positioning-block {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }
  .pos-row {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: var(--space-lg);
    align-items: start;
    padding-bottom: var(--space-md);
    border-bottom: 1px solid var(--border);
  }
  .pos-row-final {
    border-bottom: none;
    padding-bottom: 0;
  }
  .pos-label {
    font-family: var(--font-mono);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-tertiary);
    padding-top: 2px;
  }
  .pos-text {
    font-size: 15px;
    line-height: 1.6;
    color: var(--text);
  }
  .pos-text-accent {
    color: var(--accent);
    font-weight: 600;
  }

  /* Principles */
  .principles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-lg);
  }
  .principle-card {
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .principle-name {
    font-size: 1.1rem;
    color: var(--accent);
  }
  .principle-detail {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* Tone */
  .tone-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-lg);
  }
  .tone-card {
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .tone-quality {
    font-family: var(--font-mono);
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text);
    font-weight: 600;
  }
  .tone-detail {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* Never Say */
  .never-say-callout {
    display: flex;
    gap: var(--space-lg);
    align-items: flex-start;
    padding: var(--space-xl);
  }
  .never-say-icon {
    font-size: 1.5rem;
    line-height: 1;
    flex-shrink: 0;
    padding-top: 2px;
  }
  .never-say-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }
  .never-say-list li {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text);
    padding-left: var(--space-md);
    position: relative;
  }
  .never-say-list li::before {
    content: "—";
    position: absolute;
    left: 0;
    color: var(--danger);
    font-weight: 600;
  }

  /* Problems table */
  .problems-card {
    padding: var(--space-lg) var(--space-xl);
    overflow-x: auto;
  }
  .cell-mono {
    font-family: var(--font-mono);
    color: var(--text-tertiary);
    width: 40px;
  }
  .cell-name {
    font-weight: 600;
    white-space: nowrap;
  }
  .cell-liner {
    color: var(--text-secondary);
  }
  .cell-target {
    color: var(--text-tertiary);
    font-size: 13px;
  }

  @media (max-width: 768px) {
    .page {
      padding: var(--space-xl) var(--space-md);
    }
    .tagline {
      font-size: 2.25rem;
    }
    .pos-row {
      grid-template-columns: 1fr;
      gap: var(--space-xs);
    }
    .pos-label {
      padding-top: 0;
    }
  }
</style>
