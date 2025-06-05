/**
 * Application Configuration
 * This file centralizes application configuration for both development and production
 */

// Environment detection
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

// Server configuration
export const serverConfig = {
  port: parseInt(process.env.PORT || '5000'),
  host: '0.0.0.0',
  apiPrefix: '/api',
};

// Database configuration
export const dbConfig = {
  maxConnections: isProduction ? 20 : 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
};

// Security configuration
export const securityConfig = {
  corsEnabled: true,
  corsOrigins: isDevelopment 
    ? ['http://localhost:5000'] 
    : [process.env.CORS_ORIGIN || 'https://*.replit.app'],
  sessionSecret: process.env.SESSION_SECRET || 'dev-secret-key',
  helmetEnabled: true,
  rateLimiting: {
    enabled: isProduction,
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,    // 100 requests per minute
  }
};

// Client paths
export const clientConfig = {
  distPath: './dist/client',
  indexHtml: './dist/client/index.html',
  publicPath: '/public'
};

// Feature flags
export const featureFlags = {
  enableAuthentication: true,
  enablePayments: false,
  enableCart: true
};