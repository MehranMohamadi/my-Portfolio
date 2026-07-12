# Agent Notes

Use this file as the first project briefing so future agents spend fewer tokens rediscovering the repo.

## Project

- Personal portfolio for Mehran Mohammadi.
- Stack: Next.js 16 App Router, React 18, TypeScript, Tailwind CSS 4, next-intl, lucide-react, Radix/shadcn-style UI components.
- Package manager: pnpm. Prefer `pnpm dev`, `pnpm build`, and `pnpm install`. `pnpm-lock.yaml` is present; README still mentions npm.
- Main route shape: localized pages under `src/app/[locale]` with supported locales `en`, `fa`, `ar`.
- SEO helpers live in `src/lib/seo.ts`; site URL is `https://mehranmohammadifrd.ir`.

## Key Files

- `src/app/[locale]/page.tsx`: home page composition and JSON-LD.
- `src/app/[locale]/layout.tsx`: global layout, metadata, locale messages, providers, Vercel Speed Insights.
- `src/components/*Section.tsx`: visible page sections.
- `src/components/ui/*`: reusable Radix/shadcn-style primitives.
- `src/messages/en.json`, `src/messages/fa.json`, `src/messages/ar.json`: translation strings.
- `src/data/blogPosts.ts` and `public/blog/*.md`: blog metadata and posts.
- `public/img/*`: portfolio/project/profile assets.
- `src/app/api/contact/route.ts`: contact form API using Resend.
- `src/styles/global.css`, `src/styles/index.css`, `src/styles/fonts/app-fonts.css`: global styles and font imports.

## Commands

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Production build/check: `pnpm build`
- No lint/test script is currently defined in `package.json`.

## Environment

- Contact API expects `RESEND_API_KEY`.
- Optional env vars: `RESEND_FROM_EMAIL`, `ADMIN_EMAIL`, `CONTACT_AUTO_REPLY=true`.
- Portfolio chat expects `GEMINI_API_KEY`; the key is used only by the server-side `/api/chat` route.
- Do not print or commit `.env.local` values.

## Work Rules

- Before broad edits, read only the files relevant to the requested area.
- Avoid reading `node_modules`, `.next`, `tsconfig.tsbuildinfo`, `pnpm-lock.yaml`, and font binaries unless directly needed.
- Use `rg` / `rg --files` for search.
- In PowerShell, paths containing `[locale]` need `-LiteralPath`, for example:
  `Get-Content -LiteralPath 'src\app\[locale]\page.tsx'`
- Preserve existing user changes; check `git status --short` before and after edits.
- Use `apply_patch` for manual edits.
- Keep changes scoped and consistent with existing component/style patterns.

## Localization Notes

- UI text should usually be added to all three message files: `en.json`, `fa.json`, `ar.json`.
- Use `useTranslations()` in client components and server-side message loading in route components when matching existing patterns.
- `normalizeLocale` falls back to `en`.
- Root redirect currently exists in `src/middaleware.ts`; verify routing behavior before changing it because Next usually expects `middleware.ts`.

## Design Notes

- Current visual style: modern portfolio, dark-mode aware, gradient accents, responsive section layout.
- Use `next/image` for local images.
- Use lucide icons when adding icon buttons or small visual actions.
- Keep text responsive and avoid overflow in Persian/Arabic/English.
- Respect `prefers-reduced-motion` behavior already in `global.css`.

## Token-Saving Habits

- Start from this file, then inspect the smallest set of files for the task.
- Prefer summaries of large generated/vendor files instead of opening them.
- If the request concerns content, read the relevant translation/blog/data file first, not the whole app.
- If the request concerns layout, read the specific section component plus global styles.
- If the request concerns SEO/routing/locales, read `src/lib/seo.ts`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`, and routing files only.
