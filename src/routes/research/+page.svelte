<script lang="ts">
  import { researchFiles } from "$lib/data/wire";

  // Domain filter — "all" plus the 11 real domains in the data
  let activeDomain = $state<"all" | string>("all");
  let searchQuery = $state("");

  const domains = [
    { id: "all", label: "All" },
    { id: "root", label: "Root" },
    { id: "market", label: "Market" },
    { id: "sales", label: "Sales" },
    { id: "marketing", label: "Marketing" },
    { id: "customers", label: "Customers" },
    { id: "compliance", label: "Compliance" },
    { id: "observations", label: "Observations" },
    { id: "sessions", label: "Sessions" },
    { id: "product", label: "Product" },
    { id: "codebase", label: "Codebase" },
    { id: "ops", label: "Ops" },
  ];

  const totalFiles = researchFiles.length;

  let filteredFiles = $derived.by(() => {
    const q = searchQuery.trim().toLowerCase();
    return researchFiles.filter((f) => {
      if (activeDomain !== "all" && f.domain !== activeDomain) return false;
      if (q && !(f.title.toLowerCase().includes(q) || f.description.toLowerCase().includes(q))) return false;
      return true;
    });
  });

  let filteredCount = $derived(filteredFiles.length);

  function setDomain(id: string) {
    activeDomain = id;
  }
</script>

<svelte:head>
  <title>Research · Wire</title>
</svelte:head>

<div class="page">
  <header class="page-head">
    <div class="mono-label">Inside the Wire · Research Harness</div>
    <h1>Research Browser</h1>
    <p class="lede">
      The full research index — every file the harness produced, filterable by domain and searchable by title or description.
    </p>
  </header>

  <section class="controls">
    <div class="search-wrap">
      <input
        type="search"
        class="search-input"
        placeholder="Search title or description…"
        bind:value={searchQuery}
        aria-label="Search research files"
      />
    </div>

    <div class="domain-tabs" role="tablist" aria-label="Filter by domain">
      {#each domains as d}
        <button
          class="domain-tab"
          class:active={activeDomain === d.id}
          role="tab"
          aria-selected={activeDomain === d.id}
          onclick={() => setDomain(d.id)}
        >
          {d.label}
        </button>
      {/each}
    </div>
  </section>

  <div class="count-bar">
    <span class="count-text">
      <span class="count-num">{filteredCount}</span> / {totalFiles} files
      {#if activeDomain !== "all"}<span class="count-filter">· domain: {activeDomain}</span>{/if}
      {#if searchQuery.trim()}<span class="count-filter">· query: "{searchQuery.trim()}"</span>{/if}
    </span>
  </div>

  {#if filteredCount === 0}
    <div class="card empty-state">
      <p>No files match the current filter.</p>
      <button class="btn btn-outline btn-sm" onclick={() => { setDomain("all"); searchQuery = ""; }}>
        Clear filters
      </button>
    </div>
  {:else}
    <ul class="file-list">
      {#each filteredFiles as f (f.path)}
        <li class="card file-card">
          <div class="file-row">
            <div class="file-main">
              <div class="file-meta-top">
                <span class="badge badge-accent">{f.domain}</span>
                <span class="file-size">{f.size}</span>
              </div>
              <h3 class="file-title">{f.title}</h3>
              <p class="file-desc">{f.description}</p>
              <code class="file-path">{f.path}</code>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .page {
    max-width: 900px;
    margin: 0 auto;
    padding: var(--space-xl) 0;
  }

  .page-head {
    margin-bottom: var(--space-xl);
  }

  .page-head h1 {
    margin: var(--space-sm) 0 var(--space-sm);
  }

  .lede {
    color: var(--text-secondary);
    font-size: 1.05rem;
    max-width: 60ch;
    margin: 0;
  }

  /* Controls */
  .controls {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }

  .search-wrap {
    display: flex;
  }

  .search-input {
    flex: 1;
    padding: 0.65rem 0.9rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 0.95rem;
    transition: border-color var(--transition);
  }

  .search-input::placeholder {
    color: var(--text-tertiary);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--accent);
  }

  .domain-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .domain-tab {
    padding: 0.4rem 0.8rem;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all var(--transition);
  }

  .domain-tab:hover {
    border-color: var(--border-bright);
    color: var(--text);
  }

  .domain-tab.active {
    background: var(--accent-glow);
    border-color: var(--accent-dim);
    color: var(--accent);
  }

  /* Count bar */
  .count-bar {
    margin-bottom: var(--space-lg);
    padding-bottom: var(--space-md);
    border-bottom: 1px solid var(--border);
  }

  .count-text {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-tertiary);
  }

  .count-num {
    color: var(--accent);
    font-weight: 600;
  }

  .count-filter {
    margin-left: 0.4rem;
    color: var(--text-secondary);
  }

  /* File list */
  .file-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .file-card {
    padding: var(--space-md) var(--space-lg);
    transition: border-color var(--transition);
  }

  .file-card:hover {
    border-color: var(--border-bright);
  }

  .file-main {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .file-meta-top {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .file-size {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--text-tertiary);
  }

  .file-title {
    margin: 0;
    font-size: 1.15rem;
    font-family: var(--font-display);
  }

  .file-desc {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.92rem;
  }

  .file-path {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--text-tertiary);
    background: var(--bg-secondary);
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
    align-self: flex-start;
  }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: var(--space-xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
  }

  .empty-state p {
    color: var(--text-secondary);
    margin: 0;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .domain-tab {
      font-size: 0.75rem;
      padding: 0.35rem 0.6rem;
    }
  }
</style>
