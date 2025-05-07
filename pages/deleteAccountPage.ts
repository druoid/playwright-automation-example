import { expect, Page } from "@playwright/test";

/**
 * Page object representing the Delete Account page
 * This page is shown when a user deletes their account
 */
export class DeleteAccountPage {
  // Selectors
  private readonly selectors = {
    deleteAccountLink: "a",
    deletionMessage: "b",
    continueButton: 'a[data-qa="continue-button"]',
  } as const;

  constructor(private readonly page: Page) {}

  /**
   * Verifies that the delete account link is visible
   */
  async verifyDeleteAccountLink(): Promise<void> {
    const deleteLink = this.page.locator(this.selectors.deleteAccountLink, {
      hasText: "Delete Account",
    });
    await expect(deleteLink).toBeVisible();
  }

  /**
   * Verifies that the account deletion message is visible and contains the expected text
   */
  async verifyDeletionMessage(): Promise<void> {
    const deletionMessage = this.page.locator(this.selectors.deletionMessage);
    await expect(deletionMessage).toBeVisible();
    await expect(deletionMessage).toHaveText("Account Deleted!");
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
   * Clicks the delete account link
   */
  async clickDeleteAccountLink(): Promise<void> {
    const deleteLink = this.page.locator(this.selectors.deleteAccountLink, {
      hasText: "Delete Account",
    });
    await deleteLink.click();
  }

  /**
   * Clicks the continue button
   */
  async clickContinueButton(): Promise<void> {
    const continueButton = this.page.locator(this.selectors.continueButton);
    await continueButton.click();
  }

  /**
   * Deletes the account and verifies the deletion
   * This is a convenience method that combines verification and actions
   */
  async deleteAccount(): Promise<void> {
    await this.verifyDeleteAccountLink();
    await this.clickDeleteAccountLink();
    await this.verifyDeletionMessage();
  }
}
