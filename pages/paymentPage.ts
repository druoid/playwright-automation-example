import { expect, Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  async enterPaymentDetailsAndPayAndConfirm(firstName: string, lastName: string, user: User) {
    const fullName = `${firstName} ${lastName}`;
    await this.page.locator('input[data-qa="name-on-card"]').fill(fullName);
    await this.page.locator('input[data-qa="card-number"]').fill(user.cardnumber ?? '');
    await this.page.locator('input[data-qa="cvc"]').fill(user.cardcvv ?? '');
    await this.page.locator('input[data-qa="expiry-month"]').fill(user.cardexpirymonth ?? '');
    await this.page.locator('input[data-qa="expiry-year"]').fill(user.cardexpiryyear ?? '');

    const payButton = this.page.locator('button[data-qa="pay-button"]');
    await expect(payButton).toBeVisible();
    await expect(payButton).toContainText('Pay and Confirm Order');
    await payButton.click();
  }

  async verifyOrderSuccess() {
    const successMessage = this.page.locator('p', { hasText: 'Congratulations! Your order has been confirmed!' });
    await expect(successMessage).toBeVisible();
  }
}
