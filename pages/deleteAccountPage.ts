import { expect, Page } from "@playwright/test";

export class DeleteAccountPage {
  constructor(private page: Page) {}

  async deleteAccount() {
    // Click on 'Delete Account' link
    const deleteLink = this.page.locator("a", { hasText: "Delete Account" });
    await expect(deleteLink).toBeVisible();
    await deleteLink.click();

    // Verify account deletion message
    const deletionMessage = this.page.locator("b");
    await expect(deletionMessage).toBeVisible();
    await expect(deletionMessage).toHaveText("Account Deleted!");
  }

  async clickContinueButton() {
    const continueButton = this.page.locator('a[data-qa="continue-button"]');
    await expect(continueButton).toBeVisible();
    await expect(continueButton).toContainText("Continue");
    await continueButton.click();
  }
}
