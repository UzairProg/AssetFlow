**AssetFlow — Enterprise Asset & Operations Platform**

A full-featured asset management and operations platform scaffolded as a Vite + React (TypeScript) frontend with an Express/Prisma backend. This repository contains two top-level apps:
- Frontend: a modern SPA built with React, TailwindCSS and utility components.
- Backend: an Express server with Prisma schema and controllers for core API routes.

This README explains project goals, architecture, how to run both apps locally, useful file locations, and development notes to make the project ready for realtime-like local CRU(D) operations while the backend is being prepared.

**Table Of Contents**
- **Project**: short overview and goals
- **Architecture**: layout and where to find code
- **Features**: frontend + backend highlights
- **Quick Start**: run frontend and backend locally
- **Realtime / Offline Mode**: local store and BroadcastChannel
- **API & Data**: endpoints and Prisma seed
- **Development Workflow**: linting, formatting, tests
- **Roadmap**: next steps and improvements
- **Contributing** and **Contact**

**Project**
- **Purpose**: AssetFlow is an enterprise-grade UI for managing assets, bookings, audits, maintenance, allocations, and organization-level admin. It provides a polished UI shell with global UX primitives (toasts, confirm dialogs, command palette) and a rich set of pages/components to be wired to a backend.
- **Scope**: The frontend contains feature scaffolds for Audit, Booking, Allocation, Maintenance, Insights, Administration and more. The backend contains controllers and routes and a Prisma schema scaffold to support these areas.

**Architecture**
- **Frontend app**: [Frontend](Frontend)
  - Key folders:
    - **components**: reusable UI blocks and feature components
    - **pages**: route-level pages (audit, booking, administration, insights, etc.)
    - **context**: application contexts such as `RealtimeContext` for local CRUD persistence ([Frontend/src/context/RealtimeContext.tsx](Frontend/src/context/RealtimeContext.tsx))
    - **layouts**: `DashboardLayout` and app shell components
    - **lib**: small utilities (demo auth helpers, navigation helpers)
  - Built with: React + TypeScript, Tailwind CSS, Framer Motion for micro-interactions.

- **Backend app**: [Backend](Backend)
  - Key folders:
    - **src/controllers**: REST controllers for each domain (booking, audit, allocation, transfer, maintenance, notification, report, activity-log)
    - **src/routes**: express routes wired to controllers
    - **prisma**: `schema.prisma` and `seed.js` for initial data
  - Built with: Node.js + Express, Prisma ORM

**Features**
- **Frontend**
  - Global UX providers: Toasts, Confirm dialog, Command Palette, Help Drawer, AppShell
  - Enterprise-styled components: cards, tables, timelines, wizards, verification tools
  - Placeholder pages converted to editable CRUD-ready UIs that persist locally while backend is offline (see Realtime section)
  - Accessibility and keyboard-first small UX features integrated

- **Backend**
  - Controllers for major domains: booking, audit, allocation, transfer, maintenance, notifications, reports, activity logs
  - Prisma schema and seed script for initial demo data

**Quick Start**
Prerequisites: Node.js (16+ recommended), npm or pnpm

- Run the frontend

```bash
cd Frontend
npm install
npm run dev
```

- Run the backend (API)

```bash
cd Backend
npm install
# start dev server (script name may vary)
npm run dev
```

Note: If you use `pnpm` or `yarn`, replace `npm` with your package manager of choice.

**Environment variables**
- Backend commonly expects DB connection info for Prisma and optional secrets. Check and create a `.env` in `Backend` with keys similar to:

```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/assetflow_db"
PORT=4000
```

Adjust the connection string to your local database. See [Backend/prisma/schema.prisma](Backend/prisma/schema.prisma) for the database models.

**Realtime / Offline Mode (Frontend)**
- While the backend is not ready or to enable demo/demo-user workflows, the frontend provides a local realtime-like persistence layer:
  - `RealtimeContext` uses `localStorage` to persist entities and `BroadcastChannel` to sync updates across browser tabs.
  - This enables immediate create, read, update and delete (CRUD) operations in the UI that feel realtime to the user and persist across reloads.
  - File: [Frontend/src/context/RealtimeContext.tsx](Frontend/src/context/RealtimeContext.tsx)

Usage notes
- The local store is implemented as a fallback: when API endpoints are available, the app will prefer backend CRUD. When the backend is unavailable or while developing, the frontend uses the local store automatically so the UI stays fully interactive and realistic.

**API & Data**
- Controllers present in the backend (brief overview):
  - **booking**: booking.controller.js + booking.routes.js — endpoints to create/list/update bookings
  - **audit**: audit.controller.js + audit.routes.js — audit cycles, results, verification
  - **allocation**: allocation.controller.js + allocation.routes.js — asset allocations and transfers
  - **transfer**: transfer.controller.js + transfer.routes.js — transfer lifecycle
  - **maintenance**: maintenance.controller.js + maintenance.routes.js — maintenance requests and work orders
  - **notification**: notification.controller.js + notification.routes.js — push/notification-like APIs
  - **report**: report.controller.js + report.routes.js — report generation endpoints
  - **activity-log**: activity-log.controller.js + activity-log.routes.js — user & system activity

