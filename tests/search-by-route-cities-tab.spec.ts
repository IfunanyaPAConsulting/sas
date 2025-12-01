// spec: specs/flight-status-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Search by Route (Cities Tab)', () => {
  test('Cities tab: search for flights from London LHR to Stockholm ARN on 2025-12-01', async ({ page }) => {
    // Navigate to SAS Flight Status page for route search scenario.
    await page.goto('https://www.flysas.com/gb-en/flight-status');

    // Handle cookie consent dialog by clicking 'Allow all'.
    await page.getByRole('button', { name: 'Allow all' }).click();

    // Verify 'Cities' tab is selected and visible.
    await expect(page.getByRole('tab', { name: 'Cities' })).toBeVisible();

    // Type 'London LHR' into Departure combobox.
    await page.getByRole('combobox', { name: 'Departure' }).fill('London LHR');

    // Type 'Stockholm ARN' into Arrival combobox.
    await page.getByRole('combobox', { name: 'Arrival' }).fill('Stockholm ARN');

    // Select date '2025-12-01' for flight search.
    await page.getByRole('button', { name: '-12-01' }).click();

    // Confirm date selection by clicking 'Done'.
    await page.getByRole('button', { name: 'Done' }).click();

    // Click 'Search' to submit flight status search.
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify that flight results are displayed for the selected route.
    await expect(page.getByText('Flight result')).toBeVisible();

    // Verify that at least one flight status (e.g., 'Arrived', 'Took-off', 'Scheduled', 'Delayed') is visible in results.
    await expect(page.getByText('Arrived').first()).toBeVisible();
    await expect(page.getByText('Scheduled').first()).toBeVisible();
    await expect(page.getByText('Took-off').first()).toBeVisible();
    await expect(page.getByText('Delayed').first()).toBeVisible();

    // Verify URL remains /gb-en/flight-status
    expect(await page.evaluate(() => window.location.pathname)).toBe('/gb-en/flight-status');
  });
});
