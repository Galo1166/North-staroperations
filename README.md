# B2B Analytics Platform

A production-ready operations and inventory management analytics platform built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Role-Based Access Control (RBAC)**: Four user roles with different permissions
  - Super Admin: System-wide management
  - Organization Admin: User and data management
  - Analyst: Dashboard access with edit capabilities
  - Viewer: Read-only access
  
- **Analytics Dashboards**:
  - Operations Performance Metrics (order fulfillment, lead time, efficiency)
  - Inventory Management (real-time levels, stock movements, forecasting)
  - Interactive charts with drill-down capabilities
  
- **Admin Features**:
  - User management
  - Data upload functionality
  - Organization settings

- **Tech Stack**:
  - React 18 + TypeScript
  - React Router for navigation
  - Recharts for data visualization
  - Tailwind CSS + Shadcn UI components
  - Vite for blazing-fast development

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (recommended) or npm or yarn

To install pnpm globally:
```bash
npm install -g pnpm
```

## 🛠️ Setup Instructions for VS Code

### Step 1: Copy the Code

1. Download all files from Figma Make or copy the entire project structure
2. Create a new folder on your computer (e.g., `analytics-platform`)
3. Copy all files into this folder

### Step 2: Open in VS Code

1. Open VS Code
2. Click `File` → `Open Folder...`
3. Select your project folder (`analytics-platform`)

### Step 3: Install Dependencies

Open the integrated terminal in VS Code (`Terminal` → `New Terminal` or `` Ctrl+` ``) and run:

```bash
# Using pnpm (recommended)
pnpm install

# OR using npm
npm install

# OR using yarn
yarn install
```

This will install all required packages (may take 1-2 minutes).

### Step 4: Start Development Server

Run the development server:

```bash
# Using pnpm
pnpm dev

# OR using npm
npm run dev

# OR using yarn
yarn dev
```

The application will start at `http://localhost:5173`

### Step 5: Open in Browser

Open your browser and navigate to:
```
http://localhost:5173
```

## 🔐 Demo Accounts

Use these credentials to login:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@acmecorp.com | password |
| **Analyst** | analyst@acmecorp.com | password |
| **Viewer** | viewer@acmecorp.com | password |
| **Super Admin** | admin@analytics.tech | password |

## 📁 Project Structure

```
analytics-platform/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── dashboard/     # Dashboard widgets
│   │   │   ├── layout/        # Layout components
│   │   │   └── ui/            # Shadcn UI components
│   │   ├── lib/
│   │   │   ├── auth.ts        # Authentication logic
│   │   │   ├── mockData.ts    # Mock data for demos
│   │   │   └── types.ts       # TypeScript types
│   │   ├── pages/
│   │   │   ├── Login.tsx      # Login page
│   │   │   ├── Dashboard.tsx  # Main dashboard
│   │   │   ├── Inventory.tsx  # Inventory management
│   │   │   ├── Operations.tsx # Operations analytics
│   │   │   └── Admin.tsx      # Admin panel
│   │   ├── App.tsx            # Main app component
│   │   └── routes.tsx         # Route configuration
│   ├── styles/                # CSS styles
│   └── main.tsx               # App entry point
├── index.html                 # HTML template
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

## 🔧 Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🎨 Customization

### Adding New Features

1. **Create components** in `/src/app/components/`
2. **Add pages** in `/src/app/pages/`
3. **Update routes** in `/src/app/routes.tsx`
4. **Add types** in `/src/app/lib/types.ts`

### Modifying Styles

- Global styles: `/src/styles/theme.css`
- Tailwind config: Update classes directly in components
- UI components: `/src/app/components/ui/`

## 🔌 Backend Integration

This app currently uses mock data. To connect to a real backend:

1. Replace mock functions in `/src/app/lib/auth.ts`
2. Update data fetching in pages to call your API
3. Add API client (e.g., axios, fetch)
4. Update mock data imports with real API endpoints

### Example API Integration:

```typescript
// Replace in auth.ts
export async function login(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
}
```

## 📦 Database Schema

The application is designed to work with these tables:

- **organizations** - Company/organization data
- **users** - User accounts with role-based permissions
- **inventory_items** - Product/item catalog
- **transactions** - Inventory movements and transactions
- **operational_metrics** - KPIs and performance data

See `/src/app/lib/types.ts` for complete schema definitions.

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

This creates an optimized build in the `dist` folder.

### Deploy to:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag `dist` folder to Netlify
- **GitHub Pages**: Use `gh-pages` package
- **Any static host**: Upload contents of `dist` folder

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
pnpm dev --port 3000
```

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript errors
```bash
# Restart TypeScript server in VS Code
# Press Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

## 📝 VS Code Recommended Extensions

Install these extensions for the best development experience:

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **ESLint**
4. **Prettier - Code formatter**
5. **TypeScript Vue Plugin (Volar)**

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the code comments in source files
3. Check the console for error messages

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**
