# OtoniqAI Website

## Tech Stack

- **Framework**: Next.js 16.1.4 + React 19.2.3
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Resend
- **Fonts**: Space Grotesk (headings), DM Sans (body)
- **Deployment**: Vercel (auto-deploy on push to main)

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

---

## Design System & Color Palette

All colors are defined as CSS custom properties in `app/globals.css` and mapped to Tailwind via `@theme inline`.

### Colors

#### Primary — Blue
| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#3B82F6` | Brand color, links, primary actions |
| `--primary-light` | `#60A5FA` | Hover states, highlights |
| `--primary-dark` | `#2563EB` | Active/pressed states, borders |

#### Secondary — Vibrant Violet
| Token | Hex | Usage |
|-------|-----|-------|
| `--secondary` | `#8B5CF6` | Supporting brand color, tags, badges |
| `--secondary-light` | `#A78BFA` | Hover states |
| `--secondary-dark` | `#7C3AED` | Active/pressed states |

#### Accent — Electric Cyan
| Token | Hex | Usage |
|-------|-----|-------|
| `--accent` | `#06B6D4` | Accent highlights, tertiary actions |
| `--accent-light` | `#22D3EE` | Hover states |
| `--accent-dark` | `#0891B2` | Active/pressed states |

#### Energy — Hot Pink (CTAs)
| Token | Hex | Usage |
|-------|-----|-------|
| `--energy` | `#EC4899` | Call-to-action buttons, urgent elements |
| `--energy-light` | `#F472B6` | Hover CTAs |
| `--energy-dark` | `#DB2777` | Active/pressed CTAs |

#### Backgrounds — Dark Theme
| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#0A0A0F` | Page background |
| `--background-alt` | `#12121A` | Alternate sections, scrollbar track |
| `--background-elevated` | `#1A1A25` | Cards, modals, elevated surfaces |

#### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `--foreground` | `#F8FAFC` | Primary text, headings |
| `--foreground-muted` | `#94A3B8` | Secondary text, descriptions, captions |

#### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| `--border` | `#2D2D3A` | Default borders, dividers, scrollbar thumb |
| `--border-light` | `#3D3D4A` | Hover borders, subtle separators |

### Gradients

| Token | Value | Usage |
|-------|-------|-------|
| `--gradient-primary` | `135deg, blue → violet` | Gradient text, hero backgrounds |
| `--gradient-energy` | `135deg, hot pink → violet` | CTA backgrounds, attention elements |
| `--gradient-accent` | `135deg, cyan → blue` | Accent sections, secondary highlights |

### Glow Effects

| Token | Color Base | Usage |
|-------|-----------|-------|
| `--glow-primary` | Blue @ 30% | Primary element shadows |
| `--glow-secondary` | Violet @ 30% | Secondary element shadows |
| `--glow-accent` | Cyan @ 30% | Accent element shadows |
| `--glow-energy` | Pink @ 30% | CTA button shadows |

### Typography

| Role | Font | Tailwind Class |
|------|------|---------------|
| Headings | Space Grotesk | `font-heading` |
| Body | DM Sans | `font-sans` |

### How to Use

**In Tailwind classes** (preferred):
```html
<div class="bg-primary text-foreground border-border">
  <h1 class="font-heading text-primary-light">Heading</h1>
  <p class="text-foreground-muted">Body text</p>
  <button class="bg-energy hover:bg-energy-light">CTA</button>
</div>
```

**In CSS**:
```css
.my-element {
  color: var(--primary);
  background: var(--background-elevated);
  border: 1px solid var(--border);
  box-shadow: var(--glow-primary);
}
```

**Gradient text**:
```html
<span class="gradient-text">Shiny text</span>
```

---

## Project Structure

```
otoniqai-website/
├── app/
│   ├── globals.css          # Design tokens (colors, fonts, effects)
│   ├── layout.tsx           # Root layout with font loading
│   └── page.tsx             # Home page
├── components/
│   ├── layout/              # Layout components
│   ├── providers/           # SmoothScrollProvider
│   ├── sections/            # Page sections (Hero, Services, etc.)
│   └── ui/                  # UI primitives (PageLoader, CursorGlow, NoiseTexture, BackToTop)
└── public/                  # Static assets
```
