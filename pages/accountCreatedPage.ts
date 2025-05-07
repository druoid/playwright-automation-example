import { expect, Page } from "@playwright/test";

/**
 * Page object representing the Account Created page
 * This page is shown after successful account creation
 */
export class AccountCreatedPage {
  // Selectors
  private readonly selectors = {
    accountCreatedHeader: 'h2[data-qa="account-created"]',
    continueButton: 'a[data-qa="continue-button"]',
  } as const;

  constructor(private readonly page: Page) {}

  /**
   * Verifies that the account created header is visible and contains the expected text
   */
  async verifyAccountCreatedHeader(): Promise<void> {
    const accountCreatedHeader = this.page.locator(
      this.selectors.accountCreatedHeader,
    );
    await expect(accountCreatedHeader).toBeVisible();
    await expect(accountCreatedHeader).toContainText("Account Created!");
  }

  /**
   * Verifies that the continue button is visible and contains the expected text
   */
  async verifyContinueButton(): Promise<void> {
    const continueButton = this.page.locator(this.selectors.continueButton);
    await expect(continueButton).toBeVisible();
    await expect(continueButton).toContainText("Continue");
  }

  /**
   * Clicks the continue button
   */
  async clickContinueButton(): Promise<void> {
    const continueButton = this.page.locator(this.selectors.continueButton);
    await continueButton.click();
  }

  /**
   * Verifies the account created page and clicks continue
   * This is a convenience method that combines verification and action
   */
  async verifyAccountCreated(): Promise<void> {
    await this.verifyAccountCreatedHeader();
    await this.verifyContinueButton();
    await this.clickContinueButton();
  }
}
