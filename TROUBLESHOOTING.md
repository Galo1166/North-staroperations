# 🔧 Troubleshooting Guide

Common issues and their solutions when running the Analytics Platform.

---

## Installation Issues

### ❌ "npm: command not found" or "node: command not found"

**Problem:** Node.js is not installed or not in PATH

**Solution:**
1. Download Node.js from https://nodejs.org/ (LTS version)
2. Install it
3. Restart your terminal/computer
4. Verify: `node --version`

---

### ❌ "pnpm: command not found"

**Problem:** pnpm is not installed globally

**Solution:**
```bash
npm install -g pnpm
```

If that doesn't work, use npm instead:
```bash
# Replace pnpm with npm in all commands
npm install
npm run dev
```

---

### ❌ "Permission denied" (Mac/Linux)

**Problem:** Insufficient permissions

**Solution:**
```bash
# Don't use sudo with pnpm install!
# Instead, fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```

---

### ❌ Installation hangs or takes forever

**Problem:** Network issues or corrupted cache

**Solution:**
```bash
# Clear pnpm cache
pnpm store prune

# Or clear npm cache
npm cache clean --force

# Then try again
pnpm install
```

---

## Development Server Issues

### ❌ Port 5173 already in use

**Problem:** Another process is using port 5173

**Solution 1 - Use different port:**
```bash
pnpm dev --port 3000
```

**Solution 2 - Kill existing process:**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9

# Or use npx
npx kill-port 5173
```

---

### ❌ "Cannot find module" errors

**Problem:** Missing dependencies or incorrect imports

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Or on Windows
rmdir /s /q node_modules
del pnpm-lock.yaml
pnpm install
```

Check import paths:
```typescript
// ✅ Correct
import { Button } from '../ui/button'
import { getCurrentUser } from '../../lib/auth'

// ❌ Incorrect
import { Button } from '@/components/ui/button'  // @ alias might not be configured
import { getCurrentUser } from 'lib/auth'  // Missing relative path
```

---

### ❌ Blank white page

**Problem:** JavaScript errors or missing entry point

**Solution:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Verify `src/main.tsx` exists
4. Verify `index.html` has correct script tag:
   ```html
   <script type="module" src="/src/main.tsx"></script>
   ```
5. Clear browser cache (Ctrl+Shift+Delete)
6. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

### ❌ CSS not loading / Styles missing

**Problem:** CSS import issues or Tailwind not configured

**Solution:**
1. Check `src/main.tsx` imports CSS:
   ```typescript
   import './styles/index.css'
   ```

2. Verify `src/styles/index.css` imports other styles:
   ```css
   @import './fonts.css';
   @import './tailwind.css';
   @import './theme.css';
   ```

3. Check `postcss.config.mjs` exists

4. Restart dev server:
   ```bash
   # Press Ctrl+C to stop
   pnpm dev
   ```

---

### ❌ HMR (Hot Module Replacement) not working

**Problem:** Changes not reflecting automatically

**Solution:**
1. Check if file is saved (Ctrl+S)
2. Restart dev server
3. Check browser console for WebSocket errors
4. Try different browser
5. Disable browser extensions
6. Check firewall settings

---

## Build Issues

### ❌ Build fails with TypeScript errors

**Problem:** Type errors in code

**Solution:**
```bash
# Check specific errors
npx tsc --noEmit

# Common fixes:
# 1. Add type annotations
# 2. Check import statements
# 3. Verify all props are typed correctly
```

Example fixes:
```typescript
// ❌ Error: Parameter 'e' implicitly has an 'any' type
const handleClick = (e) => { }

// ✅ Fixed
const handleClick = (e: React.MouseEvent) => { }
```

---

### ❌ "out of memory" during build

**Problem:** Build process needs more memory

**Solution:**
```bash
# Increase Node memory limit
NODE_OPTIONS=--max-old-space-size=4096 pnpm build

# Or in package.json
"scripts": {
  "build": "NODE_OPTIONS=--max-old-space-size=4096 vite build"
}
```

---

### ❌ Build succeeds but preview fails

**Problem:** Asset path issues

**Solution:**
1. Check `vite.config.ts` base path
2. Ensure all imports use correct paths
3. Verify dist folder has all files
4. Check browser console in preview

---

## React Router Issues

### ❌ 404 error on page refresh (after deployment)

**Problem:** Server doesn't support client-side routing

**Solution depends on hosting:**

**Netlify:** Create `public/_redirects`:
```
/*    /index.html   200
```

**Vercel:** Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Apache:** Create `.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:** Configure nginx.conf:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

### ❌ Routes not working at all

**Problem:** Router configuration issue

**Solution:**
1. Verify `routes.tsx` has correct structure
2. Check `App.tsx` uses RouterProvider:
   ```typescript
   import { RouterProvider } from 'react-router'
   import { router } from './routes'
   
   export default function App() {
     return <RouterProvider router={router} />
   }
   ```
3. Ensure using `react-router` (not `react-router-dom`)

---

## Authentication Issues

### ❌ Login not working

**Problem:** Mock authentication logic issue

**Check:**
1. Using correct credentials:
   - Email: `admin@acmecorp.com`
   - Password: `password`

2. Check browser console for errors

3. Verify localStorage is enabled in browser

4. Try different browser (incognito mode)

**Debug:**
```typescript
// Add console.log in src/app/lib/auth.ts
export function login(email: string, password: string) {
  console.log('Login attempt:', email)
  const user = Object.values(mockUsers).find(u => u.email === email)
  console.log('Found user:', user)
  // ... rest of function
}
```

---

### ❌ Stuck in redirect loop

**Problem:** Protected route logic issue

**Solution:**
```typescript
// Check src/app/routes.tsx
// Ensure ProtectedRoute doesn't always redirect
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = isAuthenticated()
  console.log('Is authenticated:', isAuth)  // Debug
  
  if (!isAuth) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
