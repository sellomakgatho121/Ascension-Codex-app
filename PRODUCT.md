# Product

<!-- impeccable:product-schema 1 -->

## Platform

web · android (Capacitor wrapper — native UI philosophy is adaptive)

## Users

**Primary:** Lightworkers and spiritual practitioners at any stage of their consciousness evolution journey — from those newly awakening to advanced practitioners working with multidimensional energy systems.

The product serves anyone seeking tools, knowledge, and community for organic spiritual ascension, regardless of tradition or background. It is designed for self-directed explorers who value sovereignty, discernment, and direct experience over intermediary authority.

## Product Purpose

Ascension Codex is an all-in-one spiritual development platform that integrates education, practice tracking, AI-guided coaching, and community. It makes the complex multidimensional framework of Energetic Synthesis teachings (15-chakra system, Lightbody activation, 12D Shield, Hova Bodies, GSF principles) accessible through:

- **Learn** — A comprehensive knowledge base spanning chakra systems, lightbody layers, sacred geometry, DNA activation, dimensional mechanics, and more
- **Practice** — Guided meditation sessions, progress tracking, chakra clearing logs, and personalized development pathways
- **Connect** — Community forums, group meditation sessions, mentorship
- **Guide** — V.E.R.S. (Vibrational Energy Resonance System), an AI companion with voice interaction that provides contextual spiritual guidance rooted in ES teachings

Success means the user consistently deepens their energetic literacy, maintains sovereign protection practices, and progresses along their organic ascension timeline with clarity and community support.

## Positioning

The only open platform that combines a complete Energetic Synthesis knowledge repository, a practice tracking engine for multidimensional energy work (15-chakra system, Lightbody, Hova Bodies, Tree Grid), an AI voice companion trained on ES principles, and community features — all in one application. Unlike static reference sites (ascensionglossary.com) or single-purpose meditation apps, Ascension Codex is an active development environment for consciousness evolution.

## Operating Context

- Users access the app on desktop web browsers and Android mobile devices
- Mobile use includes meditation sessions (timer, voice guidance), quick reference lookups, and community participation
- Desktop use includes deep study of knowledge base articles, 3D visualizations, and progress dashboard review
- V.E.R.S. voice interaction (ElevenLabs TTS + Whisper STT) is used during meditation and practice sessions
- The app runs in dark mode by default — cosmic-themed immersive environment
- Offline support exists for core content access

## Capabilities and Constraints

**Confirmed capabilities:**
- 15-chakra system browser (physical chakras 1–7, morphogenetic chakras 8–15) with detail pages, color coding, and clearing practices
- Lightbody activation tracking across 7 electromagnetic auric layers with dimensional mapping
- Hova Bodies (avatar, soul, monadic, etc.) visualization and integration tracking
- Tree of Life / Tree Grid with sphere activation and shield integration
- Guided meditation sessions with timer, type selection (chakra-clearing, 12D-shield, lightbody-activation), and journaling
- V.E.R.S. AI assistant with free-text chat, voice input (Whisper), voice output (ElevenLabs TTS), and context-aware responses
- 12D Shield practice guide and protection protocols
- GSF (God Sovereign Free) teaching modules
- NAA tools & weapons identification
- Psychic self-defense guide
- Sacred geometry visualizations and 3D renderings
- DNA activation and multidimensional merkaba mechanics
- Community forums with posts, replies, and reactions
- Group meditation/study session scheduling
- Progress tracking with overall level, chakra/lightbody/grid completion metrics
- Glossary of spiritual terminology
- Onboarding system for new users
- Accessibility features (reduced motion, contrast settings, screen reader support)
- Anti-design mode (glitch, neon, cyberpunk aesthetic variant)

**Technical constraints:**
- PostgreSQL via Drizzle ORM (or MemStorage fallback for dev)
- React + Vite frontend with Tailwind CSS and shadcn/ui components
- Express backend with TypeScript
- Capacitor Android wrapper for mobile deployment
- AI features depend on configured API keys (OpenAI-compatible, ElevenLabs)
- 3D visualizations use Three.js via @citizenfx/three
- Session-based authentication (no OAuth yet)

**Explicitly undecided:**
- User authentication mechanism (session-based exists, OAuth provider not chosen)
- Premium/paid features model (if any)
- iOS support (Capacitor iOS not yet configured)
- PWA strategy
- Content management workflow (content is currently hardcoded/seed-based)

## Brand Commitments

- **Name:** Ascension Codex — meaning "the book of spiritual ascent"
- **Voice:** Esoteric but accessible; reverent without being dogmatic; precise about energetic mechanics without being cold
- **Design direction:**
  - Primary palette: deep indigo → dark violet → royal purple (cosmic/spiritual authority)
  - Sacred accent colors: gold, silver, violet, crystal, emerald
  - Three-Fold Flame trinity: blue (power/will), gold (wisdom/illumination), rose (love/adoration)
  - Dark background theme (cosmic-900: hsl(275, 70%, 8%))
  - Typography: Cinzel (headers — sacred/ceremonial), Open Sans (body — readable), JetBrains Mono (code/technical)
  - Glassmorphic design language with bento-grid layouts
  - GPU-composited CSS animations (no framer-motion dependency)
  - Sacred geometry patterns and ambient particle effects
- **Anti-design system:** Optional cyberpunk/glitch aesthetic with acid green, neon pink, electric cyan — used for specific pages/sections
- **Colors should never be muted** per earlier design notes; vibrant saturation is intentional
- **Reference content domains:** ascensionglossary.com and energeticsynthesis.com (Energetic Synthesis / Lisa Renee teachings)

## Evidence on Hand

- Full application codebase at project root with ~50+ page components and ~100+ UI components
- Complete 15-chakra system data, Lightbody layer definitions, and Tree Grid geometry
- V.E.R.S. AI system prompt and response templates grounded in ES teachings
- Meditation session schema and timer implementation
- Capacitor Android platform configuration
- No user research, analytics, or formal usability testing artifacts present in the repository

## Product Principles

1. **Sovereignty-first architecture** — The platform models the spiritual principle of sovereignty it teaches: no vendor lock-in, no intermediaries required, transparent data practices, and the user always owns their progress data.

2. **Depth without gatekeeping** — Complex multidimensional concepts are explained with layered disclosure: a beginner gets a clear metaphor, an advanced practitioner gets the precise energetic mechanics. Every page works at multiple levels of understanding.

3. **Practice over passive consumption** — The platform is designed for active engagement, not just reading. Meditation timers, progress tracking, journaling, and the AI companion all exist to move the user from understanding to embodiment.

4. **Visual as pedagogical** — Every energetic concept has a visual representation (sacred geometry, 3D visualization, interactive diagram). The design language itself (golden ratio typography, cosmic palette, glassmorphic depth) reinforces the content.

5. **Community as catalyst** — Spiritual development is personal but not isolated. Forums, group sessions, and mentorship features exist because shared practice accelerates and stabilizes ascension.

## Accessibility & Inclusion

- WCAG-compliant contrast ratios in dark theme
- Reduced motion support for users with vestibular disorders (prefers-reduced-motion)
- Screen reader compatible component structure
- Keyboard-navigable UI
- Focus-visible indicators for all interactive elements
- Color is never the sole differentiator for conveying meaning
- Practical inclusivity: the language of "lightworker" and "spiritual practitioner" is used rather than tradition-specific terms, keeping the platform open across paths
