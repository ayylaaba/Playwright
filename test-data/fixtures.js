// test-data/fixtures.js
import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(
      /doubleclick\.net|googlesyndication\.com|google\.com\/pagead|googleadservices\.com|adservice\.google|googletagservices\.com/,
      (route) => route.abort()
    );
    await use(page);
  },
});

export { expect };
