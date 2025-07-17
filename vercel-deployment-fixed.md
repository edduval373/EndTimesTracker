# Fixed Vercel Deployment Guide

## Problem Fixed
The "ERR_CONNECTION_CLOSED" error was caused by an incorrect Vercel configuration. I've now created individual serverless functions for each API endpoint.

## Updated Files Created
- `api/biblical-events.ts` - Individual serverless function
- `api/prophetic-topics.ts` - Individual serverless function  
- `api/news-events.ts` - Individual serverless function
- `vercel.json` - Updated configuration for individual functions

## Step-by-Step Deployment (Updated)

### Step 1: Commit and Push Updated Code
1. Commit all the new API files to your GitHub repository
2. Push the changes to main branch

### Step 2: Redeploy to Vercel
1. Go to your Vercel dashboard
2. Find your EndTimesTracker project
3. Click "Deployments"
4. Click "Redeploy" on the latest deployment
5. Or push new code to trigger automatic deployment

### Step 3: Build Configuration
Vercel will now use:
- **Build Command:** `npm run build`
- **Output Directory:** `dist/public`
- **API Functions:** Individual serverless functions in `/api/`

### Step 4: Environment Variables
Make sure these are set in Vercel:
- `DATABASE_URL` - Your Railway connection string
- `NODE_ENV` - `production`

### Step 5: Test API Endpoints
Once deployed, test these endpoints:
- `https://your-project.vercel.app/api/biblical-events`
- `https://your-project.vercel.app/api/prophetic-topics`
- `https://your-project.vercel.app/api/news-events`

### Step 6: Custom Domain
1. Go to project settings → Domains
2. Add `endtimestracker.app`
3. Follow DNS configuration instructions

## What's Fixed
- ✅ Individual serverless functions instead of full Express app
- ✅ Proper CORS headers for all endpoints
- ✅ Correct Vercel build configuration
- ✅ Static files served from `dist/public`
- ✅ Database connection through Railway

## Expected Result
- Your site should now load properly
- All API endpoints should return your data
- No more "ERR_CONNECTION_CLOSED" errors
- Custom domain will work correctly

The deployment should now work perfectly!