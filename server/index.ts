import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import fileUpload from 'express-fileupload';
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, mountSpaFallback, log } from "./vite";
import os from "os";

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  useTempFiles: true,
  tempFileDir: os.tmpdir()
}));
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

export async function initApp(): Promise<Express.Express> {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    try {
      serveStatic(app);
    } catch (err: any) {
      log(`WARNING: serveStatic failed (${err.message}), mounting SPA fallback directly`);
      try {
        mountSpaFallback(app);
      } catch (err2: any) {
        log(`CRITICAL: SPA fallback also failed: ${err2.message}`);
      }
    }
  }

  // Only bind to a port outside of Vercel (local dev / Docker / etc.)
  if (!process.env.VERCEL) {
    const port = 5000;
    server.listen({
      port,
      host: "0.0.0.0",
    }, () => {
      log(`serving on port ${port}`);
    });
  }

  return app;
}

// Initialize immediately for direct execution (npm run dev, npm start)
initApp().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

export { app };
