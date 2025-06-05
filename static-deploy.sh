#!/bin/bash

echo "Building Garkuwa Poultry Farm for static hosting..."

# Create a static version without backend dependencies
mkdir -p static-build

# Copy public assets
cp -r public/* static-build/ 2>/dev/null || true
cp -r images static-build/ 2>/dev/null || true

# Build frontend only
VITE_API_URL="" vite build --outDir static-build

echo "Static build completed!"
echo "Upload the 'static-build' folder to:"
echo "- Netlify (free)"
echo "- Vercel (free)"  
echo "- GitHub Pages (free)"
echo "- Surge.sh (free)"