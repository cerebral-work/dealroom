<script lang="ts">
  import { product, integrations, glossary, useCases } from "$lib/data/wire";

  let activeTab = $state("tools");

  const tabs = [
    { id: "tools", label: "Container Tools" },
    { id: "properties", label: "Six Properties" },
    { id: "shipped", label: "Shipped / In-Flight" },
    { id: "auth", label: "Auth & Permissions" },
    { id: "sdk", label: "SDK Architecture" },
    { id: "api", label: "API Playground" },
    { id: "glossary", label: "Glossary" },
  ];
  let apiEndpoint = $state("/v1/containers/wire-001/entries");
  let apiMethod = $state("GET");
  let apiBody = $state('{\n  "search": "regulatory",\n  "limit": 10\n}');
  let apiResponse = $state("");

  const apiExamples = [
    { method: "GET", endpoint: "/v1/containers", body: "", description: "List containers" },
    { method: "POST", endpoint: "/v1/containers", body: '{\n  "name": "New Container",\n  "schema": "regulatory"\n}', description: "Create container" },
    { method: "GET", endpoint: "/v1/containers/wire-001/entries", body: "", description: "List entries" },
    { method: "POST", endpoint: "/v1/containers/wire-001/entries", body: '{\n  "title": "GDPR Fine",\n  "content": "...",\n  "metadata": {}\n}', description: "Add entry" },
    { method: "GET", endpoint: "/v1/containers/wire-001/entries?search=regulatory", body: "", description: "Search entries" },
    { method: "DELETE", endpoint: "/v1/containers/wire-001/entries/abc-123", body: "", description: "Delete entry" },
  ];

  const mockResponses: Record<string, string> = {
    "GET/v1/containers": JSON.stringify({ containers: [{ id: "wire-001", name: "Regulatory Container", entries: 1247 }, { id: "wire-002", name: "Client Onboarding", entries: 389 }] }, null, 2),
    "POST/v1/containers": JSON.stringify({ id: "wire-003", name: "New Container", schema: "regulatory", createdAt: "2026-07-09T12:00:00Z" }, null, 2),
    "GET/v1/containers/wire-001/entries": JSON.stringify({ entries: [{ id: "abc-123", title: "GDPR Fine", createdAt: "2026-06-15" }, { id: "def-456", title: "SOC2 Audit", createdAt: "2026-05-01" }], total: 1247 }, null, 2),
    "POST/v1/containers/wire-001/entries": JSON.stringify({ id: "ghi-789", title: "GDPR Fine", createdAt: "2026-07-09T12:00:00Z", status: "created" }, null, 2),
    "GET/v1/containers/wire-001/entries?search=regulatory": JSON.stringify({ entries: [{ id: "abc-123", title: "GDPR Fine", createdAt: "2026-06-15", score: 0.91 }], total: 1, query: "regulatory" }, null, 2),
    "DELETE/v1/containers/wire-001/entries/abc-123": JSON.stringify({ status: "deleted", id: "abc-123" }, null, 2),
  };

  function runQuery() {
    const key = apiMethod + apiEndpoint.split("?")[0];
    const mock = mockResponses[key];
    if (mock) {
      apiResponse = mock;
    } else {
      apiResponse = JSON.stringify({ error: "No mock response for this endpoint", endpoint: apiEndpoint, method: apiMethod }, null, 2);
    }
  }

  function loadExample(ex: typeof apiExamples[0]) {
    apiMethod = ex.method;
    apiEndpoint = ex.endpoint;
    apiBody = ex.body;
    apiResponse = "";
  }

  const authRoles = [
    { role: "Admin", permissions: "Full container access: create, read, write, delete, manage members, manage credentials", scope: "Per container" },
    { role: "Member", permissions: "Read, write, delete entries; cannot manage members or credentials", scope: "Per container" },
    { role: "Viewer", permissions: "Read-only access: explore, search, navigate; cannot write or delete", scope: "Per container" },
  ];

  const authMethods = [
    { method: "OAuth 2.1 (PKCE)", description: "JWT tokens, 7-day access / 90-day refresh. Mandatory PKCE. For user-facing flows." },
    { method: "API Keys (container-scoped)", description: "Scoped to a single container. 403 Forbidden if used against a different container. For automation." },
    { method: "API Keys (account-level)", description: "Cross-container access. For automation that needs to manage multiple containers." },
  ];

  const sdkFlow = [
    { step: 1, name: "User authorizes", detail: "SDK initiates OAuth 2.1 PKCE flow. User grants access to their Wire account." },
    { step: 2, name: "SDK receives credentials", detail: "Scoped MCP endpoint URL + container-scoped API key returned." },
    { step: 3, name: "Agent connects", detail: "Agent reads/writes container through MCP (primary) or REST API (automation)." },
    { step: 4, name: "Context persists", detail: "All writes stored in the container's isolated database. Context survives session changes." },
  ];
