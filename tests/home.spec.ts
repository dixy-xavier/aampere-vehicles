import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('/');

	// Expect a specific text to be present on the page.
	await expect(page.locator('text=Welcome home')).toBeVisible();
});

test('get vehicle list link and navigate to it', async ({ page }) => {
	await page.goto('/');

	// Click the get started link.
	await expect(page.getByRole('link', { name: 'View vehicle list' })).toBeVisible();
	await page.getByRole('link', { name: 'View vehicle list' }).click();

	// Expect the URL to change to /vehicles.
	await expect(page).toHaveURL(/\/vehicles/);
});
