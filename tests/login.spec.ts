import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const username = process.env.SAUCE_USERNAME!;
const password = process.env.SAUCE_PASSWORD!;

/**
 * TC_001: Valid login with correct credentials
 * Verifies standard_user can login and lands on inventory page
 */
test('Valid Login', async ({page}) =>{

    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(username, password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

