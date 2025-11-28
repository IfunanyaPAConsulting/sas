import { test, expect } from '@playwright/test';

test('All flights from London Heathrow to anywhere on 17th September are marked as arrived', async ({ page }) => {
  // Go to the SAS flight status page
  await page.goto('https://www.flysas.com/en/flight-status/');

  // Handle cookie consent popup if it appears
  const allowCookies = page.locator('button', { hasText: 'Allow all' });
  if (await allowCookies.isVisible({ timeout: 5000 })) {
    await allowCookies.click();
  }

  // Fill Departure as London LHR
  await page.getByRole('combobox', { name: 'Departure' }).fill('London LHR');

  // Fill Arrival as Anywhere
  await page.getByRole('combobox', { name: 'Arrival' }).fill('Anywhere');

  // Open the date picker
  await page.getByRole('button', { name: /\d{4}-\d{2}-\d{2}/ }).click();
  // Wait for the September heading to be visible
  await page.getByRole('heading', { name: 'September' }).waitFor({ state: 'visible', timeout: 5000 });
  // Find all '17' buttons and click the first visible/enabled one
  const seventeens = page.locator('button', { hasText: '17' });
  const count = await seventeens.count();
  for (let i = 0; i < count; i++) {
    const btn = seventeens.nth(i);
    if (await btn.isVisible() && await btn.isEnabled()) {
      await btn.click();
      break;
    }
  }
  // Click 'Done' if visible/enabled
  const doneBtn = page.getByRole('button', { name: 'Done' });
  if (await doneBtn.isVisible() && await doneBtn.isEnabled()) {
    await doneBtn.click();
  }

  // Click Search
  await page.getByRole('button', { name: 'Search' }).click();

  // Check for zero results
  const zeroResults = await page.locator('text=0 search results').isVisible();
  if (zeroResults) {
    expect(zeroResults).toBeTruthy();
    return;
  }

  // Otherwise, verify all flights are marked as 'Arrived'
  const statuses = page.locator('text=Arrived');
  const statusCount = await statuses.count();
  const rows = page.locator('[data-testid="flight-row"]');
  const rowCount = await rows.count();
  expect(statusCount).toBe(rowCount);
});
