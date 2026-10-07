import { test, expect } from "@playwright/test";

test("customer can log in with valid credentials", async ({ page }) => {
  await page.goto("/auth/login");

  await page.getByTestId("email").fill("customer@practicesoftwaretesting.com");
  await page.getByTestId("password").fill("welcome01");
  await page.getByTestId("login-submit").click();

  await expect(page).toHaveURL(/\/account/);
});

test("login fails with wrong password", async ({ page }) => {
  await page.goto("/auth/login");

  await page.getByTestId("email").fill("customer@practicesoftwaretesting.com");
  await page.getByTestId("password").fill("wrongPassword123");
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("login-error")).toBeVisible();
  await expect(page.getByTestId("login-error")).toContainText(
    "Invalid email or password",
  );
  await expect(page).toHaveURL(/\/auth\/login/);
});
