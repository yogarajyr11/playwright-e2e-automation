import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Module Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.navigateTo();
        await loginPage.login('standard_user');
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.navigateToCart();
        await cartPage.clickCheckout();
    });

    test('Missing Information Error', async ({ page }) => {
        await checkoutPage.fillCustomerInfo('', 'Doe', '12345');
        await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
    });
});
