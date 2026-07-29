import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from "@shared/schema";

let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

// Initialize database lazily — fails gracefully on Vercel serverless
// where WebSocket and DATABASE_URL may not be available.
function initDb() {
  if (db) return db;

  try {
    // Dynamic import to avoid crash on platforms without ws support
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ws = require("ws");
    neonConfig.webSocketConstructor = ws;

    const connectionString = process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/energetic_synthesis";
    pool = new Pool({ connectionString });
    db = drizzle({ client: pool, schema });
  } catch (error) {
    console.warn(
      `WARNING: Database initialization failed (${error instanceof Error ? error.message : 'unknown error'}). ` +
      "Running in offline/demo mode with MemStorage. " +
      "Set DATABASE_URL environment variable for persistent storage."
    );
    db = null as any;
  }

  return db;
}

export function getDb() {
  return initDb();
}

export function getPool() {
  initDb();
  return pool;
}