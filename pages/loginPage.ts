import { Page } from "@playwright/test";

interface User {
  name: string;
  lastName: string;
  email: string;
}

export class LoginPage {
  private readonly selectors = {
    signupName: 'input[data-qa="signup-name"]',
    signupEmail: 'input[data-qa="signup-email"]',
    signupButton: 'button[data-qa="signup-button"]',
  } as const;

  constructor(private readonly page: Page) {}

  async registerUser(
    user: User,
  ): Promise<{ firstName: string; lastName: string }> {
    const fullName = `${user.name} ${user.lastName}`;
    await this.page.locator(this.selectors.signupName).fill(fullName);
    await this.page.locator(this.selectors.signupEmail).fill(user.email);
    await this.page.locator(this.selectors.signupButton).click();

    return {
      firstName: user.name,
      lastName: user.lastName,
    };
  }
}
