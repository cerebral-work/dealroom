<script lang="ts">
  import "../lib/styles.css";
  import { setContext } from "svelte";
  import { page } from "$app/state";

  let { children } = $props();

  // Theme state
  let theme = $state<"dark" | "light">("dark");
  let sidebarOpen = $state(false);
  let searchOpen = $state(false);

  const navItems = [
    { href: "/", label: "Overview", icon: "M3 12h18M3 6h18M3 18h18", desc: "Landing" },
    { href: "/pitch", label: "Pitch Deck", icon: "M7 3v18M17 3v18M3 7h4M17 7h4M3 17h4M17 17h4", desc: "Investor narrative" },
    { href: "/value-prop", label: "Value Prop", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", desc: "5 problems, positioning" },
    { href: "/talking-points", label: "Talking Points", icon: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z", desc: "Audience-segmented" },
    { href: "/data-room", label: "Data Room", icon: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2zM8 11h8v2H8z", desc: "TAM, financials, metrics" },
    { href: "/compliance", label: "Compliance", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", desc: "Risk calculator, penalties" },
    { href: "/competitive", label: "Competitive", icon: "M18 20V10M12 20V4M6 20v-6", desc: "Comparison matrix" },
    { href: "/roadmap", label: "Roadmap", icon: "M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z", desc: "Speculative timeline" },
    { href: "/gtm", label: "GTM Quest", icon: "M3 3v18h18M9 9h6M9 13h6M9 17h4", desc: "Go-to-market execution plan" },
    { href: "/product", label: "Product", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", desc: "Architecture, tools, SDK" },
    { href: "/metrics", label: "Metrics", icon: "M3 3v18h18M7 12l4-4 4 4 5-5", desc: "Investor metrics, pricing, projections" },
    { href: "/brand", label: "Brand", icon: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4L2 9.4h7.6z", desc: "Voice guide, what we say" },
    { href: "/engage", label: "Engage", icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3", desc: "Demo, newsletter, search, share" },
    { href: "/community", label: "Community", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", desc: "Team, partners, access, events" },
    { href: "/research", label: "Research", icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5z", desc: "52-file index" },
  ];

  // Keyboard navigation
  $effect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Theme toggle: Cmd/Ctrl + Shift + D
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "d") {
        e.preventDefault();
        theme = theme === "dark" ? "light" : "dark";
      }
      // Search: Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchOpen = !searchOpen;
      }
      // Sidebar toggle: Cmd/Ctrl + B
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        sidebarOpen = !sidebarOpen;
      }
      // Escape closes overlays
      if (e.key === "Escape") {
        sidebarOpen = false;
        searchOpen = false;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Apply theme to document
  $effect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  });

  // Register service worker
  $effect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  });

  setContext("theme", () => theme);
  setContext("toggleTheme", () => () => (theme = theme === "dark" ? "light" : "dark"));

  const isActive = (href: string) => {
    if (href === "/") return page.url.pathname === "/";
    return page.url.pathname.startsWith(href);
  };
</script>

<svelte:head>
  <title>Wire — Inside the Wire [WIP]</title>
  <meta name="description" content="Wire investor data room — pitch, value prop, talking points, compliance, competitive, roadmap. Context as a Service." />
</svelte:head>

<!-- Mobile top bar -->
<div class="mobile-bar">
  <button class="menu-btn" onclick={() => (sidebarOpen = !sidebarOpen)} aria-label="Toggle navigation">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  </button>
  <a href="/" class="mobile-logo">
    <img src="/icons/icon.svg" alt="Wire" width="24" height="24" />
    <span>Wire</span>
  </a>
  <button class="menu-btn" onclick={() => (searchOpen = !searchOpen)} aria-label="Search">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  </button>
</div>

<!-- Sidebar -->
<aside class="sidebar" class:open={sidebarOpen}>
  <a href="/" class="logo">
    <img src="/icons/icon.svg" alt="Wire" width="32" height="32" />
    <div class="logo-text">
      <span class="logo-name">Wire</span>
      <span class="logo-sub">Inside the Wire</span>
    </div>
  </a>

  <div class="wip-badge">Work in progress</div>

  <nav class="nav">
    {#each navItems as item}
      <a
        href={item.href}
        class="nav-item"
        class:active={isActive(item.href)}
        onclick={() => (sidebarOpen = false)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d={item.icon} />
        </svg>
        <div class="nav-text">
          <span class="nav-label">{item.label}</span>
          <span class="nav-desc">{item.desc}</span>
        </div>
      </a>
    {/each}
  </nav>

  <div class="sidebar-footer">
    <button class="theme-toggle" onclick={() => (theme = theme === "dark" ? "light" : "dark")}>
      {#if theme === "dark"}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        <span>Light</span>
      {:else}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        <span>Dark</span>
      {/if}
    </button>
    <a href="/pitch" class="btn btn-primary btn-sm pitch-btn">▶ Pitch</a>
    <button class="btn btn-outline btn-sm pdf-btn" onclick={() => window.print()}>⤓ Export PDF</button>
  </div>
</aside>

<!-- Backdrop for mobile sidebar -->
{#if sidebarOpen}
  <div class="backdrop" onclick={() => (sidebarOpen = false)}></div>
{/if}

<!-- Search overlay -->
{#if searchOpen}
  <div class="search-overlay" onclick={() => (searchOpen = false)}>
    <div class="search-box" onclick={(e) => e.stopPropagation()}>
      <input type="text" placeholder="Search Wire data room..." autofocus />
      <kbd>Esc</kbd>
    </div>
    <div class="search-results">
      <p class="search-hint">Search across pitch, data room, compliance, competitive, and research content.</p>
    </div>
  </div>
{/if}

<!-- Main content -->
<main class="main" class:sidebar-shifted={sidebarOpen}>
  {@render children()}
</main>

<style>
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: var(--sidebar-w);
    background: var(--bg-secondary);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    z-index: 100;
    transition: transform var(--transition);
  }

  .logo {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-lg);
    text-decoration: none;
    color: var(--text);
    border-bottom: 1px solid var(--border);
  }

  .wip-badge {
    align-self: flex-start;
    margin: var(--space-sm) var(--space-lg) 0;
    padding: 2px 8px;
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    border: 1px solid var(--accent-dim);
    border-radius: var(--radius-sm);
  }

  .logo-text { display: flex; flex-direction: column; }
  .logo-name { font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; line-height: 1; }
  .logo-sub { font-family: var(--font-mono); font-size: 10px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px; }

  .nav { flex: 1; overflow-y: auto; padding: var(--space-md); display: flex; flex-direction: column; gap: 2px; }

  .nav-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: 10px 12px;
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--text-secondary);
    transition: all var(--transition-fast);
    cursor: pointer;
  }
  .nav-item:hover { background: var(--bg-card); color: var(--text); }
  .nav-item.active { background: var(--accent-glow); color: var(--accent); }
  .nav-item.active svg { stroke: var(--accent); }

  .nav-text { display: flex; flex-direction: column; line-height: 1.3; }
  .nav-label { font-size: 13px; font-weight: 500; }
  .nav-desc { font-size: 11px; color: var(--text-tertiary); }

  .sidebar-footer {
    padding: var(--space-md);
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .theme-toggle {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: 8px 12px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 13px;
    width: 100%;
    transition: all var(--transition-fast);
  }
  .theme-toggle:hover { border-color: var(--border-bright); color: var(--text); }

  .pitch-btn { width: 100%; justify-content: center; }
  .pdf-btn { width: 100%; justify-content: center; margin-top: 4px; }

  @media print {
    .sidebar, .mobile-bar, .backdrop, .search-overlay, .pitch-btn, .pdf-btn, .theme-toggle { display: none !important; }
    .main { margin-left: 0 !important; }
  }

  .main {
    margin-left: var(--sidebar-w);
    min-height: 100vh;
    transition: margin var(--transition);
  }

  .mobile-bar {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--header-h);
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
    z-index: 101;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-md);
  }

  .menu-btn { background: none; border: none; color: var(--text); cursor: pointer; padding: 8px; }
  .mobile-logo { display: flex; align-items: center; gap: var(--space-sm); text-decoration: none; color: var(--text); font-family: var(--font-display); font-weight: 700; }

  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }

  .search-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 200;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 120px;
    backdrop-filter: blur(4px);
  }

  .search-box {
    width: 90%;
    max-width: 600px;
    background: var(--bg-card);
    border: 1px solid var(--border-bright);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-md);
    box-shadow: var(--shadow-lg);
  }

  .search-box input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: var(--text);
    font-size: 16px;
    font-family: var(--font-body);
  }

  .search-box kbd {
    font-family: var(--font-mono);
    font-size: 11px;
    padding: 2px 6px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text-tertiary);
  }

  .search-results {
    width: 90%;
    max-width: 600px;
    margin-top: var(--space-md);
  }

  .search-hint { color: var(--text-tertiary); font-size: 13px; text-align: center; }

  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); box-shadow: var(--shadow-lg); }
    .main { margin-left: 0; }
    .mobile-bar { display: flex; }
    .main { padding-top: var(--header-h); }
  }
</style>
