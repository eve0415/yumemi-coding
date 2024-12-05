import { api } from '@/api';
import { expect, test } from '@playwright/test';

test('Page can be rendered', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h1')).toContainText('フロントエンドコーディング試験');
  await expect(page.locator('.prefectures')).toContainText('都道府県');

  const res = await api.GET('/api/v1/prefectures');
  await Promise.all(res.data?.result.map(({ prefName }) => expect(page.getByLabel(prefName)).toBeVisible()) ?? []);
});

test('Button should be clickable', async ({ page }) => {
  await page.goto('/');

  const label = page.getByLabel('北海道');
  await expect(label).toBeVisible();
  await expect(label).not.toBeChecked();

  await label.click();
  await expect(label).toBeChecked();
});

test('Chart can be rendered', async ({ page }) => {
  await page.goto('/');

  expect(page.locator('.recharts-responsive-container'));

  const label = page.getByLabel('愛知県');
  await label.click();
  await expect(label).toBeChecked();

  expect(await page.locator('ul').innerHTML()).toContain('愛知県');
});
