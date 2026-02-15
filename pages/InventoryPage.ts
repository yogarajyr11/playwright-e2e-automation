import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    private readonly inventoryList: Locator;
    private readonly sortDropdown: Locator;
    private readonly shoppingCartBadge: Locator;
    private readonly hamburgerMenu: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        super(page);
        this.inventoryList = page.locator('.inventory_list');
        this.sortDropdown = page.locator('.product_sort_container');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.hamburgerMenu = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
    }

    async addItemToCart(productName: string) {
        const productItem = this.page.locator('.inventory_item', { hasText: productName });
        await productItem.getByRole('button', { name: 'Add to cart' }).click();
    }

    async removeItemFromCart(productName: string) {
        const productItem = this.page.locator('.inventory_item', { hasText: productName });
        await productItem.getByRole('button', { name: 'Remove' }).click();
    }

    async getCartCount(): Promise<string> {
        if (await this.shoppingCartBadge.isVisible()) {
            return await this.shoppingCartBadge.textContent() || '0';
        }
        return '0';
    }

    async navigateToCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    async sortProducts(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async logout() {
        await this.hamburgerMenu.click();
        await this.logoutLink.click();
    }
}
