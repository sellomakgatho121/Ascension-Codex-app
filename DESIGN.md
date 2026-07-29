# Ascension Codex — Design System

## Visual Philosophy

Ascension Codex bridges two visual worlds — the **anti-design cyberpunk** (wake-up call, confrontation, activation) and the **cosmic glassmorphism** (contemplation, practice, integration). The dual world is not a conflict but a journey: the visitor arrives in the neon-lit glitch temple, and as they engage, they descend into the violet-lit practice sanctuary.

The scroll axis itself becomes a spiritual progression metaphor.

---

## Color

### Anti Palette (Hero & alert zones)
| Token | Value | Usage |
|-------|-------|-------|
| `--anti-bg` | `#050505` | Hero background, alert surfaces |
| `--anti-acid` | `#39ff14` | Primary neon accent (headlines, CTAs) |
| `--anti-neon` | `#ff006e` | Secondary accent (hover, secondary elements) |
| `--anti-cyan` | `#00f0ff` | Tertiary accent (VERS dock, data elements) |
| `--anti-static` | `#e0e0e0` | Body text on anti backgrounds |

### Cosmic Palette (Practice & content zones)
| Token | Value | Usage |
|-------|-------|-------|
| `--cosmic-900` | `hsl(275, 70%, 8%)` | Deepest background |
| `--cosmic-800` | `hsl(275, 60%, 15%)` | Surface/card backgrounds |
| `--cosmic-700` | `hsl(275, 55%, 25%)` | Elevated surfaces |
| `--cosmic-600` | `hsl(275, 50%, 35%)` | Interactive states |
| `--cosmic-500` | `hsl(275, 45%, 45%)` | Accent/muted interactive |

### Sacred Accents
| Token | Value | Usage |
|-------|-------|-------|
| `--sacred-gold` | `hsl(45, 95%, 65%)` | Achievement, mastery indicators |
| `--sacred-silver` | `hsl(220, 15%, 85%)` | Progress, secondary info |
| `--sacred-violet` | `hsl(280, 70%, 65%)` | VERS AI, spiritual guidance |
| `--sacred-crystal` | `hsl(200, 80%, 75%)` | Clarity, purification elements |
| `--sacred-emerald` | `hsl(160, 70%, 55%)` | Healing, heart-center elements |

### Three-Fold Flame
- **Blue** (`#4a90d9`) — Power/will — CTA buttons, strength indicators
- **Gold** (`#f0c040`) — Wisdom/illumination — Knowledge sections
- **Rose** (`#e8509a`) — Love/adoration — Community, heart-centered sections

---

## Typography

| Face | Role | Sizes | Usage |
|------|------|-------|-------|
| **Bebas Neue** | Anti-display | 4rem–12rem, all caps | Hero headlines, section numbers, anti-design zones |
| **Cinzel** | Sacred display | 1.5rem–4rem | Cosmic section headers, page titles |
| **Open Sans** | Body | 0.875rem–1.125rem | Running text, descriptions, card content |
| **Space Mono** | Mono label | 0.75rem–0.875rem | Labels, badges, breadcrumbs, metadata, tracked uppercase |
| **JetBrains Mono** | Code | 0.875rem | Code blocks, technical data |

The hero uses Bebas Neue exclusively. As the user scrolls past the transition zone, Cinzel takes over for headers. Section labels in Space Mono (tracked 0.15em) appear throughout both zones for consistency.

---

## Component Language

### Anti Components
- Background: `--anti-bg`
- Border: 1px solid, colored (`--anti-acid`, `--anti-neon`, or `--anti-cyan`)
- Typography: Bebas Neue headlines, Space Mono body/labels
- Effects: CSS glitch (pseudo-element clip animation), scan-line overlay, noise texture
- Hover: neon glow via box-shadow with the accent color
- Shape: rectangular, hard corners (no border-radius), occasional skewed/asymmetric grid
- Cards .anti-card: dark surface, 1px colored border, no backdrop-blur

### Glass Components (Cosmic)
- Background: `var(--glass-white)` = `hsla(0, 0%, 100%, 0.05)`
- Backdrop: `backdrop-filter: blur(16px)` (GPU composited)
- Border: 1px solid `var(--glass-border)` = `hsla(255, 255%, 255%, 0.1)`
- Border-radius: `1rem`
- Shadow: `var(--glass-shadow)` = `0 8px 32px 0 rgba(31, 38, 135, 0.37)`
- Hover: background `var(--glass-white-hover)` = `hsla(0, 0%, 100%, 0.1)`, stronger shadow
- Typography: Cinzel headers, Open Sans body

