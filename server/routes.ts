import express, { Router, Request, Response } from 'express';
import { Server } from 'http';
import { securityMiddleware } from './securityMiddleware';
import { db } from './db';
import { storage } from './storage';

export async function registerRoutes(app: express.Express): Promise<Server> {
  // Apply security middleware
  app.use(securityMiddleware);
  
  // Parse JSON bodies
  app.use(express.json());
  
  // Create API routes
  const apiRouter = Router();
  
  // Health check endpoint
  apiRouter.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'healthy', message: 'Garkuwa Poultry Farm API is running!' });
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