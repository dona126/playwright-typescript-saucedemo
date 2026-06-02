// tests/hello.spec.ts
import { test, expect } from '@playwright/test';

test('hello world', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Swag Labs/);
});