import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';

type CustomFixtures = {
  checkoutPage: CheckoutPage;
};

export const test = base.extend<CustomFixtures>({

  checkoutPage: async ({ page }, use) => {
    const loginPage     = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage      = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.SAUCE_USERNAME!,
      process.env.SAUCE_PASSWORD!
    );
    await inventoryPage.addToCart('sauce-labs-backpack');
    await cartPage.goto();
    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

});

export { expect } from '@playwright/test';