### Buttons

**Anti primary**: Acid green fill, #050505 text, `border: 1px solid --anti-acid`, tracked Space Mono label. Hover: brighter glow.

**Anti secondary**: Transparent fill, acid green text, acid green border. Hover: 10% fill.

**Cosmic primary**: Violet fill (`--cosmic-500`), white text, 1rem radius. Hover: shift toward `--sacred-violet`.

**Cosmic ghost**: Transparent, white text, glass-white border. Hover: glass-white fill.

### The Transition (Anti → Cosmic bridge)
- Background: `bg-gradient-to-b from-[#050505] via-[#0a0510] to-[hsl(275,70%,8%)]`
- Cards in this zone: outer anti styling → inner glass as the card index increases
- Scan-line overlay fades out progressively (opacity from 1 → 0.1)
- Ambient violet orbs gradually replace the acid green parallax blobs

---

## Layout

### Hero Section
- Full viewport height (100vh / 100dvh)
- Centered content column, max-width 1200px
- Headline: 12rem (desktop) / 5rem (mobile) Bebas Neue
- Two CTAs stacked or side-by-side

### System Index Grid
- Desktop: 3–4 column bento grid
- Tablet: 2 columns
- Mobile: 1 column
- Cards sized proportionally within the grid
- First 2 cards in anti styling → middle 4 in transition → last 4 in cosmic glass

### Dashboard Sections
- Single column width, full-bleed within page container
- Section padding: 4rem–6rem vertical
- Section max-width: 1200px, centered

### Responsive Breakpoints
- Desktop: >1024px — full layout
- Tablet: 768–1024px — 2-column grid, reduced hero scale
- Mobile: <768px — single column, compact hero, stacked layout

---

## Motion

### Principle
One authored moment, zero scattered effects. The hero text glitch-reveal is the signature animation. Everything else emerges from already-visible position with exponential ease-out.

### Timing (Golden Ratio)
- Fastest: 0.618s (φ⁻¹)
- Fast: 1s
- Medium: 1.618s (φ)
- Slow: 2.618s (φ²)
- Epic: 4.236s (φ³)

### Easing
- Default: `cubic-bezier(0.618, 0, 0.382, 1)` — golden ease
- Motion: `cubic-bezier(0.22, 1, 0.36, 1)` — exponential ease-out
- Bounce: `cubic-bezier(0.618, 1.618, 0.382, 0.618)` — golden bounce

### Implementation
- All motion uses CSS `@keyframes` and `animation`, not framer-motion
- GPU-composited properties only: `transform`, `opacity`, `backdrop-filter`, `clip-path`
- Prefers-reduced-motion disables all animations
- Staggered reveals use `animation-delay` with `animation-fill-mode: backwards`

### Anti Effects
- Glitch: clip-path transitions on `::before`/`::after` pseudo-elements
- Scan line: repeating linear-gradient with `background-size: 100% 4px`
- Noise: PNG overlay with CSS mix-blend-mode
- Marquee: infinite horizontal scroll animation

### Cosmic Effects
- Float: gentle Y-axis oscillation (translateY)
- Glow: box-shadow with the accent color at varying opacity
- Glass shimmer: backdrop-filter animation on hover

---

## Anti-Design Subsystem

Used on the home hero and specific tool pages. To activate, wrap content in a container with `bg-anti-bg` and apply anti- classes.

### CSS Classes (in index.css)
- `.anti-card` — Dark card with colored 1px border
- `.anti-btn` / `.anti-btn-neon` — Button variants
- `.anti-text-glitch` — Glitch animation via pseudo-elements
- `.anti-heading` — Bebas Neue display treatment
- `.anti-subheading` — Space Mono tracked label
- `.anti-scan-line` — Scan-line overlay pseudo-element
- `.anti-noise-overlay` — Full-screen noise texture
- `.anti-grid-broken` — Skewed/asymmetric grid layout
- `.anti-marquee` — Horizontal scrolling text

### Active on
- Home page hero section
- Tools pages when anti-design mode is enabled

---

## Accessibility

- All color combinations meet WCAG AA (4.5:1 body, 3:1 large text)
- Anti-design acid green on black is used only for large display text (≥24px), not body copy —  meets 3:1 threshold for large text
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables all animations and effects
- Touch targets: ≥44px on mobile (Capacitor)
- Focus-visible ring: 2px solid `--sacred-gold` offset 2px
- Screen reader: aria-labels on all icon-only buttons, role attributes on interactive cards
- Color is never the sole differentiator
