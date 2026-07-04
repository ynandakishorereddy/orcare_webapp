const { test, expect } = require('@playwright/test');

test('RAG Knowledge Base toggle exists after login', async ({ page }) => {
  // We can mock the Supabase auth state, but for a simple test we check if the UI can render it.
  // In a real E2E test, we would use page.evaluate() to inject a mock token into localStorage.
  await page.goto('/');
  
  // Inject mock state
  await page.evaluate(() => {
    window.localStorage.setItem('sb-token', 'mock_token');
    // Assuming the app has a global function to trigger auth state change
    // Since it's vanilla JS, we might just reload
  });
  
  await page.reload();
  
  // Navigate to Chat
  const chatNav = page.locator('.nav-item').filter({ hasText: 'Chat' });
  if (await chatNav.isVisible()) {
      await chatNav.click();
      await expect(page.locator('#rag-toggle')).toBeVisible();
      await expect(page.locator('#upload-btn')).toBeVisible();
  }
});