</script>

<div class="page">
  <div class="page-header">
    <div class="mono-label">Product</div>
    <h1>The container is the product.</h1>
    <p>Five tools per container. Per-container isolation. Dual transport (MCP + REST). Open-source.</p>
  </div>

  <!-- Tab bar -->
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

  {#if activeTab === "tools"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Five Tools</div>
        <h2>Generic primitives, intelligence in the container</h2>
      </div>
      <table>
        <thead><tr><th>Tool</th><th>Function</th><th>Cost</th></tr></thead>
        <tbody>
          {#each product.tools as tool}
            <tr>
              <td><code>{tool.name}</code></td>
              <td>{tool.function}</td>
              <td><span class="badge badge-accent">{tool.cost}</span></td>
            </tr>
          {/each}
        </tbody>
      </table>
      <div class="callout">
        <p>The intelligence is in the container's analysis pipeline — not in a bloated tool surface. Wire's 5 tools are generic; the container adapts to its content.</p>
      </div>
    </section>

  {:else if activeTab === "properties"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">You're Already Building This</div>
        <h2>Six pieces of plumbing every agent needs</h2>
      </div>
      <div class="properties-grid">
        {#each product.sixProperties as prop, i}
          <div class="property-card card">
            <div class="property-number">{i + 1}</div>
            <h4>{prop.name}</h4>
            <p>{prop.description}</p>
          </div>
        {/each}
      </div>
    </section>

  {:else if activeTab === "shipped"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Status</div>
        <h2>What's shipped, what's in flight</h2>
      </div>
      <div class="status-grid">
        <div class="status-section">
          <div class="mono-label">Shipped</div>
          <ul>
            {#each product.shipped as item}<li class="shipped-item">{item}</li>{/each}
          </ul>
        </div>
        <div class="status-section">
          <div class="mono-label">In Active Development</div>
          <ul>
            {#each product.inFlight as item}<li class="inflight-item">{item}</li>{/each}
          </ul>
        </div>
        <div class="status-section">
          <div class="mono-label">Planned</div>
          <ul>
            {#each product.planned as item}<li class="planned-item">{item}</li>{/each}
          </ul>
        </div>
      </div>
      <div class="callout">
        <div class="mono-label">Activation Metric</div>
        <p>{product.activationMetric}</p>
      </div>
    </section>

  {:else if activeTab === "auth"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Auth & Permissions</div>
        <h2>Container-scoped by default. Nothing escalates.</h2>
      </div>

      <h3>RBAC Roles</h3>
      <table>
        <thead><tr><th>Role</th><th>Permissions</th><th>Scope</th></tr></thead>
        <tbody>
          {#each authRoles as r}
            <tr><td><strong>{r.role}</strong></td><td>{r.permissions}</td><td><span class="badge">{r.scope}</span></td></tr>
          {/each}
        </tbody>
      </table>

      <h3>Authentication Methods</h3>
      <div class="auth-methods">
        {#each authMethods as m}
          <div class="card card-accent">
            <h4>{m.method}</h4>
            <p>{m.description}</p>
          </div>
        {/each}
      </div>
    </section>

  {:else if activeTab === "sdk"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Developer / SDK Architecture</div>
        <h2>Drop-in connect flow for agents</h2>
      </div>
      <div class="sdk-flow">
        {#each sdkFlow as step}
          <div class="sdk-step">
            <div class="step-number">{step.step}</div>
            <div class="step-body">
              <div class="step-name">{step.name}</div>
              <div class="step-detail">{step.detail}</div>
            </div>
          </div>
        {/each}
      </div>
      <div class="callout">
        <p>The user authorizes once and the SDK hands back a scoped MCP endpoint and key. From there your agent reads and writes the container through MCP or REST. Builders and agencies use this to skip building a context layer for every agent or client.</p>
      </div>
    </section>

  {:else if activeTab === "api"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">API Playground</div>
        <h2>Try the Wire REST API</h2>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">Mock responses for demonstration. The live API uses OAuth 2.1 or container-scoped API keys. Replace the endpoint and body, then click Run.</p>

      <div class="api-playground">
        <div class="api-examples">
          <div class="mono-label">Example Requests</div>
          <div class="example-list">
            {#each apiExamples as ex}
              <button class="example-btn" onclick={() => loadExample(ex)}>
                <span class="method-badge" data-method={ex.method}>{ex.method}</span>
                <span class="example-desc">{ex.description}</span>
              </button>
            {/each}
          </div>
        </div>

        <div class="api-request">
          <div class="mono-label">Request</div>
          <div class="api-method-row">
            <select bind:value={apiMethod} class="api-method-select">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input bind:value={apiEndpoint} class="api-endpoint-input" placeholder="/v1/containers/..." />
            <button class="btn btn-primary" onclick={runQuery}>Run</button>
          </div>
          {#if apiMethod === "POST" || apiMethod === "PUT"}
            <div class="api-body-section">
              <div class="mono-label">Request Body</div>
              <textarea bind:value={apiBody} class="api-body-input" rows="6" placeholder="JSON body..."></textarea>
            </div>
          {/if}
        </div>

        <div class="api-response">
          <div class="mono-label">Response</div>
          {#if apiResponse}
            <pre class="api-response-body">{apiResponse}</pre>
          {:else}
            <div class="api-response-empty">Click "Run" to see the response</div>
          {/if}
        </div>
      </div>

      <div class="callout">
        <p><strong>Note:</strong> This is a mock playground for demonstration. The real Wire API requires authentication via OAuth 2.1 (PKCE) or API keys. MCP is the primary transport for agents; REST is for automation and integration.</p>
      </div>
    </section>

  {:else if activeTab === "glossary"}
    <section class="section">
      <div class="section-header">
        <div class="mono-label">Glossary</div>
        <h2>AI-native terms</h2>
      </div>
      <div class="glossary-grid">
        {#each glossary as entry}
          <div class="glossary-card card">
            <div class="glossary-term">{entry.term}</div>
            <div class="glossary-def">{entry.definition}</div>
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Use case gallery (always visible) -->
  <section class="section">
    <div class="section-header">
      <div class="mono-label">Use Cases</div>
      <h2>Makes the abstract concrete</h2>
    </div>
    <div class="usecase-grid">
      {#each useCases as uc}
        <div class="usecase-card card">
          <span class="badge badge-accent">{uc.segment}</span>
          <h4>{uc.title}</h4>
          <p>{uc.description}</p>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .page { padding: var(--space-2xl) var(--space-xl); max-width: var(--max-content); margin: 0 auto; }
  .page-header { margin-bottom: var(--space-xl); }
  .page-header h1 { margin: var(--space-sm) 0; }
  .page-header p { color: var(--text-secondary); }

  .tab-bar { display: flex; gap: 4px; border-bottom: 1px solid var(--border); margin-bottom: var(--space-xl); overflow-x: auto; }
  .tab-btn {
    padding: 10px 16px; background: none; border: none; border-bottom: 2px solid transparent;
    color: var(--text-secondary); cursor: pointer; font-size: 13px; font-family: var(--font-body);
    white-space: nowrap; transition: all var(--transition-fast);
  }
  .tab-btn:hover { color: var(--text); }
  .tab-btn.active { color: var(--accent); border-bottom-color: var(--accent); }

  .section { margin-bottom: var(--space-2xl); }
  .section-header { margin-bottom: var(--space-lg); }
  h3 { margin: var(--space-xl) 0 var(--space-md); }

  code { font-family: var(--font-mono); font-size: 13px; color: var(--accent); }

  .properties-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-md); }
  .property-card { position: relative; }
  .property-number { position: absolute; top: var(--space-md); right: var(--space-md); font-family: var(--font-display); font-size: 2rem; font-weight: 700; color: var(--accent-dim); opacity: 0.5; }

  .status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-lg); }
  .status-section ul { list-style: none; margin-top: var(--space-md); display: flex; flex-direction: column; gap: var(--space-sm); }
  .status-section li { font-size: 13px; padding-left: var(--space-md); position: relative; }
  .shipped-item::before { content: "✓"; position: absolute; left: 0; color: var(--accent); font-weight: 700; }
  .inflight-item::before { content: "→"; position: absolute; left: 0; color: var(--warn); }
  .planned-item::before { content: "○"; position: absolute; left: 0; color: var(--text-tertiary); }

  .auth-methods { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-md); margin-top: var(--space-md); }

  .sdk-flow { display: flex; flex-direction: column; gap: var(--space-sm); }
  .sdk-step { display: flex; gap: var(--space-lg); align-items: start; padding: var(--space-lg); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); }
  .step-number { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--accent-glow); color: var(--accent); font-family: var(--font-mono); font-weight: 700; flex-shrink: 0; }
  .step-name { font-weight: 600; font-size: 14px; }
  .step-detail { font-size: 13px; color: var(--text-secondary); margin-top: 4px; }

  .glossary-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-md); }
  .glossary-term { font-weight: 600; font-family: var(--font-mono); font-size: 14px; color: var(--accent); margin-bottom: var(--space-xs); }
  .glossary-def { font-size: 12px; color: var(--text-secondary); line-height: 1.5; }

  .usecase-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-md); }
  .usecase-card { display: flex; flex-direction: column; gap: var(--space-sm); }
  .usecase-card h4 { font-size: 15px; }
  .usecase-card p { font-size: 13px; color: var(--text-secondary); }
  .api-playground { display: grid; grid-template-columns: 1fr 1fr; grid-template-areas: "examples request" "examples response"; gap: var(--space-lg); }
  .api-examples { grid-area: examples; }
  .api-request { grid-area: request; }
  .api-response { grid-area: response; }
  .example-list { display: flex; flex-direction: column; gap: 4px; margin-top: var(--space-md); }
  .example-btn { display: flex; align-items: center; gap: var(--space-sm); padding: 8px 12px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm); cursor: pointer; text-align: left; color: var(--text); font-family: var(--font-body); font-size: 12px; transition: all var(--transition-fast); }
  .example-btn:hover { border-color: var(--accent); }
  .method-badge { font-family: var(--font-mono); font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 3px; color: white; flex-shrink: 0; }
  .method-badge[data-method="GET"] { background: #3b82f6; }
  .method-badge[data-method="POST"] { background: #10b77f; }
  .method-badge[data-method="PUT"] { background: #f59e0b; }
  .method-badge[data-method="DELETE"] { background: #ef4444; }
  .api-method-row { display: flex; gap: var(--space-sm); margin-top: var(--space-md); }
  .api-method-select { padding: 8px 12px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--accent); font-family: var(--font-mono); font-weight: 700; font-size: 12px; cursor: pointer; }
  .api-endpoint-input { flex: 1; padding: 8px 12px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); font-family: var(--font-mono); font-size: 13px; }
  .api-endpoint-input:focus { border-color: var(--accent); outline: none; }
  .api-body-section { margin-top: var(--space-md); }
  .api-body-input { width: 100%; padding: 12px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); font-family: var(--font-mono); font-size: 13px; resize: vertical; }
  .api-body-input:focus { border-color: var(--accent); outline: none; }
  .api-response-body { margin-top: var(--space-md); padding: 16px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--accent); font-family: var(--font-mono); font-size: 13px; line-height: 1.5; overflow-x: auto; white-space: pre-wrap; }
  .api-response-empty { margin-top: var(--space-md); padding: 24px; background: var(--bg-card); border: 1px dashed var(--border); border-radius: var(--radius-sm); color: var(--text-tertiary); text-align: center; font-size: 13px; }
  @media (max-width: 768px) { .api-playground { grid-template-columns: 1fr; grid-template-areas: "examples" "request" "response"; } }
</style>
