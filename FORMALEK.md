# Otoniq AI Website - Project Documentation

> A story about building a modern AI agency landing page from scratch, the decisions we made, and what we learned along the way.

## The Big Picture

This is the website for **Otoniq AI**, a newly established AI automation agency. The slogan says it all: *"Automate. Elevate. Dominate."*

The goal was simple: create a sleek, professional landing page that doesn't overpromise. No fake testimonials. No "trusted by 10,000 companies." Just clean design, clear services, and a working contact form. First impressions matter, and this site needed to look like it was built by people who actually know technology.

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                            │
│  Next.js 16 + React 19 + Tailwind CSS 4 + Framer Motion│
├─────────────────────────────────────────────────────────┤
│                     SECTIONS                            │
│  Hero → Services → Process → Contact                   │
├─────────────────────────────────────────────────────────┤
│                     BACKEND                             │
│  /api/contact → Zod Validation → Resend Email          │
├─────────────────────────────────────────────────────────┤
│                   DEPLOYMENT                            │
│  GitHub → Vercel (auto-deploy) → Cloudflare DNS        │
└─────────────────────────────────────────────────────────┘
```

**The flow is straightforward:**
1. User visits `otoniqai.com`
2. Cloudflare routes to Vercel
3. Vercel serves the static Next.js site
4. Contact form POSTs to `/api/contact`
5. Server validates with Zod, sends emails via Resend
6. User gets confirmation, you get notification

---

## Codebase Structure

```
otoniqai-website/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout (fonts, providers, effects)
│   ├── page.tsx              # Main page (composes all sections)
│   ├── template.tsx          # Page transition animations
│   ├── globals.css           # THE COLOR SYSTEM (CSS variables)
│   ├── icon.svg              # Favicon
│   └── api/
│       └── contact/
│           └── route.ts      # Contact form API endpoint
│
├── components/
│   ├── ui/                   # Reusable UI primitives
│   │   ├── button.tsx        # 6 variants (primary, gradient, energy, etc.)
│   │   ├── card.tsx          # 4 variants (default, glass, glow, gradient)
│   │   ├── input.tsx         # Dark theme form input
│   │   ├── textarea.tsx      # Dark theme textarea
│   │   ├── badge.tsx         # Gradient border tags
│   │   ├── container.tsx     # Responsive wrapper (max-width + padding)
│   │   ├── icon-box.tsx      # Icon wrapper with glow effect
│   │   ├── logo.tsx          # Hexagonal logo component
│   │   ├── page-loader.tsx   # Loading animation on initial visit
│   │   ├── cursor-glow.tsx   # Mouse-following glow effect
│   │   ├── noise-texture.tsx # Subtle grain overlay
│   │   ├── back-to-top.tsx   # Floating scroll button
│   │   ├── floating-elements.tsx  # Hero particles
│   │   └── section-divider.tsx    # Animated section breaks
│   │
│   ├── layout/               # Structural components
│   │   ├── header.tsx        # Fixed nav with mobile menu
│   │   └── footer.tsx        # Simple footer with links
│   │
│   ├── sections/             # Page sections
│   │   ├── hero.tsx          # Full viewport hero with gradient orbs
│   │   ├── services.tsx      # 4 service cards in 2x2 grid
│   │   ├── process.tsx       # 4-step timeline
│   │   └── contact.tsx       # Form with client + server validation
│   │
│   └── providers/
│       └── smooth-scroll.tsx # Lenis smooth scrolling
│
├── lib/
│   └── utils.ts              # cn() helper (clsx + tailwind-merge)
│
├── public/
│   ├── logo.svg              # Full logo (icon + text)
│   ├── logo-icon.svg         # Icon only
│   └── favicon.svg           # Browser tab icon
│
└── .env.example              # Template for environment variables
```

**The mental model:** Think of it as layers of abstraction. `ui/` components are dumb—they just render what you tell them. `sections/` components are smart—they compose UI components into meaningful chunks. `page.tsx` orchestrates everything.

---

## Technology Choices (and Why)

### Next.js 16 with App Router
**Why:** Server components by default, excellent Vercel integration, file-based routing that just works. We considered plain React + Vite, but Next.js gives us the API route for the contact form without needing a separate backend.

### Tailwind CSS 4
**Why:** Utility-first means rapid iteration. The new v4 has better performance and the `@tailwindcss/postcss` plugin simplifies setup. CSS-in-JS alternatives (styled-components, emotion) add runtime overhead we don't need.

### CSS Variables for Colors
**Why:** This was a specific requirement—easy palette changes. All colors are defined in `globals.css`:

```css
:root {
  --primary: #3B82F6;      /* Blue */
  --secondary: #8B5CF6;    /* Purple */
  --accent: #06B6D4;       /* Cyan */
  --energy: #EC4899;       /* Pink */
  --background: #0A0A0F;   /* Near black */
  /* ... */
}
```

Want a different vibe? Change these 10 variables and the whole site transforms. Every component references these variables, never hardcoded hex values.

### Framer Motion
**Why:** Declarative animations that feel native. The `motion` components handle enter/exit, scroll-triggered reveals, and hover states with minimal code. Alternative was GSAP—more powerful but overkill for a landing page.

### class-variance-authority (cva)
**Why:** Type-safe component variants. Instead of messy conditional classNames, we define variants cleanly:

```tsx
const button = cva("base-classes", {
  variants: {
    variant: { primary: "...", secondary: "..." },
    size: { sm: "...", md: "...", lg: "..." }
  }
});
```

### Resend for Email
**Why:** Modern email API, generous free tier (100 emails/day), excellent DX. Alternatives were SendGrid (enterprise-y) and Nodemailer (requires SMTP setup). Resend is just `npm install resend` and you're done.

### Zod for Validation
**Why:** Runtime type validation that matches TypeScript. The schema definition is readable:

```ts
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
});
```

---

## How Things Connect

### The Contact Form Journey

1. **User fills form** → Client-side validation catches obvious errors (empty fields, bad email format)

2. **User clicks submit** → `fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) })`

3. **API route receives request** → `app/api/contact/route.ts` handles it

4. **Server validates** → Zod parses the body. Invalid? Return 400 with details.

5. **Resend sends emails:**
   - Notification to `hello@otoniqai.com` with all form data
   - Confirmation to user saying "we got your message"

6. **Response returns** → Success shows "Thank you" state, error shows error message

### The Scroll Experience

```
Page Load
    ↓
