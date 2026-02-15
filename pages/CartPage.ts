import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    private readonly checkoutButton: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly cartItems: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.cartItems = page.locator('.cart_item');
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

    async removeItem(productName: string) {
        const cartItem = this.page.locator('.cart_item', { hasText: productName });
        await cartItem.getByRole('button', { name: 'Remove' }).click();
    }
}
