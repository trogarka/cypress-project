# Cypress Test Automation Project for eshop

This project contains automated tests for the NAY.sk e-commerce platform using Cypress.

## Project Overview

This test suite covers various e-commerce functionalities including:
- User authentication
- Product browsing and search
- Shopping cart operations
- Account management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

https://hptronic.atlassian.net/wiki/spaces/TEST/pages/4119035956/AT+-+Cypress 

## Running Tests

### Open Cypress Test Runner (Chrome) and PROD enviroment
```bash
npm run test:prod
```

### Open Cypress Test Runner (Chrome) and RC enviroment
```bash
npm run test:rc
```

### Run Cypress Tests from GitLab CI/CD

Build -> Pipelines -> New Pipeline -> master (branch) -> Input variable value -> New Pipeline

###### Deploy pipeline expects 1 variable:
```console
TEST_JOB (possible values: nay_tests_beta, nay_tests_rc, nay_prod)
```

## Project Structure

```
cypress/
├── data/               # Test data (users, products, etc.)
├── e2e/                # Test files
│   ├── desktop/        # Desktop-specific tests
│   └── skip/           # Non-running Tests 
├── pages/              # Page Object Models
└── support/            # Support files and commands
```

## Key Concepts for New Testers

### Page Object Model (POM)
We use the Page Object pattern to make our tests more maintainable:
- Each page has its own object/module (e.g., `login-menu.ts`, `product-detail-page.ts`)
- Page objects contain element selectors and common actions
- This makes tests easier to update when the UI changes

Example: Instead of writing selectors in tests, we use methods from page objects:
```typescript
// Using a page object
loginPage.loginUser('testUser');

// Instead of writing raw selectors in tests
cy.get('#username').type('testUser');
```

### Test Data Management
We keep test data separate from test logic:
- `data/users_data.ts` - Test user credentials
- `data/regions_data.ts` - Region information
- This makes it easy to update test data without changing test logic

### Environment Support
Tests can run in different environments:
- Production: nay.sk
- RC: Release Candidate for final testing
- Beta: For testing new features

## Best Practices
1. Use page objects for element selectors
2. Keep test data separate from test logic
3. Write descriptive test names that explain the business scenario
4. Use custom commands for common actions

## Need Help?
- Check the `e2e/desktop` directory for test examples
- Review page objects in `pages/` to understand how to interact with elements
- Refer to [Cypress Documentation](https://docs.cypress.io) for detailed guides
