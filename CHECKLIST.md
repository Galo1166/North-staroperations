# ✅ Setup & Export Checklist

Use this checklist to ensure everything is properly set up.

---

## 📋 Pre-Export Checklist (In Figma Make)

Before exporting to VS Code, verify in Figma Make:

- [ ] Application loads without errors
- [ ] Login page displays correctly
- [ ] Can log in with demo credentials
- [ ] Dashboard shows data and charts
- [ ] Navigation between pages works
- [ ] All routes are accessible
- [ ] No console errors (check browser DevTools)

---

## 📦 Export Checklist

When exporting/copying files, ensure you have:

### Core Files (Required ⭐)
- [ ] `index.html` - HTML entry point
- [ ] `package.json` - Dependencies list
- [ ] `vite.config.ts` - Build configuration
- [ ] `tsconfig.json` - TypeScript configuration
- [ ] `tsconfig.node.json` - TypeScript Node configuration
- [ ] `postcss.config.mjs` - PostCSS configuration

### Source Code (Required ⭐)
- [ ] `src/main.tsx` - Application entry point
- [ ] `src/app/App.tsx` - Main app component
- [ ] `src/app/routes.tsx` - Route configuration
- [ ] All files in `src/app/components/` folder
- [ ] All files in `src/app/pages/` folder
- [ ] All files in `src/app/lib/` folder
- [ ] All files in `src/styles/` folder

### Configuration Files (Important)
- [ ] `.gitignore` - Git ignore rules
- [ ] `.env.example` - Environment variables template
- [ ] `.vscode/settings.json` - VS Code settings
- [ ] `.vscode/extensions.json` - Recommended extensions

### Documentation Files (Helpful)
- [ ] `README.md` - Main documentation
- [ ] `QUICKSTART.md` - Quick start guide
- [ ] `EXPORT-GUIDE.md` - Export instructions
- [ ] `DEPLOYMENT.md` - Deployment guide
- [ ] `TROUBLESHOOTING.md` - Common issues
- [ ] `PROJECT-SUMMARY.md` - Project overview

### Helper Scripts (Optional)
- [ ] `dev-helper.sh` - Development helper (Mac/Linux)
- [ ] `dev-helper.bat` - Development helper (Windows)

### DO NOT Copy These:
- [ ] ❌ `node_modules/` folder (too large, regenerate with install)
- [ ] ❌ `dist/` folder (build output, regenerate)
- [ ] ❌ `.pnpm-store/` folder (package cache)
- [ ] ❌ Any `.env` files with real credentials

---

## 💻 VS Code Setup Checklist

After copying files to your computer:

### 1. Prerequisites
- [ ] Node.js 18+ installed (`node --version`)
- [ ] pnpm installed (`npm install -g pnpm`)
- [ ] VS Code installed
- [ ] Git installed (optional but recommended)

### 2. Open Project
- [ ] Opened correct folder in VS Code
- [ ] Can see `src/`, `package.json`, etc. in sidebar
- [ ] Terminal opens in project root

### 3. Install Dependencies
```bash
pnpm install
```
- [ ] Command ran without errors
- [ ] `node_modules/` folder created
- [ ] `pnpm-lock.yaml` file created
- [ ] No "MODULE_NOT_FOUND" errors

### 4. Install VS Code Extensions
When VS Code prompts "This workspace has extension recommendations":
- [ ] Clicked "Install All" or "Show Recommendations"
- [ ] Installed: ES7+ React/Redux snippets
- [ ] Installed: Tailwind CSS IntelliSense
- [ ] Installed: ESLint (optional)
- [ ] Installed: Prettier (optional)

### 5. Start Development Server
```bash
pnpm dev
```
- [ ] Server starts without errors
- [ ] See message: "Local: http://localhost:5173/"
- [ ] No error messages in terminal

### 6. Test in Browser
- [ ] Opened http://localhost:5173
- [ ] Login page displays correctly
- [ ] No blank white page
- [ ] CSS styles are loading
- [ ] Icons are showing
- [ ] No errors in browser console (F12)

### 7. Test Login
- [ ] Can type in email/password fields
- [ ] Can click "Sign In" button
- [ ] After login, redirects to dashboard
- [ ] Dashboard shows data and charts
- [ ] Navigation menu is visible

### 8. Test Navigation
- [ ] Click "Inventory" - page loads
- [ ] Click "Operations" - page loads
- [ ] Click "Admin Panel" (if admin) - page loads
- [ ] All pages show content, not errors

### 9. Test Hot Reload
- [ ] Open a file (e.g., `src/app/pages/Dashboard.tsx`)
- [ ] Make a small change (add a space, change text)
- [ ] Save file (Ctrl+S)
- [ ] Browser automatically updates without full refresh

---

## 🧪 Functionality Test Checklist

Test all features work:

### Authentication
- [ ] Can login with: admin@acmecorp.com / password
- [ ] After login, stays logged in on page refresh
- [ ] Can logout from user menu
- [ ] After logout, redirects to login
- [ ] Cannot access dashboard when logged out

