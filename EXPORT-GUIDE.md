# 📥 How to Export from Figma Make and Use in VS Code

This guide explains how to transfer your application from Figma Make to your local development environment.

---

## Method 1: Manual Copy (Recommended for Beginners)

### Step 1: Prepare Your Local Environment

1. **Create a project folder:**
   ```
   Windows: C:\Projects\analytics-platform
   Mac/Linux: ~/Projects/analytics-platform
   ```

2. **Install prerequisites:**
   - Node.js 18+ ([Download](https://nodejs.org/))
   - VS Code ([Download](https://code.visualstudio.com/))
   - pnpm: `npm install -g pnpm`

### Step 2: Copy Files from Figma Make

In Figma Make, you should see all your project files in the file explorer. Copy these files to your local folder:

```
📁 analytics-platform/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 components/
│   │   ├── 📁 lib/
│   │   ├── 📁 pages/
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── 📁 styles/
│   └── main.tsx
├── 📁 .vscode/
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── README.md
├── QUICKSTART.md
└── DEPLOYMENT.md
```

**Important files to copy:**
- ✅ All files in `src/` folder
- ✅ `package.json` (contains dependencies)
- ✅ `index.html` (main HTML file)
- ✅ `vite.config.ts` (build configuration)
- ✅ `tsconfig.json` (TypeScript configuration)
- ✅ All config files (.gitignore, postcss.config.mjs, etc.)
- ✅ Documentation files (README.md, etc.)

### Step 3: Open in VS Code

1. Launch VS Code
2. `File` → `Open Folder...`
3. Select your `analytics-platform` folder
4. Click "Yes, I trust the authors" if prompted

### Step 4: Install Dependencies

Open the integrated terminal (`Ctrl+` ` or View → Terminal`) and run:

```bash
pnpm install
```

Wait for installation to complete (1-3 minutes).

### Step 5: Start Development Server

```bash
pnpm dev
```

Open browser to `http://localhost:5173` - your app should be running!

---

## Method 2: Using Git (For Version Control)

### Step 1: Initialize Git in Figma Make (if available)

If Figma Make supports Git export:
1. Look for Git or Version Control options
2. Initialize repository
3. Commit all files
4. Push to GitHub/GitLab/Bitbucket

### Step 2: Clone to Your Computer

```bash
# Navigate to where you want the project
cd ~/Projects  # or C:\Projects on Windows

# Clone the repository
git clone https://github.com/yourusername/analytics-platform.git

# Enter the project
cd analytics-platform

# Install dependencies
pnpm install

# Start development
pnpm dev
```

---

## Method 3: Download as ZIP (If Available)

### If Figma Make has a "Download" or "Export" option:

1. Click Download/Export button
2. Choose "Download as ZIP" or similar
3. Save the file to your computer
4. Extract the ZIP file to your desired location
5. Follow steps from Method 1, starting from Step 3

---

## Verification Checklist

After copying files, verify you have:

- [ ] `src/main.tsx` exists (entry point)
- [ ] `index.html` exists (HTML template)
- [ ] `package.json` exists (dependencies list)
- [ ] `vite.config.ts` exists (build config)
- [ ] All component files in `src/app/components/`
- [ ] All page files in `src/app/pages/`
- [ ] All style files in `src/styles/`
- [ ] TypeScript config files (`tsconfig.json`, `tsconfig.node.json`)

---

## Common Issues When Exporting

### ❌ Issue: "Cannot find module 'react'"

**Cause:** Dependencies not installed  
**Fix:**
```bash
pnpm install
```

### ❌ Issue: "index.html not found"

**Cause:** Missing index.html file  
**Fix:** Ensure you copied `index.html` to the root of your project folder

### ❌ Issue: Import errors

**Cause:** File paths might be different  
**Fix:** Check that your folder structure matches exactly:
```
src/
  app/
    components/
    pages/
    lib/
  styles/
  main.tsx
```

### ❌ Issue: "Cannot find module './routes'"

**Cause:** routes.tsx is missing or in wrong location  
**Fix:** Ensure `routes.tsx` is in `src/app/routes.tsx`

### ❌ Issue: Blank page or CSS not loading

**Cause:** Build configuration issue  
**Fix:** 
1. Check that `main.tsx` imports CSS: `import './styles/index.css'`
2. Verify `index.html` has the correct script tag: `<script type="module" src="/src/main.tsx"></script>`

---

## File Structure Comparison

Make sure your local structure matches this:

```
analytics-platform/                    ← Project root folder
│
├── node_modules/                      ← Created after pnpm install (don't copy this)
│
├── src/                               ← Source code folder
│   ├── app/                           ← Application code
│   │   ├── components/                ← React components
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── layout/
│   │   │   └── ui/                    ← UI components (buttons, cards, etc.)
│   │   ├── lib/                       ← Helper functions
│   │   │   ├── auth.ts
│   │   │   ├── mockData.ts
│   │   │   └── types.ts
│   │   ├── pages/                     ← Page components
│   │   │   ├── Admin.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Inventory.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Operations.tsx
│   │   ├── App.tsx                    ← Main app component
│   │   └── routes.tsx                 ← Route configuration
│   │
│   ├── styles/                        ← CSS files
│   │   ├── fonts.css
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   │
│   └── main.tsx                       ← ⭐ Entry point (MUST HAVE)
│
├── .vscode/                           ← VS Code settings (optional but helpful)
│   ├── extensions.json
│   └── settings.json
│
├── .env.example                       ← Environment variables template
├── .gitignore                         ← Git ignore file
├── index.html                         ← ⭐ HTML template (MUST HAVE)
├── package.json                       ← ⭐ Dependencies (MUST HAVE)
├── postcss.config.mjs                 ← PostCSS config
├── tsconfig.json                      ← ⭐ TypeScript config (MUST HAVE)
├── tsconfig.node.json                 ← TypeScript Node config
├── vite.config.ts                     ← ⭐ Vite build config (MUST HAVE)
│
├── README.md                          ← Main documentation
├── QUICKSTART.md                      ← Quick start guide
├── DEPLOYMENT.md                      ← Deployment guide
├── dev-helper.sh                      ← Helper script (Mac/Linux)
└── dev-helper.bat                     ← Helper script (Windows)
```

Files marked with ⭐ are critical - the app won't run without them!

---

## Quick Start Commands (Reference)

Once everything is set up:

```bash
# Install dependencies (first time only)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Clean install (if something breaks)
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## Using the Helper Scripts

### On Windows:
1. Double-click `dev-helper.bat`
2. Choose options from the menu

### On Mac/Linux:
1. Make it executable: `chmod +x dev-helper.sh`
2. Run it: `./dev-helper.sh`
3. Choose options from the menu

---

## Next Steps After Export

1. ✅ Verify the app runs: `pnpm dev`
2. 📝 Read `README.md` for full documentation
3. 🚀 Check `DEPLOYMENT.md` to publish online
4. 🔧 Customize the app to your needs
5. 💾 Set up version control (Git)
6. 🔐 Configure environment variables for API keys
7. 🧪 Add tests (optional)
8. 📊 Set up monitoring and analytics (optional)

---

## Getting Help

If you encounter issues:

1. **Check error messages:** Read them carefully - they often tell you exactly what's wrong
2. **Check file paths:** Make sure all files are in the correct locations
3. **Verify dependencies:** Run `pnpm install` again
4. **Clear cache:** Delete `node_modules` and reinstall
5. **Check Node version:** Ensure you have Node 18 or higher (`node --version`)
6. **Browser console:** Press F12 and check for JavaScript errors

---

## Important Notes

### ⚠️ Don't Copy These (they're generated):
- `node_modules/` folder - Too large, regenerated by `pnpm install`
- `dist/` folder - Build output, regenerated by `pnpm build`
- `.pnpm-store/` folder - Package cache
- Any `.cache` folders

### ✅ Do Copy These:
- All `.ts` and `.tsx` files
- All `.css` files
- All config files (`.json`, `.mjs`, `.ts` configs)
- `index.html`
- Documentation files

### 🔐 Security:
- Never commit `.env` files with real API keys
- Use `.env.example` as a template
- Add sensitive files to `.gitignore`

---

## Video Tutorial (If Needed)

If you prefer visual instructions, here's what to search for on YouTube:
- "How to set up React Vite project"
- "React TypeScript project setup"
- "Deploy React app to VS Code"

---

**You're all set! Happy coding! 🎉**

If you have questions, refer to:
- `README.md` - Full documentation
- `QUICKSTART.md` - Beginner-friendly guide
- `DEPLOYMENT.md` - How to publish your app
