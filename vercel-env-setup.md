# Fix Email Save Issue in Production

The email save is failing because the DATABASE_URL environment variable isn't available in Vercel. Here's how to fix it:

## Step 1: Add DATABASE_URL to Vercel

### Option A: Vercel Dashboard (Easiest)
1. Go to your Vercel project dashboard
2. Click "Settings" tab
3. Go to "Environment Variables"
4. Add new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your Railway database URL
   - **Environment**: Production, Preview, Development

### Option B: Vercel CLI
```bash
vercel env add DATABASE_URL
```
Then paste your Railway database URL when prompted.

## Step 2: Get Your Railway Database URL
1. Go to your Railway project
2. Click on your PostgreSQL service
3. Go to "Connect" tab
4. Copy the "Database URL" (starts with postgresql://)

The URL should look like:
```
postgresql://username:password@host:port/database
```

## Step 3: Redeploy
After adding the environment variable, redeploy your project:
```bash
vercel --prod
```

## Step 4: Test
Test the email collection functionality again in production.

## Current Status
- ✅ Email dialog works in preview
- ✅ X button allows bypassing email entry
- ❌ Database connection fails in production (missing DATABASE_URL)
- ✅ Cookie system works for remembering users