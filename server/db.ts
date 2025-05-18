import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Using a fallback for development if DATABASE_URL is not set
const databaseUrl = process.env.DATABASE_URL || 
  "postgres://postgres:postgres@localhost:5432/postgres";

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle({ client: pool, schema });