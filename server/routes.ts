import express, { Router, Request, Response } from 'express';
import { Server } from 'http';
import { securityMiddleware } from './securityMiddleware';
import { db } from './db';
import { storage } from './storage';
import { sql } from 'drizzle-orm';

export async function registerRoutes(app: express.Express): Promise<Server> {
  // Apply security middleware
  app.use(securityMiddleware);
  
  // Parse JSON bodies
  app.use(express.json());
  
  // Create API routes
  const apiRouter = Router();
  
  // Health check endpoint with database connection test
  apiRouter.get('/health', async (_req: Request, res: Response) => {
    try {
      // Test database connection
      const result = await db.execute(sql`SELECT 1 AS health_check`);
      
      // Get server timestamp
      const timestamp = new Date().toISOString();
      
      res.status(200).json({ 
        status: 'healthy', 
        message: 'Garkuwa Poultry Farm API is running!',
        database: 'connected',
        timestamp,
        environment: process.env.NODE_ENV || 'development'
      });
    } catch (err) {
      console.error('Database connection error:', err);
      res.status(500).json({ 
        status: 'unhealthy', 
        message: 'API is running but database connection failed',
        database: 'disconnected',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Auth endpoints
  apiRouter.get('/auth/user', (req: Request, res: Response) => {
    // For now, return unauthorized until auth is implemented
    res.status(401).json({ message: 'Unauthorized' });
  });

  // Mount API router
  app.use('/api', apiRouter);

  // Create HTTP server
  const server = new Server(app);
  
  return server;
}