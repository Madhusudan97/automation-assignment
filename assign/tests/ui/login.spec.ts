import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login', () => {
  test('standard user can log in and reach the Products page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('locked out user sees an error and stays on the login page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.getErrorMessage()).toContainText(
      'Sorry, this user has been locked out'
    );
  });
});
