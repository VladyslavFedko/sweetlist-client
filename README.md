# SweetList web

React + TypeScript front-end for the SweetList API (`sweetlist-server`, branch `dev`).

**Stack:** Vite · React 18 · TypeScript · RTK Query · Formik + Zod · i18next (uk/en) · Tailwind (CSS-variable tokens) + Sass · React Router 6

## Run

```bash
cp .env.example .env        # VITE_API_URL=http://localhost:5000
npm install
npm run dev                 # http://localhost:3000
```
Backend: `docker compose up -d && npm run db:sync && npm run db:seed && npm run dev`
(demo login `olena@example.com` / `password123`). Add `http://localhost:5173` to the backend `CORS_ORIGIN`.

## Architecture (Feature-Sliced Design)

```
src/
  app/        providers, store, router (+ guards), global styles/tokens
  pages/      login, register, home, coming-soon
  widgets/    auth-shell, app-shell, recipe-library
  features/   auth-by-email, switch-language, logout, search-recipes
  entities/   session (user + token), recipe
  shared/     api (RTK Query base), config, i18n, lib, ui
```
Imports go downwards only (`app → pages → widgets → features → entities → shared`).
One accepted exception: `shared/lib/redux.ts` imports the `AppDispatch` *type* from `app`.

## React Native notes
Everything outside `ui/` folders, `app/`, and `shared/ui` is UI-agnostic (API, Zod schemas, session slice,
i18n JSON, formatters). Token persistence goes through `shared/lib/storage.ts` — provide a SecureStore-backed
implementation for mobile. `react-router`, Tailwind and the `ui` layers will be replaced there.

## Not done yet / assumptions
- Social sign-in (Google/Meta/Apple) and "continue without account" are in the design but not in the backend (README: not included yet) — omitted.
- Pastry illustration on the auth panel: export Figma node `12:10464` to `public/illustrations/pastry.svg` (panel hides it if missing).
- Home: shopping-list toggle on cards and the floating shopping dock need the `/shopping-list` slice — next step.
- Dark-theme values marked `(assumed)` in `src/app/styles/_tokens.scss` were not exposed by Figma; verify them.
- Card time shows `prepTimeMinutes` only; the design's "2 год 30 хв" may include rest time — confirm.
- Greeting uses the first word of the name (the design shows the Ukrainian vocative "Олено", which can't be derived).
- Tag chips are built from the loaded page (limit 50) and filtered client-side.
- Not compiled/run yet: my sandbox has no network, so `npm install` and `tsc` have not been executed.
