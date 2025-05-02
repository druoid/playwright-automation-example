import { expect, Page } from "@playwright/test";

export class AccountCreatedPage {
  constructor(private page: Page) {}

  async verifyAccountCreated() {
    const accountCreatedHeader = this.page.locator(
      'h2[data-qa="account-created"]',
    );
    await expect(accountCreatedHeader).toBeVisible();
    await expect(accountCreatedHeader).toContainText("Account Created!");

    const continueButton = this.page.locator('a[data-qa="continue-button"]');
    await expect(continueButton).toBeVisible();
    await expect(continueButton).toContainText("Continue");
    await continueButton.click();
  }
}
