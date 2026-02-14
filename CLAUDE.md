# OtoniqAI Website (Marketing Site)

Next.js marketing site for OtoniqAI (otoniqai.com). Landing pages, product info, pricing, contact.

> **Related project:** `plc-documenter` is the actual PLC Documenter SaaS app (documenter.otoniqai.com) with auth, dashboard, upload, viewer, etc. This repo is only the marketing site — don't confuse them.

## Commands
npm run dev      # localhost:3000
npm run build    # Production build
npm run lint     # Check code

## Stack
- Next.js 14+ (App Router)
- Tailwind CSS, TypeScript
- Deployed on Vercel (auto-deploy on push to main)

## Structure
- app/ - Pages and layouts
- components/ - React components
- public/ - Static assets

## Conventions
- Server components by default
- Use next/image for optimization
- Follow existing component patterns
