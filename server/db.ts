import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import { dbConfig, isProduction } from './app-config';

neonConfig.webSocketConstructor = ws;

// Using a fallback for development if DATABASE_URL is not set
const databaseUrl = process.env.DATABASE_URL || 
  "postgres://postgres:postgres@localhost:5432/postgres";

// Configure pool with optimized settings from config
export const pool = new Pool({ 
  connectionString: databaseUrl,
  max: dbConfig.maxConnections,
  idleTimeoutMillis: dbConfig.idleTimeoutMillis,
  connectionTimeoutMillis: dbConfig.connectionTimeoutMillis
});

// Setup connection error handling
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
  // Don't crash the server on connection errors
});

export const db = drizzle({ client: pool, schema });