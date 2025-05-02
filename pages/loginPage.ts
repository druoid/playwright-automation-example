import { Page } from '@playwright/test';

interface User {
  name: string;
  lastName: string;
  email?: string;
}

export class LoginPage {
  constructor(private page: Page) {}

  async registerUser(user: User): Promise<{ firstName: string; lastName: string }> {
    const fullName = `${user.name} ${user.lastName}`;
    await this.page.locator('input[data-qa="signup-name"]').fill(fullName);
    await this.page.locator('input[data-qa="signup-email"]').fill(user.email ?? '');
    await this.page.locator('button[data-qa="signup-button"]').click();

    // Return names instead of using aliases
    return {
      firstName: user.name,
      lastName: user.lastName,
    };
  }
}