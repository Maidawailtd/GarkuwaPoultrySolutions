import express, { Request, Response, NextFunction } from 'express';
import { setupVite, serveStatic, log } from './vite';
import { registerRoutes } from './routes';

const app = express();
const PORT = parseInt(process.env.PORT || '5000'); // Use environment variable with fallback

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  const logLine = `${req.method} ${req.path}`;
  log(logLine);
  next();
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  console.error(err);
  res.status(status).json({ message });
});

async function startServer() {
  // Register API routes
  const server = await registerRoutes(app);

  // Vite setup for development
  if (process.env.NODE_ENV === 'development') {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Handle port in use errors gracefully
  server.on('error', (e: NodeJS.ErrnoException) => {
    if (e.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
    }
  });

  server.listen(PORT, '0.0.0.0', () => {
    log(`serving on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
