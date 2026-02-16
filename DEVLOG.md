# OtoniqAI Website Dev Log

## Working State
**Session:** 1 | **Date:** 2026-02-16

### Active Task
DEVLOG creation — retroactive from git history

### Key Files (current shape)
**`app/layout.tsx`** (MODIFIED, root layout)
SEO metadata, structured data (FAQ schema), font loading. References PLCDoc (rebranded from "PLC Documenter").

**`app/products/documenter/layout.tsx`** (MODIFIED, ~layout for /products/documenter)
Product landing page layout with breadcrumb, metadata, product schema. All references rebranded to PLCDoc.

**`components/sections/products.tsx`** (MODIFIED, products section on homepage)
Product cards displayed on main page. PLCDoc card links to `/products/documenter`.

### Decisions (active)
- PLCDoc is the product name (not "PLC Documenter") — rebranded in Session 16 of plc-documenter project
- Product landing page at `/products/documenter` links OUT to `documenter.otoniqai.com` (separate Next.js app)
- Light mode redesign is WIP (commit `2bd599c`) — dark mode removed in favor of clean light UI

### Next Steps
1. Finish light mode redesign polish
2. Add pricing section
3. Update hero copy if needed after PLCDoc launch

### Blockers
- None

### Watch Out
- `/products/documenter` CTA button links to `documenter.otoniqai.com` — keep in sync if domain changes

---
---

## Session Archive

### Session 1 — 2026-02-16: DEVLOG creation + PLCDoc rebrand
**What we did:** Created DEVLOG retroactively. Rebranded "PLC Documenter" → "PLCDoc" across products.tsx, documenter/layout.tsx, and app/layout.tsx FAQ schema.
**Files:** components/sections/products.tsx, app/products/documenter/layout.tsx, app/layout.tsx
**Decisions:** PLCDoc is the canonical product name going forward.

---

## Milestones
- [x] Initial site launch (otoniqai.com on Vercel)
- [x] SEO + structured data + llms.txt
- [x] Products section + PLCDoc landing page
- [x] Light mode redesign (WIP)
- [x] PLCDoc rebrand
- [ ] Pricing section
- [ ] Testimonials / case studies

## Historical Commits (pre-DEVLOG)
1. `caef544` — Create Next App scaffold
2. `c502835` — Initial site build
3. `56722cb` — Calendly integration for discovery calls
4. `3679329` / `c8c3963` — Contact form email fixes (verified otoniqai.com domain)
5. `4d2fe4a` — Comprehensive SEO (meta, OG, structured data)
6. `219333f` — Products section + PLC Documenter landing page
7. `2bd599c` — Light mode redesign (WIP)
8. `a002ef3` — Industrial automation SEO + AI visibility + llms.txt
9. `f9a952e` / `fa8bebc` / `7aefb2a` — Logo/favicon fixes, CTA button routing
10. `88a83be` — Rebrand PLC Documenter → PLCDoc
