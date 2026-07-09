<script lang="ts">
  import { wire, brand, glossary, objections } from "$lib/data/wire";

  let activeTab = $state("connect");
  const calEmbedCode = "Cal.com embed code goes here (see Cal.com docs for integration)";

  const tabs = [
    { id: "connect", label: "Connect" },
    { id: "newsletter", label: "Newsletter" },
    { id: "search", label: "Search" },
    { id: "docs", label: "Doc Generator" },
    { id: "share", label: "Share Cards" },
    { id: "updates", label: "Investor Updates" },
  ];

  // Newsletter state
  let email = $state("");
  let subscribed = $state(false);

  function subscribe() {
    if (email.includes("@")) {
      subscribed = true;
    }
  }

  // Search state
  let searchQuery = $state("");
  let searchDomain = $state("all");

  const searchableContent = [
    ...glossary.map((g) => ({ type: "Glossary", title: g.term, body: g.definition, domain: "product" })),
    ...objections.map((o, i) => ({ type: "Objection", title: o.q, body: o.a, domain: "objections" })),
    ...brand.problems.map((p) => ({ type: "Problem", title: `${p.id}: ${p.name}`, body: p.oneLiner, domain: "brand" })),
  ];

  let searchResults = $derived(
    searchableContent.filter((item) => {
      const matchesDomain = searchDomain === "all" || item.domain === searchDomain;
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.body.toLowerCase().includes(q);
      return matchesDomain && matchesQuery;
    })
  );

  // Doc generator state
  let docType = $state("onepager");
  let docAudience = $state("investor");
  let generatedDoc = $state("");
  let copied = $state(false);

  function generateDoc() {
    const header = `# Wire — ${docType === "onepager" ? "One-Pager" : docType === "email" ? "Cold Email" : "Follow-Up Email"}\n\n`;
    const audience = `**For:** ${docAudience}\n\n`;

    if (docType === "onepager") {
      generatedDoc = `${header}${audience}## ${wire.tagline}\n\n${wire.taglineSecondary}\n\n### The Problem\nEvery team putting agents into production is rebuilding the same six pieces of plumbing — context storage, retrieval, permissions, audit, portability, and tool access. They do it per-agent, per-client, per-deployment. It doesn't scale.\n\n### The Solution\nWire is a neutral, portable, permissioned context container. Each container is an isolated MCP server with its own content, access controls, and audit log. Agents reach it through MCP (primary) or REST (automation).\n\n### Why Now\n- MCP is an open standard (Anthropic → OpenAI + Google)\n- 33% of enterprise SW interactions will run through agents by 2028 (Gartner)\n- Only 7% of companies have fully scaled AI\n- Regulation creating buying gates (EU AI Act, CCPA ADMT, CT AI Act)\n\n### Traction\n- 23k+ search impressions in 90 days, growing to 1k/day\n- 4-deal pipeline: IndiaStox (paid POC), NELFT, Spring Health, Praxent\n- Cited by Corey Quinn\n\n### Ask\nPre-seed: $375k (Cerebral $150k anchored). Funding SOC 2/GDPR compliance, first paid deals, and the path to seed.\n`;
    } else if (docType === "email") {
      generatedDoc = `${header}${audience}Subject: ${wire.tagline}\n\nHi [Name],\n\nI'm building Wire — the context layer for AI agents. Code has GitHub. Everything else has Wire.\n\nEvery team putting agents into production rebuilds the same six pieces of plumbing: context storage, retrieval, permissions, audit, portability, and tool access. Wire packages that into a permissioned, portable container any agent can reach through MCP.\n\nWe're pre-seed with a 4-deal regulated pipeline (IndiaStox paid POC, NELFT, Spring Health, Praxent) and growing organic search traction (23k impressions/90 days).\n\nWorth a 15-minute conversation?\n\n[Your name]\n`;
    } else {
      generatedDoc = `${header}${audience}Subject: Wire — following up\n\nHi [Name],\n\nFollowing up on Wire. Quick recap:\n\n- Wire = permissioned, portable context containers for AI agents\n- MCP-native, open-source, per-container isolation\n- 4-deal regulated pipeline, growing search traction\n- Pre-seed: $375k, Cerebral anchored\n\nHappy to walk through the architecture or the pipeline. What's the best way to get on your calendar?\n\n[Your name]\n`;
    }
  }

  function copyDoc() {
    navigator.clipboard.writeText(generatedDoc);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }

  // Share cards
  const shareCards = [
    { title: wire.tagline, subtitle: "Permissioned, portable containers of context", accent: true },
    { title: "$30-35B TAM", subtitle: "Agent context infrastructure market", accent: false },
    { title: "4-deal pipeline", subtitle: "IndiaStox · NELFT · Spring Health · Praxent", accent: false },
    { title: "Pre-seed $375k", subtitle: "Cerebral $150k anchored", accent: false },
    { title: "MCP-native", subtitle: "Open standard from Anthropic → OpenAI + Google", accent: false },
    { title: "23k impressions / 90 days", subtitle: "Growing to 1k/day, avg position 6.81", accent: false },
  ];

  function downloadCard(card: typeof shareCards[0]) {
    // Generate a simple SVG share card
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#18181b"/>
  <rect x="0" y="0" width="8" height="630" fill="#10b77f"/>
  <text x="60" y="120" font-family="Familjen Grotesk, sans-serif" font-size="28" fill="#10b77f" letter-spacing="2">WIRE</text>
  <text x="60" y="320" font-family="Familjen Grotesk, sans-serif" font-size="72" font-weight="700" fill="${card.accent ? "#10b77f" : "#fafafa"}">${card.title}</text>
  <text x="60" y="400" font-family="Geist, sans-serif" font-size="32" fill="#a1a1aa">${card.subtitle}</text>
  <text x="60" y="570" font-family="Geist Mono, monospace" font-size="20" fill="#71717a">usewire.io</text>
</svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wire-card-${card.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Investor updates archive (mock)
  const investorUpdates = [
    { date: "2026-07-01", title: "Pre-seed launch: pipeline at 4 deals, search traction 23k/mo", status: "current" },
    { date: "2026-06-15", title: "IndiaStox POC initiated, SOC 2 discovery underway", status: "archived" },
    { date: "2026-06-01", title: "MCP integration confirmed with Claude, Cursor, Windsurf, Cline", status: "archived" },
    { date: "2025-05-15", title: "Container architecture shipped, test suite green", status: "archived" },
  ];
</script>

<div class="page">
  <div class="page-header">
    <div class="mono-label">Engage</div>
    <h1>Connect, stay informed, share.</h1>
    <p>Demo scheduling, newsletter, content search, document generator, share cards, and investor updates.</p>
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

  {#if activeTab === "connect"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Book a Demo</div>
        <h2>See the container in action</h2>
      </div>
      <div class="cal-embed">
        <div class="cal-placeholder card">
          <div class="cal-icon">📅</div>
          <h3>Schedule a 30-minute walkthrough</h3>
          <p>We'll show you a live container, the MCP integration, per-container isolation, and the audit trail. Bring your security questions.</p>
          <!-- Cal.com embed placeholder — replace with actual Cal.com embed code -->
          <div class="cal-embed-placeholder">
            <div class="mono-label">Cal.com Embed</div>
            <p>Replace this block with:</p>
            <pre><code>{calEmbedCode}</code></pre>
          </div>
          <a href="mailto:chris@usewire.io?subject=Demo Request — Wire" class="btn btn-primary">
            Request a demo
          </a>
        </div>
      </div>
    </section>

  {:else if activeTab === "newsletter"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Newsletter</div>
        <h2>Wire updates — no fluff</h2>
      </div>
      {#if subscribed}
        <div class="callout">
          <div class="mono-label">Subscribed</div>
          <p>You're on the list. We send when there's something worth saying — pipeline updates, product releases, and regulatory analysis. No weekly noise.</p>
        </div>
      {:else}
        <div class="newsletter-form card">
          <p>Get Wire updates: pipeline progress, product releases, compliance milestones, and AI-native infrastructure analysis.</p>
          <div class="form-row">
            <input
              type="email"
              bind:value={email}
              placeholder="you@company.com"
              class="email-input"
            />
            <button class="btn btn-primary" onclick={subscribe}>Subscribe</button>
          </div>
          <p class="form-note">One email when there's news. Unsubscribe anytime.</p>
        </div>
      {/if}
    </section>

  {:else if activeTab === "search"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Content Search</div>
        <h2>Search across all Wire content</h2>
      </div>
      <div class="search-controls">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search glossary, objections, problems..."
          class="search-input"
        />
        <select bind:value={searchDomain} class="domain-select">
          <option value="all">All domains</option>
          <option value="product">Product</option>
          <option value="objections">Objections</option>
          <option value="brand">Brand</option>
        </select>
      </div>
      <div class="search-meta">
        {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
        {#if searchQuery}for "{searchQuery}"{/if}
      </div>
      <div class="search-results">
        {#each searchResults as result}
          <div class="search-result card">
            <span class="badge badge-accent">{result.type}</span>
            <h4>{result.title}</h4>
            <p>{result.body}</p>
          </div>
        {:else}
          <div class="search-empty">No results. Try a different query or domain.</div>
        {/each}
      </div>
    </section>

  {:else if activeTab === "docs"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Document Generator</div>
        <h2>Generate one-pagers and emails</h2>
      </div>
      <div class="doc-controls">
        <div class="control-group">
          <label for="doctype">Document type:</label>
          <select id="doctype" bind:value={docType}>
            <option value="onepager">One-Pager</option>
            <option value="email">Cold Email</option>
            <option value="followup">Follow-Up Email</option>
          </select>
        </div>
        <div class="control-group">
          <label for="audience">Audience:</label>
          <select id="audience" bind:value={docAudience}>
            <option value="investor">Investor</option>
            <option value="enterprise">Enterprise buyer</option>
            <option value="developer">Developer</option>
          </select>
        </div>
        <button class="btn btn-primary" onclick={generateDoc}>Generate</button>
      </div>

      {#if generatedDoc}
        <div class="doc-output card">
          <div class="doc-header">
            <div class="mono-label">Generated Document</div>
            <button class="btn btn-outline btn-sm" onclick={copyDoc}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre class="doc-content">{generatedDoc}</pre>
          <div class="doc-actions">
            <button class="btn btn-outline btn-sm" onclick={() => {
              const blob = new Blob([generatedDoc], { type: "text/markdown" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `wire-${docType}.md`;
              a.click();
              URL.revokeObjectURL(url);
            }}>Download .md</button>
            <button class="btn btn-outline btn-sm" onclick={() => {
              const blob = new Blob([generatedDoc], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `wire-${docType}.txt`;
              a.click();
              URL.revokeObjectURL(url);
            }}>Download .txt</button>
          </div>
        </div>
      {/if}
    </section>

  {:else if activeTab === "share"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Share Cards</div>
        <h2>Download social share cards</h2>
      </div>
      <div class="share-grid">
        {#each shareCards as card}
          <div class="share-card card" class:accent={card.accent}>
            <div class="share-content">
              <div class="share-title">{card.title}</div>
              <div class="share-subtitle">{card.subtitle}</div>
            </div>
            <button class="btn btn-outline btn-sm" onclick={() => downloadCard(card)}>
              Download SVG
            </button>
          </div>
        {/each}
      </div>
      <div class="callout">
        <p>SVG cards are 1200×630 (OG image dimensions). Convert to PNG for platforms that require it. The accent card uses Wire green; others use the standard palette.</p>
      </div>
    </section>

  {:else if activeTab === "updates"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Investor Updates</div>
        <h2>Monthly archive</h2>
      </div>
      <div class="updates-list">
        {#each investorUpdates as update}
          <div class="update-row card">
            <div class="update-date">{update.date}</div>
            <div class="update-title">{update.title}</div>
            {#if update.status === "current"}
              <span class="badge badge-accent">Current</span>
            {:else}
              <span class="badge">Archived</span>
            {/if}
          </div>
        {/each}
      </div>
      <div class="callout">
        <div class="mono-label">Note</div>
        <p>Investor updates are sent to committed and engaged investors. Full archive available post-NDA. This is a placeholder structure — actual updates will be added as they're sent.</p>
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

  .cal-placeholder { text-align: center; padding: var(--space-2xl); display: flex; flex-direction: column; align-items: center; gap: var(--space-md); }
  .cal-icon { font-size: 3rem; }
  .cal-embed-placeholder { background: var(--bg); border: 1px dashed var(--border); border-radius: var(--radius-md); padding: var(--space-lg); margin: var(--space-lg) 0; text-align: left; }
  .cal-embed-placeholder pre { overflow-x: auto; }
  .cal-embed-placeholder code { font-size: 11px; color: var(--accent); }

  .newsletter-form { padding: var(--space-xl); }
  .form-row { display: flex; gap: var(--space-sm); margin-top: var(--space-md); }
  .email-input { flex: 1; padding: 12px 16px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); font-size: 14px; }
  .email-input:focus { border-color: var(--accent); outline: none; }
  .form-note { font-size: 12px; color: var(--text-tertiary); margin-top: var(--space-sm); }

  .search-controls { display: flex; gap: var(--space-sm); margin-bottom: var(--space-md); }
  .search-input { flex: 1; padding: 12px 16px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); font-size: 14px; }
  .search-input:focus { border-color: var(--accent); outline: none; }
  .domain-select { padding: 12px 16px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); font-size: 14px; cursor: pointer; }
  .search-meta { font-size: 12px; color: var(--text-tertiary); margin-bottom: var(--space-md); }
  .search-results { display: flex; flex-direction: column; gap: var(--space-sm); }
  .search-result { padding: var(--space-md); }
  .search-result h4 { margin: var(--space-xs) 0; font-size: 15px; }
  .search-result p { font-size: 13px; color: var(--text-secondary); }
  .search-empty { padding: var(--space-2xl); text-align: center; color: var(--text-tertiary); font-size: 14px; }

  .doc-controls { display: flex; gap: var(--space-lg); align-items: end; flex-wrap: wrap; margin-bottom: var(--space-xl); }
  .control-group { display: flex; flex-direction: column; gap: var(--space-xs); }
  .control-group label { font-size: 13px; color: var(--text-secondary); }
  .control-group select { padding: 8px 12px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); font-size: 13px; cursor: pointer; }
  .doc-output { padding: var(--space-lg); margin-bottom: var(--space-lg); }
  .doc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-md); }
  .doc-content { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: var(--space-lg); overflow-x: auto; white-space: pre-wrap; font-family: var(--font-mono); font-size: 13px; line-height: 1.6; color: var(--text); }
  .doc-actions { display: flex; gap: var(--space-sm); margin-top: var(--space-md); }

  .share-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-lg); }
  .share-card { padding: var(--space-lg); display: flex; flex-direction: column; justify-content: space-between; gap: var(--space-md); }
  .share-card.accent { border-color: var(--accent); }
  .share-title { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: var(--text); }
  .share-card.accent .share-title { color: var(--accent); }
  .share-subtitle { font-size: 13px; color: var(--text-secondary); margin-top: var(--space-xs); }

  .updates-list { display: flex; flex-direction: column; gap: var(--space-sm); }
  .update-row { display: flex; align-items: center; gap: var(--space-lg); padding: var(--space-md) var(--space-lg); }
  .update-date { font-family: var(--font-mono); font-size: 13px; color: var(--accent); min-width: 110px; }
  .update-title { flex: 1; font-size: 14px; }

  .btn-sm { padding: 4px 12px; font-size: 12px; }
</style>
