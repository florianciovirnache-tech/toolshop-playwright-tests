import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:8091";

test("API search returns products matching the search term", async ({
  request,
}) => {
  const response = await request.fetch(API_URL + "/products/search", {
    method: "QUERY",
    data: { q: "hammer" },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.data.length).toBeGreaterThan(0);
  expect(body.data[0].name.toLowerCase()).toContain("hammer");
});

test("API search returns no products for an unknown term", async ({
  request,
}) => {
  const response = await request.fetch(API_URL + "/products/search", {
    method: "QUERY",
    data: { q: "zxc123" },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.data.length).toBe(0);
});
