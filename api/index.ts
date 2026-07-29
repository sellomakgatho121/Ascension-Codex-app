/**
 * Vercel serverless handler for Ascension Codex.
 *
 * Vercel runs `npm run build` first (which creates dist/index.js
 * with the bundled Express app), then this handler imports the
 * built app and hands it to Vercel's Node.js runtime.
 */

// Re-export the built app so Vercel wraps it as a serverless function.
// The build step compiles server/index.ts -> dist/index.js via esbuild.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- dist/index.js is generated at build time; no declaration file exists
export { app } from "../dist/index.js";