### Dashboard Page
- [ ] Shows 4 KPI cards with numbers
- [ ] Shows 4 charts with data
- [ ] Charts have hover tooltips
- [ ] Charts are responsive
- [ ] No "undefined" or errors

### Inventory Page
- [ ] Shows table with inventory items
- [ ] Can search items
- [ ] Can filter by category
- [ ] Can sort columns
- [ ] Status badges show correct colors
- [ ] Shows stock levels

### Operations Page
- [ ] Shows operations KPIs
- [ ] Shows performance charts
- [ ] Data loads correctly
- [ ] Charts render properly

### Admin Panel (login as admin)
- [ ] Can access /admin route
- [ ] Shows user management section
- [ ] Shows data upload section
- [ ] Tab navigation works
- [ ] Cannot access as viewer role

### Layout/UI
- [ ] Header shows on all pages
- [ ] Sidebar shows on all pages (desktop)
- [ ] Mobile menu works (resize browser)
- [ ] User dropdown shows name and role
- [ ] Bell icon for notifications shows
- [ ] All icons load correctly

---

## 🔧 Build Test Checklist

Test production build:

### Build Command
```bash
pnpm build
```
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No build warnings (or only minor ones)
- [ ] `dist/` folder created
- [ ] `dist/` contains index.html
- [ ] `dist/assets/` has JS and CSS files

### Preview Command
```bash
pnpm preview
```
- [ ] Preview server starts
- [ ] Opens at http://localhost:4173 (or similar)
- [ ] App loads and works same as dev mode
- [ ] All features still functional
- [ ] No console errors

---

## 🚀 Deployment Readiness Checklist

Before deploying to production:

### Code Review
- [ ] All demo credentials documented
- [ ] No console.log statements in production code
- [ ] No hardcoded API keys or secrets
- [ ] Error boundaries in place
- [ ] Loading states for async operations

### Configuration
- [ ] Environment variables configured
- [ ] API endpoints set correctly
- [ ] Build command works: `pnpm build`
- [ ] Preview works: `pnpm preview`

### Documentation
- [ ] README.md updated with project info
- [ ] Demo credentials documented
- [ ] API integration guide written
- [ ] Deployment instructions clear

### Testing
- [ ] All pages tested
- [ ] All user roles tested
- [ ] Mobile responsiveness verified
- [ ] Different browsers tested
- [ ] Performance acceptable

### Security
- [ ] Mock auth replaced with real auth (if needed)
- [ ] HTTPS configured for production
- [ ] CORS properly configured
- [ ] Input validation in place
- [ ] XSS protection enabled

### Performance
- [ ] Bundle size reasonable
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] Lazy loading for routes
- [ ] Build size < 5MB (dist folder)

---

## 📝 Ongoing Development Checklist

As you develop:

### Daily Development
- [ ] Run `pnpm dev` to start
- [ ] Check browser console for errors
- [ ] Test changes in browser
- [ ] Save files frequently (auto-saves in VS Code)
- [ ] Commit changes to Git regularly

### Before Each Commit
- [ ] Code works without errors
- [ ] No console errors
- [ ] TypeScript types are correct
- [ ] Removed debug console.logs
- [ ] Tested in browser

### Weekly
- [ ] Check for package updates: `pnpm outdated`
- [ ] Review and fix any warnings
- [ ] Clean up unused code
- [ ] Update documentation if needed

---

## ✅ Final Verification

Everything is set up correctly if:

✅ `pnpm dev` starts without errors  
✅ Browser shows login page at http://localhost:5173  
✅ Can log in with demo credentials  
✅ Dashboard loads with data and charts  
✅ Navigation between pages works  
✅ No errors in browser console  
✅ No errors in terminal  
✅ Hot reload works (save file → browser updates)  
✅ `pnpm build` completes successfully  
✅ `pnpm preview` shows working app  

---

## 🆘 If Something's Not Working

1. **Check TROUBLESHOOTING.md** for common issues
2. **Read error messages carefully** - they tell you what's wrong
3. **Check browser console (F12)** for JavaScript errors
4. **Check terminal** for build/server errors
5. **Try emergency reset:**
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   pnpm dev
   ```

---

## 📚 Quick Reference

### Essential Commands
```bash
pnpm install    # Install dependencies (first time)
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
```

### Essential Files
```
index.html           → HTML entry point
src/main.tsx         → App entry point
src/app/App.tsx      → Main component
src/app/routes.tsx   → Route configuration
package.json         → Dependencies
vite.config.ts       → Build config
```

### Essential URLs
```
Dev:     http://localhost:5173
Preview: http://localhost:4173
```

### Demo Logins
```
Admin:   admin@acmecorp.com / password
Analyst: analyst@acmecorp.com / password
Viewer:  viewer@acmecorp.com / password
```

---

**Use this checklist every time you set up the project or deploy to ensure nothing is missed!**

✅ Happy coding!
