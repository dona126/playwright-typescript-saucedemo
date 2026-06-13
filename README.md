# 🧪 Playwright TypeScript — SauceDemo

Full E2E test suite for [SauceDemo](https://www.saucedemo.com) built with
Playwright, TypeScript, and POM — with GitHub Actions CI/CD.

---

## 🛠 Tech Stack

- TypeScript · Playwright · Node 18+ · POM · GitHub Actions

---

## 📁 Project Structure

```
playwright-typescript-saucedemo/
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── e2e.spec.ts
├── fixtures/
│   └── base.ts            ← custom checkoutPage fixture
├── .github/
│   └── workflows/
│       └── playwright.yml
├── playwright.config.ts
├── .env                   ← local only, gitignored
├── package.json
└── README.md
```

---

## Test Cases

### Login
| Test | Description |
|------|-------------|
| `valid login` | Valid credentials redirect to inventory page |
| `locked out user` | Locked out user sees error message |
| `wrong password` | Invalid password shows credential mismatch error |
| `empty username` | Empty username shows required field error |
| `empty password` | Empty password shows required field error |
| `both fields empty` | Both fields empty shows username required error |
| `valid login and logout` | User can login and successfully logout |

### Cart
| Test | Description |
|------|-------------|
| `add single item to cart` | Cart badge shows 1 after adding one item |
| `add multiple items to cart` | Cart badge shows 2 after adding two items |
| `remove item from cart` | Item removed from cart after clicking remove |
| `cart badge count updates` | Cart badge disappears after removing the only item from the inventory page|
| `cart persists after navigation` | Cart item persists after navigating away |

### Checkout
| Test | Description |
|------|-------------|
| `complete checkout` | Full checkout flow completes with confirmation |
| `missing first name` | Error shown when first name missing |
| `missing last name` | Error shown when last name missing |
| `missing postal code` | Error shown when postal code missing |
| `order summary correct` | Order summary shows correct item count |

### E2E
| Test | Description |
|------|-------------|
| `full e2e single item` | Login → add item → cart → checkout → confirmation |
| `full e2e multiple items` | Login → add 2 items → cart → checkout → verify total |

---

## 🏗 POM Design

| File | Responsibility |
|---|---|
| `LoginPage.ts` | Login form, logout |
| `InventoryPage.ts` | Add/remove items from product list, cart badge |
| `CartPage.ts` | View cart, remove items, proceed to checkout |
| `CheckoutPage.ts` | Fill details, submit order, confirm order |
| `fixtures/base.ts` | Custom `checkoutPage` fixture — login + add item + navigate to checkout |

---

## ⚙️ Setup & Run

```bash
git clone https://github.com/dona126/playwright-typescript-saucedemo.git
cd playwright-typescript-saucedemo
npm install
npx playwright install
```

---

## 🔐 Environment Variables

Create `.env` in root:

```
BASE_URL=https://www.saucedemo.com
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
```

---

### Local (VS Code)

```bash
# all tests
npx playwright test

# single spec
npx playwright test tests/login.spec.ts

# single browser
npx playwright test --project=chromium

# multi browser
npx playwright test --project=chromium --project=firefox --project=webkit

# view report
npx playwright show-report
```

---

## 🔁 CI/CD

[![Playwright Tests](https://github.com/dona126/playwright-typescript-saucedemo/actions/workflows/playwright.yml/badge.svg)](https://github.com/dona126/playwright-typescript-saucedemo/actions/workflows/playwright.yml)

- Runs on every push and pull request to `main`
- Can be triggered manually from Actions tab
- Runs across **Chromium, Firefox, WebKit**
- Screenshots + videos auto-captured on failure

---

### GitHub Secrets Required

`Repo → Settings → Secrets and variables → Actions`

| Secret Name | Description |
|---|---|
| `BASE_URL` | SauceDemo base URL |
| `SAUCE_USERNAME` | SauceDemo login username |
| `SAUCE_PASSWORD` | SauceDemo login password |

---

## 📊 Test Reports

- HTML report auto-generated on every CI run
- Screenshots + videos captured on failure
- Download from: `Actions → your run → Artifacts`

| Artifact | Contents |
|---|---|
| `playwright-report` | HTML report + screenshots + videos |

View locally:
```bash
npx playwright show-report
```

---

## 🌐 Browsers Tested

| Browser | Local | CI |
|---|---|---|
| Chromium | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| WebKit | ✅ | ✅ |