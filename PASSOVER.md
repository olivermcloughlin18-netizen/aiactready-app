# AIActReady App — Handover
**Last updated: 2026-06-05**

---

## What this is
Full-stack compliance SaaS. Next.js 15 + Railway Postgres + Prisma + NextAuth v5 + Tailwind + Stripe + Resend + react-pdf.

Project dir: `/Users/olimc18/Desktop/claudeglobal/aiactready-app`

---

## What's built (all committed, tsc clean)

| # | Commit | What |
|---|--------|------|
| 1 | cafc731 | Scaffold, Prisma schema, plan limits + tests |
| 2 | 94a349d | NextAuth credentials auth, signup/signin API + pages |
| 3 | d6baf30 | App shell, sidebar, dashboard + onboarding checklist |
| 4 | 8536f62 | AI inventory CRUD — API, list/new/detail pages, risk badge |
| 5 | 291f317 | Risk wizard — 8-question flow, classifier with tests, result screen |
| 6 | 579d633 | Document generation — 5 templates, generate API, Tiptap editor |
| 7 | 0e2c093 | Individual document PDF export (react-pdf) |
| 8 | 1d73a57 | AI literacy tracker — 5 training modules, assign/complete APIs, attestation PDF |
| 9 | 6118a09 | One-click audit pack PDF (cover + inventory + docs + training records) |
| 10 | 851ea06 | Stripe billing webhook + portal, team invites (Resend), settings pages |

---

## Before you can run it

1. **Create `.env.local`** — copy from `.env.example`, fill in:
   - `DATABASE_URL` — your Railway Postgres URL
   - `NEXTAUTH_SECRET` — run `openssl rand -base64 32`
   - `NEXTAUTH_URL=http://localhost:3000`
   - Stripe + Resend keys (optional until billing/invites needed)

2. **Push schema to DB**
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Seed training modules**
   ```bash
   npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
   ```

4. **Run**
   ```bash
   npm run dev
   ```
   → http://localhost:3000

---

## What to do next

### Immediate — get it running
- [ ] Set up `.env.local` with Railway DB + NEXTAUTH_SECRET
- [ ] Run migrations + seed
- [ ] Sign up, add a tool, run the wizard — smoke test the full flow
- [ ] Fix any runtime bugs that surface (tsc passes but runtime may have edge cases)

### Before showing to customers
- [ ] Run `/ui-designer` on the landing page (`index.html`) to extract design system
- [ ] Run `/ui-ux-pro-max:ui-ux-pro-max` on each page — apply Vanta/Linear aesthetic
- [ ] Research 21st.dev, anime.js, readymag for component inspiration
- [ ] Add `.env.local` to `.gitignore` (check it's there already)
- [ ] Deploy to Railway: connect GitHub repo → auto-deploys on push to main
- [ ] Run `prisma migrate deploy` + seed on production

### After first 3 pre-orders
- [ ] Wire up real Stripe price IDs in `.env.local`
- [ ] Set up Resend domain (aiactready.com) for invite emails
- [ ] Test full onboarding: signup → add tool → wizard → FRIA → invite staff → training → audit pack
- [ ] Add `/settings/billing` upgrade flow for Starter → Growth

---

## Key files to know
```
lib/risk-classifier.ts        — wizard logic (8 questions → risk class)
lib/plan-limits.ts            — starter/growth/pro gates
lib/document-templates/       — 5 document generators (FRIA, AUP, etc.)
lib/pdf/                      — react-pdf components (doc, attestation, audit pack)
prisma/schema.prisma          — full DB schema
prisma/seed.ts                — 5 training modules
app/api/                      — all API routes
```

---

## Global Claude settings (already done)
- `bypassPermissions` — no tool approval prompts
- Git push hook — blocks pushes with `.env` files or API keys tracked
