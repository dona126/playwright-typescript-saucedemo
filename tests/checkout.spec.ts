// TC count = 5
// 
import { test, expect } from '../fixtures/base';

test.describe('Checkout Tests', () => {

  /** TC_001: Complete checkout with valid details */
  test('complete checkout', async ({ checkoutPage }) => {
    await checkoutPage.fillDetails('Dona', 'Maria', '600001');
    await checkoutPage.continueCheckout();
    await checkoutPage.finishCheckout();
    expect(await checkoutPage.getConfirmationText()).toContain('Thank you for your order');
  });

  /** TC_002: Checkout without first name shows error */
  test('missing first name', async ({ checkoutPage }) => {
    await checkoutPage.fillDetails('', 'Maria', '600001');
    await checkoutPage.continueCheckout();
    expect(await checkoutPage.getErrorMessage()).toContain('First Name is required');
  });

  /** TC_003: Checkout without last name shows error */
  test('missing last name', async ({ checkoutPage }) => {
    await checkoutPage.fillDetails('Dona', '', '600001');
    await checkoutPage.continueCheckout();
    expect(await checkoutPage.getErrorMessage()).toContain('Last Name is required');
  });

  /** TC_004: Checkout without postal code shows error */
  test('missing postal code', async ({ checkoutPage }) => {
    await checkoutPage.fillDetails('Dona', 'Maria', '');
    await checkoutPage.continueCheckout();
    expect(await checkoutPage.getErrorMessage()).toContain('Postal Code is required');
  });

  /** TC_005: Order summary shows correct items */
  test('order summary correct', async ({ checkoutPage, page }) => {
    await checkoutPage.fillDetails('Dona', 'Maria', '600001');
    await checkoutPage.continueCheckout();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
  });

});