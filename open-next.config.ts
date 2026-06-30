import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

// Persist the ISR / Next fetch cache in R2. Without an incrementalCache override,
// OpenNext defaults to a no-op ("dummy") cache, which silently disables ISR and
// makes every request re-render and re-fetch the backend. Cache keys are namespaced
// by each site's unique build id, so all customer sites can share one bucket.
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  // Avoid the default "dummy" queue (breaks ISR revalidation) while keeping
  // production builds warning-free (unlike `queue: "direct"`).
  queue: memoryQueue,
});
