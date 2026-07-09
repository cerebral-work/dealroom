<script lang="ts">
  import {
    wire,
    market,
    competition,
    compliance,
    pipeline,
    product,
    gtm,
    brand,
    socialProof,
    roadmap,
  } from "$lib/data/wire";

  const slides = [
    "Title",
    "Problem",
    "Threat",
    "Category",
    "Product",
    "Moat",
    "Market",
    "Competition",
    "Traction",
    "GTM",
    "Roadmap",
    "Ask",
    "Contact",
  ];
  const total = slides.length;

  let current = $state(0);
  let presentMode = $state(false);
  let touchStartX = $state(0);

  let progress = $derived(((current + 1) / total) * 100);

  function next() {
    if (current < total - 1) current++;
  }
  function prev() {
    if (current > 0) current--;
  }
  function goTo(i: number) {
    current = Math.max(0, Math.min(i, total - 1));
  }

  async function toggleFullscreen() {
    presentMode = !presentMode;
    if (presentMode) {
      try {
        await document.documentElement.requestFullscreen();
      } catch {
        /* CSS present mode still works */
      }
    } else if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        /* no-op */
      }
    }
  }

  $effect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowUp" ||
        (e.shiftKey && e.key === " ")
      ) {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "Escape" && presentMode) {
        presentMode = false;
      } else if (e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        goTo(parseInt(e.key) - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  $effect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) presentMode = false;
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  });

  function onTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
  }
  function onTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx > 0) prev();
      else next();
    }
  }

  function severityDots(sev: number) {
    return Array.from({ length: 5 }, (_, i) => i < sev);
  }
</script>

<svelte:head>
  <title>Pitch Deck — Wire</title>
  <meta
    name="description"
    content="Wire investor pitch deck — 13 slides. Thesis, market, moat, traction, ask."
  />
</svelte:head>

<div
  class="deck"
  class:present={presentMode}
  role="presentation"
  ontouchstart={onTouchStart}
  ontouchend={onTouchEnd}
