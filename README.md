# CareRoute

An Angular medical-travel coordination website with an Express API for general enquiries.

## Stack

- Angular 20 and TypeScript frontend
- Node.js 22.13+ and Express 5 API
- SQLite persistence using `better-sqlite3`
- Zod request validation, Helmet security headers, CORS allowlist and API rate limiting

## Architecture

The Angular client is organized by feature. `client/src/app/features/home/` owns the home sections; `catalog/`, `content/`, `search/`, and `enquiries/` own their routed views and workflows. A shared shell keeps navigation and footer persistent across routes. The home feature is lazy-loaded, pages use route resolvers and required signal inputs, and static presentation components use `OnPush`. Shared API contracts and the HTTP service live under `client/src/app/core/`.

Each page/component keeps its `.ts`, `.html`, and `.css` together in a named folder (for example `features/home/hero-section/`). Feature-level page orchestrators and resolvers stay at the feature root; shared models/services stay in `core/`.

All user-visible page copy, navigation labels, contact details, care-area options, validation messages and FAQ content are maintained in `server/src/data/homepage.json`. The client loads that document from `GET /api/v1/content/homepage` through a typed API service and root-route resolver. Catalog and informational-page records are in `server/src/data/portal-catalog.json` and are read through a repository. Enquiries are sent to `POST /api/v1/enquiries`; the API validates the request and persists accepted enquiries through a repository.

## Run locally

From the project root:

```sh
npm install
npm install --prefix server
npm install --prefix client
npm run dev
```

Open `http://localhost:4200`. The Angular development server forwards `/api` requests to `http://localhost:3000`. Enquiries are stored in `server/data/enquiries.sqlite`.

## GitHub Pages

The site URL is `https://niranjansosvns.github.io/careroute/` and uses the `/careroute/` base path. The static build bundles homepage and catalog JSON, so navigation, directories, detail pages and search work without Express. Run `npm run build:github-pages`; the deployable artifact is `client/dist/client/browser` and includes a `404.html` SPA fallback.

`.github/workflows/ci.yml` runs build/tests for pushes and pull requests, then deploys Pages for pushes to `main` or `master`. In repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. Static Pages cannot deliver email silently; its enquiry form opens an email draft for the visitor to review and send.

The API exposes `GET /api/health`, `GET /api/v1/content/homepage`, `GET /api/v1/navigation`, `GET /api/v1/catalog/:collection`, `GET /api/v1/catalog/:collection/:slug`, `GET /api/v1/pages/:slug`, `GET /api/v1/search?q=...`, and `POST /api/v1/enquiries`. Catalog collections include treatments, procedures, treatment costs, hospitals, doctors, services, destinations and resources. Set `CLIENT_ORIGIN` to the deployed frontend origin (comma-separated for multiple origins) and `DATABASE_PATH` to a persistent database path before deployment. See `server/.env.example` for the available settings.

### Email notifications

When using Express hosting, enquiry emails are sent through SMTP to `niranjanverma@aol.com` by default. Copy `server/.env.example` to `server/.env` locally and set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD` (use your provider's app password), and `SMTP_FROM`. `ENQUIRY_NOTIFICATION_TO` can override the recipient. Never commit SMTP credentials. GitHub Pages instead uses an email-draft handoff and requires no SMTP secrets.

### GitHub Actions

`.github/workflows/ci.yml` runs the static Pages build, Angular unit tests and Express API tests on pushes to `main`/`master` and pull requests, and deploys the static artifact to GitHub Pages on those branch pushes. GitHub Pages does not host the Express API or persistent SQLite data.

## Checks

```sh
npm run build
npm --prefix client test -- --watch=false
npm --prefix server test
```

## Privacy and production

The sample enquiry form accepts contact details and a broad care category only. It does not accept medical-record uploads or passport details. The optional message field is limited to 500 characters; users are asked not to include clinical details. The local API does not provide an authenticated admin interface, encryption-at-rest configuration, retention/deletion workflow, or production hosting safeguards. Add those controls and have privacy/security requirements reviewed before collecting real patient information.

Hospital and clinician directory records are fictional demo data, and cost pages deliberately do not publish invented prices. Replace the CareRoute sample brand, contact details, directory records, informational copy and imagery with reviewed, approved data before launch.