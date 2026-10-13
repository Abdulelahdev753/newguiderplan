# Guiderplan

npm workspaces monorepo.

| Path              | What                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| `apps/web`        | Next.js 16 (App Router, static export), React 19, Tailwind 4, TS 5.9 |
| `apps/api`        | Express 5 on Node 24, TS 6 — serves `/api` and the exported frontend |
| `packages/shared` | Types shared by both apps                                            |

## Commands

Run from the repo root (Node 24+).

| Command             | What it does                                                         |
| ------------------- | -------------------------------------------------------------------- |
| `npm install`       | Install everything                                                   |
| `npm run dev`       | Web on http://localhost:3000, API on http://localhost:4000           |
| `npm run build`     | Build shared, export the frontend to `apps/web/out`, compile the API |
| `npm start`         | Serve the built frontend and the API from one origin (port 4000)     |
| `npm run typecheck` | Type-check all workspaces                                            |
| `npm run lint`      | Lint both apps                                                       |
| `npm run format`    | Format with Prettier                                                 |

## Structure

```
apps/web/src
  app/          routes, layouts
  components/   shared UI
  features/     feature modules (UI + hooks + logic per feature)
  lib/          api client, helpers

apps/api/src
  config/       env parsing
  routes/       URL -> controller
  controllers/  HTTP in/out
  services/     business logic
  middleware/   error handling, 404, static frontend
  lib/          helpers
  app.ts        builds the Express app
  server.ts     starts it
```

API config lives in `apps/api/.env` (see `.env.example`).
