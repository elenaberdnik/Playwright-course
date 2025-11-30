import { BasePage } from './BasePage.js';
import { SignupPopup } from './SignupPopup.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/';
    this.signupButton = page.getByRole('button', { name: 'Sign up' });
  }

  async open() {
    await this.goTo(this.url); 
  }

  async openSignupPopup() {
    await this.signupButton.click();
    return new SignupPopup(this.page);
  }
}
