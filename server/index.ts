import express, { Request, Response, NextFunction } from 'express';
import { setupVite, serveStatic, log } from './vite';
import { registerRoutes } from './routes';
import compression from 'compression';
import helmet from 'helmet';
import { setupProductionOptimizations } from './production';
import { serverConfig, isProduction } from './app-config';

const app = express();
const PORT = serverConfig.port;

// Apply compression for faster response times
app.use(compression());

// Add security headers in production
if (isProduction) {
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for now - enable later with proper config
  }));
  
  // Apply additional production optimizations
  setupProductionOptimizations(app);
}

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  const logLine = `${req.method} ${req.path}`;
  log(logLine);
  next();
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = isProduction 
    ? "Server Error, please try again later" // Generic message in production
    : (err.message || "Internal Server Error");
  
  console.error(`Error [${status}]:`, err);
  
  res.status(status).json({
    error: {
      message,
      status,
      timestamp: new Date().toISOString()
    }
  });
});

async function startServer() {
  // Register API routes
  const server = await registerRoutes(app);

  // Vite setup for development, static serving for production
  if (process.env.NODE_ENV === 'development') {
    await setupVite(app, server);
  } else {
    // In production, serve static files with cache headers
    serveStatic(app);
    
    // Add fallback route for SPA after all other routes
    app.get('*', (_req, res) => {
      // Use absolute path to ensure we can find the file
      const indexPath = './dist/client/index.html';
      console.log(`Serving SPA fallback from: ${indexPath}`);
      res.sendFile('index.html', { 
        root: './dist/client',
        // Set proper cache headers for index.html
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    });
  }

  // Handle server errors gracefully
  server.on('error', (e: NodeJS.ErrnoException) => {
    if (e.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
    } else {
      console.error(`Server error: ${e.message}`);
      if (isProduction) {
        // In production, try to continue running if possible
        console.error('Attempting to continue despite error...');
      } else {
        process.exit(1);
      }
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
