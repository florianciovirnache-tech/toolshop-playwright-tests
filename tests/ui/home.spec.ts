import { test, expect } from "@playwright/test";

test("home page loads with correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Practice Software Testing/);
});