PageLoader (spinning hexagon, loading bar)
    ↓
Fade out loader, reveal content
    ↓
SmoothScrollProvider wraps everything (Lenis)
    ↓
CursorGlow follows mouse (desktop only)
    ↓
NoiseTexture adds subtle grain overlay
    ↓
Each section has InView animations (Framer Motion)
    ↓
BackToTop button appears after scrolling
```

### The Color System Flow

```
globals.css (CSS variables)
    ↓
Tailwind config picks them up
    ↓
Components use: text-[color:var(--primary)]
    ↓
Or gradient classes: gradient-text, gradient-border
    ↓
Change one variable → entire site updates
```

---

## Lessons Learned

### The npm Naming Restriction
**What happened:** Tried to create project as `otoniqAI_Website`. npm said no—package names can't have capital letters or underscores.

**The fix:** Used `otoniqai-website` instead.

**The lesson:** Always use lowercase, hyphen-separated names for npm projects. It's not just convention, it's enforced.

### Resend Initialization at Build Time
**What happened:** Build failed with "Missing API key" error. Resend was initialized at module load:

```ts
const resend = new Resend(process.env.RESEND_API_KEY); // BOOM at build time
```

**The fix:** Lazy initialization:

```ts
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(apiKey);
}
```

**The lesson:** Environment variables might not exist at build time. Initialize external services lazily, inside request handlers.

### Vercel CLI Authentication
**What happened:** Ran `vercel login` in the terminal, it hung waiting for browser authentication that couldn't complete in a non-interactive context.

**The fix:** Use GitHub integration instead. Push to repo, import in Vercel dashboard.

**The lesson:** Some CLI tools require interactive browser flows. When in doubt, use the web dashboard.

### DNS Propagation
**What happened:** Updated Cloudflare DNS to point to Vercel, but site didn't load immediately.

**The fix:** Patience. Also verified with `dns.google/resolve?name=otoniqai.com` to confirm the records were correct.

**The lesson:** DNS can take 5 minutes to 48 hours. Use Google's DNS checker to verify records are correct while waiting.

### The Logo Iteration
**What happened:** First logo concept wasn't what the user wanted.

**The fix:** Created 4 different concepts (A, B, C, D) with distinct personalities. User picked the hexagonal design (Concept B).

**The lesson:** Design is subjective. Always offer options. The hexagonal shape ended up being perfect—it suggests precision, technology, interconnection.

---

## Best Practices That Emerged

1. **CSS Variables First** - Define all colors as variables before writing any component. Makes theming trivial.

2. **Component Variants Over Props** - Use cva for variants instead of conditional logic. Cleaner, type-safe, self-documenting.

3. **Lazy Service Initialization** - Never initialize external services at module level. Do it inside request handlers.

4. **Mobile-First Responsive** - Start with mobile layout, add complexity for larger screens with `sm:`, `md:`, `lg:` prefixes.

5. **Semantic Section IDs** - Every section has an ID (`#services`, `#process`, `#contact`) for smooth scroll navigation.

6. **Email Both Parties** - Contact forms should send two emails: notification to you, confirmation to them. Professional touch.

---

## The Stack Summary

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 16 | SSR, API routes, routing |
| UI | React 19 | Component architecture |
| Styling | Tailwind CSS 4 | Utility-first CSS |
| Animation | Framer Motion | Declarative animations |
| Icons | Lucide React | Consistent icon set |
| Validation | Zod | Runtime type checking |
| Email | Resend | Transactional email |
| Hosting | Vercel | Edge deployment |
| DNS | Cloudflare | Domain management |
| Repo | GitHub | Version control |

---

## What's Next?

The foundation is solid. Future enhancements could include:

- **Blog section** - Once there's content to share
- **Case studies** - After landing clients
- **Analytics** - Vercel Analytics or Plausible
- **CRM integration** - Connect contact form to a CRM
- **Chatbot** - AI assistant for common questions

But remember: ship first, iterate later. This site does its job—it looks professional and captures leads. Everything else is optimization.

---

*Built with care, shipped with confidence. Automate. Elevate. Dominate.*