# QA Automation Assignment

Playwright + TypeScript test suite covering the requested UI scenarios on SauceDemo and API scenarios on ReqRes.

## Setup

```bash
npm install
npx playwright install chromium
```

## Run all tests

```bash
npm test
```

## Run UI tests only

```bash
npm run test:ui
```

## Run API tests only

```bash
npm run test:api
```

## View the HTML report

```bash
npm run test:report
```

## What is covered

### UI

- Standard user can log in and reach the Products page.
- Locked-out user sees the expected error and remains on the login page.
- Adding two products updates the cart badge to `2`.
- User can complete checkout and see the order confirmation.
- Products can be sorted by Price (low to high), with the cheapest product shown first.

### API

- `GET /api/users?page=2` returns status `200` and the expected user fields.
- `POST /api/users` returns status `201` and the expected response fields.
- The POST response also demonstrates the create-then-verify assertion using the returned `id` and `createdAt` values. ReqRes does not persist created users, so no follow-up GET is made.

## Structure

```text
pages/          Page objects for UI flows
  LoginPage.ts
  ProductsPage.ts
  CartPage.ts
  CheckoutPage.ts

tests/ui/       UI tests
tests/api/      API tests
playwright.config.ts
package.json
```

The suite is intentionally small and focused on the assignment. No CI, Docker, cross-browser setup, or additional framework layers were added because they were outside the scope of the two-hour time-box.
