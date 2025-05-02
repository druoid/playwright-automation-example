import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async viewCartFromModal() {
    await this.page.locator('a[href="/view_cart"]', { hasText: 'View Cart' }).click();
  }

  async viewCartFromNav() {
    await this.page.locator('ul.nav.navbar-nav a[href="/view_cart"]').click();
  }

  async proceedToCheckout() {
    const checkoutButton = this.page.locator('a.check_out');
    await expect(checkoutButton).toContainText('Proceed To Checkout');
    await checkoutButton.click();
  }

  async clickOnLoginFromCheckoutModal() {
    const loginLink = this.page.locator('.modal-body a[href="/login"]');
    await expect(loginLink).toContainText('Register / Login');
    await loginLink.click();
  }

  async verifyCartPage() {
    const cartLink = this.page.locator('a', { hasText: 'Cart' });
    await expect(cartLink).toBeVisible();
    await expect(cartLink).toHaveAttribute('href', '/view_cart');

    const color = await cartLink.evaluate((el) => getComputedStyle(el).color);
    // Check for orange color (named or rgb)
    expect(color).toMatch(/orange|rgb\(255,\s*165,\s*0\)/);
  }
}
