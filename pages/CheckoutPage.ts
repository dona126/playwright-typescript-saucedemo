import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly confirmationHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput     = page.locator('[data-test="firstName"]');
    this.lastNameInput      = page.locator('[data-test="lastName"]');
    this.postalCodeInput    = page.locator('[data-test="postalCode"]');
    this.continueButton     = page.locator('[data-test="continue"]');
    this.finishButton       = page.locator('[data-test="finish"]');
    this.errorMessage       = page.locator('[data-test="error"]');
    this.confirmationHeader = page.locator('[data-test="complete-header"]');
  }

  async fillDetails(first: string, last: string, zip: string): Promise<void> {
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.postalCodeInput.fill(zip);
  }

  async continueCheckout(): Promise<void> {
    await this.continueButton.click();
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }

  async getConfirmationText(): Promise<string | null> {
    return this.confirmationHeader.textContent();
  }
}