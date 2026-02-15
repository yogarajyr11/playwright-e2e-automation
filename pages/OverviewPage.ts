import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class OverviewPage extends BasePage {
    private readonly finishButton: Locator;
    private readonly cancelButton: Locator;
    private readonly paymentInfo: Locator;
    private readonly shippingInfo: Locator;
    private readonly totalPrice: Locator;
    private readonly completeHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.paymentInfo = page.locator('.summary_info_label').first();
        this.totalPrice = page.locator('.summary_total_label');
        this.completeHeader = page.locator('.complete-header');
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async getCompleteHeaderText(): Promise<string> {
        return await this.completeHeader.textContent() || '';
    }

    async getTotalPrice(): Promise<string> {
        return await this.totalPrice.textContent() || '';
    }
}
