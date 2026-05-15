# Homepage TTFB Investigation and Recommendations

## Audience and goal

This memo summarizes the current homepage latency findings, why Squarespace likely appears faster, and the recommended options with complexity, risk, and decision implications.

Primary goal: reduce first-load homepage delay before hero video and first meaningful paint by lowering HTML TTFB and first-wave contention.

## Executive summary

- The current biggest bottleneck is no longer hero video queueing; it is HTML time-to-first-byte (TTFB) for `/`.
- Latest HAR shows hero video request is healthy and parser-initiated, with negligible queue time.
- Remaining delay is mostly "time before the browser can issue asset requests", driven by server-side work in the app worker.
- The highest-impact path is to reduce server-side work on homepage render and make HTML edge-cache behavior deterministic.

## What we measured

From latest HAR (`www.keystone.app.r1.har`):

- First hero video (`hero-01-desktop.webm`) starts at ~`1.53s`.
- Video queueing is ~`1.45ms` (effectively negligible).
- Video request initiator is `parser` (good; no longer script-gated).
- HTML document `/` takes ~`1.49s`, almost all in server wait.
- `server-timing` includes `cfWorker;dur=1454` and `cfOrigin;dur=0`.
- Response header still reports `x-nextjs-cache: MISS`.

Live cURL spot checks also showed variable TTFB (~`0.76s` to `2.08s`) and repeated `x-nextjs-cache: MISS`.

## Why Squarespace can feel much faster

Squarespace-style landing pages often combine:

- Edge-cached or pre-rendered HTML.
- Minimal per-request dynamic server work.
- Smaller critical startup scope before first byte.
- Lower hydration pressure in first wave.

Current Keystone homepage path does meaningful request-time server work before returning HTML, so TTFB naturally trends higher.

## Root-cause analysis in current code

The app root layout wraps with `KeystoneRootLayout`:

- `app/layout.tsx` uses `KeystoneRootLayout`.
- The package layout (`keystone-design-bootstrap`) performs a broad `Promise.all` fetch set before rendering:
  - `getCompanyInformation`
  - `getWebsitePhotos`
  - `getServices`
  - `getLocations`
  - `getTeamMembers`
  - `getForm('lead')`
  - `getForm('job_application')`
  - `getForm('marketing_list_signup')`
  - `getAdsConfig`
  - `getAnalyticsConfig`

Additionally, homepage `app/page.tsx` also fetches `getCompanyInformation()`.

These API calls use `next.revalidate: 60` in `keystone-design-bootstrap/src/lib/server-api.ts`, which can still involve request-time compute and cache-miss variance depending on cache persistence and deployment/runtime behavior.

## Recommendation set

### Recommendation 1: Slim homepage server render path (code architecture)

Summary:

- Decouple homepage from fetch-heavy global shell behavior.
- Ensure homepage only blocks on the minimal data required to render above-the-fold HTML.
- Move non-critical data to lazy/client fetch or lower-priority server boundaries.

Potential implementation directions:

- Introduce a homepage-specific root shell instead of full `KeystoneRootLayout` behavior.
- Keep critical-only data in initial render (for example: only fields required by hero/nav/footer copy and links).
- Defer form definitions, team members, and non-home navigation enrichment until later, if not needed for initial homepage HTML.

Complexity:

- High.

Implications:

- Largest code-side TTFB upside.
- Requires careful auditing of shared providers and assumptions.
- May increase custom app ownership versus relying on package defaults.

Risks:

- Regression risk in analytics/chat/forms/nav if dependencies are removed incorrectly.
- Needs strong QA across homepage and inner-page parity expectations.

### Recommendation 2: Make HTML edge caching deterministic (CDN/runtime)

Summary:

- Ensure `/` is reliably served from edge cache when safe, instead of frequent cache misses.
- Establish explicit cache and purge strategy for homepage and marketing routes.

Potential implementation directions:

- Verify OpenNext/Cloudflare cache persistence configuration for Next incremental cache.
- Add Cloudflare cache rules for HTML routes that are safe to cache.
- Use explicit purge hooks on deploy/content update.
- Keep stale-while-revalidate behavior with clear invalidation ownership.

Complexity:

- Medium.

Implications:

- Fastest infrastructure win for TTFB consistency.
- Significant p50/p75 and often p95 improvements when configured correctly.
- Requires operational discipline for purges and freshness guarantees.

Risks:

- Stale HTML if purge process is weak.
- Potential incorrect caching if personalized or variant-sensitive responses are cached too broadly.

### Recommendation 3: Reduce first-wave JS and chunk fan-out (client startup)

Summary:

- Reduce number/weight of scripts participating in initial hydration wave.
- Defer below-fold and non-critical interactivity.

Potential implementation directions:

- Split client boundaries so only above-the-fold interactive islands hydrate immediately.
- Defer heavy below-fold section bundles.
- Audit all `'use client'` sections loaded by homepage and progressively isolate.

Complexity:

- Medium to high (iterative).

Implications:

- Better startup smoothness and less contention with media.
- Valuable after TTFB improvements; usually second-order vs TTFB.

Risks:

- Hydration mismatch or interaction regressions if boundaries are moved too aggressively.
- Requires iterative testing and staged rollout.

## Complexity and decision implications at a glance

Recommendation 1 (code architecture):

- Complexity: high.
- Time-to-value: medium (not instant).
- Upside: very high.
- Best for: lowering baseline server compute and long-term control.

Recommendation 2 (CDN/cache policy):

- Complexity: medium.
- Time-to-value: fast.
- Upside: high, especially consistency.
- Best for: immediate TTFB stabilization with limited code churn.

Recommendation 3 (JS startup reduction):

- Complexity: medium-high.
- Time-to-value: incremental.
- Upside: medium-high when combined with #1/#2.
- Best for: post-TTFB polish and long-term performance resilience.

## Suggested phased plan

Phase 1 (fastest safe gains):

- Execute Recommendation 2 first.
- Define explicit caching + purge policy for `/`.
- Validate improvement in repeat and cold-region tests.

Phase 2 (largest structural gain):

- Execute Recommendation 1 for homepage path.
- Reduce blocking fetch set in initial render.
- Keep package behavior for inner pages if needed; optimize homepage first.

Phase 3 (startup refinement):

- Execute Recommendation 3 iteratively.
- Reduce first-wave JS pressure and chunk fan-out.

## Validation plan and KPIs

Track these metrics before/after each phase:

- HTML TTFB for `/` (p50, p75, p95).
- `x-nextjs-cache` hit/miss rate for homepage.
- Time to first hero video request start.
- LCP and Speed Index on cold-load profiles.
- Number of requests and transfer volume before first hero video request.

Target direction:

- Lower and tighter TTFB distribution.
- More consistent cache hits.
- Earlier first-wave media readiness with fewer competing startup requests.

## Recommendation to leadership

If decision-making bandwidth is limited, prioritize in this order:

1. CDN/cache determinism (fastest ROI, medium risk).
2. Homepage shell slimming (largest absolute TTFB upside, higher implementation cost).
3. JS fan-out reduction (iterative optimization after TTFB baseline is fixed).

This ordering balances immediate wins with long-term architecture improvements while minimizing production risk.

