import { expect, Page } from "@playwright/test";
import { user } from "../utils/fakeUser";

export class CheckoutPage {
  // Selectors
  private readonly selectors = {
    deliveryAddress: "#address_delivery",
    billingAddress: "#address_invoice",
    name: ".address_firstname.address_lastname",
    addressLines: ".address_address1.address_address2",
    cityStateZip: ".address_city.address_state_name.address_postcode",
    country: ".address_country_name",
    mobile: ".address_phone",
    productLink: 'a[href="/product_details/1"]',
    messageTextarea: 'textarea[name="message"]',
    placeOrderButton: "a",
  } as const;

  constructor(private readonly page: Page) {}

  async verifyDeliveryAddress(
    firstName: string,
    lastName: string,
  ): Promise<void> {
    await this.verifyName(this.selectors.deliveryAddress, firstName, lastName);
    await this.verifyCompany(this.selectors.deliveryAddress, user.company);
    await this.verifyAddress(this.selectors.deliveryAddress, user.address);
    await this.verifyCityStateZip(
      this.selectors.deliveryAddress,
      user.city,
      user.state,
      user.zipcode,
    );
    await this.verifyCountry(this.selectors.deliveryAddress, "India");
    await this.verifyMobile(this.selectors.deliveryAddress, user.mobile);
  }

  async verifyBillingAddress(
    firstName: string,
    lastName: string,
  ): Promise<void> {
    await this.verifyName(this.selectors.billingAddress, firstName, lastName);
    await this.verifyCompany(this.selectors.billingAddress, user.company);
    await this.verifyAddress(this.selectors.billingAddress, user.address);
    await this.verifyCityStateZip(
      this.selectors.billingAddress,
      user.city,
      user.state,
      user.zipcode,
    );
    await this.verifyCountry(this.selectors.billingAddress, "India");
    await this.verifyMobile(this.selectors.billingAddress, user.mobile);
  }

  private async verifyName(
    selectorPrefix: string,
    firstName: string,
    lastName: string,
  ): Promise<void> {
    const nameLocator = this.page.locator(
      `${selectorPrefix} ${this.selectors.name}`,
    );
    await expect(nameLocator).toContainText(`${firstName} ${lastName}`);
  }

  private async verifyCompany(
    selectorPrefix: string,
    company: string,
  ): Promise<void> {
    const addressLines = this.page.locator(
      `${selectorPrefix} ${this.selectors.addressLines}`,
    );
    await expect(addressLines.nth(0)).toContainText(company);
  }

  private async verifyAddress(
    selectorPrefix: string,
    address: string,
  ): Promise<void> {
    const addressLines = this.page.locator(
      `${selectorPrefix} ${this.selectors.addressLines}`,
    );
    await expect(addressLines.nth(1)).toContainText(address);
  }

  private async verifyCityStateZip(
    selectorPrefix: string,
    city: string,
    state: string,
    zipcode: string,
  ): Promise<void> {
    const cityStateZipLocator = this.page.locator(
      `${selectorPrefix} ${this.selectors.cityStateZip}`,
    );
    const text = await cityStateZipLocator.innerText();
    const normalize = (str: string) =>
      str
        .replace(/\s+/g, " ")
        .replace(/\u00a0/g, " ")
        .trim();

    const actual = normalize(text);
    const expected = normalize(`${city} ${state} ${zipcode}`);
    expect(actual).toBe(expected);
  }

  private async verifyCountry(
    selectorPrefix: string,
    country: string,
  ): Promise<void> {
    const countryLocator = this.page.locator(
      `${selectorPrefix} ${this.selectors.country}`,
    );
    await expect(countryLocator).toContainText(country);
  }

  private async verifyMobile(
    selectorPrefix: string,
    mobile: string,
  ): Promise<void> {
    const mobileLocator = this.page.locator(
      `${selectorPrefix} ${this.selectors.mobile}`,
    );
    await expect(mobileLocator).toContainText(mobile);
  }

  async verifyProductDetails(productName: string): Promise<void> {
    const productLink = this.page.locator(this.selectors.productLink);
    await expect(productLink).toHaveAttribute("href", "/product_details/1");
    await expect(productLink).toHaveText(productName);
  }

  async enterDeliveryInstructions(instructions: string): Promise<void> {
    await this.page.locator(this.selectors.messageTextarea).fill(instructions);
  }

  async placeOrder(): Promise<void> {
    await this.page
      .locator(this.selectors.placeOrderButton, { hasText: "Place Order" })
      .click();
  }
}
