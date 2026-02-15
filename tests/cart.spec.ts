import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Module Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        await loginPage.navigateTo();
        await loginPage.login('standard_user');
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.navigateToCart();
    });

    test('Remove item from cart', async () => {
        await cartPage.removeItem('Sauce Labs Backpack');
        expect(await cartPage.getCartItemCount()).toBe(0);
    });
});
