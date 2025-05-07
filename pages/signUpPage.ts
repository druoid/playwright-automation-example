import { expect, Page } from "@playwright/test";
import { user } from "../utils/fakeUser";

export class SignUpPage {
  private readonly selectors = {
    gender: "#id_gender2",
    password: 'input[data-qa="password"]',
    days: 'select[data-qa="days"]',
    months: 'select[data-qa="months"]',
    years: 'select[data-qa="years"]',
    newsletter: "#newsletter",
    optin: "#optin",
    firstName: 'input[data-qa="first_name"]',
    lastName: 'input[data-qa="last_name"]',
    company: 'input[data-qa="company"]',
    address: 'input[data-qa="address"]',
    state: 'input[data-qa="state"]',
    city: 'input[data-qa="city"]',
    zipcode: 'input[data-qa="zipcode"]',
    mobile: 'input[data-qa="mobile_number"]',
    createAccount: 'button[data-qa="create-account"]',
  } as const;

  constructor(private readonly page: Page) {}

  async fillInAccountDetails(
    firstName: string,
    lastName: string,
  ): Promise<void> {
    await this.page.locator(this.selectors.gender).check();
    await this.page
      .locator(this.selectors.password)
      .fill(process.env.PASSWORD!);
    await this.page
      .locator(this.selectors.days)
      .selectOption(user.dateofBirth.day.toString());
    await this.page
      .locator(this.selectors.months)
      .selectOption(user.dateofBirth.month.toString());
    await this.page
      .locator(this.selectors.years)
      .selectOption(user.dateofBirth.year.toString());
    await this.page.locator(this.selectors.newsletter).check();
    await this.page.locator(this.selectors.optin).check();
    await this.page.locator(this.selectors.firstName).fill(firstName);
    await this.page.locator(this.selectors.lastName).fill(lastName);
    await this.page.locator(this.selectors.company).fill(user.company);
    await this.page.locator(this.selectors.address).fill(user.address);
    await this.page.locator(this.selectors.state).fill(user.state);
    await this.page.locator(this.selectors.city).fill(user.city);
    await this.page.locator(this.selectors.zipcode).fill(user.zipcode);
    await this.page.locator(this.selectors.mobile).fill(user.mobile);
  }

  async clickCreateAccount(): Promise<void> {
    const button = this.page.locator(this.selectors.createAccount);
    await expect(button).toBeVisible();
    await button.click();
  }
}
