import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async login(username: string, password: string = 'secret_sauce') {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessageText(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }

    async isErrorMessageVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }
}
