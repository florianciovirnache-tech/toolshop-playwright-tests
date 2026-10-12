import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:8091";

test("API login returns a token for valid credentials", async ({ request }) => {
  const response = await request.post(API_URL + "/users/login", {
    data: {
      email: "customer@practicesoftwaretesting.com",
      password: "welcome01",
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.token_type).toBe("bearer");
  expect(body.access_token).toBeTruthy();
});

test("API login fails when wrong authentication data is used", async ({
  request,
}) => {
  const response = await request.post(API_URL + "/users/login", {
    data: {
      email: "nobody@example.com",
      password: "wrong",
    },
  });

  expect(response.status()).toBe(401);
  const body = await response.json();
  expect(body.error).toBe("Unauthorized");
});
