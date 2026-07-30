/**
 * Vercel serverless handler for Ascension Codex.
 *
 * Imports initApp() from the built server bundle and awaits it
 * before forwarding requests to the initialized Express app.
 */

// Cache the initialized app across warm starts
let app: any = null;
let initPromise = null;

export default async function handler(req: any, res: any) {
  // Lazy init the Express app on first request
  if (!app) {
    if (!initPromise) {
      initPromise = import("../dist/index.js").then((m) => m.initApp());
      initPromise.catch(() => {
        initPromise = null;
        app = null;
      });
    }
    try {
      app = await initPromise;
    } catch (err: any) {
      console.error("Failed to initialize app:", err.message);
      res.status(500).send(`Server init failed: ${err.message}`);
      return;
    }
  }

  // Forward to Express
  app(req, res);
}