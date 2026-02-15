import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(path: string = '') {
        await this.page.goto(path);
    }

    async wait(ms: number) {
        await this.page.waitForTimeout(ms);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getUrl(): Promise<string> {
        return this.page.url();
    }

    async reloadPage() {
        await this.page.reload();
    }
}
