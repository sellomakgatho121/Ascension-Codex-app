import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.warn(
    "WARNING: DATABASE_URL is not set. Database features will fail. Proceeding in offline/demo mode."
  );
}

// Use a dummy connection string if none provided, to allow app to boot
const connectionString = process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/energetic_synthesis";

export const pool = new Pool({ connectionString: connectionString });
export const db = drizzle({ client: pool, schema });