- Example endpoints (typical REST style):
  - `GET /api/bookings`
  - `POST /api/bookings`
  - `GET /api/audits`
  - `POST /api/allocations`

- Seed data and Prisma
  - Schema: [Backend/prisma/schema.prisma](Backend/prisma/schema.prisma)
  - Seed script: [Backend/prisma/seed.js](Backend/prisma/seed.js)
  - To apply migrations and seed (if using Postgres):

```bash
cd Backend
npx prisma migrate dev --name init
node prisma/seed.js
```

If you prefer to run without a DB, the frontend local store enables full demo flows.

**Development Workflow**
- Linting: `npm run lint` (run from `Frontend` and `Backend` where configured)
- Formatting: use `prettier` if available (not mandatory but recommended)
- TypeScript: frontend is TypeScript (Vite), keep `tsconfig.json` in sync when adding new paths

Recommended steps for a feature branch
- Create a branch: `git checkout -b feat/<short-description>`
- Implement components inside `Frontend/src/components/<feature>` and pages inside `Frontend/src/pages/<feature>`
- Add API contracts in `Backend/src/routes` and implement controllers in `Backend/src/controllers`
- Run `npm run lint` and `npm run build` locally before opening a PR

**Testing**
- There are no dedicated test suites committed in this repo by default. Add unit / integration tests under `Frontend/src/__tests__` or `Backend/src/__tests__` as needed and wire up `npm test` scripts.

**Roadmap & Next Steps**
- Wire frontend feature pages to live backend endpoints and replace local fallback with real API calls.
- Convert table scaffolds to TanStack Table with server-side pagination and sorting.
- Add React Hook Form + Zod validation to all wizard/form flows (AuditWizard, Booking forms, Settings)
- Replace Chart placeholders with Recharts + animated transitions
- Add authentication (JWT or OAuth) in backend and secure frontend routes

**Contributing**
- Feel free to open issues or PRs. Keep changes small and focused. Document architectural decisions and API changes in the PR description.

**Contact & Maintainers**
- Repository: UzairProg/AssetFlow
- Code owner: check repository collaborators for primary contacts

**License**
- This repository does not include a license file by default — add a `LICENSE` if you plan to publish or share publicly.

Thanks for trying AssetFlow — if you'd like, I can now:
- Wire the realtime store into more placeholder pages so they support Indian demo data and full CRUD flows.
- Add seed/demo data with Indian names to the frontend local store and backend seed file.

**Start & Stop Guide**

Follow these commands to start, build, and stop the apps locally.

- Frontend (development)

```bash
cd Frontend
npm install
npm run dev        # start Vite dev server (hot reload)
```

Stop: press Ctrl+C in the terminal running `npm run dev`.

- Frontend (production build)

```bash
cd Frontend
npm install
npm run build      # produce static assets in dist/
npm run preview    # serve the production build locally (optional)
```

- Backend (development)

```bash
cd Backend
npm install
# ensure .env exists with DATABASE_URL and PORT
npm run dev        # runs nodemon or the configured dev script
```

Stop: press Ctrl+C in the terminal running the backend process.

- Backend (run migrations & seed)

```bash
cd Backend
npx prisma migrate dev --name init
node prisma/seed.js
```

- Backend (production)

```bash
cd Backend
npm install --production
node src/server.js   # or use a process manager (pm2/systemd) to run
```

**Switching Frontend from Local Store to Backend**

When the backend API is available, the frontend will prefer live API calls. To point the frontend to your local API server:

1. Set the API base URL in the frontend environment file (create `.env` in `Frontend` if absent):

```ini
VITE_API_BASE_URL=http://localhost:4000/api
```

2. Re-start the frontend dev server:

```bash
npm run dev
```

3. Optionally clear the local demo store if you want a clean sync:

```js
localStorage.removeItem('realtime_store')
```

The Realtime fallback will detect API availability and begin using real endpoints when reachable.

**Common Issues & Troubleshooting**

- Port conflict: if the frontend or backend port is already used, edit the dev script or set `PORT` in `.env` for the backend and `VITE_PORT` for the frontend.
- CORS errors: ensure the backend allows the frontend origin (dev: `http://localhost:5173`) or enable permissive CORS for local development.
- Prisma errors: if migrations fail, verify `DATABASE_URL` is correct and the DB is reachable. Use `npx prisma studio` to inspect data.
- Local store out-of-sync: clear `localStorage` (`localStorage.clear()` in dev tools) or open a new tab; `BroadcastChannel` sync may take milliseconds.

If you want, I can now wire Indian demo data into the frontend local store and update the backend `prisma/seed.js` with matching sample data.
