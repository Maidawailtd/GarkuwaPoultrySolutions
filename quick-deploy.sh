#!/bin/bash

echo "=== Garkuwa Poultry Farm - Quick Deployment ==="

# Create deployment directory
mkdir -p deploy-ready

# Copy essential files
cp -r public/* deploy-ready/ 2>/dev/null || echo "No public folder found"
cp -r images deploy-ready/ 2>/dev/null || echo "No images folder found"

# Build frontend with minimal config
echo "Building website..."
npx vite build --outDir=deploy-ready --emptyOutDir=false

echo ""
echo "✅ Your website is ready for deployment!"
echo ""
echo "📁 Upload the 'deploy-ready' folder to any of these FREE services:"
echo ""
echo "1. Netlify.com - Drag & drop the folder"
echo "2. Vercel.com - Drag & drop the folder" 
echo "3. Surge.sh - Run: npm install -g surge && cd deploy-ready && surge"
echo "4. GitHub Pages - Push to GitHub and enable Pages"
echo ""
echo "🌐 All provide free hosting with SSL certificates"