>
  <!-- Progress bar -->
  <div class="progress-bar">
    <div class="progress-fill" style="width: {progress}%"></div>
  </div>

  <!-- Slide label (top-left) -->
  <div class="slide-label mono-label">{slides[current]}</div>

  <!-- Deck controls (top-right) -->
  <div class="deck-controls">
    <span class="counter">{current + 1} / {total}</span>
    <button class="fs-btn" onclick={toggleFullscreen} aria-label="Toggle fullscreen">
      {presentMode ? "↙" : "⛶"}
    </button>
  </div>

  <!-- Slides -->
  {#key current}
    <div class="slide animate-in">
      {#if current === 0}
        <!-- 1. Title -->
        <div class="slide-inner title-slide">
          <div class="logo-block">
            <span class="logo-mark"></span>
            <span class="logo-name">{wire.name}</span>
          </div>
          <h1 class="deck-title">{wire.tagline}</h1>
          <p class="deck-sub">{wire.taglineSecondary}</p>
          <div class="title-badges">
            <span class="badge badge-accent">{wire.stage}</span>
            <span class="badge">Raising {wire.raise}</span>
            <span class="badge">{wire.anchor}</span>
          </div>
          <p class="status-note">{wire.statusNote}</p>
          <div class="key-hint">
            <kbd>←</kbd><kbd>→</kbd> navigate
            <span class="hint-sep">·</span>
            <kbd>F</kbd> fullscreen
            <span class="hint-sep">·</span>
            <kbd>1</kbd>–<kbd>9</kbd> jump
          </div>
        </div>
      {:else if current === 1}
        <!-- 2. Problem -->
        <div class="slide-inner">
          <div class="mono-label">The Problem</div>
          <h2>You're already building this.</h2>
          <p class="lead">
            AI agents are going into production. Context isn't portable — so every
            team rebuilds the same six pieces of plumbing by hand.
          </p>
          <div class="plumbing-grid">
            {#each product.sixProperties as prop, i}
              <div class="plumbing-item">
                <span class="plumbing-num">{i + 1}</span>
                <div class="plumbing-body">
                  <div class="plumbing-name">{prop.name}</div>
                  <div class="plumbing-desc">{prop.description}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if current === 2}
        <!-- 3. Threat -->
        <div class="slide-inner">
          <div class="mono-label text-danger">Compliance Exposure</div>
          <h2>Every agent access without an audit record is a compliance exposure.</h2>
          <div class="penalties-table">
            <table>
              <thead>
                <tr>
                  <th>Regulation</th>
                  <th>Maximum Penalty</th>
                  <th>Severity</th>
                </tr>
              </thead>
              <tbody>
                {#each compliance.penalties as p}
                  <tr>
                    <td class="reg-name">{p.regulation}</td>
                    <td class="reg-penalty">{p.maxPenalty}</td>
                    <td class="reg-sev">
                      <span class="sev-dots">
                        {#each severityDots(p.severity) as filled}
                          <span class="sev-dot" class:filled></span>
                        {/each}
                      </span>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
          <div class="callout callout-danger threat-callout">
            <p>
              Wire's per-container isolation and audit trail are properties of the
              substrate — not controls your code has to bolt on top.
            </p>
          </div>
        </div>
      {:else if current === 3}
        <!-- 4. Category -->
        <div class="slide-inner">
          <div class="mono-label">New Category</div>
          <h2>Context as a Service</h2>
          <p class="lead">
            Not content management. Not tool connectivity. A new data layer
            purpose-built for AI consumption — bidirectional from creation.
          </p>
          <div class="category-compare">
            <div class="cat-item">
              <div class="cat-label">Content management</div>
              <div class="cat-name">Box, SharePoint, Notion</div>
              <div class="cat-note">
                Access layer over an existing repository. Not built for agent
                consumption.
              </div>
            </div>
            <div class="cat-item">
              <div class="cat-label">Tool connectivity</div>
              <div class="cat-name">Smithery, MCP registries</div>
              <div class="cat-note">Holds no content. Connects agents to tools — doesn't own or audit the context.</div>
            </div>
            <div class="cat-item cat-wire">
              <div class="cat-label text-accent">Context as a Service</div>
              <div class="cat-name">Wire</div>
              <div class="cat-note">
                Portable, permissioned, audited containers of context. Any agent
                can reach them over MCP or REST.
              </div>
            </div>
          </div>
          <div class="positioning">
            <p>
              For {brand.positioning.for} {brand.positioning.who}, Wire is
              {brand.positioning.wireIs} that {brand.positioning.that} —
              {brand.positioning.unlike}.
            </p>
          </div>
        </div>
      {:else if current === 4}
        <!-- 5. Product -->
        <div class="slide-inner">
          <div class="mono-label">The Product</div>
          <h2>A container of context. Reachable by any agent.</h2>
          <div class="product-layout">
            <div class="product-left">
              <div class="product-props">
                {#each product.sixProperties as prop, i}
                  <div class="prop-item">
                    <span class="prop-num text-accent">{i + 1}</span>
                    <div>
                      <div class="prop-name">{prop.name}</div>
                      <div class="prop-desc">{prop.description}</div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
            <div class="product-right">
              <div class="product-card card card-accent">
                <div class="mono-label">5 Tools</div>
                <ul class="tool-list">
                  {#each product.tools as t}
                    <li>
                      <span class="tool-name text-mono">{t.name}</span>
                      <span class="tool-fn">{t.function}</span>
                      <span class="tool-cost">{t.cost}</span>
                    </li>
                  {/each}
                </ul>
              </div>
              <div class="transport-row">
                <span class="badge badge-accent">MCP</span>
                <span class="badge">REST API</span>
                <span class="badge">Per-container isolation</span>
              </div>
            </div>
          </div>
        </div>
      {:else if current === 5}
        <!-- 6. Moat -->
        <div class="slide-inner">
          <div class="mono-label">The Moat</div>
          <h2>Five structural advantages incumbents won't replicate.</h2>
          <div class="moat-grid">
            {#each competition.moats as moat, i}
              <div class="moat-item card">
                <span class="moat-num text-accent">{i + 1}</span>
                <div>
                  <div class="moat-name">{moat.name}</div>
                  <div class="moat-detail">{moat.detail}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if current === 6}
        <!-- 7. Market -->
        <div class="slide-inner">
          <div class="mono-label">Market</div>
          <h2>$30-35B TAM. Only 7% have scaled AI.</h2>
          <div class="market-stats">
            {#each market.sizing as s}
              <div class="mkt-stat card">
                <div class="mkt-value">{s.value}</div>
                <div class="mkt-layer">{s.layer}</div>
                <div class="mkt-basis">{s.basis}</div>
              </div>
            {/each}
          </div>
          <div class="market-signals">
            <div class="signal-item">
              <span class="signal-val text-accent">{market.gartnerSignal}</span>
            </div>
            <div class="signal-item">
              <span class="signal-val">{market.aiScaling}</span>
            </div>
            <div class="signal-item">
              <span class="signal-val">{market.genAIGrowth}</span>
            </div>
          </div>
        </div>
      {:else if current === 7}
        <!-- 8. Competition -->
        <div class="slide-inner">
          <div class="mono-label">Competition</div>
          <h2>Four categories. All with structural disadvantages.</h2>
          <div class="comp-grid">
            {#each competition.categories as cat}
              <div class="comp-cat">
                <div class="comp-cat-name">{cat.name}</div>
                <div class="comp-who text-dim">{cat.who}</div>
                <div class="comp-disadv text-danger">↳ {cat.disadvantage}</div>
              </div>
            {/each}
          </div>
          <div class="comp-direct">
            <div class="mono-label">Direct competitors</div>
            <div class="direct-grid">
              {#each competition.direct as d}
                <div class="direct-item">
                  <span class="direct-name">{d.name}</span>
                  <span class="badge badge-accent">{d.relation}</span>
                  <span class="direct-note">{d.note}</span>
                </div>
              {/each}
            </div>
          </div>
          <div class="comp-quote">
            "An open Postgres did not stop Supabase."
          </div>
        </div>
      {:else if current === 8}
        <!-- 9. Traction -->
        <div class="slide-inner">
          <div class="mono-label">Traction</div>
          <h2>Signal is early but real.</h2>
          <div class="traction-stats">
            {#each socialProof as sp}
              <div class="traction-stat card">
                <div class="traction-val text-accent">{sp.metric}</div>
                <div class="traction-label">{sp.label}</div>
                <div class="traction-note text-dim">{sp.note}</div>
              </div>
            {/each}
          </div>
          <div class="traction-pipeline">
            <div class="mono-label">Pipeline</div>
            <div class="pipeline-grid">
              {#each pipeline as p}
                <div class="pipeline-item">
                  <div class="pipeline-org">{p.org}</div>
                  <div class="pipeline-stage" class:hot={p.stage.includes("Hot")}>{p.stage}</div>
                  <div class="pipeline-why text-dim">{p.whyWire}</div>
                </div>
              {/each}
            </div>
          </div>
          <div class="shipped-row">
            <div class="mono-label">Shipped</div>
            <div class="shipped-list">
              {#each product.shipped as s}
                <span class="badge">{s}</span>
              {/each}
            </div>
          </div>
        </div>
      {:else if current === 9}
        <!-- 10. GTM -->
        <div class="slide-inner">
          <div class="mono-label">Go to Market</div>
          <h2>Dual motion. Bottoms-up PLG, top-down enterprise.</h2>
          <div class="gtm-dual">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Bottoms-up (PLG)</th>
                  <th>Top-down (Enterprise)</th>
                </tr>
              </thead>
              <tbody>
                {#each gtm.dualMotion as m}
                  <tr>
                    <td class="gtm-dim">{m.dimension}</td>
                    <td>{m.bottomsUp}</td>
                    <td>{m.topDown}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
          <div class="gtm-sales">
            <div class="mono-label">Sales org plan</div>
            <div class="sales-phases">
              {#each gtm.salesOrg as s}
                <div class="sales-phase">
                  <div class="sales-phase-name">{s.phase}</div>
                  <div class="sales-arr text-accent">{s.arr}</div>
                  <div class="sales-team text-dim">{s.team}</div>
                </div>
              {/each}
            </div>
          </div>
          <div class="callout callout-accent pql-callout">
            <strong>PQL rule:</strong> {gtm.pqlRule}
          </div>
        </div>
      {:else if current === 10}
        <!-- 11. Roadmap -->
        <div class="slide-inner">
          <div class="mono-label">Roadmap</div>
          <h2>From ship-the-container to MCP ecosystem.</h2>
          <div class="roadmap-timeline">
            {#each roadmap as phase, i}
              <div class="rm-phase" class:current={phase.status === "in-flight"} class:planned={phase.status === "planned"}>
                <div class="rm-marker" class:done={phase.status === "in-flight"}></div>
                <div class="rm-content card">
                  <div class="rm-header">
                    <span class="rm-title">{phase.phase}</span>
                    <span class="rm-northstar text-accent">{phase.northstar}</span>
                  </div>
                  <ul class="rm-items">
                    {#each phase.items as item}
                      <li>{item}</li>
                    {/each}
                  </ul>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if current === 11}
        <!-- 12. Ask -->
        <div class="slide-inner ask-slide">
          <div class="mono-label">The Ask</div>
          <h2>{wire.raise} pre-seed</h2>
          <p class="ask-anchor">{wire.anchor}</p>
          <div class="use-of-funds">
            <div class="fund-item card card-accent">
              <div class="fund-label">Container release</div>
              <div class="fund-desc">
                Open-source container public release — the adoption engine for
                bottoms-up PLG.
              </div>
            </div>
            <div class="fund-item card card-accent">
              <div class="fund-label">SOC 2 + GDPR</div>
              <div class="fund-desc">
                ${compliance.blockers[0].cost}, {compliance.blockers[0].timeline}.
                Gating blocker for every regulated deal.
              </div>
            </div>
            <div class="fund-item card card-accent">
              <div class="fund-label">Pipeline conversion</div>
              <div class="fund-desc">
                IndiaStox POC → first paid annual contract. Sets pricing
                precedent.
              </div>
            </div>
          </div>
          <div class="callout ask-status">
            <p>
              <strong>Status: early.</strong> {brand.tone[3].detail}
            </p>
          </div>
        </div>
      {:else if current === 12}
        <!-- 13. Contact -->
        <div class="slide-inner contact-slide">
          <div class="logo-block">
            <span class="logo-mark"></span>
            <span class="logo-name">{wire.name}</span>
          </div>
          <h2>Let's talk.</h2>
          <div class="contact-links">
            <a href="mailto:hello@usewire.io" class="contact-link card">
              <div class="mono-label">Email</div>
              <div class="contact-val">hello@usewire.io</div>
            </a>
            <a
              href="https://cal.com/jitpal/wire-demo"
              class="contact-link card"
              target="_blank"
              rel="noopener"
            >
              <div class="mono-label">Book a demo</div>
              <div class="contact-val">cal.com/jitpal/wire-demo</div>
            </a>
            <a href="https://{wire.domain}" class="contact-link card" target="_blank" rel="noopener">
              <div class="mono-label">Website</div>
              <div class="contact-val">{wire.domain}</div>
            </a>
          </div>
          <p class="contact-tagline">{wire.tagline}</p>
        </div>
      {/if}
    </div>
  {/key}

  <!-- Navigation arrows -->
  <button
    class="nav-arrow nav-prev"
    onclick={prev}
    disabled={current === 0}
    aria-label="Previous slide"
  >
    ←
  </button>
  <button
    class="nav-arrow nav-next"
    onclick={next}
    disabled={current === total - 1}
    aria-label="Next slide"
  >
    →
  </button>

  <!-- Slide dots -->
  <div class="slide-dots">
    {#each slides as _, i}
      <button
        class:active={current === i}
        onclick={() => goTo(i)}
        aria-label="Go to slide {i + 1}"
      ></button>
    {/each}
  </div>
</div>

<style>
  .deck {
    --ctrl-left: var(--sidebar-w);
    position: relative;
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
  }
  .deck.present {
    --ctrl-left: 0px;
    position: fixed;
    inset: 0;
    z-index: 200;
    background: var(--bg);
    overflow-y: auto;
  }
  @media (max-width: 768px) {
    .deck { --ctrl-left: 0px; }
  }

  /* Progress bar */
  .progress-bar {
    position: fixed;
    top: 0;
    left: var(--ctrl-left);
    right: 0;
    height: 3px;
    background: var(--border);
    z-index: 210;
    transition: left var(--transition);
  }
  .progress-fill {
    height: 100%;
    background: var(--accent);
    transition: width var(--transition);
  }

  /* Slide label */
  .slide-label {
    position: fixed;
    top: var(--space-md);
    left: calc(var(--ctrl-left) + var(--space-md));
    z-index: 210;
    opacity: 0.7;
    transition: left var(--transition);
  }

  /* Deck controls */
  .deck-controls {
    position: fixed;
    top: var(--space-md);
    right: var(--space-md);
    display: flex;
    align-items: center;
    gap: var(--space-md);
    z-index: 210;
  }
  .counter {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-tertiary);
    letter-spacing: 0.1em;
  }
  .fs-btn {
    background: var(--bg-card);
    border: 1px solid var(--border);
    color: var(--text-tertiary);
    padding: 6px 10px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    transition: all var(--transition-fast);
  }
  .fs-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  /* Slide */
  .slide {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  .slide-inner {
    width: 100%;
    max-width: 880px;
    margin: 0 auto;
  }

  .deck-title {
    font-size: 3rem;
    line-height: 1.1;
    margin: var(--space-lg) 0;
  }
  .deck-sub {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 600px;
  }
  h2 {
    font-size: 2.25rem;
    line-height: 1.15;
    margin: var(--space-sm) 0 var(--space-lg);
  }
  .lead {
    font-size: 1.125rem;
    color: var(--text-secondary);
    max-width: 640px;
    margin-bottom: var(--space-xl);
    line-height: 1.5;
  }

  /* Title slide */
  .title-slide {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
  }
  .title-slide .deck-title { max-width: 700px; }
  .title-slide .deck-sub { text-align: center; }
  .logo-block {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }
  .logo-mark {
    width: 14px;
    height: 14px;
    border: 2px solid var(--accent);
    border-radius: 2px;
    display: inline-block;
  }
  .logo-name {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
  }
  .title-badges {
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
    justify-content: center;
    margin-top: var(--space-sm);
  }
  .status-note {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-tertiary);
    max-width: 500px;
    margin-top: var(--space-md);
  }
  .key-hint {
    margin-top: var(--space-xl);
    font-size: 11px;
    color: var(--text-tertiary);
    font-family: var(--font-mono);
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    flex-wrap: wrap;
    justify-content: center;
  }
  .key-hint kbd {
    padding: 2px 6px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 10px;
  }
  .hint-sep { margin: 0 var(--space-xs); opacity: 0.5; }

  /* Problem slide */
  .plumbing-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
  }
  .plumbing-item {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-md);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }
  .plumbing-num {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent);
    flex-shrink: 0;
    line-height: 1;
  }
  .plumbing-name {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 2px;
  }
  .plumbing-desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.4;
  }

  /* Threat slide */
  .penalties-table {
    margin-bottom: var(--space-lg);
  }
  .penalties-table table { width: 100%; }
  .reg-name { font-weight: 600; }
  .reg-penalty {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--danger);
  }
  .sev-dots { display: flex; gap: 3px; }
  .sev-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border-bright);
  }
  .sev-dot.filled { background: var(--danger); }
  .threat-callout p {
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
  }

  /* Category slide */
  .category-compare {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }
  .cat-item {
    padding: var(--space-lg);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }
  .cat-wire {
    border-color: var(--accent-dim);
    background: var(--accent-glow);
  }
  .cat-label {
    font-family: var(--font-mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-tertiary);
    margin-bottom: var(--space-sm);
  }
  .cat-name { font-size: 1.125rem; font-weight: 600; margin-bottom: var(--space-sm); }
  .cat-note { font-size: 13px; color: var(--text-secondary); line-height: 1.4; }
  .positioning {
    padding: var(--space-lg);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    border-left: 3px solid var(--accent);
  }
  .positioning p {
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    color: var(--text-secondary);
  }

  /* Product slide */
  .product-layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: var(--space-xl);
    align-items: start;
  }
  .product-props {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .prop-item {
    display: flex;
    gap: var(--space-md);
    align-items: flex-start;
  }
  .prop-num {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1.125rem;
    flex-shrink: 0;
    line-height: 1.4;
  }
  .prop-name { font-weight: 600; font-size: 0.95rem; }
  .prop-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.4; }
  .product-card { padding: var(--space-lg); }
  .tool-list {
    list-style: none;
    padding: 0;
    margin: var(--space-sm) 0 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .tool-list li {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .tool-name { font-size: 13px; font-weight: 600; }
  .tool-fn { font-size: 12px; color: var(--text-secondary); }
  .tool-cost { font-size: 11px; color: var(--text-tertiary); font-family: var(--font-mono); }
  .transport-row {
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
    margin-top: var(--space-md);
  }

  /* Moat slide */
  .moat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: var(--space-md);
  }
  .moat-item {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-lg);
    align-items: flex-start;
  }
  .moat-num {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1.5rem;
    flex-shrink: 0;
    line-height: 1;
  }
  .moat-name { font-weight: 600; font-size: 0.95rem; margin-bottom: 4px; }
  .moat-detail { font-size: 13px; color: var(--text-secondary); line-height: 1.4; }

  /* Market slide */
  .market-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }
  .mkt-stat { padding: var(--space-lg); }
  .mkt-value {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: var(--space-xs);
  }
  .mkt-layer {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: var(--space-xs);
  }
  .mkt-basis { font-size: 12px; color: var(--text-tertiary); line-height: 1.4; }
  .market-signals {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .signal-item {
    padding: var(--space-md);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    border-left: 2px solid var(--accent);
  }
  .signal-val { font-size: 14px; line-height: 1.4; }

  /* Competition slide */
  .comp-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }
  .comp-cat {
    padding: var(--space-md);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }
  .comp-cat-name { font-weight: 600; font-size: 0.95rem; margin-bottom: 4px; }
  .comp-who { font-size: 12px; margin-bottom: var(--space-sm); }
  .comp-disadv { font-size: 13px; line-height: 1.4; }
  .comp-direct { margin-bottom: var(--space-lg); }
  .direct-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-sm);
    margin-top: var(--space-sm);
  }
  .direct-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    font-size: 13px;
    flex-wrap: wrap;
  }
  .direct-name { font-weight: 600; }
  .direct-note { font-size: 12px; color: var(--text-tertiary); flex-basis: 100%; }
  .comp-quote {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-style: italic;
    color: var(--text-secondary);
    text-align: center;
    padding: var(--space-lg);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  /* Traction slide */
  .traction-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }
  .traction-stat { padding: var(--space-md); }
  .traction-val {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .traction-label { font-size: 12px; font-weight: 600; margin-bottom: 4px; }
  .traction-note { font-size: 11px; line-height: 1.3; }
  .traction-pipeline { margin-bottom: var(--space-lg); }
  .pipeline-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-sm);
    margin-top: var(--space-sm);
  }
  .pipeline-item {
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }
  .pipeline-org { font-weight: 600; font-size: 13px; }
  .pipeline-stage {
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--text-tertiary);
    margin: 2px 0;
  }
  .pipeline-stage.hot { color: var(--accent); }
  .pipeline-why { font-size: 12px; line-height: 1.3; }
  .shipped-list {
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
    margin-top: var(--space-sm);
  }

  /* GTM slide */
  .gtm-dual { margin-bottom: var(--space-lg); }
  .gtm-dual table { width: 100%; }
  .gtm-dim {
    font-weight: 600;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    width: 80px;
  }
  .gtm-dual td:not(.gtm-dim) { font-size: 13px; }
  .gtm-sales { margin-bottom: var(--space-lg); }
  .sales-phases {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-sm);
    margin-top: var(--space-sm);
  }
  .sales-phase {
    padding: var(--space-md);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }
  .sales-phase-name { font-size: 12px; font-weight: 600; margin-bottom: 4px; }
  .sales-arr { font-family: var(--font-mono); font-size: 14px; font-weight: 700; margin-bottom: 4px; }
  .sales-team { font-size: 11px; line-height: 1.3; }
  .pql-callout { font-size: 14px; }

  /* Roadmap slide */
  .roadmap-timeline {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    max-height: 65vh;
    overflow-y: auto;
    padding-right: var(--space-sm);
  }
  .rm-phase {
    display: flex;
    gap: var(--space-md);
    align-items: flex-start;
  }
  .rm-marker {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid var(--border-bright);
    flex-shrink: 0;
    margin-top: 6px;
  }
  .rm-marker.done {
    background: var(--accent);
    border-color: var(--accent);
  }
  .rm-content {
    flex: 1;
    padding: var(--space-md);
  }
  .rm-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: var(--space-sm);
  }
  .rm-title { font-weight: 600; font-size: 0.95rem; }
  .rm-northstar { font-family: var(--font-mono); font-size: 11px; }
  .rm-items {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .rm-items li {
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 1.4;
    padding-left: var(--space-md);
    position: relative;
  }
  .rm-items li::before {
    content: "·";
    position: absolute;
    left: 2px;
    color: var(--accent);
  }

  /* Ask slide */
  .ask-slide { text-align: center; }
  .ask-anchor {
    font-size: 1.125rem;
    color: var(--accent);
    margin-bottom: var(--space-xl);
  }
  .use-of-funds {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
    text-align: left;
  }
  .fund-item { padding: var(--space-lg); }
  .fund-label {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: var(--space-sm);
  }
  .fund-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.4; }
  .ask-status {
    text-align: left;
    max-width: 600px;
    margin: 0 auto;
  }
  .ask-status p { margin: 0; font-size: 14px; line-height: 1.5; }

  /* Contact slide */
  .contact-slide {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
  }
  .contact-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
    width: 100%;
    max-width: 600px;
  }
  .contact-link {
    text-decoration: none;
    color: inherit;
    padding: var(--space-lg);
    text-align: center;
  }
  .contact-val {
    font-size: 0.95rem;
    font-weight: 600;
    margin-top: var(--space-sm);
    word-break: break-all;
  }
  .contact-tagline {
    font-family: var(--font-display);
    font-size: 1.25rem;
    color: var(--text-secondary);
    font-style: italic;
    max-width: 500px;
  }

  /* Navigation arrows */
  .nav-arrow {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    background: var(--bg-card);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    width: 36px;
    height: 36px;
    border-radius: var(--radius-full);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    z-index: 210;
    transition: all var(--transition-fast);
    opacity: 0.4;
  }
  .nav-arrow:hover {
    opacity: 1;
    border-color: var(--accent);
    color: var(--accent);
  }
  .nav-arrow:disabled {
    opacity: 0.15;
    cursor: default;
  }
  .nav-arrow:disabled:hover {
    opacity: 0.15;
    border-color: var(--border);
    color: var(--text-secondary);
  }
  .nav-prev {
    left: calc(var(--ctrl-left) + var(--space-md));
    transition: left var(--transition), opacity var(--transition-fast),
      border-color var(--transition-fast), color var(--transition-fast);
  }
  .nav-next { right: var(--space-md); }

  /* Slide dots */
  .slide-dots {
    position: fixed;
    bottom: var(--space-md);
    left: calc((100vw + var(--ctrl-left)) / 2);
    transform: translateX(-50%);
    display: flex;
    gap: 5px;
    z-index: 210;
    transition: left var(--transition);
  }
  .slide-dots button {
    width: 7px;
    height: 7px;
    border-radius: var(--radius-full);
    border: none;
    background: var(--border-bright);
    cursor: pointer;
    padding: 0;
    transition: all var(--transition-fast);
  }
  .slide-dots button.active {
    background: var(--accent);
    width: 20px;
  }
  .slide-dots button:hover {
    background: var(--accent-bright);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .deck-title { font-size: 2rem; }
    h2 { font-size: 1.5rem; }
    .lead { font-size: 1rem; }
    .plumbing-grid,
    .category-compare,
    .comp-grid,
    .direct-grid,
    .pipeline-grid,
    .sales-phases,
    .use-of-funds,
    .contact-links {
      grid-template-columns: 1fr;
    }
    .market-stats { grid-template-columns: 1fr; }
    .traction-stats {
      grid-template-columns: repeat(2, 1fr);
    }
    .product-layout {
      grid-template-columns: 1fr;
    }
    .moat-grid {
      grid-template-columns: 1fr;
    }
    .nav-arrow { display: none; }
  }
</style>
