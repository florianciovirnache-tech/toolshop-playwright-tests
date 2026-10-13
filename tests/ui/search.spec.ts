import { test, expect } from "@playwright/test";
import { SearchPage } from "../../pages/SearchPage";

test("Search returns products matching the search term", async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.goto();
  await searchPage.search("hammer");

  await expect(searchPage.resultCount).toContainText(
    "products found for 'hammer'",
  );
  await expect(searchPage.productNames.first()).toContainText("Hammer");
});

test("Search shows a message when no products match", async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.goto();
  await searchPage.search("zxc123");

  await expect(searchPage.noResults).toContainText(
    "There are no products found.",
  );
  await expect(searchPage.productNames).toHaveCount(0);
});
