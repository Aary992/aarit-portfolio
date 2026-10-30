import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke tests against a production build (`next build` + `next start`), since
 * several of the bugs they guard against (hydration, reduced motion, metadata)
 * only show up in production output.
 *
 *   npm run test:e2e            builds, starts on :3100 and runs everything
 *   E2E_BASE_URL=... npm run test:e2e   runs against an already-running site
 *
 * First run on a new machine needs a browser: `npx playwright install chromium`.
 */
const port = 3100;
const baseURL = process.env.E2E_BASE_URL ?? `http://localhost:${port}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  timeout: 45_000,
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npm run build && npm run start -- -p ${port}`,
        url: baseURL,
        timeout: 240_000,
        reuseExistingServer: !process.env.CI,
      },
});
