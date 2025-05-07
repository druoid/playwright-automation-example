import { expect, Page } from "@playwright/test";

interface User {
  cardnumber?: string;
  cardcvv?: string;
  cardexpirymonth?: string;
  cardexpiryyear?: string;
}

export class PaymentPage {
  private readonly selectors = {
    nameOnCard: 'input[data-qa="name-on-card"]',
    cardNumber: 'input[data-qa="card-number"]',
    cvc: 'input[data-qa="cvc"]',
    expiryMonth: 'input[data-qa="expiry-month"]',
    expiryYear: 'input[data-qa="expiry-year"]',
    payButton: 'button[data-qa="pay-button"]',
    successMessage: "p",
  } as const;

  constructor(private readonly page: Page) {}

  async enterPaymentDetailsAndPayAndConfirm(
    firstName: string,
    lastName: string,
    user: User,
  ): Promise<void> {
    const fullName = `${firstName} ${lastName}`;
    await this.page.locator(this.selectors.nameOnCard).fill(fullName);
    await this.page
      .locator(this.selectors.cardNumber)
      .fill(user.cardnumber ?? "");
    await this.page.locator(this.selectors.cvc).fill(user.cardcvv ?? "");
    await this.page
      .locator(this.selectors.expiryMonth)
      .fill(user.cardexpirymonth ?? "");
    await this.page
      .locator(this.selectors.expiryYear)
      .fill(user.cardexpiryyear ?? "");

    const payButton = this.page.locator(this.selectors.payButton);
    await expect(payButton).toBeVisible();
    await expect(payButton).toContainText("Pay and Confirm Order");
    await payButton.click();
  }

  async verifyOrderSuccess(): Promise<void> {
    const successMessage = this.page.locator(this.selectors.successMessage, {
      hasText: "Congratulations! Your order has been confirmed!",
    });
    await expect(successMessage).toBeVisible();
  }
}
