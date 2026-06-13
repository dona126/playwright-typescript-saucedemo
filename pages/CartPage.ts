import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly cartItems: Locator;
  readonly removeButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon       = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge      = page.locator('[data-test="shopping-cart-badge"]');
    this.cartItems      = page.locator('[data-test="inventory-item"]');
    this.removeButton   = page.locator('[data-test^="remove"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async goto(): Promise<void> {
    await this.cartIcon.click();
  }

  async getCartCount(): Promise<string> {
  if (await this.cartBadge.isVisible()) {
    return (await this.cartBadge.textContent()) ?? "0";
  }
  return "0";
  }

  async removeItem(): Promise<void> {
    await await this.removeButton.first().click();
  }

  async proceedToCheckout(): Promise<void> {
    await await this.checkoutButton.click();
  }
}