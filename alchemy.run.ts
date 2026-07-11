import alchemy from "alchemy";
import { Website, R2Bucket, D1Database } from "alchemy/cloudflare";

/**
 * Alchemy IaC — deploys the SvelteKit PWA to Cloudflare Workers.
 *
 * Tier 1 (Static SPA): SvelteKit() with adapter-static build output.
 * Tier 3 (Workers SSR): SvelteKit() with alchemy/cloudflare/sveltekit adapter.
 *
 * Usage:
 *   bun alchemy login          # one-time CF auth
 *   bun run deploy             = alchemy deploy
 *   bun run destroy            = alchemy destroy
 *
 * Bindings (R2, D1) are typed — import from this file for runtime types:
 *   import type { website } from "../alchemy.run.ts";
 *   type Env = typeof website.Env;
 */

const app = await alchemy("wire-dealbook");

// --- Optional resources (uncomment for Tier 2/3) ---

// R2 bucket for file storage
const bucket = await R2Bucket("bucket", {
  name: `${app.appName}-${app.stage}-storage`,
  allowPublicAccess: false,
  adopt: true,
});

// D1 database for structured data
const database = await D1Database("database", {
  name: `${app.appName}-${app.stage}-db`,
  adopt: true,
});

// --- Deploy the SvelteKit app ---

// Tier 1: assets-only Worker (adapter-static SPA in build/), no server entrypoint
export const website = await Website("website", {
  name: `${app.appName}-${app.stage}`,
  command: "bun run build",
  assets: { dist: "build", not_found_handling: "single-page-application" },
  wrangler: false,
  bindings: {
    BUCKET: bucket,
    DB: database,
    // ACCESS_TEAM_DOMAIN: alchemy.secret(process.env.ACCESS_TEAM_DOMAIN),
    // ACCESS_AUD: alchemy.secret(process.env.ACCESS_AUD),
  },
  url: true,
});

console.log(`Deployed to: ${website.url}`);

await app.finalize();
