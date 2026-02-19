# 🚀 Quick Start Guide - Analytics Platform

## For Complete Beginners

This guide will help you run the application on your local computer, even if you're new to web development.

---

## Step 1: Download and Install Node.js

1. Go to https://nodejs.org/
2. Download the **LTS version** (recommended for most users)
3. Run the installer and follow the installation wizard
4. Restart your computer after installation

**Verify installation:**
- Open Command Prompt (Windows) or Terminal (Mac/Linux)
- Type: `node --version`
- You should see something like `v18.17.0` or higher

---

## Step 2: Install pnpm (Package Manager)

Open your terminal and run:

```bash
npm install -g pnpm
```

Wait for it to complete. This installs the package manager we'll use.

---

## Step 3: Download the Project

You have two options:

### Option A: Copy from Figma Make
1. In Figma Make, there should be an export or download option
2. Save all files to a folder like `C:\Projects\analytics-platform` (Windows) or `~/Projects/analytics-platform` (Mac/Linux)

### Option B: Clone from Git (if available)
```bash
git clone [your-repo-url]
cd analytics-platform
```

---

## Step 4: Open in VS Code

1. **Download VS Code** (if you don't have it):
   - Go to https://code.visualstudio.com/
   - Download and install

2. **Open the project:**
   - Launch VS Code
   - Click `File` → `Open Folder...`
   - Navigate to your project folder and select it

3. **Install recommended extensions:**
   - VS Code will show a notification asking if you want to install recommended extensions
   - Click "Install All" or "Show Recommendations"

---

## Step 5: Install Dependencies

1. Open the **integrated terminal** in VS Code:
   - Press `` Ctrl+` `` (backtick key, usually below Escape)
   - OR click `Terminal` → `New Terminal` from the menu

2. In the terminal, type:

```bash
pnpm install
```

3. Press Enter and wait (this might take 1-3 minutes)

You'll see a lot of text scrolling - this is normal! Wait until you see a message like "Progress: resolved X, reused X, downloaded X, added X"

---

## Step 6: Start the Application

In the same terminal, type:

```bash
pnpm dev
```

You should see output like:
```
  VITE v6.3.5  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## Step 7: Open in Browser

1. Open your web browser (Chrome, Firefox, Edge, Safari)
2. Go to: **http://localhost:5173**
3. You should see the login page!

---

## Step 8: Login

Use one of these demo accounts:

| Email | Password | Access Level |
|-------|----------|-------------|
| admin@acmecorp.com | password | Full Admin Access |
| analyst@acmecorp.com | password | Analyst Access |
| viewer@acmecorp.com | password | Read-Only Access |

---

## 🎉 You're Done!

The application is now running on your computer. You can:
- View dashboards
- Check inventory
- Analyze operations
- Manage users (if logged in as admin)

---

## Common Issues and Solutions

### ❌ "pnpm: command not found"
**Solution:** Run `npm install -g pnpm` again, then restart your terminal.

### ❌ "port 5173 already in use"
**Solution:** 
- Close other terminals that might be running the app
- Or use a different port: `pnpm dev --port 3000`

### ❌ Module errors or weird issues
**Solution:** 
1. Close the terminal
2. Delete the `node_modules` folder
3. Run `pnpm install` again
4. Run `pnpm dev`

### ❌ Page shows blank or errors
**Solution:** 
- Open browser DevTools (Press F12)
- Check the Console tab for error messages
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh the page (Ctrl+R or Cmd+R)

---

## Stopping the Application

When you're done:
1. Go to the terminal where the app is running
2. Press `Ctrl+C`
3. The application will stop

To start it again, just run `pnpm dev`

---

## File Structure Overview

```
analytics-platform/
│
├── src/                      # Source code
│   ├── app/
│   │   ├── pages/           # Different pages (Login, Dashboard, etc.)
│   │   ├── components/      # Reusable UI pieces
│   │   └── lib/             # Helper functions and data
│   └── styles/              # CSS styling
│
├── package.json             # Project dependencies
├── index.html               # Main HTML file
└── README.md               # Full documentation
```

---

## Next Steps

1. **Explore the code:**
   - Open files in VS Code and read the comments
   - Make small changes and see what happens
   - The app auto-refreshes when you save files!

2. **Customize it:**
   - Change colors in `/src/styles/theme.css`
   - Modify text in page components
   - Add new features

3. **Connect to a backend:**
   - See the main README.md for backend integration guide
   - Currently uses mock data - you'll need to replace with real API calls

---

## Getting Help

If you're stuck:
1. Read error messages carefully (they usually tell you what's wrong)
2. Check the main `README.md` for more detailed information
3. Search for the error message on Google or Stack Overflow
4. Review the code comments in the source files

---

## Useful VS Code Shortcuts

- `Ctrl+P` - Quick file open
- `Ctrl+Shift+P` - Command palette
- `Ctrl+` - Toggle terminal
- `Ctrl+B` - Toggle sidebar
- `Alt+Up/Down` - Move line up/down
- `Ctrl+/` - Comment/uncomment line

---

**Happy coding! 🚀**
