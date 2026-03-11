# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project at a glance
- Stack: TypeScript, Express (server), Vite + React (client, expected), Tailwind CSS, Drizzle ORM (PostgreSQL via Neon), Zod validation.
- Entry points:
  - Server dev: server/index.ts (boots Express, mounts routes, and integrates Vite in development)
  - Server prod bundle: dist/index.js (built from server/index.ts)
  - Client root expected at: client/ (index.html + src/main.tsx); built to dist/public
- Port: 5000 (hard-coded in server/index.ts) for both API and client during dev and prod.
- Path aliases: @ -> client/src, @shared -> shared, @assets -> attached_assets (see vite.config.ts and tsconfig.json)

Commands (npm)
- Install dependencies: npm install
- Development (server + Vite): npm run dev
  - Boots Express and, in development, attaches Vite middlewares with HMR (see server/vite.ts). Serves everything on http://localhost:5000.
- Build (client then server): npm run build
  - Vite builds client to dist/public, then esbuild bundles server/index.ts to dist (ESM format).
- Start production bundle: npm start
  - Runs node dist/index.js on port 5000.
- Type-check: npm run check
- Database (apply schema to Postgres via Drizzle): npm run db:push
  - Requires DATABASE_URL in the environment.

Environment
- DATABASE_URL
  - Required by drizzle.config.ts and server/db.ts. If missing, the server throws at startup. Use a Neon Postgres connection string or any Postgres URL.
- GEMINI_API_KEY
  - Required for /api/vers-chat (Google Generative AI) and server/gemini.ts utilities.
- OPENAI_API_KEY
  - Required for /api/transcribe and /api/text-to-speech in server/routes.ts, and for Whisper/real-time utilities.

High-level architecture and structure
- Web server (Express)
  - server/index.ts: Sets up JSON body parsing, file uploads, request logging for /api/*, registers routes via registerRoutes(app), installs Vite middleware in development (setupVite), and serves static assets from dist/public in production (serveStatic). Always listens on port 5000.
  - server/vite.ts: Dev-only Vite integration with middlewareMode + HMR. In production, serveStatic() serves dist/public/index.html and static assets.
- API surface (server/routes.ts)
  - Core feature areas (backed by storage abstraction):
    - Users: POST /api/users, GET /api/users/:id
    - Progress: GET/PUT /api/progress/:userId
    - Spiritual content: GET /api/content, GET /api/content/:id, POST /api/content
    - Meditation sessions: GET /api/meditations/:userId, POST /api/meditations
    - Community: forum posts, group sessions, community members, post reactions (CRUD-style endpoints)
  - AI + Voice endpoints:
    - Gemini chat: POST /api/vers-chat (uses GEMINI_API_KEY)
    - Transcription (OpenAI Whisper): POST /api/transcribe (multipart audio)
    - Text-to-Speech (OpenAI): POST /api/text-to-speech
    - Resemble.ai TTS: POST /api/spiritual-voice, GET /api/spiritual-voices, GET /api/resemble-test
    - Orpheus TTS (router mounted under /api): e.g., /api/orpheus-health, /api/orpheus-synthesize, /api/orpheus-stream, /api/orpheus-test-voice, /api/orpheus-voices
- Storage abstraction (server/storage.ts)
  - DatabaseStorage: Uses Drizzle ORM with Neon serverless driver (server/db.ts) and the schema in shared/schema.ts.
  - MemStorage: In-memory fallback with seed data. StorageManager swaps between DB and in-memory based on availability checks.
  - All route handlers call storage.<method>, which delegates to the active backend.
- Database schema (shared/schema.ts)
  - Tables: users, user_progress, spiritual_content, meditation_sessions, forum_posts, group_sessions, community_members, post_reactions.
  - Zod insert schemas are exported for request validation in routes (e.g., insertUserSchema, insertSpiritualContentSchema, etc.).
  - Drizzle config (drizzle.config.ts) outputs migrations to ./migrations (created on demand by db:push).
- Client (Vite + React)
  - Vite expects a client/ directory with index.html and src/main.tsx. Output is written to dist/public. Aliases map @ to client/src and @assets to attached_assets.
  - If client/ isn’t present, dev/build will fail; adjust vite.config.ts or add the client scaffold.
- Styling
  - Tailwind CSS configured via tailwind.config.ts and postcss.config.js. Content scanning points to client/index.html and client/src/**/*.
- Static resources
  - attached_assets/ contains numerous HTML resources; referenced via @assets alias for the client.

Notes and caveats
- API keys
  - server/resemble-api.ts contains hardcoded Resemble.ai credentials (RESEMBLE_API_KEY, PROJECT_ID). Treat this as a development placeholder only; move to environment variables before any public deployment.
- ESM
  - The project uses "type": "module". The production server bundle is ESM as well (esbuild --format=esm). Be cautious mixing require() with ESM in new code; prefer standard imports.
- Tests / Lint
  - No test runner or lint configuration is present in this repo. There is a TypeScript check script (npm run check).

Quick verification
- After setting DATABASE_URL (for DB-backed paths) and any AI keys you intend to use, run:
  - npm install
  - npm run dev
  - Hit http://localhost:5000/api/orpheus-health for a quick health check. For Gemini chat, POST JSON { "message": "..." } to /api/vers-chat (requires GEMINI_API_KEY).
