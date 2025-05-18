import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "../shared/schema";

// Required for Neon serverless
neonConfig.webSocketConstructor = ws;

// Use environment variable with a fallback for local development
const databaseUrl = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres";

async function runMigration() {
  console.log("Starting database migration...");
  const pool = new Pool({ connectionString: databaseUrl });
  const db = drizzle({ client: pool, schema });
  
  try {
    // This will create the tables based on your schema
    console.log("Creating tables from schema...");
    
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR PRIMARY KEY NOT NULL,
        email VARCHAR UNIQUE,
        first_name VARCHAR,
        last_name VARCHAR,
        profile_image_url VARCHAR,
        role TEXT NOT NULL DEFAULT 'client',
        bio TEXT,
        skills TEXT[],
        location TEXT,
        hourly_rate DOUBLE PRECISION,
        is_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    console.log("✅ Users table created");
    
    // Create sessions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        sid VARCHAR PRIMARY KEY,
        sess JSONB NOT NULL,
        expire TIMESTAMP NOT NULL
      );
      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "sessions" ("expire");
    `);
    console.log("✅ Sessions table created");
    
    // Create categories table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        icon TEXT
      );
    `);
    console.log("✅ Categories table created");
    
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();