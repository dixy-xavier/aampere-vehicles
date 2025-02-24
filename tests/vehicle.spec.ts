import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('/vehicles/Tesla*Model_S*2020');

	// Expect a specific text to be present on the page.
	await expect(page.locator('text=Vehicle Details')).toBeVisible();
	await expect(page.getByTestId('vehicle-images')).toBeVisible();
	await expect(page.getByTestId('vehicle-details')).toBeVisible();
});
