# Vercel Deployment Guide

Your project is fully configured to deploy on Vercel out of the box! The local `vercel` CLI is having permission issues on your machine, so the easiest and most reliable way to deploy is through the Vercel web dashboard linked to your GitHub account.

## Step-by-Step Deployment Instructions:

1. **Go to Vercel**
   Open your browser and navigate to [https://vercel.com/new](https://vercel.com/new).

2. **Connect GitHub**
   If you haven't already, sign in with your GitHub account (`sellomakgatho121`).

3. **Import Project**
   You will see a list of your repositories. Find `Ascension-Codex-app` and click **Import**.

4. **Configure Project**
   - **Framework Preset**: Vercel will likely detect `Vite`. You can leave it as `Other` or `Vite`.
   - **Build Command**: `npm run build` (This is already set in your package.json).
   - **Output Directory**: `dist/public` (Vercel will serve static files from here, and the serverless functions are configured in your existing `vercel.json`).

5. **Environment Variables (Optional but Recommended)**
   If you have an actual PostgreSQL database (e.g., from Neon, Supabase, or Render), add it here:
   - Key: `DATABASE_URL`
   - Value: `postgresql://your_db_url_here...`
   
   *(Note: If you skip this, the app will gracefully fall back to the in-memory `MemStorage` demo database just like it does locally!)*

6. **Click "Deploy"**
   Vercel will run the build process and deploy your app globally.

---

### Database Features Note
Currently, when running locally (or if deployed without `DATABASE_URL`), the server prints:
`WARNING: DATABASE_URL is not set. Database features will fail. Proceeding in offline/demo mode.`

**This is completely normal and expected.** The app has a built-in `MemStorage` class that acts as a dummy database. Your spiritual progress, forum posts, and user data will reset if the server restarts, but the app itself will function perfectly.

To make the database permanent, simply provision a free Postgres database on [Neon.tech](https://neon.tech) and add the connection string to your `.env` file locally, and to your Environment Variables on Vercel.
