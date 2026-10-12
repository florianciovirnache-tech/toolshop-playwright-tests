# Toolshop Playwright Tests

![Playwright Tests](https://github.com/florianciovirnache-tech/toolshop-playwright-tests/actions/workflows/playwright.yml/badge.svg)

End-to-end and API test automation for [Practice Software Testing (Toolshop)](https://github.com/testsmith-io/practice-software-testing), a demo e-commerce application with an Angular frontend and a Laravel REST API.

The application under test runs locally in Docker, both on my machine and in CI, so the tests always run against a clean, known state.

## Tech stack

- [Playwright](https://playwright.dev/) with TypeScript
- Page Object Model for UI tests
- Playwright `request` API for REST API tests
- Docker / Docker Compose for the test environment
- GitHub Actions for CI (cross-browser: Chromium, Firefox, WebKit)

## Test coverage

**UI**

- Home page loads with the correct title
- Login with valid credentials redirects to the account page
- Login with invalid credentials shows an error and stays on the login page

**API**

- `POST /users/login` returns a bearer token for valid credentials
- `POST /users/login` returns `401 Unauthorized` for invalid credentials

## Project structure

```
pages/              Page Objects (e.g. LoginPage)
tests/ui/           UI tests (browser)
tests/api/          API tests (no browser)
scripts/            Helper scripts (start the local test environment)
.github/workflows/  CI pipeline
```

## Running the tests locally

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Git

### 1. Clone both repositories side by side

```
git clone https://github.com/florianciovirnache-tech/toolshop-playwright-tests.git
git clone https://github.com/testsmith-io/practice-software-testing.git
```

### 2. Start the application

On Windows (PowerShell), from the `toolshop-playwright-tests` folder:

```
.\scripts\start-toolshop.ps1
```

The script starts the containers, seeds the database with fresh test data and fixes file permissions inside the API container.

The app is then available at:

- UI: http://localhost:4200
- API: http://localhost:8091

### 3. Install dependencies and run the tests

```
npm ci
npx playwright install
npx playwright test
```

Useful variants:

```
npx playwright test --project=chromium   # one browser only
npx playwright test tests/api            # API tests only
npx playwright test --ui                 # interactive UI mode
npx playwright show-report               # open the last HTML report
```

## CI pipeline

On every push and pull request, GitHub Actions:

1. Checks out this repository and the Toolshop application
2. Sets up QEMU (the Toolshop Docker images are built for ARM only)
3. Starts the application with Docker Compose and seeds the database
4. Waits until the API and UI respond
5. Runs the Playwright suite on Chromium, Firefox and WebKit
6. Uploads the HTML report as an artifact, and dumps container diagnostics if anything fails
7. The same suite also runs in a local Jenkins pipeline (see `Jenkinsfile`), triggered automatically on new commits.

## Roadmap

- More UI flows: product search, cart and checkout
- More API tests: products, cart, authenticated endpoints
- Separate Playwright project for API tests
- Jenkins pipeline alongside GitHub Actions

## Author

Florian Ciovirnache, QA Engineer
[LinkedIn](https://www.linkedin.com/in/florian-ciovirnache)
