# Playwright Test Suite — Automation Exercise

Full Page Object Model (POM) implementation covering the 26 official test
cases from [automationexercise.com/test_cases](https://automationexercise.com/test_cases).

## Structure

```
pages/         One class per page/feature (locators + actions only)
tests/         One spec file per feature area
test-data/     Shared helpers: unique user generation, full registration flow
```

## Setup

```bash
npm install
npx playwright install
```

## Run

```bash
npm test                # all tests, headless
npm run test:headed     # watch it run
npm run test:report     # view last HTML report
npx playwright test tests/order.spec.js -g "Test Case 16"   # one test
```

## Test Case Coverage (26/26)

| # | Test Case | File |
|---|-----------|------|
| 1 | Register User | register-user.spec.js |
| 2 | Login (correct) | login-user.spec.js |
| 3 | Login (incorrect) | login-user.spec.js |
| 4 | Logout User | logout-user.spec.js |
| 5 | Register (existing email) | register-user.spec.js |
| 6 | Contact Us Form | contact-us.spec.js |
| 7 | Test Cases Page | test-cases-page.spec.js |
| 8 | Product & Detail Page | products-details.spec.js |
| 9 | Search Product | search-product.spec.js |
| 10 | Subscription (home) | subscription.spec.js |
| 11 | Subscription (cart) | subscription.spec.js |
| 12 | Add Products to Cart | cart.spec.js |
| 13 | *(quantity — not yet implemented)* | — |
| 14 | Register while Checkout | order.spec.js |
| 15 | Register before Checkout | order.spec.js |
| 16 | Login before Checkout | order.spec.js |
| 17 | Remove from Cart | cart.spec.js |
| 18 | View Category Products | category-page.spec.js |
| 19 | View & Cart Brand Products | category-page.spec.js |
| 20 | Search + Cart After Login | search-product.spec.js |
| 21 | Add Product Review | products-details.spec.js |
| 22 | Recommended Items | cart.spec.js |
| 23 | Verify Address Details | order.spec.js |
| 24 | Download Invoice | order.spec.js |
| 25 | Scroll Up (arrow) | arrow-button.spec.js |
| 26 | Scroll Up (no arrow) | arrow-button.spec.js |

## Key patterns used throughout

- **Every test creates its own account** via `test-data/registerUser.js` —
  no test depends on another test's leftover state; each is independently
  runnable and re-runnable.
- **Dialog handling**: `page.once('dialog', ...)` registered *before* the
  triggering click (see `ContactPage.submitForm()`).
- **File downloads**: `page.waitForEvent('download')` paired with the
  triggering click via `Promise.all` (see `OrderPage.downloadInvoice()`).
- **Hover-dependent UI**: product "Add to cart" overlays require
  `.hover()` before the click is reachable.
- **`data-product-id` vs. list position**: methods that take a real DOM id
  are named accordingly (`removeProductFromCart(productId)`), separate from
  methods that take a list position (`addProductToCart(index)`).

## Known gaps / next steps

- TC13 (verify quantity in cart) not yet implemented
- Payment-page and checkout-address selectors (`OrderPage.js`) are based on
  this site's `data-qa` convention but haven't been independently
  re-verified against live DevTools since the last refactor — recommended
  before relying on them further
- No CI pipeline yet (GitHub Actions) — natural next addition
