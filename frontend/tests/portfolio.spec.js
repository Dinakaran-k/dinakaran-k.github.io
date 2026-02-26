import { expect, test } from "@playwright/test";

test("renders key sections and identity", async ({ page }) => {
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Android & Flutter Mobile Developer" })).toBeVisible();
  await expect(page.locator(".brand-name")).toHaveText("Dinakaran Kommunuri");
  await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();

  expect(consoleErrors, `Console errors:\n${consoleErrors.join("\n")}`).toEqual([]);
});

test("about links are clickable and correctly wired", async ({ page }) => {
  await page.goto("/");

  const emailLink = page.getByRole("link", { name: "dinakarankommunuri@gmail.com" });
  await expect(emailLink).toHaveAttribute("href", "mailto:dinakarankommunuri@gmail.com");

  const phoneLink = page.getByRole("link", { name: "+91 8096475183" });
  await expect(phoneLink).toHaveAttribute("href", "tel:+918096475183");
});

test("theme toggle preserves CTA readability", async ({ page }) => {
  await page.goto("/");
  const downloadBtn = page.getByRole("link", { name: "Download Resume" });
  const githubBtn = page.getByRole("link", { name: "GitHub" }).first();

  await expect(downloadBtn).toBeVisible();
  await expect(githubBtn).toBeVisible();

  const toggle = page.getByRole("button", { name: /light|dark/i });
  await toggle.click();

  await expect(downloadBtn).toBeVisible();
  await expect(githubBtn).toBeVisible();
});

test("no critical overlap in hero CTA row", async ({ page }) => {
  await page.goto("/");
  const overlap = await page.evaluate(() => {
    const selectors = [
      'a[href="#contact"]',
      'a[download]',
      'a[href^="https://github.com/"]'
    ];
    const els = selectors
      .map((s) => document.querySelector(s))
      .filter(Boolean)
      .map((el) => el.getBoundingClientRect());
    for (let i = 0; i < els.length; i += 1) {
      for (let j = i + 1; j < els.length; j += 1) {
        const a = els[i];
        const b = els[j];
        const intersects = !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
        if (intersects) return true;
      }
    }
    return false;
  });
  expect(overlap).toBeFalsy();
});

test("github projects section loads", async ({ page }) => {
  await page.goto("/");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  const repoCards = page.locator(".github-card");
  const errorMessage = page.locator("#projects .text-danger");
  await page.waitForTimeout(2000);
  const count = await repoCards.count();
  const hasError = await errorMessage.count();
  expect(count > 0 || hasError > 0).toBeTruthy();
});

test("about meta items do not overlap", async ({ page }) => {
  await page.goto("/");
  await page.locator("#about").scrollIntoViewIfNeeded();

  const overlap = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll("#about .meta-grid > div"));
    const rects = items.map((el) => el.getBoundingClientRect());
    for (let i = 0; i < rects.length; i += 1) {
      for (let j = i + 1; j < rects.length; j += 1) {
        const a = rects[i];
        const b = rects[j];
        const intersects = !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
        if (intersects) return true;
      }
    }
    return false;
  });

  expect(overlap).toBeFalsy();
});
