# 🚀 Deployment Guide

This guide covers how to deploy your Analytics Platform to various hosting services.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All features work locally (`pnpm dev`)
- [ ] Build completes successfully (`pnpm build`)
- [ ] Environment variables are configured (if using APIs)
- [ ] Remove any sensitive data or API keys from code
- [ ] Test the production build locally (`pnpm preview`)

---

## 🌐 Option 1: Vercel (Recommended - Easiest)

Vercel offers the simplest deployment for React applications.

### Steps:

1. **Create a Vercel Account:**
   - Go to https://vercel.com/signup
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Push Code to Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [your-repo-url]
   git push -u origin main
   ```

3. **Import Project to Vercel:**
   - Go to https://vercel.com/new
   - Import your Git repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

4. **Configure (if needed):**
   - Framework Preset: `Vite`
   - Build Command: `pnpm build` or `npm run build`
   - Output Directory: `dist`

5. **Add Environment Variables:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add any `VITE_` prefixed variables

### Custom Domain:
- Go to Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

**Deploy Time:** ~2 minutes  
**Cost:** Free for personal projects  
**Auto-deploys:** Yes, on every push to main branch

---

## 🔷 Option 2: Netlify

Great alternative with similar features to Vercel.

### Steps:

1. **Create Netlify Account:**
   - Go to https://app.netlify.com/signup
   - Sign up with Git provider

2. **Deploy from Git:**
   - Click "New site from Git"
   - Choose your repository
   - Build settings:
     - Build command: `pnpm build` or `npm run build`
     - Publish directory: `dist`

3. **Configure Redirects for React Router:**
   Create `/public/_redirects` file:
   ```
   /*    /index.html   200
   ```

4. **Add Environment Variables:**
   - Site Settings → Environment Variables
   - Add your variables

### Features:
- Instant rollbacks
- Deploy previews for PRs
- Form handling
- Serverless functions

**Deploy Time:** ~2 minutes  
**Cost:** Free for personal projects

---

## 🐙 Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

### Steps:

1. **Install gh-pages:**
   ```bash
   pnpm add -D gh-pages
   ```

2. **Update package.json:**
   ```json
   {
     "homepage": "https://[username].github.io/[repo-name]",
     "scripts": {
       "predeploy": "pnpm build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts:**
   ```typescript
   export default defineConfig({
     base: '/[repo-name]/',
     // ... rest of config
   })
   ```

4. **Deploy:**
   ```bash
   pnpm deploy
   ```

5. **Enable GitHub Pages:**
   - Repository Settings → Pages
   - Source: `gh-pages` branch
   - Click Save

**Note:** GitHub Pages doesn't support React Router by default. You'll need to use HashRouter or implement a 404 redirect workaround.

---

## 🔥 Option 4: Firebase Hosting

Google's hosting solution with great performance.

### Steps:

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase:**
   ```bash
   firebase init hosting
   ```
   - Choose existing project or create new
   - Public directory: `dist`
   - Single-page app: `Yes`
   - GitHub integration: Optional

4. **Build and Deploy:**
   ```bash
   pnpm build
   firebase deploy
   ```

**Features:**
- CDN hosting
- SSL certificates
- Custom domains
- Integration with Firebase services

**Cost:** Free tier available

---

## ☁️ Option 5: AWS S3 + CloudFront

Enterprise-grade hosting with AWS.

### Steps:

1. **Build the app:**
   ```bash
   pnpm build
   ```

2. **Create S3 Bucket:**
   - Go to AWS Console → S3
   - Create bucket with unique name
   - Enable static website hosting
   - Set permissions for public access

3. **Upload dist folder:**
   - Use AWS CLI or web interface
   - Upload all files from `dist/` folder

4. **Configure CloudFront (Optional but recommended):**
   - Create CloudFront distribution
   - Point origin to S3 bucket
   - Configure SSL certificate
   - Set up custom domain

5. **Configure Error Pages:**
   - Error response: 404
   - Response page path: `/index.html`
   - HTTP code: 200

**Cost:** Pay-as-you-go (usually ~$1-5/month for small apps)

---

## 🐳 Option 6: Docker Container

Deploy anywhere that supports Docker.

### Create Dockerfile:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Create nginx.conf:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Build and Run:

```bash
docker build -t analytics-platform .
docker run -p 8080:80 analytics-platform
```

Deploy to:
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Railway
- Render

---

## ⚡ Option 7: Railway

Modern hosting platform with great DX.

### Steps:

1. Go to https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects settings
6. Deploy!

**Features:**
- Automatic deployments
- Environment variables
- Custom domains
- Database hosting

**Cost:** $5/month after free trial

---

## 🔧 Build Optimization

Before deploying, optimize your build:

### 1. Enable compression in vite.config.ts:

```typescript
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({ algorithm: 'gzip' })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
      },
    },
  },
})
```

### 2. Analyze Bundle Size:

```bash
pnpm add -D rollup-plugin-visualizer
```

Update vite.config.ts:
```typescript
import { visualizer } from 'rollup-plugin-visualizer'

plugins: [
  // ... other plugins
  visualizer({ open: true })
]
```

---

## 🔐 Environment Variables

For production, set these in your hosting platform:

```bash
VITE_API_URL=https://api.yourbackend.com
VITE_API_KEY=your_production_key
# Add other variables as needed
```

**Important:** Never commit `.env` files with sensitive data!

---

## 📊 Post-Deployment

After deploying:

1. **Test thoroughly:**
   - All routes work
   - Authentication flows
   - API connections
   - Mobile responsiveness

2. **Set up monitoring:**
   - Sentry for error tracking
   - Google Analytics for usage
   - Performance monitoring

3. **Configure CDN:**
   - Most platforms include this
   - Improves load times globally

4. **Set up CI/CD:**
   - Automated testing before deployment
   - Staging environment
   - Automated deployments on push

---

## 🆘 Troubleshooting Deployment

### Blank page after deployment
- Check browser console for errors
- Verify `base` path in vite.config.ts
- Check if assets are loading (Network tab)

### 404 errors on page refresh
- Configure redirects to index.html
- See hosting-specific React Router setup

### Environment variables not working
- Ensure they're prefixed with `VITE_`
- Restart build after adding variables
- Check hosting platform's env var syntax

### Build fails
- Check build logs for specific errors
- Ensure all dependencies are in `dependencies` not `devDependencies`
- Verify Node version compatibility

---

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deploying)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

---

**Need help? Check the main README.md or create an issue in your repository.**
