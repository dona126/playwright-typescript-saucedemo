// TC count = 2


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const USERNAME = process.env.SAUCE_USERNAME!;
const PASSWORD = process.env.SAUCE_PASSWORD!;

test.describe('E2E Tests', () => {

  /** TC_001: Full flow — login to cart to checkout to confirmation */
  test('full e2e single item', async ({ page }) => {
    const loginPage     = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage      = new CartPage(page);
    const checkout      = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await inventoryPage.addToCart('sauce-labs-backpack');
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    await checkout.fillDetails('Dona', 'Maria', '600001');
    await checkout.continueCheckout();
    await checkout.finishCheckout();
    expect(await checkout.getConfirmationText()).toContain('Thank you for your order');
  });

  /** TC_002: Full flow — multiple items to checkout to verify total */
  test('full e2e multiple items', async ({ page }) => {
    const loginPage     = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage      = new CartPage(page);
    const checkout      = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    expect(await inventoryPage.getCartCount()).toBe('2');
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    await checkout.fillDetails('Diya', 'Merin', '600001');
    await checkout.continueCheckout();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
    await checkout.finishCheckout();
    expect(await checkout.getConfirmationText()).toContain('Thank you for your order');
  });

});