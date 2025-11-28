import { test, expect } from '@playwright/test';

test('Search flights from Stockholm to anywhere for today and verify results', async ({ page }) => {
  await page.goto('https://www.flysas.com/gb-en/flight-status');
  // Handle cookie consent popup if present
  const allowCookies = page.getByRole('button', { name: /Allow all/i });
  if (await allowCookies.isVisible()) {
    await allowCookies.click();
  }
  await page.getByRole('combobox', { name: 'Departure' }).click();
  await page.getByRole('combobox', { name: 'Departure' }).fill('Stockholm');
  await page.keyboard.press('Enter');
  await page.getByRole('combobox', { name: 'Arrival' }).click();
  await page.getByRole('option', { name: /Anywhere/ }).click();
  await page.getByRole('button', { name: /Search/ }).click();
  // Wait for results to load
  await expect(page.getByText(/search results/i)).toBeVisible();
  // Check for non-zero results
  const resultsText = await page.getByText(/search results/i).textContent();
  const match = resultsText.match(/(\d+) search results/i);
  expect(match).not.toBeNull();
  const count = parseInt(match[1], 10);
  expect(count).toBeGreaterThan(0);
});
