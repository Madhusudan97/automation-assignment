import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Products', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('adding two products updates the cart badge to 2', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    await expect(productsPage.cartBadge).toHaveText('2');
  });

  test('sorting by Price low to high puts the cheapest item first', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('lohi');

    const prices = await productsPage.getProductPrices();
    expect(prices[0]).toBe(Math.min(...prices));
  });
});
