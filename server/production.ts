/**
 * Production server optimizations
 * This file contains functions to optimize the server performance in production
 */

import { Express, Request, Response, NextFunction } from 'express';

/**
 * Configure performance optimizations for the production environment
 * @param app The Express application instance
 */
export function setupProductionOptimizations(app: Express) {
  // Add cache control headers for static assets
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Only apply caching to static assets
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
    }
    next();
  });

  // Add simple rate limiting for API endpoints
  let requestCounts: Record<string, number> = {};
  const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
  const MAX_REQUESTS_PER_WINDOW = 100; // 100 requests per minute

  // Reset request counts every minute
  setInterval(() => {
    requestCounts = {};
  }, RATE_LIMIT_WINDOW);

  // Rate limiting middleware for API routes
  app.use('/api', (req: Request, res: Response, next: NextFunction) => {
    const clientIP = req.ip || 'unknown';
    requestCounts[clientIP] = (requestCounts[clientIP] || 0) + 1;
    
    if (requestCounts[clientIP] > MAX_REQUESTS_PER_WINDOW) {
      return res.status(429).json({ 
        error: 'Too Many Requests',
        message: 'Please try again later' 
      });
    }
    
    next();
  });

  // Log all server errors
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Keep the server running in production
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Keep the server running in production
  });
}