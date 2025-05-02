import { Page, expect } from '@playwright/test';

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto('/');
  }

  async verifyHomePageActive() {
    const homeLink = this.page.locator('a:has-text("Home")');
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('href', '/');
    
    // Check if color is matching the expected color
    const color = await homeLink.evaluate(el => getComputedStyle(el).color);
    expect(color).toMatch(/rgb\(255,\s*165,\s*0\)|orange/);
  }

  async verifyLoggedInUser(firstName: string, lastName: string) {
    // Assuming `firstName` and `lastName` are passed as arguments, or can be retrieved globally
    const loggedInUserLocator = this.page.locator('a:has-text("Logged in as")');
    await expect(loggedInUserLocator.locator('b')).toHaveText(`${firstName} ${lastName}`);
  }

  async addProductToCart() {
    const addToCartButton = this.page.locator('div.productinfo.text-center a[data-product-id="1"].btn.btn-default.add-to-cart').first();
    await addToCartButton.click();
  }

  async loginFromHomePage() {
    const loginLink = this.page.locator('a:has-text("Login")');
    await loginLink.click();
  }
}

