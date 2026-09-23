import { defineConfig } from "@playwright/test";

/** The visual gate. Point it at any running build:
 *    BASE_URL=http://localhost:3000 npm run test:visual
 * Baselines live in tests/__screenshots__ (ignored by git); refresh them
 * from the reference build with `-- --update-snapshots`, then run against
 * the build under review. The system Chrome is used, so nothing downloads. */
export default defineConfig({
  testDir: "./tests",
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  fullyParallel: true,
  workers: 4,
  retries: 0,
  /* /design/#sections mounts every section on one page (~50k px tall);
     its full-page shot needs more than the defaults. */
  timeout: 90_000,
  expect: { timeout: 20_000 },
  reporter: [["list"]],
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    channel: "chrome",
    headless: true,
    contextOptions: { reducedMotion: "reduce" },
  },
});
