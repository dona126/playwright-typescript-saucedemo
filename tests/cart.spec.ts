// TC count = 5

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';

const USERNAME = process.env.SAUCE_USERNAME!;
const PASSWORD = process.env.SAUCE_PASSWORD!;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERNAME, PASSWORD);
});

test.describe('Cart Tests', () => {

  /** TC_001: Add single item to cart */
  test('add single item to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('sauce-labs-backpack');
    expect(await inventoryPage.getCartCount()).toBe('1');
  });

  /** TC_002: Add multiple items to cart */
  test('add multiple items to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    expect(await inventoryPage.getCartCount()).toBe('2');
  });

  /** TC_003: Remove item from cart */
  test('remove item from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage      = new CartPage(page);
    await inventoryPage.addToCart('sauce-labs-backpack');
    await cartPage.goto();
    await cartPage.removeItem();
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  /** TC_004: Cart badge count updates correctly */
  test('cart badge count updates', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('sauce-labs-backpack');
    expect(await inventoryPage.getCartCount()).toBe('1');
    await inventoryPage.removeFromInventory('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  /** TC_005: Cart persists after navigation */
  test('cart persists after navigation', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('sauce-labs-backpack');
    await page.reload();
    expect(await inventoryPage.getCartCount()).toBe('1');
  });

});