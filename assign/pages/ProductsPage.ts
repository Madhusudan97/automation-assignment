import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async addProductToCart(productName: string) {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async sortBy(option: string) {
    await this.page.getByTestId('product-sort-container').selectOption(option);
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.page.getByTestId('inventory-item-price').allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }

  async goToCart() {
    await this.page.getByTestId('shopping-cart-link').click();
  }

  get cartBadge() {
    return this.page.getByTestId('shopping-cart-badge');
  }
}
