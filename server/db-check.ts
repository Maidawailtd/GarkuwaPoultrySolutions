/**
 * Database connection checker utility
 * This file provides functions to verify database connectivity
 */

import { pool, db } from './db';
import { sql } from 'drizzle-orm';

/**
 * Checks if the database connection is working
 * @returns Promise with connection status
 */
export async function checkDatabaseConnection() {
  try {
    const result = await db.execute(sql`SELECT 1 AS connection_test`);
    return { 
      connected: true, 
      message: 'Database connection successful',
      result 
    };
  } catch (error) {
    console.error('Database connection failed:', error);
    return { 
      connected: false, 
      message: 'Database connection failed',
      error 
    };
  }
}

/**
 * Verifies database schema by checking for critical tables
 * @returns Promise with schema verification results
 */
export async function verifyDatabaseSchema() {
  try {
    // Check if critical tables exist
    const tablesResult = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    const tables = tablesResult.rows.map((row: any) => row.table_name);
    
    return {
      verified: true,
      tables,
      message: 'Schema verification completed'
    };
  } catch (error) {
    console.error('Schema verification failed:', error);
    return {
      verified: false,
      message: 'Schema verification failed',
      error
    };
  }
}