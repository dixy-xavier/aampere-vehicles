import { test, expect } from '@playwright/test';

test('has table', async ({ page }) => {
	await page.goto('/vehicles');

	// Expect a specific text to be present on the page.
	await expect(page.locator('text=Vehicle list')).toBeVisible();
	await page.getByTestId('vehicle-row-Tesla*Model_S*2020').click();
	await expect(page).toHaveURL(/\/vehicles\/Tesla\*Model_S\*2020/);
});
