/**
 * Vercel serverless handler for Ascension Codex.
 *
 * Vercel runs `npm run build` first (which creates dist/index.js
 * with the bundled Express app), then this handler imports the
 * built app and hands it to Vercel's Node.js runtime.
 */

// Re-export the built app so Vercel wraps it as a serverless function.
// The build step compiles server/index.ts -> dist/index.js via esbuild.
export { app } from "../dist/index.js";