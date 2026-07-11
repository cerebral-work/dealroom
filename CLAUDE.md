# dealbook — Project Config

Wire investor data-room PWA. SvelteKit 5 + Bun + TypeScript + Cloudflare Workers (Alchemy IaC).

## Parent Workspace
This repo is part of the **usewire** workspace (`~/projects/usewire`). The source of truth for brand vision, strategy, and design context lives there:
- `~/projects/usewire/CLAUDE.md` — workspace config, repo index, brand vision
- `~/projects/usewire/.impeccable.md` — full design system context
- `~/projects/usewire/docs/superpowers/specs/2026-07-10-wire-brand-identity-vision-design.md` — brand identity, vision, northstar spec

## Brand Essence
**Everyone is zigging toward lock-in. Wire zags toward ownership.**

## Design Context
See `~/projects/usewire/.impeccable.md` for the full design system. Summary:
- Dark-first (`#18181b` bg, `#10b77f` emerald accent)
- Typography: Familjen Grotesk (display), Geist/Inter (body), Geist Mono (mono)
- Anti-reference: generic AI startup deck
- Engineer register, not marketing register
- Calm competence — no desperation, no hype

## Key Files
- `src/lib/data/wire.ts` — single data source for ALL routes. Edit this file, not individual routes.
- `src/lib/styles.css` — design tokens (CSS custom properties), dark + light themes
- `src/routes/*` — 15 SvelteKit routes
- `static/icons/icon.svg` — Wire logo (graph topology: nodes through central hub)

## Commands
```bash
bun install          # deps
bun run dev          # Vite dev server (:5173)
bun run build        # static build → build/
bun run check        # svelte-check (3 pre-existing errors in alchemy.run.ts, unrelated to app code)
```

## Constraints
- All content driven from `wire.ts` — mirrors `research/collated-research.md` in the usewire workspace
- Permissioned PWA (`noindex, nofollow`) — not public-facing marketing
- `bun run check` has 3 pre-existing type errors in `alchemy.run.ts` (Alchemy Scope type) — unrelated to app code, ignore
