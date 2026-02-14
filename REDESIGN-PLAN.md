# OtoniqAI Website Redesign Plan
## Branch: `redesign/light-mode-v2`
## Palette: Warm Stone + Deep Teal (Option A)

---

## Design Direction

**From:** Dark theme, multi-color gradients (blue/violet/cyan/pink), glow effects, floating particles, cursor trails, noise texture
**To:** Light warm-stone base, deep teal accents, clean typography, purposeful-only motion, professional and confident

**Typography change:**
- Headings: Replace Space Grotesk with **Instrument Sans** (sharp, geometric, technical)
- Body: Keep DM Sans (it's excellent for body text)

**Motion approach:** Subtle & purposeful — keep scroll-triggered fade-ins and button hover states, remove all decorative effects (orbs, cursor glow, particles, noise texture, page loader spinner)

---

## Color System (New Palette)

```
PRIMARY (Deep Teal)
  --primary: #0D5E6B
  --primary-light: #11798A
  --primary-dark: #0A4E59

ACCENT (Warm Sand)
  --accent: #D4A574
  --accent-light: #E0BB92
  --accent-dark: #C48F5C

BACKGROUND (Warm Stone)
  --background: #FAF8F5         (main page bg)
  --background-alt: #F0EDEA     (alternate section bg)
  --background-elevated: #FFFFFF (cards, elevated surfaces)

TEXT
  --foreground: #1A1A1A         (primary text — near black)
  --foreground-muted: #5C5C5C   (secondary text)

BORDERS
  --border: #E2DFDB             (default border)
  --border-light: #D1CDC8       (hover border)

ERROR/ENERGY (for form validation)
  --energy: #C7402D             (deep red, not hot pink)
  --energy-light: #D9553F
  --energy-dark: #B53520

SUCCESS
  --success: #0D5E6B            (reuse primary teal)
```

**Removed:** secondary (violet), gradient variables, glow variables

---

## File-by-File Changes

### 1. `app/globals.css` — Complete color system replacement
- Replace all `:root` variables with new palette above
- Replace `@theme inline` color mappings
- Update `--font-heading` to use Instrument Sans variable
- Change `body` background/color
- Update `::selection` to use teal
- Replace `.gradient-text` → solid `color: var(--primary)` (no more gradient text)
- Update `:focus-visible` to teal
- Update scrollbar colors to light theme

### 2. `app/layout.tsx` — Font + layout cleanup
- Replace `Space_Grotesk` import with `Instrument_Sans` from `next/font/google`
- Update font variable from `--font-space-grotesk` to `--font-instrument-sans`
- Remove `className="dark"` from `<html>` tag
- **Remove** `<PageLoader />` component (no more loading screen)
- **Remove** `<CursorGlow />` component (no more cursor trail)
- **Remove** `<NoiseTexture />` component (no more grain overlay)
- Keep `<SmoothScrollProvider>` and `<BackToTop />`

### 3. `components/ui/button.tsx` — Variant overhaul
- **Remove** `gradient` variant entirely
- **Remove** `energy` variant (only used for CTA in old design)
- **Remove** `secondary` variant
- Update `primary` variant: solid `bg-primary text-white`, lighter shadow
- Update `outline` variant: `border-border text-foreground`, hover to teal
- Update `ghost` variant: for light bg
- **Add** `teal` variant (same as primary, just cleaner naming)
- Remove the `before:` pseudo-element gradient logic from old gradient variant
- Reduce `whileHover` scale from 1.02 to 1.01 (subtler)

### 4. `components/ui/card.tsx` — Light theme cards
- Update `default` variant: `bg-background-elevated` (white) + `border-border` (light stone)
- Update `glass` variant → make it `bg-white/80 backdrop-blur-sm border-border`
- Update `glow` variant → remove glow, just use subtle border color change on hover
- **Remove** `gradient` variant (no more gradient cards)
- Reduce `whileHover` y-shift from -4 to -2 (subtler lift)

### 5. `components/ui/badge.tsx` — Simplify variants
- **Remove** `secondary`, `energy`, `gradient` variants
- Update `primary` → teal tinted bg (`bg-primary/8 text-primary border-primary/15`)
- Update `accent` → warm sand tinted bg
- Update `outline` → light border, teal hover

### 6. `components/ui/icon-box.tsx` — Simplify to teal-only
- **Remove** `secondary`, `energy`, `gradient`, `glow` variants
- Update `primary` → teal bg tint on light background
- Update `accent` → warm sand bg tint
- Remove color-specific glow shadows on hover (just subtle scale)

### 7. `components/ui/input.tsx` — Light theme inputs
- Change `bg-background-alt` → `bg-white`
- Update border colors to `border-border`
- Update focus ring color from blue to teal: `rgba(13, 94, 107, 0.1)`
- Update error state from `border-energy` to new red

### 8. `components/ui/textarea.tsx` — Same changes as input
- Mirror all input.tsx color changes

### 9. `components/ui/logo.tsx` — Remove gradient, use solid teal
- Replace `linearGradient` SVG element → use solid `var(--primary)` fill/stroke
- Inner hexagon: use `var(--accent)` (warm sand)
- Center triangle: solid `var(--primary)` fill
- Replace `.gradient-text` on "Otoniq" → `text-primary` (solid teal)
- "AI" text: `text-foreground` (dark charcoal)

### 10. `components/ui/page-loader.tsx` — **DELETE or gut**
- Remove from layout.tsx imports and usage
- Can delete the file entirely, or replace with a minimal fade-in (no spinner)

### 11. `components/ui/cursor-glow.tsx` — **DELETE**
- Remove from layout.tsx imports and usage
- Delete the file

### 12. `components/ui/noise-texture.tsx` — **DELETE**
- Remove from layout.tsx imports and usage
- Delete the file

### 13. `components/ui/floating-elements.tsx` — **DELETE**
- Remove from hero.tsx imports and usage
- Delete the file

### 14. `components/ui/section-divider.tsx` — Simplify
- Replace gradient line with solid `border-border` line
- Remove the center dot animation
- Simple horizontal rule

### 15. `components/ui/back-to-top.tsx` — Light theme
- Update `bg-background-elevated` → `bg-white`
- Update border, hover states to teal
- Remove glow shadow on hover

### 16. `components/ui/index.ts` — Remove deleted exports
- Remove: `PageLoader`, `CursorGlow`, `NoiseTexture`, `FloatingElements`

### 17. `components/sections/hero.tsx` — Major cleanup
- **Remove** entire "Animated Background" div (orbs, grid pattern, floating elements)
- Replace with clean warm-stone background (just the section bg)
- Remove `FloatingElements` import
- Change `Badge variant="gradient"` → `Badge variant="primary"` (teal badge)
- Replace `.gradient-text` on heading → `text-primary` (solid teal)
- Change `Button variant="gradient"` → `Button variant="primary"`
- Update scroll indicator colors to teal + border

### 18. `components/sections/services.tsx` — Uniform teal
- Remove background gradient divs
- Replace section background with alternating `bg-background-alt`
- Change all service card `color` from individual colors (primary/secondary/accent/energy) → all use `"primary"` (teal)
- Update check mark circles: all teal instead of per-service colors
- This creates a unified, professional look instead of rainbow cards

### 19. `components/sections/products.tsx` — Light cards
- Remove background gradient divs
- Update badge variant to `primary`
- Update feature checkmarks to teal
- "Learn More" link → `text-primary hover:text-primary-dark`

### 20. `components/sections/process.tsx` — Clean timeline
- Remove gradient connecting line → solid `border-border` line with teal progress overlay
- Step number badges: solid `bg-primary text-white` (no gradient)
- Icon boxes: `bg-background-elevated border-border` → icons in teal
- Remove `shadow-primary/25` glow effects
- Mobile timeline: same treatment

### 21. `components/sections/contact.tsx` — Light form
- Remove background gradient divs
- Contact form card: white bg, stone border
- Update `Button variant="gradient"` → `Button variant="primary"`
- Update submit error state colors
- Email card icon: teal bg tint
- Response time card icon: teal bg tint (was secondary/violet)
- CTA card: light teal tint bg instead of gradient

### 22. `components/layout/header.tsx` — Light header
- Scrolled state: `bg-background/80 backdrop-blur-xl border-b border-border/50` → `bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-border`
- Remove gradient nav underline → solid teal underline on hover
- "Get Started" button: solid `bg-primary text-white` (no gradient)
- Mobile menu: `bg-white` (was `bg-background-elevated`), white overlay
- Mobile CTA: solid teal

### 23. `components/layout/footer.tsx` — Light footer
- `bg-background-alt border-t border-border`
- Remove gradient line at top → solid `border-border`
- Update hover states to teal

---

## Implementation Order

1. **globals.css** — Foundation (all colors change here first)
2. **layout.tsx** — Font swap + remove deleted components
3. **UI primitives** — button, card, badge, icon-box, input, textarea, logo, back-to-top, section-divider
4. **Delete files** — page-loader, cursor-glow, noise-texture, floating-elements
5. **Update index.ts** — Remove deleted exports
6. **Sections** — hero, services, products, process, contact
7. **Layout** — header, footer
8. **Test** — `npm run build` to verify no broken imports/types
9. **Visual QA** — Run dev server and check each section

---

## What We're NOT Changing

- Page structure / section order (hero → services → products → process → contact)
- Copy/content (all text stays the same)
- Functionality (form validation, smooth scroll, mobile menu)
- Framer Motion scroll-triggered animations (fade-in-up, stagger)
- Responsive breakpoints and grid layouts
- SEO metadata and structured data
- API route for contact form
- Container component
- Lenis smooth scroll provider
