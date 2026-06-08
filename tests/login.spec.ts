import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const USERNAME = process.env.SAUCE_USERNAME!;
const PASSWORD = process.env.SAUCE_PASSWORD!;



test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page); //That loginPage exists only inside beforeEach.
//The tests cannot access it, so each test creates its own:
  await loginPage.goto();
});



test.describe('Login Tests', () => {

  /** TC_001: Valid login with correct credentials */
  test('valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  /** TC_002: Locked out user cannot login */
  test('locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('locked_out_user', PASSWORD);
    const err = await loginPage.getErrorMessage();
    expect(err).toContain('Sorry, this user has been locked out');
  });

  /** TC_003: Invalid password shows error */
  test('wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(USERNAME, 'wrong_pass');
    const err = await loginPage.getErrorMessage();
    expect(err).toContain('Username and password do not match');
  });

  /** TC_004: Empty username shows error */
  test('empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', PASSWORD);
    const err = await loginPage.getErrorMessage();
    expect(err).toContain('Username is required');
  });

  /** TC_005: Empty password shows error */
  test('empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(USERNAME, '');
    const err = await loginPage.getErrorMessage();
    expect(err).toContain('Password is required');
  });

  /** TC_006: Both fields empty shows error */
  test('both fields empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', '');
    const err = await loginPage.getErrorMessage();
    expect(err).toContain('Username is required');
  });

  /** TC_007: Valid login and logout */
  test('valid login and logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await loginPage.logout();
    await expect(page).toHaveURL("https://www.saucedemo.com");
  });

});