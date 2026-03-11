# Render Deployment Guide - Ascension Codex

## ✅ Pre-Deployment Checklist
- [x] Code pushed to GitHub: `sellomakgatho121/Ascension-Codex-app`
- [x] Branch: `main`
- [x] `render.yaml` configured
- [x] `.gitignore` updated (excludes `.env`, `.config/`, `attached_assets/`)
- [x] Server uses dynamic `PORT` from environment
- [x] Production build tested locally

## 🚀 Deploy to Render (Full-Stack Node.js Web Service)

### Step 1: Access Render Dashboard
1. Go to https://render.com
2. Sign in or create an account
3. Connect your GitHub account if not already connected

### Step 2: Create New Web Service from Blueprint
1. Click **"New +"** button in top right
2. Select **"Blueprint"**
3. Connect to repository: `sellomakgatho121/Ascension-Codex-app`
4. Select branch: **`main`**
5. Render will detect `render.yaml` automatically

### Step 3: Review Blueprint Configuration
Render will show the detected configuration:
```yaml
Service Type: Web Service
Name: ascension-codex
Environment: Node
Plan: Free
Build Command: npm ci && npm run build
Start Command: npm start
```

Click **"Apply"** to proceed.

### Step 4: Configure Environment Variables (Optional)
After creating the service, add these optional environment variables:

**Required for AI Features:**
- `GEMINI_API_KEY` - For VERS AI Assistant (/api/vers-chat)
  - Get from: https://makersuite.google.com/app/apikey
  
**Optional:**
- `OPENAI_API_KEY` - For voice transcription and TTS
  - Get from: https://platform.openai.com/api-keys
  
- `DATABASE_URL` - PostgreSQL connection string
  - If not set, app uses in-memory storage (MemStorage)
  - Format: `postgresql://user:password@host:5432/dbname`

**Already Set by Blueprint:**
- `NODE_ENV=production` ✓

### Step 5: Deploy
1. Render will automatically start building
2. Build process (takes 2-5 minutes):
   - Install dependencies: `npm ci`
   - Build frontend: `vite build` → `dist/public/`
   - Build backend: `esbuild server/index.ts` → `dist/index.js`
3. Once build completes, service will start automatically

### Step 6: Access Your Deployed App
Your app will be available at:
```
https://ascension-codex.onrender.com
```
(or similar URL provided by Render)

## 🧪 Test Your Deployment

### Frontend Test
Open the URL in your browser - you should see the Ascension Codex home page.

### API Tests
```bash
# Replace YOUR_RENDER_URL with your actual Render URL

# Test community members endpoint
curl https://YOUR_RENDER_URL/api/community-members

# Test group sessions endpoint
curl https://YOUR_RENDER_URL/api/group-sessions

# Test VERS AI (requires GEMINI_API_KEY)
curl -X POST https://YOUR_RENDER_URL/api/vers-chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Give me a short grounding practice"}'
```

## 📊 Monitor Your Deployment

### Render Dashboard
- **Logs**: View real-time application logs
- **Metrics**: CPU, memory usage
- **Events**: Deployment history
- **Shell**: Access to container shell for debugging

### Health Checks
Render automatically monitors your service. If it becomes unhealthy, Render will restart it.

## 🔄 Auto-Deploy on Git Push

Your service is configured with `autoDeploy: true`, so:
- Every push to `main` branch triggers automatic deployment
- No manual intervention needed
- View deployment status in Render dashboard

## 🐛 Troubleshooting

### Build Fails
- Check Render logs for specific error
- Verify `package.json` dependencies are correct
- Ensure Node version compatibility (using Node 20+)

### App Won't Start
- Check if `PORT` environment variable is being used correctly
- Verify `dist/index.js` was created during build
- Check start command logs in Render dashboard

### Database Connection Issues
- If using PostgreSQL, verify `DATABASE_URL` format
- App falls back to in-memory storage if DB unavailable
- Check logs for database connection errors

### API Not Working
- Verify environment variables are set (GEMINI_API_KEY, etc.)
- Check CORS settings if calling from external frontend
- Review API endpoint logs

## 💡 Tips

1. **Free Tier Limitations**:
   - Service spins down after 15 minutes of inactivity
   - First request after spin-down takes ~30 seconds (cold start)
   - Consider upgrading to paid plan for always-on service

2. **Database Persistence**:
   - In-memory storage resets on each deployment/restart
   - For persistent data, add PostgreSQL database on Render
   - Update `DATABASE_URL` environment variable

3. **Custom Domain**:
   - Add custom domain in Render dashboard
   - Update DNS records as instructed
   - SSL certificate auto-provisioned

4. **Monitoring**:
   - Set up email/Slack notifications for deployment events
   - Monitor error rates and response times
   - Use Render's built-in metrics

## 🎉 Next Steps

After successful deployment:
1. ✅ Test all major features
2. ✅ Add GEMINI_API_KEY for AI assistant
3. ✅ Configure custom domain (optional)
4. ✅ Set up PostgreSQL for persistent storage (optional)
5. ✅ Monitor logs and performance
6. ✅ Share your deployed app!

## 📚 Additional Resources

- Render Documentation: https://render.com/docs
- Render Node.js Guide: https://render.com/docs/deploy-node-express-app
- Render Environment Variables: https://render.com/docs/environment-variables
- Render Blueprints: https://render.com/docs/infrastructure-as-code

---

**Your Ascension Codex app is ready to deploy! 🚀**

Repository: https://github.com/sellomakgatho121/Ascension-Codex-app
Branch: main
Status: Ready for deployment
