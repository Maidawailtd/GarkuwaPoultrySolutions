#!/bin/bash

echo "Starting Garkuwa Poultry Farm deployment..."

# Set environment variables
export NODE_ENV=production
export PORT=3000

# Build frontend first
echo "Building frontend..."
vite build

# Build backend
echo "Building backend..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build completed successfully!"
echo "To deploy: Use Replit's Deploy button or run 'node dist/index.js' in production"