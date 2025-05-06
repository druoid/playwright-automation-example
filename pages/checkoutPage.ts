import { expect, Page } from "@playwright/test";
import { user } from "../utils/fakeUser";

export class CheckoutPage {
  constructor(private page: Page) {}

  private async verifyAddress(
    selectorPrefix: string,
    firstName: string,
    lastName: string,
    user: User,
  ) {
    // Name
    const nameLocator = this.page.locator(
      `${selectorPrefix} .address_firstname.address_lastname`,
    );
    await expect(nameLocator).toContainText(`${firstName} ${lastName}`);

    // Company
    const addressLines = this.page.locator(
      `${selectorPrefix} .address_address1.address_address2`,
    );
    await expect(addressLines.nth(0)).toContainText(user.company);

    // Address
    await expect(addressLines.nth(1)).toContainText(user.address);

    // City, State, Zip
    const cityStateZipLocator = this.page.locator(
      `${selectorPrefix} .address_city.address_state_name.address_postcode`,
    );
    const text = await cityStateZipLocator.innerText();
    const normalize = (str: string) =>
      str
        .replace(/\s+/g, " ")
        .replace(/\u00a0/g, " ")
        .trim();

    const actual = normalize(text);
    const expected = normalize(`${user.city} ${user.state} ${user.zipcode}`);
    expect(actual).toBe(expected);

    // Country
    const countryLocator = this.page.locator(
      `${selectorPrefix} .address_country_name`,
    );
    await expect(countryLocator).toContainText("India");

    // Mobile
    const mobileLocator = this.page.locator(`${selectorPrefix} .address_phone`);
    await expect(mobileLocator).toContainText(user.mobile);
  }

  async verifyDeliveryAddress(firstName: string, lastName: string) {
    await this.verifyAddress(
      "#address_delivery",
      firstName ?? "",
      lastName ?? "",
      user,
    );
  }

  async verifyBillingAddress(firstName: string, lastName: string) {
    await this.verifyAddress(
      "#address_invoice",
      firstName ?? "",
      lastName ?? "",
      user,
    );
  }

  async reviewOrder(productName: string) {
    const productLink = this.page.locator('a[href="/product_details/1"]');
    await expect(productLink).toHaveAttribute("href", "/product_details/1");
    await expect(productLink).toHaveText(productName);
  }

  async enterDescriptionAndPlaceOrder() {
    await this.page
      .locator('textarea[name="message"]')
      .fill("Please deliver between 9 AM to 5 PM");
    await this.page.locator("a", { hasText: "Place Order" }).click();
  }
}
