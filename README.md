# Ascension Codex

> A complete spiritual development platform for lightworkers and consciousness practitioners — learn, practice, connect, and grow through the Energetic Synthesis teachings.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live-brightgreen?logo=vercel)](https://ascension-codex-app.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## Overview

Ascension Codex is an open-source platform that makes the complex multidimensional framework of **Energetic Synthesis** accessible through four integrated pillars:

- **Learn** — Knowledge base spanning the 15-chakra system, Lightbody layers, sacred geometry, DNA activation, dimensional mechanics, and GSF principles.
- **Practice** — Guided meditation sessions, progress tracking, chakra clearing logs, and personalized development pathways.
- **Connect** — Community forums, group meditation sessions, and mentorship features.
- **Guide** — **V.E.R.S.** (Vibrational Energy Resonance System), an AI companion with voice interaction grounded in ES teachings.

The platform is built for **sovereignty-first** spiritual development — no vendor lock-in, user owns their data, transparent practices.

## Features

- **15-Chakra System** — Physical (1–7) and morphogenetic (8–15) chakra browser with clearing practices
- **Lightbody Activation** — Track 7 electromagnetic auric layers with dimensional mapping
- **12 Hova Bodies** — Visualize avatar, soul, monadic, and higher matrices
- **12-Tree Grid** — Tree of Life sphere activation and shield integration
- **V.E.R.S. AI** — Free-text and voice (Whisper STT + ElevenLabs TTS) spiritual guidance
- **12D Shield** — Foundational spiritual protection protocol guide
- **Meditation Engine** — Timer, journaling, session type selection
- **Community** — Forums, posts, replies, reactions, group sessions
- **Progress Tracking** — Levels, chakra/lightbody/grid completion metrics
- **3D Visualizations** — Sacred geometry, DNA activation, merkaba mechanics
- **Anti-Design Mode** — Optional cyberpunk/glitch aesthetic variant
- **Accessibility** — Reduced motion, contrast settings, screen reader support

## Tech Stack

**Frontend:** React 18 · Vite · TypeScript · Tailwind CSS · shadcn/ui · Three.js

**Backend:** Node.js · Express · TypeScript · Drizzle ORM

**Database:** PostgreSQL (Neon serverless) with MemStorage fallback for offline/demo

**Mobile:** Capacitor (Android)

**AI/voice:** OpenAI-compatible LLM · ElevenLabs TTS · Whisper STT

**Deploy:** Vercel (web) · Capacitor (Android)

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or pnpm/yarn)
- (Optional) PostgreSQL connection string for persistent storage

### Installation

```bash
git clone https://github.com/sellomakgatho121/Ascension-Codex-app.git
cd Ascension-Codex-app
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values you need:

```bash
cp .env.example .env
```

Not all keys are required — the app runs in demo mode with MemStorage and local AI responses when env vars are absent.

### Development

```bash
npm run dev      # Start dev server on http://localhost:5000
```

### Production Build

```bash
npm run build   # Build client + server bundle to dist/
npm run start   # Serve production build on port 5000
```

### Type Check

```bash
npm run check   # Run TypeScript compiler
```

## Deployment

### Vercel (Web)

The app is configured for Vercel via `vercel.json`. Push to `main` triggers a production deployment.

### Android (Capacitor)

```bash
npm run build
npx cap sync android
npx cap open android
```

## Project Structure

```
Ascension-Codex-app/
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/        # Route pages
│   │   ├── lib/          # Context delegates, utilities, data
│   │   └── styles/       # Global CSS
├── server/              # Express backend
│   ├── routes.ts        # REST + AI endpoints
│   ├── storage.ts       # Storage manager (DB + in-memory)
│   └── db.ts            # Drizzle/Neon connection
├── shared/              # Shared types & Drizzle schema
│   └── schema.ts
├── android/             # Capacitor Android shell
├── PRODUCT.md           # Product truth (users, purpose, positioning)
├── DESIGN.md            # Design system (palettes, typography, motion)
└── vercel.json          # Vercel deployment config
```

## Design System

The platform bridges two visual worlds:

- **Anti-Design (cyberpunk)** — Void black, acid green, neon pink, glitch effects. Used on the home hero and tool pages. Typography: Bebas Neue, Space Mono.
- **Cosmic Glassmorphism** — Deep indigos, sacred gold, glass cards, backdrop blur. Used for practice and content zones. Typography: Cinzel, Open Sans.

See [`DESIGN.md`](DESIGN.md) for the full system reference.

## Contributing

Contributions are welcome. Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) and open an issue before starting work on a feature.

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/)
4. Open a pull request

## Acknowledgements

- **[Energetic Synthesis](https://energeticsynthesis.com)** (Lisa Renee) — Foundational teachings
- **[Ascension Glossary](https://ascensionglossary.com)** — Reference material

This project is an independent implementation and is not affiliated with or endorsed by Energetic Synthesis.

## License

[MIT](LICENSE) © 2026 sellomakgatho121
