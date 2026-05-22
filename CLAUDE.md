# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Turbopack, outputs to .next/dev)
npm run build    # Production build (Turbopack by default)
npm run start    # Start production server
npm run lint     # Run ESLint directly (next lint is removed in v16)
npm test         # Run Vitest in watch mode
npm test -- --run  # Run Vitest once (CI)
```

## Architecture

Next.js 16 App Router project with TypeScript and Tailwind CSS v4.

- **`app/`** — App Router file-system routing. `layout.tsx` is the root layout (required); `page.tsx` files define routes.
- **`app/globals.css`** — Global styles using Tailwind v4's `@import "tailwindcss"` syntax (not `@tailwind` directives).
- **`public/`** — Static assets served from `/`.
- **`@/*`** path alias maps to the repo root (configured in `tsconfig.json`).

## Next.js 16 breaking changes to know

Always read `node_modules/next/dist/docs/` before writing Next.js-specific code.

Key breaks from v15→v16 relevant to day-to-day coding:

- **Async Request APIs** — `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` are now fully async. Always `await` them; synchronous access is removed.
- **`middleware` renamed to `proxy`** — The file must be `proxy.ts`/`proxy.js` and the exported function must be named `proxy`. The `edge` runtime is not supported in `proxy`.
- **`next lint` removed** — Use `npm run lint` (runs ESLint CLI directly). `next build` no longer runs linting.
- **`revalidateTag` requires a second argument** — e.g. `revalidateTag('posts', 'max')`. Use `updateTag` (Server Actions only) for immediate cache expiry.
- **`cacheLife`/`cacheTag`** — Import from `next/cache` directly (no `unstable_` prefix).
- **Parallel routes** — All `@slot` directories require an explicit `default.js`; builds fail without one.
- **PPR** — Now enabled via `cacheComponents: true` in `next.config.ts` (not `experimental.ppr`).
- **`serverRuntimeConfig`/`publicRuntimeConfig`** — Removed. Use `process.env` in Server Components and `NEXT_PUBLIC_*` for client-accessible values.
- **`next/legacy/image`** — Deprecated; use `next/image`.
- **`images.domains`** — Deprecated; use `images.remotePatterns`.
- **Turbopack is the default** — Both `next dev` and `next build` use Turbopack. Pass `--webpack` to opt out. Turbopack config moves from `experimental.turbopack` to top-level `turbopack` in `next.config.ts`.
