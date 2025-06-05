# Free Deployment Guide for Garkuwa Poultry Farm Website

## Option 1: Netlify (Recommended - Free with Database)

### Steps:
1. Go to https://netlify.com and create a free account
2. Connect your GitHub repository or drag & drop the `dist` folder
3. For database: Use Supabase (free PostgreSQL)
   - Go to https://supabase.com
   - Create project and get connection URL
   - Update your environment variables

### Commands to prepare:
```bash
# Build the project
npm run build

# The dist/client folder is ready for upload
```

## Option 2: Vercel (Free Tier)

### Steps:
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel login`
3. Run: `vercel --prod`
4. Follow prompts to deploy

## Option 3: GitHub Pages + Backend Service

### Frontend (GitHub Pages):
```bash
# Build static frontend
npm run build
# Upload dist/client to GitHub Pages
```

### Backend (Railway/Render Free):
1. Deploy backend to Railway.app (free tier)
2. Connect to free PostgreSQL on Railway
3. Update frontend API URL

## Option 4: Complete Free Stack

### Frontend: Netlify
### Backend: Railway.app  
### Database: Supabase PostgreSQL

All three services offer generous free tiers perfect for your poultry farm website.

## Recommended Approach:
Use Netlify for simplicity - it can host both frontend and backend functions for free.