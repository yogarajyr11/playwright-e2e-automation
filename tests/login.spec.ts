import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login Module Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.navigateTo();
    });

    test('Successful Login', async ({ page }) => {
        await loginPage.login('standard_user');
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('Locked Out User Login', async () => {
        await loginPage.login('locked_out_user');
        const errorText = await loginPage.getErrorMessageText();
        expect(errorText).toContain('Sorry, this user has been locked out.');
    });
});
