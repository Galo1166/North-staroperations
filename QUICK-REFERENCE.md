# ⚡ Quick Reference Card

One-page reference for the Analytics Platform.

---

## 🚀 Quick Start (30 seconds)

```bash
# Open terminal in project folder, then:
pnpm install    # First time only
pnpm dev        # Start the app
# Open: http://localhost:5173
```

---

## 🔑 Demo Logins

| Email | Password | Role |
|-------|----------|------|
| `admin@acmecorp.com` | `password` | Admin |
| `analyst@acmecorp.com` | `password` | Analyst |
| `viewer@acmecorp.com` | `password` | Viewer |

---

## 📁 Key Files

```
index.html          → HTML entry
src/main.tsx        → App entry point
src/app/App.tsx     → Main component
src/app/routes.tsx  → Routes
package.json        → Dependencies
```

---

## ⌨️ Essential Commands

```bash
pnpm install     # Install dependencies
pnpm dev         # Start dev server (localhost:5173)
pnpm build       # Build for production
pnpm preview     # Preview production build

# Troubleshooting
rm -rf node_modules pnpm-lock.yaml && pnpm install
```

---

## 🔧 Common Tasks

### Add a new page:
1. Create `src/app/pages/NewPage.tsx`
2. Add route in `src/app/routes.tsx`
3. Add link in `src/app/components/layout/DashboardLayout.tsx`

### Change colors:
Edit `src/styles/theme.css`

### Modify mock data:
Edit `src/app/lib/mockData.ts`

### Add new component:
Create in `src/app/components/`

---

## 🐛 Quick Fixes

**App won't start:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

**Port in use:**
```bash
pnpm dev --port 3000
```

**Blank page:**
- Check browser console (F12)
- Hard refresh (Ctrl+Shift+R)
- Clear cache

**CSS missing:**
- Restart dev server
- Check `src/main.tsx` imports CSS

**TypeScript errors:**
- Restart TS server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

---

## 📚 Documentation

| File | What it covers |
|------|---------------|
| `README.md` | Complete documentation |
| `QUICKSTART.md` | Beginner setup guide |
| `EXPORT-GUIDE.md` | Export from Figma Make |
| `DEPLOYMENT.md` | Deploy to production |
| `TROUBLESHOOTING.md` | Common issues |
| `PROJECT-SUMMARY.md` | Project overview |
| `CHECKLIST.md` | Setup checklist |

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── auth/         → Login components
│   │   ├── dashboard/    → KPI cards, charts
│   │   ├── layout/       → Main layout
│   │   └── ui/           → UI components
│   ├── lib/
│   │   ├── auth.ts       → Authentication
│   │   ├── mockData.ts   → Demo data
│   │   └── types.ts      → TypeScript types
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Inventory.tsx
│   │   ├── Operations.tsx
│   │   └── Admin.tsx
│   ├── App.tsx
│   └── routes.tsx
├── styles/               → CSS
└── main.tsx             → Entry point
```

---

## 🎨 Tech Stack

- **Frontend:** React 18 + TypeScript
- **Routing:** React Router 7
- **Styling:** Tailwind CSS 4
- **UI:** Shadcn UI components
- **Charts:** Recharts
- **Build:** Vite 6
- **Icons:** Lucide React

---

## 🌐 URLs

```
Development:  http://localhost:5173
Preview:      http://localhost:4173
```

---

## 🔌 Backend Integration

Replace mock functions in `src/app/lib/auth.ts`:

```typescript
// Before (mock)
export function login(email, password) {
  const user = mockUsers.find(u => u.email === email)
  return user
}

// After (API)
export async function login(email, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
  return res.json()
}
```

---

## 📊 Features

- ✅ Authentication with RBAC
- ✅ Dashboard with KPIs & charts
- ✅ Inventory management
- ✅ Operations analytics
- ✅ Admin panel
- ✅ Responsive design
- ✅ Mock data (ready for API)

---

## 🚀 Deploy

### Vercel (easiest):
```bash
# Push to GitHub, then:
# 1. Go to vercel.com
# 2. Import repository
# 3. Click Deploy
```

### Build manually:
```bash
pnpm build
# Upload 'dist' folder to any static host
```

See `DEPLOYMENT.md` for all options.

---

## ⚠️ Important Notes

- Currently uses **mock data** - connect real backend for production
- **Mock authentication** - replace with real auth system
- No PII collection - add security before production use
- Demo accounts documented above

---

## 🆘 Help

1. Check error messages
2. Check browser console (F12)
3. Read TROUBLESHOOTING.md
4. Search error on Google
5. Review code comments

---

## 🎯 Next Steps

1. ✅ Get app running locally
2. 📝 Customize for your needs
3. 🔌 Connect to backend API
4. 🧪 Test thoroughly
5. 🚀 Deploy to production

---

**Bookmark this page for quick reference!**

*For detailed info, see README.md or other documentation files.*