```

---

## VS Code Issues

### ❌ TypeScript errors in editor but code works

**Problem:** VS Code TypeScript server out of sync

**Solution:**
1. Press `Ctrl+Shift+P`
2. Type: "TypeScript: Restart TS Server"
3. Press Enter

Or:
```bash
# Reload VS Code window
Ctrl+Shift+P → "Developer: Reload Window"
```

---

### ❌ Imports showing errors (red squiggles)

**Problem:** Path resolution issue

**Solution:**
1. Check `tsconfig.json` has correct paths:
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. Restart TS server (see above)

3. Verify `vite.config.ts` has resolve alias:
   ```typescript
   resolve: {
     alias: {
       '@': path.resolve(__dirname, './src'),
     },
   }
   ```

---

### ❌ Extensions not working

**Solution:**
1. Install recommended extensions (VS Code will prompt)
2. Reload VS Code after installing
3. Check extension settings for conflicts
4. Disable other extensions to test

---

## Browser Issues

### ❌ App works in Chrome but not Safari/Firefox

**Problem:** Browser compatibility

**Solution:**
1. Check browser console for specific errors
2. Update browser to latest version
3. Clear browser cache
4. Check if polyfills are needed
5. Test in private/incognito mode

---

### ❌ Recharts not rendering

**Problem:** SVG rendering or sizing issue

**Solution:**
```typescript
// Ensure ResponsiveContainer has height
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    {/* ... */}
  </LineChart>
</ResponsiveContainer>
```

---

## Performance Issues

### ❌ App is slow

**Solutions:**
1. **Check bundle size:**
   ```bash
   pnpm build
   # Check dist folder size
   ```

2. **Lazy load routes:**
   ```typescript
   const Dashboard = lazy(() => import('./pages/Dashboard'))
   ```

3. **Optimize images:**
   - Use WebP format
   - Compress images
   - Use appropriate sizes

4. **Check for console warnings:**
   - Open DevTools
   - Look for performance warnings

---

### ❌ Memory leaks

**Problem:** Components not cleaning up

**Solution:**
```typescript
// Always cleanup in useEffect
useEffect(() => {
  const interval = setInterval(() => {
    // Do something
  }, 1000)
  
  // Cleanup
  return () => clearInterval(interval)
}, [])
```

---

## Deployment Issues

### ❌ Works locally but not in production

**Checklist:**
- [ ] Build completes without errors
- [ ] Environment variables set in hosting platform
- [ ] All env vars prefixed with `VITE_`
- [ ] Server configured for SPA routing
- [ ] Assets loading correctly (check Network tab)
- [ ] No console errors in production
- [ ] Correct base path in vite.config.ts

---

### ❌ Environment variables not working

**Problem:** Variables not accessible

**Solution:**
1. Ensure prefix: `VITE_API_URL` not `API_URL`
2. Access with: `import.meta.env.VITE_API_URL`
3. Rebuild after adding variables
4. Check hosting platform docs for env var syntax

---

## Data/Mock Data Issues

### ❌ Charts showing no data

**Solution:**
1. Check `src/app/lib/mockData.ts` exists
2. Verify data structure matches chart expectations
3. Check console for data-related errors
4. Add console.log to debug:
   ```typescript
   const data = getMockData()
   console.log('Chart data:', data)
   ```

---

## Getting More Help

### Steps to debug any issue:

1. **Read error message carefully**
   - Error messages usually tell you exactly what's wrong

2. **Check browser console (F12)**
   - Look for red errors
   - Check Network tab for failed requests

3. **Check terminal output**
   - Look for build errors or warnings

4. **Search the error**
   - Copy error message
   - Search on Google or Stack Overflow
   - Often someone had the same issue

5. **Isolate the problem**
   - What was the last thing you changed?
   - Does it work in a fresh install?
   - Try commenting out recent changes

6. **Check versions**
   - Run `node --version` (should be 18+)
   - Run `pnpm --version`
   - Update if needed

---

## Emergency Reset

If everything is broken and you want to start fresh:

```bash
# 1. Backup your code changes
# Copy any modified files to a safe location

# 2. Delete everything
rm -rf node_modules pnpm-lock.yaml dist .vite

# 3. Reinstall
pnpm install

# 4. Try development server
pnpm dev

# 5. If still broken, try build
pnpm build
```

---

## Still Stuck?

**Create a minimal reproduction:**
1. Start with a fresh install
2. Add back changes one at a time
3. Find which change causes the issue
4. Fix that specific thing

**Check these resources:**
- [Vite Docs](https://vitejs.dev/)
- [React Router Docs](https://reactrouter.com/)
- [Tailwind Docs](https://tailwindcss.com/)
- [Stack Overflow](https://stackoverflow.com/)

---

**Remember:** Every developer faces these issues! Debugging is a skill that improves with practice. 🚀
