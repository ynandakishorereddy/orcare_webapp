const { test, expect } = require('@playwright/test');

test('homepage loads and shows login', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ORCare/);
  // Based on current Vanilla JS frontend UI expectations
  await expect(page.locator('.btn').filter({ hasText: 'Sign In' })).toBeVisible();
});
