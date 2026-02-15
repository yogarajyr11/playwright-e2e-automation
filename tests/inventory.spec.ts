import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory Module Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.navigateTo();
        await loginPage.login('standard_user');
    });

    test('Verify product sorting by Price (Low to High)', async ({ page }) => {
        await inventoryPage.sortProducts('lohi');
        await page.waitForTimeout(1000); // Simple wait for UI to update sorting
        const firstItem = page.locator('.inventory_item').first();
        await expect(firstItem).toContainText('Sauce Labs Onesie');
    });

    test('Add item to cart', async () => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        expect(await inventoryPage.getCartCount()).toBe('1');
    });
});
