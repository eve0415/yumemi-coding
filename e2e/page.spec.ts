import { api } from '@/api';
import { expect, test } from '@playwright/test';

test('Page can be rendered', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h1')).toContainText('フロントエンドコーディング試験');
  await expect(page.locator('p')).toContainText('都道府県');

  const res = await api.GET('/api/v1/prefectures');
  await Promise.all(res.data?.result.map(({ prefName }) => expect(page.getByLabel(prefName)).toBeVisible()) ?? []);
});
