# SauceDemo E2E Automation

A clean end-to-end automation project using **Playwright** with **TypeScript** for the [SauceDemo](https://www.saucedemo.com) website.

## 🚀 Features
- **Page Object Model (POM)**: Maintained for code reusability.
- **TypeScript**: Typed selectors and methods.
- **Reporting**: Default Playwright HTML report.

## 📁 Folder Structure
```text
├── pages/                # Page Object Model classes
├── tests/                # Test specifications
└── playwright.config.ts  # Framework configuration
```

## 🏃 Execution
```bash
# Run all tests
npx playwright test

# Run specific test
npx playwright test login.spec.ts

# Show report
npx playwright show-report
```
