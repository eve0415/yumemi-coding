import { api, PopulationType } from '@/api';
import { expect, test } from '@playwright/test';

test('Page can be rendered', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h1')).toContainText('フロントエンドコーディング試験');
  await expect(page.locator('p').first()).toContainText('都道府県');

  const res = await api.GET('/api/v1/prefectures');
  await Promise.all(res.data?.result.map(({ prefName }) => expect(page.getByLabel(prefName)).toBeInViewport()) ?? []);
});

test('Button should be clickable', async ({ page }) => {
  await page.goto('/');

  const label = page.getByLabel('北海道');
  await expect(label).toBeInViewport();
  await expect(label).not.toBeChecked();

  await label.click();
  await expect(label).toBeChecked();
});

test('Select menu should be useable', async ({ page }) => {
  await page.goto('/');

  const select = page.getByRole('combobox');
  await expect(select).toBeInViewport();
  await expect(select).toHaveValue('total');

  const options = page.locator('option');
  expect(await options.allInnerTexts()).toStrictEqual(Object.values(PopulationType));

  await select.selectOption({ index: 1 });
  await expect(select).toHaveValue('young');
});

test('Chart can be rendered', async ({ page }) => {
  await page.goto('/');

  expect(page.locator('.recharts-responsive-container'));

  const label = page.getByLabel('愛知県');
  await label.click();
  await expect(label).toBeChecked();

  expect(await page.locator('ul').innerHTML()).toContain('愛知県');
});

test('Light/Dark mode', async ({ page }) => {
  await page.goto('/');

  {
    const bgColor = await page.evaluate(() => {
      const body = document.querySelector('body');
      if (!body) throw new Error('Body not found');

      return window.getComputedStyle(body).backgroundColor;
    });

    expect(bgColor, 'Light color is not expected').toBe('rgb(255, 255, 255)');
  }

  await page.emulateMedia({ colorScheme: 'dark' });

  {
    const bgColor = await page.evaluate(() => {
      const body = document.querySelector('body');
      if (!body) throw new Error('Body not found');

      return window.getComputedStyle(body).backgroundColor;
    });

    expect(bgColor, 'Dark color is not expected').toBe('rgb(3, 7, 17)');
  }
});
