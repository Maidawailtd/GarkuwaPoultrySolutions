# Garkuwa Poultry Farm - Free Deployment Commands

## Quick Deployment (Choose One Method)

### Method 1: Surge.sh (Fastest)
```bash
# Install Surge globally
npm install -g surge

# Create a simple build
mkdir -p simple-build
cp -r public/* simple-build/ 2>/dev/null || true
cp -r images simple-build/ 2>/dev/null || true
echo "<!DOCTYPE html><html><head><title>Garkuwa Poultry Farm</title></head><body><h1>Garkuwa Poultry Farm</h1><p>Modern livestock training and agricultural services</p></body></html>" > simple-build/index.html

# Deploy instantly
cd simple-build && surge
```

### Method 2: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npx vite build --outDir=build
netlify deploy --prod --dir=build
```

### Method 3: Vercel CLI
```bash
# Install and deploy
npm install -g vercel
vercel --prod
```

### Method 4: Manual Upload (No CLI needed)
```bash
# Just create the build folder
npx vite build

# Then go to netlify.com or vercel.com
# Drag and drop the 'dist' folder
```

## Recommended: Start with Surge.sh
It's the simplest and requires no account setup initially.