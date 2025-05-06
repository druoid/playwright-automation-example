import { expect, Page } from "@playwright/test";
import { user } from "../support/fakeUser";

export class SignUpPage {
  constructor(private page: Page) {}

  async fillInAccountDetails(firstName: string, lastName: string) {
    await this.page.locator("#id_gender2").check();
    await this.page.locator('input[data-qa="password"]').fill(process.env.PASSWORD!);
    await this.page
      .locator('select[data-qa="days"]')
      .selectOption(user.dateofBirth.day.toString());
    await this.page
      .locator('select[data-qa="months"]')
      .selectOption(user.dateofBirth.month.toString());
    await this.page
      .locator('select[data-qa="years"]')
      .selectOption(user.dateofBirth.year.toString());
    await this.page.locator("#newsletter").check();
    await this.page.locator("#optin").check();
    await this.page.locator('input[data-qa="first_name"]').fill(firstName);
    await this.page.locator('input[data-qa="last_name"]').fill(lastName);
    await this.page.locator('input[data-qa="company"]').fill(user.company);
    await this.page.locator('input[data-qa="address"]').fill(user.address);
    await this.page.locator('input[data-qa="state"]').fill(user.state);
    await this.page.locator('input[data-qa="city"]').fill(user.city);
    await this.page.locator('input[data-qa="zipcode"]').fill(user.zipcode);
    await this.page.locator('input[data-qa="mobile_number"]').fill(user.mobile);
  }

  async clickCreateAccount() {
    const button = this.page.locator('button[data-qa="create-account"]');
    await expect(button).toBeVisible();
    await button.click();
  }
}
