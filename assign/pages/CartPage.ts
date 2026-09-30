import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async getCartItemNames() {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async proceedToCheckout() {
    await this.page.getByTestId('checkout').click();
  }
}
