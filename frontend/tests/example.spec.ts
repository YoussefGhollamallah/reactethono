import { test, expect } from '@playwright/test';

test('/', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Vite + React + TS");
});

test('click sur le boutton connecter', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Click sur le boutton connecter
  await page.click('text=Se connecter');

  // Expects the URL to contain intro.
  await expect(page).toHaveURL('http://localhost:5173/login');
});
