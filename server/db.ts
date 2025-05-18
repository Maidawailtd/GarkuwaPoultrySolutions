import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Using a fallback for development if DATABASE_URL is not set
const databaseUrl = process.env.DATABASE_URL || 
  "postgres://postgres:postgres@localhost:5432/postgres";

// Configure pool with better settings for production
const isProduction = process.env.NODE_ENV === 'production';
export const pool = new Pool({ 
  connectionString: databaseUrl,
  max: isProduction ? 20 : 10, // Max connections in pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 5000, // How long to wait for a connection
});

// Setup connection error handling
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
  // Don't crash the server on connection errors
});

export const db = drizzle({ client: pool, schema });