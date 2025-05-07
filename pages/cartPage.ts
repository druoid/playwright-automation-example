import { expect, Page } from "@playwright/test";

/**
 * Page object representing the Shopping Cart page
 * This page handles all cart-related interactions and verifications
 */
export class CartPage {
  // Selectors
  private readonly selectors = {
    cartLink: 'a[href="/view_cart"]',
    navCartLink: 'ul.nav.navbar-nav a[href="/view_cart"]',
    checkoutButton: "a.check_out",
    loginLink: '.modal-body a[href="/login"]',
    cartPageLink: "a",
  } as const;

  constructor(private readonly page: Page) {}

  /**
   * Navigates to cart from the modal dialog
   */
  async viewCartFromModal(): Promise<void> {
    await this.page
      .locator(this.selectors.cartLink, { hasText: "View Cart" })
      .click();
  }

  /**
   * Navigates to cart from the navigation bar
   */
  async viewCartFromNav(): Promise<void> {
    await this.page.locator(this.selectors.navCartLink).click();
  }

  /**
   * Verifies that the checkout button is visible and contains the expected text
   */
  async verifyCheckoutButton(): Promise<void> {
    const checkoutButton = this.page.locator(this.selectors.checkoutButton);
    await expect(checkoutButton).toContainText("Proceed To Checkout");
  }

  /**
   * Clicks the checkout button
   */
  async proceedToCheckout(): Promise<void> {
    await this.verifyCheckoutButton();
    await this.page.locator(this.selectors.checkoutButton).click();
  }

  /**
   * Verifies that the login link is visible and contains the expected text
   */
  async verifyLoginLink(): Promise<void> {
    const loginLink = this.page.locator(this.selectors.loginLink);
    await expect(loginLink).toContainText("Register / Login");
  }

  /**
   * Clicks the login link from the checkout modal
   */
  async clickOnLoginFromCheckoutModal(): Promise<void> {
    await this.verifyLoginLink();
    await this.page.locator(this.selectors.loginLink).click();
  }

  /**
   * Verifies the cart page elements and styling
   */
  async verifyCartPage(): Promise<void> {
    const cartLink = this.page.locator(this.selectors.cartPageLink, {
      hasText: "Cart",
    });

    // Verify cart link visibility and attributes
    await expect(cartLink).toBeVisible();
    await expect(cartLink).toHaveAttribute("href", "/view_cart");

    // Verify cart link color
    const color = await cartLink.evaluate((el) => getComputedStyle(el).color);
    expect(color).toMatch(/orange|rgb\(255,\s*165,\s*0\)/);
  }
}
