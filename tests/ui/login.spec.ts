import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test("customer can login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("customer@practicesoftwaretesting.com", "welcome01");
  await expect(page).toHaveURL(/\/account/);
});

test("login fails with invalid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("nobody@example.com", "wrongPassword123");

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    "Invalid email or password",
  );
  await expect(page).toHaveURL(/\/auth\/login/);
});
