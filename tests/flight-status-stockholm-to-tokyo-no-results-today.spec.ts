import { test, expect } from '@playwright/test';

test('No flight results from Stockholm to Tokyo for today', async ({ page }) => {
  await page.goto('https://www.flysas.com/gb-en/flight-status');

  // Handle cookie consent dialog if present
  const allowCookies = page.getByRole('button', { name: /Allow all/i });
  if (await allowCookies.isVisible().catch(() => false)) {
    await allowCookies.click();
  }

  // Fill in departure
  const departure = page.getByRole('combobox', { name: 'Departure' });
  await departure.fill('Stockholm');

  // Fill in arrival
  const arrival = page.getByRole('combobox', { name: 'Arrival' });
  await arrival.fill('Tokyo');

  // Click search
  await page.getByRole('button', { name: 'Search' }).click();

  // Wait for results to appear
  await expect(page.getByText('0 search results')).toBeVisible();
});
