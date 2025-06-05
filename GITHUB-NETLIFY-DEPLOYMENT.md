# GitHub + Netlify Deployment Guide

## Your Garkuwa Poultry Farm Website - GitHub to Netlify Deployment

### Files Created for Deployment:
- `netlify.toml` - Netlify configuration
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- Updated `.gitignore` - Proper file exclusions

### Step-by-Step Deployment Process:

#### Step 1: Push to GitHub Repository
```bash
git add .
git commit -m "Deploy Garkuwa Poultry Farm website"
git push origin main
```

#### Step 2: Connect GitHub to Netlify
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" as your provider
4. Select your repository
5. Netlify will automatically detect the `netlify.toml` configuration

#### Step 3: Configure Build Settings (Auto-detected)
- Build command: `npm run build`
- Publish directory: `dist/public`
- Node version: 20

#### Step 4: Deploy
- Netlify will automatically build and deploy your website
- You'll receive a live URL (e.g., yoursite.netlify.app)
- Every push to main branch will trigger automatic redeployment

### Deployment Features:
- Automatic builds on every commit
- SSL certificate (HTTPS)
- Global CDN distribution
- Custom domain support
- Branch previews for pull requests

### Your Website Includes:
- Professional responsive design
- Complete poultry farm showcase
- Product catalog with images
- Contact information
- WhatsApp integration
- Mobile-friendly layout

The repository is now configured for seamless GitHub to Netlify deployment.