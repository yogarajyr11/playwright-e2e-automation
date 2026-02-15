import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OverviewPage } from '../pages/OverviewPage';

test.describe('Master End-to-End Flow', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let overviewPage: OverviewPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        overviewPage = new OverviewPage(page);
    });

    test('Complete purchase flow', async () => {
        await loginPage.navigateTo();
        await loginPage.login('standard_user');

        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.navigateToCart();

        await cartPage.clickCheckout();

        await checkoutPage.fillCustomerInfo('John', 'Doe', '12345');

        await overviewPage.clickFinish();

        const successMsg = await overviewPage.getCompleteHeaderText();
        expect(successMsg).toBe('Thank you for your order!');
    });
});
