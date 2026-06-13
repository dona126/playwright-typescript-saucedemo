import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('[data-test="inventory-item"]');
    this.cartBadge   = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addToCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${productName}"]`).click();
  }

  async removeFromInventory(productName: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${productName}"]`).click();
  }

  async getCartCount(): Promise<string | null> {
    return this.cartBadge.textContent();
  }

  async getProductCount(): Promise<number> {
    return this.productList.count();
  }
}