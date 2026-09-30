import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('user can complete checkout with two products', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const productsPage = new ProductsPage(page);
  await productsPage.addProductToCart('Sauce Labs Backpack');
  await productsPage.addProductToCart('Sauce Labs Bike Light');
  await productsPage.goToCart();

  const cartPage = new CartPage(page);
  const cartItems = await cartPage.getCartItemNames();
  expect(cartItems).toContain('Sauce Labs Backpack');
  expect(cartItems).toContain('Sauce Labs Bike Light');
  await cartPage.proceedToCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
  await checkoutPage.finishOrder();

  await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
});
