# Style Guide - Ascension Codex

## Typography System

### Font Families

#### Primary Typeface: Inter
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Usage**: Body text, UI elements, navigation, buttons, forms  
**Weights Available**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)  
**Characteristics**: Highly legible, modern, optimized for screens

#### Display Typeface: Playfair Display
```css
font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
```

**Usage**: Page headings, spiritual quotes, emphasis text  
**Weights Available**: 400 (Regular), 600 (Semibold), 700 (Bold)  
**Characteristics**: Elegant, spiritual, authoritative

#### Monospace: JetBrains Mono
```css
font-family: 'JetBrains Mono', 'Courier New', Courier, monospace;
```

**Usage**: Code snippets, technical data, system information  
**Weights Available**: 400 (Regular), 500 (Medium)

### Type Scale (Golden Ratio: 1.618)

| Token | Size | Line Height | Usage | Example |
|-------|------|-------------|-------|---------|
| `text-xs` | 0.75rem (12px) | 1rem (16px) | Captions, labels, metadata | "Last updated 2 days ago" |
| `text-sm` | 0.875rem (14px) | 1.25rem (20px) | Small text, secondary info | Navigation items, card metadata |
| `text-base` | 1rem (16px) | 1.5rem (24px) | Body text (default) | Paragraphs, descriptions |
| `text-lg` | 1.125rem (18px) | 1.75rem (28px) | Large body, lead text | Article introductions |
| `text-xl` | 1.25rem (20px) | 1.75rem (28px) | Small headings | Card titles, section labels |
| `text-2xl` | 1.5rem (24px) | 2rem (32px) | Subheadings | Section headings |
| `text-3xl` | 1.875rem (30px) | 2.25rem (36px) | Section headings | Page subsections |
| `text-4xl` | 2.25rem (36px) | 2.5rem (40px) | Page headings | Main page titles |
| `text-5xl` | 3rem (48px) | 1 | Hero headings | Landing page heroes |
| `text-6xl` | 3.75rem (60px) | 1 | Display headings | Special emphasis |

### Font Weights

```css
font-weight: 400;  /* Regular - Body text, default */
font-weight: 500;  /* Medium - Emphasis, labels */
font-weight: 600;  /* Semibold - Subheadings, buttons */
font-weight: 700;  /* Bold - Headings, strong emphasis */
```

### Line Heights

```css
line-height: 1;      /* None - Large display text */
line-height: 1.25;   /* Tight - Headings */
line-height: 1.5;    /* Normal - Body text (default) */
line-height: 1.75;   /* Relaxed - Long-form content */
line-height: 2;      /* Loose - Spiritual quotes */
```

### Letter Spacing

```css
letter-spacing: -0.05em;  /* Tighter - Large headings */
letter-spacing: 0;        /* Normal - Body text (default) */
letter-spacing: 0.025em;  /* Wide - Small caps, labels */
letter-spacing: 0.1em;    /* Wider - Uppercase headings */
```

### Typography Usage Examples

#### Page Heading
```tsx
<h1 className="text-4xl font-bold font-display text-cosmic-900 dark:text-cosmic-50">
  Chakra System
</h1>
```

#### Section Heading
```tsx
<h2 className="text-2xl font-semibold text-cosmic-800 dark:text-cosmic-100">
  Understanding Energy Centers
</h2>
```

#### Body Text
```tsx
<p className="text-base font-normal text-gray-700 dark:text-gray-300 leading-relaxed">
  The chakra system represents seven primary energy centers...
</p>
```

#### Spiritual Quote
```tsx
<blockquote className="text-lg font-display italic text-sacred-violet leading-loose">
  "Consciousness expands through the integration of light frequencies."
</blockquote>
```

## Color System

### Color Tokens (CSS Variables)

