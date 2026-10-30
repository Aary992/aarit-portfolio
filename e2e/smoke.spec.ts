import { expect, test, type Page } from "@playwright/test";

/** Every static route. Database-backed detail pages are covered by their index. */
const ROUTES = [
  "/",
  "/about",
  "/timeline",
  "/building",
  "/building/marketplay",
  "/building/getaitrade",
  "/building/10x-founders",
  "/investing",
  "/side-projects",
  "/writing",
  "/writing/marketplays-ai-control-room",
  "/markets-explained",
  "/guides",
  "/resources",
  "/speaking",
  "/certifications",
  "/press",
  "/faq",
  "/work-with-me",
];

/** Collects uncaught page errors, which includes React hydration failures. */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
}

test.describe("every page", () => {
  for (const route of ROUTES) {
    test(`${route} renders cleanly`, async ({ page }) => {
      const errors = trackErrors(page);
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1:visible")).toHaveCount(1);
      await expect(page).toHaveTitle(/\S/);
      // Shared links must not claim to be the homepage (og:url regression).
      // Read meta tags directly: a locator would wait for a tag that is
      // legitimately absent (most pages have no og:url of their own).
      const og = await page.evaluate(() => ({
        url: document.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? null,
        image: document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "",
      }));
      if (route !== "/") expect(og.url).not.toBe("https://www.aaritshah.com");
      expect(og.image).toMatch(/^https:\/\/www\.aaritshah\.com\/.*opengraph-image/);
      // No page may scroll sideways.
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
      expect(errors).toEqual([]);
    });
  }
});

test("unknown routes show the 404 page", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/doesn.t\s*exist/i);
});

test("/journey permanently redirects to /timeline", async ({ request }) => {
  const res = await request.get("/journey", { maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers()["location"]).toBe("/timeline");
});

test("garbled characters never reach the page", async ({ page }) => {
  for (const route of ["/building", "/certifications", "/investing"]) {
    await page.goto(route);
    await expect(page.locator("body")).not.toContainText("Â");
  }
});

test.describe("navigation", () => {
  test("desktop nav has five links and Writing covers Markets, Explained", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop row only");
    await page.goto("/markets-explained");
    const nav = page.locator("header nav").first();
    // Accessible names, not textContent: each label is doubled for the
    // roll-up hover effect, with the copy hidden from assistive tech.
    await expect(nav.getByRole("link")).toHaveCount(5);
    for (const name of ["About", "Building", "Writing", "Speaking", "Work with me"]) {
      await expect(nav.getByRole("link", { name, exact: true })).toBeVisible();
    }
    // The active link carries the amber band; it should be Writing here.
    await expect(nav.getByRole("link", { name: "Writing" })).toHaveClass(/text-ink/);
  });

  test("mobile menu opens and navigates", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile menu only");
    await page.goto("/about");
    await page.getByRole("button", { name: "Open menu" }).click();
    // The menu's links are numbered ("04 Speaking"); the footer's are not.
    await page.getByRole("link", { name: /^\d+ Speaking$/ }).click();
    await expect(page).toHaveURL(/\/speaking$/);
  });

  test("footer links to Timeline, Guides and Resources", async ({ page }) => {
    await page.goto("/about");
    const footer = page.getByRole("navigation", { name: "Footer" });
    for (const name of ["Timeline", "Guides", "Resources"]) {
      await expect(footer.getByRole("link", { name, exact: true })).toBeVisible();
    }
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  // Regression: the server renders animated starting styles, and components
  // used to drop their style on the client for these visitors, freezing
  // content faded and shrunk, and leaving the chapter gallery inert.
  for (const route of ["/", "/about", "/building/marketplay", "/faq"]) {
    test(`${route} shows content at rest`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      // Walk the page so every scroll-triggered entrance has had its turn.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 50));
        }
      });
      await page.waitForTimeout(1_200);
      const frozen = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("main [style]")]
          .filter((el) => !el.closest('[aria-hidden="true"]'))
          .filter((el) => {
            const opacity = parseFloat(el.style.opacity || "1");
            return opacity < 0.99 || /scale\(0\.[0-8]/.test(el.style.transform);
          })
          .map((el) => el.className.toString().slice(0, 60)),
      );
      expect(frozen).toEqual([]);
      expect(errors).toEqual([]);
    });
  }

  test("chapter gallery is not inert", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".cinema-gallery__collection")).not.toHaveAttribute("inert", /.*/);
  });
});

test.describe("homepage chapter gallery", () => {
  test("keyboard: skip link reveals the cards and a card opens its chapter", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard flow");
    await page.goto("/");
    // Wait out the intro curtain.
    await expect(page.locator(".site-intro")).toHaveCount(0, { timeout: 8_000 });
    const skip = page.getByRole("button", { name: "Explore the six chapters" });
    await skip.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1_500);
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toHaveAttribute("aria-label", "Explore Building");
    await page.keyboard.press("Enter");
    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { level: 1 })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });
});

test.describe("enquiry form", () => {
  test("requires an email and a message", async ({ page }) => {
    await page.goto("/work-with-me");
    await page.getByRole("button", { name: "Send the enquiry" }).click();
    const email = page.locator('input[name="email"]');
    expect(await email.evaluate((el: HTMLInputElement) => el.validity.valueMissing)).toBe(true);
  });

  test("submits to Supabase and confirms", async ({ page }) => {
    // Never write a real lead from a test run.
    let payload: Record<string, unknown> | null = null;
    await page.route("**/rest/v1/leads", async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 201, body: "" });
    });
    await page.goto("/work-with-me");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.locator('textarea[name="message"]').fill("Smoke test enquiry");
    await page.getByRole("button", { name: "Send the enquiry" }).click();
    await expect(page.getByText("Got it.")).toBeVisible();
    expect(payload).toMatchObject({ email: "test@example.com", source: "work-with-me-form" });
  });

  test("shows an error when the submission fails", async ({ page }) => {
    await page.route("**/rest/v1/leads", (route) => route.fulfill({ status: 500, body: "" }));
    await page.goto("/work-with-me");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.locator('textarea[name="message"]').fill("Smoke test enquiry");
    await page.getByRole("button", { name: "Send the enquiry" }).click();
    await expect(page.getByText("Got it.")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Send the enquiry" })).toBeEnabled();
  });
});

test("share images render", async ({ request }) => {
  for (const path of ["/opengraph-image", "/building/marketplay/opengraph-image", "/writing/marketplays-ai-control-room/opengraph-image"]) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  }
});
