import { expect, test } from '@playwright/test';

test('Page can be rendered', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h1')).toContainText('フロントエンドコーディング試験');
});