#### Base Colors
```css
:root {
  /* Cosmic Palette (Primary) */
  --cosmic-50: #F5F3FF;
  --cosmic-100: #EDE9FE;
  --cosmic-200: #DDD6FE;
  --cosmic-300: #C4B5FD;
  --cosmic-400: #A78BFA;
  --cosmic-500: #8B5CF6;  /* Primary brand color */
  --cosmic-600: #7C3AED;
  --cosmic-700: #6D28D9;
  --cosmic-800: #5B21B6;
  --cosmic-900: #4C1D95;
  
  /* Sacred Colors (Accents) */
  --sacred-gold: #FFD700;
  --sacred-silver: #E0E7FF;
  --sacred-violet: #A78BFA;
  --sacred-crystal: #F3F4F6;
  --sacred-emerald: #10B981;
  
  /* Semantic Colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
}
```

#### Dark Mode Colors
```css
.dark {
  --cosmic-50: #4C1D95;
  --cosmic-100: #5B21B6;
  --cosmic-900: #F5F3FF;
  /* Inverted scale for dark mode */
}
```

### Color Usage Guidelines

#### Primary Actions
- **Background**: `cosmic-500` (#8B5CF6)
- **Hover**: `cosmic-600` (#7C3AED)
- **Active**: `cosmic-700` (#6D28D9)
- **Text**: White or `cosmic-50`

#### Secondary Actions
- **Background**: `cosmic-100` (#EDE9FE)
- **Hover**: `cosmic-200` (#DDD6FE)
- **Active**: `cosmic-300` (#C4B5FD)
- **Text**: `cosmic-900` (#4C1D95)

#### Success States
- **Background**: `emerald-500` (#10B981)
- **Border**: `emerald-600`
- **Text**: `emerald-700`
- **Icon**: `emerald-600`

#### Warning States
- **Background**: `amber-500` (#F59E0B)
- **Border**: `amber-600`
- **Text**: `amber-700`
- **Icon**: `amber-600`

#### Error States
- **Background**: `red-500` (#EF4444)
- **Border**: `red-600`
- **Text**: `red-700`
- **Icon**: `red-600`

### Chakra Color System (Spiritual Accuracy)

```css
:root {
  --chakra-root: #E53E3E;       /* Red - Muladhara */
  --chakra-sacral: #F97316;     /* Orange - Svadhisthana */
  --chakra-solar: #FBBF24;      /* Yellow - Manipura */
  --chakra-heart: #10B981;      /* Green - Anahata */
  --chakra-throat: #3B82F6;     /* Blue - Vishuddha */
  --chakra-third-eye: #6366F1;  /* Indigo - Ajna */
  --chakra-crown: #A855F7;      /* Violet - Sahasrara */
}
```

### Contrast Ratios (WCAG Compliance)

| Context | Minimum Ratio | Target Ratio | Standard |
|---------|---------------|--------------|----------|
| Normal Text | 4.5:1 | 7:1 | WCAG AA / AAA |
| Large Text (18px+) | 3:1 | 4.5:1 | WCAG AA / AAA |
| UI Components | 3:1 | 4.5:1 | WCAG AA / AAA |
| Graphical Objects | 3:1 | 4.5:1 | WCAG AA / AAA |

### Color Combinations

#### Approved Combinations ✅
```css
/* Primary Brand */
.cosmic-gold { background: var(--cosmic-500); color: var(--sacred-gold); }

/* Spiritual Ethereal */
.ethereal { background: var(--sacred-silver); color: var(--sacred-violet); }

/* Clean Modern */
.modern { background: var(--sacred-crystal); color: var(--cosmic-500); }

/* Premium */
.premium { background: var(--cosmic-900); color: var(--sacred-gold); }
```

#### Avoid Combinations ❌
- Red text on green background (accessibility)
- Low contrast combinations (<3:1 ratio)
- More than 3 primary colors in single view
- Overly saturated color combinations

## Spacing System (Golden Ratio Based)

### Spacing Scale

```css
:root {
  --spacing-0: 0;
  --spacing-px: 1px;
  --spacing-0.5: 0.125rem;  /* 2px */
  --spacing-1: 0.25rem;     /* 4px */
  --spacing-1.5: 0.375rem;  /* 6px */
  --spacing-2: 0.5rem;      /* 8px */
  --spacing-2.5: 0.625rem;  /* 10px */
  --spacing-3: 0.75rem;     /* 12px */
  --spacing-3.5: 0.875rem;  /* 14px */
  --spacing-4: 1rem;        /* 16px - Base unit */
  --spacing-5: 1.25rem;     /* 20px */
  --spacing-6: 1.5rem;      /* 24px */
  --spacing-8: 2rem;        /* 32px */
  --spacing-10: 2.5rem;     /* 40px */
  --spacing-12: 3rem;       /* 48px */
  --spacing-16: 4rem;       /* 64px */
  --spacing-20: 5rem;       /* 80px */
  --spacing-24: 6rem;       /* 96px */
  --spacing-32: 8rem;       /* 128px */
}
```

### Spacing Usage

#### Component Padding
- **Tight**: `p-2` (8px) - Badges, small buttons
- **Normal**: `p-4` (16px) - Cards, containers
- **Comfortable**: `p-6` (24px) - Sections, modals
- **Spacious**: `p-8` (32px) - Hero sections, features

#### Component Margins
- **Tight**: `mb-2` (8px) - Between related items
- **Normal**: `mb-4` (16px) - Between paragraphs
- **Section**: `mb-8` (32px) - Between sections
- **Large**: `mb-16` (64px) - Between major sections

#### Layout Gaps
- **Tight**: `gap-2` (8px) - Icon + text
- **Normal**: `gap-4` (16px) - Grid items
- **Comfortable**: `gap-6` (24px) - Card grids
- **Spacious**: `gap-8` (32px) - Feature sections

### Responsive Spacing

```tsx
// Mobile-first responsive spacing
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="mb-4 md:mb-6 lg:mb-8">Title</h1>
</div>
```

## Shadows & Elevation

### Shadow System (Energy-Based)

```css
:root {
  /* Subtle Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(139, 92, 246, 0.05);
  --shadow: 0 1px 3px 0 rgba(139, 92, 246, 0.1), 
            0 1px 2px -1px rgba(139, 92, 246, 0.1);
  
  /* Medium Shadows */
  --shadow-md: 0 4px 6px -1px rgba(139, 92, 246, 0.1), 
               0 2px 4px -2px rgba(139, 92, 246, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(139, 92, 246, 0.1), 
               0 4px 6px -4px rgba(139, 92, 246, 0.1);
  
  /* Large Shadows */
  --shadow-xl: 0 20px 25px -5px rgba(139, 92, 246, 0.1), 
               0 8px 10px -6px rgba(139, 92, 246, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(139, 92, 246, 0.25);
  
  /* Sacred Glow */
  --shadow-glow: 0 0 20px rgba(139, 92, 246, 0.3),
                 0 0 40px rgba(139, 92, 246, 0.1);
}
```

### Elevation Levels

| Level | Shadow | Usage |
|-------|--------|-------|
| 0 | None | Flat elements, backgrounds |
| 1 | `shadow-sm` | Cards, containers |
| 2 | `shadow` | Buttons, inputs |
| 3 | `shadow-md` | Dropdowns, popovers |
| 4 | `shadow-lg` | Modals, dialogs |
| 5 | `shadow-xl` | Overlays, tooltips |
| 6 | `shadow-2xl` | Full-screen modals |
| Glow | `shadow-glow` | Active spiritual elements |

### Shadow Usage Examples

```tsx
// Card with subtle elevation
<div className="shadow-sm hover:shadow-md transition-shadow">
  Card content
</div>

// Button with medium elevation
<button className="shadow hover:shadow-lg transition-shadow">
  Click me
</button>

// Modal with high elevation
<div className="shadow-2xl">
  Modal content
</div>

// Spiritual element with glow
<div className="shadow-glow">
  Active chakra
</div>
```

## Border Radius

### Radius Scale

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius: 0.25rem;       /* 4px - Default */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-3xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;   /* Circular */
}
```

### Radius Usage

- **Buttons**: `rounded-lg` (8px)
- **Cards**: `rounded-xl` (12px)
- **Inputs**: `rounded-md` (6px)
- **Badges**: `rounded-full` (circular)
- **Modals**: `rounded-2xl` (16px)
- **Images**: `rounded-lg` (8px)
- **Avatars**: `rounded-full` (circular)

## Animation & Transitions

### Transition Durations

```css
:root {
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;
}
```

### Easing Functions

```css
:root {
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spiritual: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Bounce */
}
```

### Standard Transitions

```css
/* Quick interactions */
.transition-quick {
  transition: all 150ms ease-out;
}

/* Standard interactions */
.transition-standard {
  transition: all 300ms ease-in-out;
}

/* Smooth animations */
.transition-smooth {
  transition: all 500ms ease-in-out;
}

/* Spiritual animations */
.transition-spiritual {
  transition: all 700ms var(--ease-spiritual);
}
```

### Animation Examples

#### Hover Effects
```tsx
<button className="transform hover:scale-105 transition-transform duration-200">
  Hover me
</button>
```

#### Fade In
```tsx
<div className="animate-in fade-in duration-500">
  Fading in content
</div>
```

#### Slide In
```tsx
<div className="animate-in slide-in-from-bottom duration-300">
  Sliding in content
</div>
```

#### Spiritual Pulse
```tsx
<div className="animate-pulse-slow">
  Pulsing spiritual element
</div>
```

### Sacred Animations (Custom)

```css
@keyframes spiritual-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
  50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
}

@keyframes chakra-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes energy-flow {
  0% { opacity: 0; transform: translateY(20px); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-20px); }
}
```

## Accessibility Guidelines

### Focus States

```css
/* Visible focus indicator */
:focus-visible {
  outline: 2px solid var(--cosmic-500);
  outline-offset: 2px;
}

/* High contrast focus */
.focus-ring {
  @apply focus-visible:ring-2 focus-visible:ring-cosmic-500 focus-visible:ring-offset-2;
}
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Tab order must follow logical reading order
- Skip links for main content navigation
- Escape key closes modals and dropdowns

### Screen Reader Support

```tsx
// Hidden but accessible text
<span className="sr-only">Accessible description</span>

// ARIA labels
<button aria-label="Close modal">
  <X className="h-4 w-4" />
</button>

// ARIA live regions
<div role="status" aria-live="polite">
  Loading content...
</div>
```

### Color Accessibility

- Never rely on color alone to convey information
- Maintain minimum 4.5:1 contrast ratio for text
- Provide alternative indicators (icons, text, patterns)
- Test with color blindness simulators

### Motion Accessibility

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Responsive Design

### Breakpoints

```css
:root {
  --screen-sm: 640px;   /* Mobile landscape */
  --screen-md: 768px;   /* Tablet portrait */
  --screen-lg: 1024px;  /* Tablet landscape */
  --screen-xl: 1280px;  /* Desktop */
  --screen-2xl: 1536px; /* Large desktop */
}
```

### Mobile-First Approach

```tsx
// Start with mobile, enhance for larger screens
<div className="
  text-base      /* Mobile: 16px */
  md:text-lg     /* Tablet: 18px */
  lg:text-xl     /* Desktop: 20px */
">
  Responsive text
</div>
```

### Container Widths

```css
.container {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

## Performance Guidelines

### CSS Best Practices

- Use CSS variables for theming
- Minimize use of expensive properties (box-shadow, filter)
- Prefer transforms over position changes
- Use `will-change` sparingly for animations
- Avoid layout thrashing

### Animation Performance

```css
/* GPU-accelerated properties */
.optimized-animation {
  transform: translateZ(0);  /* Force GPU acceleration */
  will-change: transform;    /* Hint to browser */
}

/* Avoid animating these */
/* ❌ width, height, top, left, margin, padding */

/* Prefer animating these */
/* ✅ transform, opacity */
```

### Font Loading

```css
/* Prevent FOIT (Flash of Invisible Text) */
@font-face {
  font-family: 'Inter';
  font-display: swap;  /* Show fallback immediately */
  src: url('/fonts/inter.woff2') format('woff2');
}
```

---

**Style Guide Status**: ✅ Active  
**Last Updated**: 2025-10-01  
**Next Review**: Monthly  
**Maintained By**: Cascade AI Design System
