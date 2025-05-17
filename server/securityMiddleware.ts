import { Request, Response, NextFunction } from 'express';

/**
 * Security middleware to mitigate esbuild development server vulnerability
 * This middleware helps protect against the vulnerability in esbuild that allows
 * any website to send requests to the development server
 */
export function securityMiddleware(req: Request, res: Response, next: NextFunction) {
  // Check for common CSRF patterns
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  
  // Block requests from unexpected origins in development mode
  if (process.env.NODE_ENV === 'development') {
    // Allow requests without origin/referer headers (direct browser navigation)
    if (!origin && !referer) {
      return next();
    }
    
    // Check if origin/referer is from localhost or our app domain
    const allowedOrigins = [
      'localhost',
      '127.0.0.1',
      process.env.HOST || '',
      new URL(`http://${req.headers.host}`).hostname
    ];
    
    const isAllowed = allowedOrigins.some(allowed => 
      (origin && origin.includes(allowed)) || 
      (referer && referer.includes(allowed))
    );
    
    if (!isAllowed) {
      console.warn(`Blocked suspicious request from origin: ${origin || 'unknown'}, referer: ${referer || 'unknown'}`);
      return res.status(403).json({ error: 'Access denied' });
    }
  }
  
  next();
}