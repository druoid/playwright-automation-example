import { Page, expect } from "@playwright/test";

export class HomePage {
  private readonly selectors = {
    homeLink: 'a:has-text("Home")',
    loggedInUser: 'a:has-text("Logged in as")',
    addToCartButton:
      'div.productinfo.text-center a[data-product-id="1"].btn.btn-default.add-to-cart',
    loginLink: 'a:has-text("Login")',
  } as const;

  constructor(private readonly page: Page) {}

  async visit(): Promise<void> {
    await this.page.goto("/");
  }

  async verifyHomePageActive(): Promise<void> {
    const homeLink = this.page.locator(this.selectors.homeLink);
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute("href", "/");

    // Check if color is matching the expected color
    const color = await homeLink.evaluate((el) => getComputedStyle(el).color);
    expect(color).toMatch(/rgb\(255,\s*165,\s*0\)|orange/);
  }

  async verifyLoggedInUser(firstName: string, lastName: string): Promise<void> {
    // Assuming `firstName` and `lastName` are passed as arguments, or can be retrieved globally
    const loggedInUserLocator = this.page.locator(this.selectors.loggedInUser);
    await expect(loggedInUserLocator.locator("b")).toHaveText(
      `${firstName} ${lastName}`,
    );
  }

  async addProductToCart(): Promise<void> {
    const addToCartButton = this.page
      .locator(this.selectors.addToCartButton)
      .first();
    await addToCartButton.click();
  }

  async loginFromHomePage(): Promise<void> {
    const loginLink = this.page.locator(this.selectors.loginLink);
    await loginLink.click();
  }
}
