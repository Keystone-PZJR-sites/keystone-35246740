import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

// Persist ISR and Next fetch caches in the shared R2 bucket.
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  // Process ISR revalidation through the in-memory queue.
  queue: memoryQueue,
});
