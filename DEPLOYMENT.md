# Production Deployment Guide

## Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Account
1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account (no credit card required)
3. Verify your email

### 1.2 Create a Cluster
1. Click **"Build a Database"**
2. Choose **"M0 Sandbox"** (Free tier - 512MB storage)
3. Select a cloud provider and region (choose closest to your users)
4. Click **"Create Cluster"** (takes 3-5 minutes)

### 1.3 Create Database User
1. Click **"Database Access"** in left sidebar
2. Click **"+ ADD NEW DATABASE USER"**
3. Choose **"Password"** authentication
4. Enter username: `brand_admin`
5. Click **"Autogenerate Secure Password"** and **COPY IT**
6. Set Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 1.4 Whitelist IP Address
1. Click **"Network Access"** in left sidebar
2. Click **"+ ADD IP ADDRESS"**
3. For Vercel deployment, select **"Allow Access from Anywhere"**
   - Click **"Allow Access from Anywhere"** button
   - This adds `0.0.0.0/0` (all IPs)
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Click **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Choose Driver: **"Node.js"** and Version: **"4.1 or later"**
5. **Copy the connection string**
   - Looks like: `mongodb+srv://brand_admin:<password>@cluster0.xxxxx.mongodb.net/`
6. **Replace `<password>`** with your actual password from step 1.3
7. **Add database name**: `brand-ecommerce` at the end
   - Final format: `mongodb+srv://brand_admin:yourpassword@cluster0.xxxxx.mongodb.net/brand-ecommerce?retryWrites=true&w=majority`

---

## Step 2: Configure Environment Variables

### 2.1 Create Production `.env.production` File

Create a new file `.env.production` in the root directory:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://brand_admin:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/brand-ecommerce?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-random-string

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key-minimum-32-characters-random
NEXTAUTH_URL=https://your-app-name.vercel.app

# Application Settings
DEMO_MODE=false
NODE_ENV=production
```

### 2.2 Generate Secure Secrets

Generate strong random secrets:

**Option 1: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Using OpenSSL**
```bash
openssl rand -base64 32
```

**Option 3: Online Generator**
Visit: [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

### 2.3 Update `.env.local` for Local Testing

```env
# MongoDB (local or Atlas)
MONGODB_URI=mongodb://localhost:27017/brand-ecommerce
# OR use Atlas for local testing:
# MONGODB_URI=mongodb+srv://brand_admin:password@cluster0.xxxxx.mongodb.net/brand-ecommerce

# JWT Configuration
JWT_SECRET=local-development-secret-key-change-in-production

# NextAuth Configuration
NEXTAUTH_SECRET=local-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000

# Application Settings
DEMO_MODE=false
NODE_ENV=development
```

---

## Step 3: Prepare for Vercel Deployment

### 3.1 Create `vercel.json` Configuration

Create `vercel.json` in the root directory:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "regions": ["iad1"],
  "env": {
    "DEMO_MODE": "false"
  }
}
```

### 3.2 Update `next.config.ts` for Production

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Production optimizations
  productionBrowserSourceMaps: false,
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
```

### 3.3 Update `package.json` Scripts

Ensure these scripts exist:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "vercel-build": "npm run build"
  }
}
```

### 3.4 Create `.vercelignore`

Create `.vercelignore` in root directory:

```
node_modules
.next
.env.local
.env*.local
*.log
.vscode
.idea
*.md
.DS_Store
```

### 3.5 Update `.gitignore`

Ensure `.gitignore` includes:

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.*

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env files (IMPORTANT: Never commit these!)
.env*
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

---

## Step 4: Optimize Next.js Build

### 4.1 Enable Production Optimizations

The following are already configured in your project:
- ✅ TypeScript (strict mode)
- ✅ ESLint for code quality
- ✅ Image optimization
- ✅ Automatic code splitting
- ✅ Tree shaking

### 4.2 Additional Optimizations

**Update `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 4.3 Build Size Optimization

**Add to `next.config.ts`:**

```typescript
const nextConfig: NextConfig = {
  // ... existing config
  
  // Minify JavaScript
  swcMinify: true,
  
  // Disable x-powered-by header
  poweredByHeader: false,
  
  // Compress responses
  compress: true,
};
```

---

## Step 5: Deploy to Vercel

### 5.1 Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - production ready"

# Create repository on GitHub
# Then push:
git remote add origin https://github.com/yourusername/brand-ecommerce.git
git branch -M main
git push -u origin main
```

### 5.2 Deploy on Vercel

**Option A: Deploy via Vercel Dashboard**

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repository: `brand-ecommerce`
4. Click **"Import"**

**Configure Project:**

5. **Framework Preset**: Next.js (auto-detected)
6. **Root Directory**: `./` (default)
7. **Build Command**: `npm run build`
8. **Output Directory**: `.next` (default)

**Add Environment Variables:**

9. Click **"Environment Variables"**
10. Add each variable from `.env.production`:
    - `MONGODB_URI` (your Atlas connection string)
    - `JWT_SECRET` (your 32+ char secret)
    - `NEXTAUTH_SECRET` (your 32+ char secret)
    - `NEXTAUTH_URL` (your Vercel URL)
    - `DEMO_MODE` = `false`

11. Click **"Deploy"**

**Option B: Deploy via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? brand-ecommerce
# - Directory? ./
# - Override settings? N

# Add environment variables
vercel env add MONGODB_URI production
vercel env add JWT_SECRET production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add DEMO_MODE production

# Deploy to production
vercel --prod
```

### 5.3 Post-Deployment

**1. Update NEXTAUTH_URL**
- After first deployment, copy your Vercel URL
- Update `NEXTAUTH_URL` in Vercel dashboard:
  - Go to Project Settings → Environment Variables
  - Update `NEXTAUTH_URL` to: `https://your-app-name.vercel.app`
  - Redeploy

**2. Set up Custom Domain (Optional)**
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed
- Update `NEXTAUTH_URL` with custom domain

**3. MongoDB Atlas - Verify Connection**
- Go to MongoDB Atlas → Database Access
- Verify your user exists
- Go to Network Access
- Ensure `0.0.0.0/0` is added (allows Vercel IPs)

---

## Step 6: Verify Deployment

### 6.1 Test Production URL

Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ Product listing works
- ✅ Search functionality works
- ✅ Login/Register works
- ✅ Cart functionality works
- ✅ Admin dashboard accessible (with admin account)

### 6.2 Create Admin User in Production

**Option 1: Run Script Locally with Production DB**

```bash
# Update .env.local with production MongoDB URI
# Then run:
npm run create-admin
```

**Option 2: Use Vercel Functions**

Create `src/app/api/create-admin/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  // Only allow in production with secret
  const { secret, email, password } = await request.json();
  
  if (secret !== process.env.ADMIN_CREATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  await dbConnect();
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User exists' }, { status: 400 });
  }
  
  await User.create({
    name: 'Admin',
    email,
    password,
    role: 'admin',
  });
  
  return NextResponse.json({ success: true });
}
```

Then call: `POST https://your-app.vercel.app/api/create-admin`

---

## Step 7: Monitoring & Maintenance

### 7.1 Vercel Analytics
- Go to Project Settings → Analytics
- Enable Vercel Analytics
- Monitor performance and errors

### 7.2 MongoDB Atlas Monitoring
- Go to Atlas → Metrics
- Monitor database performance
- Set up alerts for errors

### 7.3 Regular Maintenance
- Update dependencies monthly: `npm update`
- Monitor Vercel function logs
- Check MongoDB storage usage
- Review security updates

---

## Quick Reference

### Environment Variables for Vercel

| Variable | Value | Required |
|----------|-------|----------|
| `MONGODB_URI` | Atlas connection string | ✅ |
| `JWT_SECRET` | 32+ char random string | ✅ |
| `NEXTAUTH_SECRET` | 32+ char random string | ✅ |
| `NEXTAUTH_URL` | Your Vercel URL | ✅ |
| `DEMO_MODE` | `false` | ✅ |

### Deployment Commands

```bash
# Test build locally
npm run build

# Deploy to Vercel
vercel --prod

# View logs
vercel logs

# Add environment variable
vercel env add VARIABLE_NAME production
```

### Production URLs

- **Frontend**: `https://your-app.vercel.app`
- **Admin**: `https://your-app.vercel.app/admin`
- **Login**: `https://your-app.vercel.app/login`
- **Products**: `https://your-app.vercel.app/products`

---

## Troubleshooting

### Build Fails
```bash
# Check for TypeScript errors
npm run lint

# Check build locally
npm run build

# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### MongoDB Connection Error
- Verify connection string in Vercel env vars
- Check Network Access allows `0.0.0.0/0`
- Verify database user credentials
- Check cluster is running (not paused)

### API Routes Not Working
- Check environment variables are set
- Verify JWT_SECRET is set
- Check Vercel function logs
- Ensure MongoDB connection is successful

---

## Security Checklist

- ✅ Never commit `.env` files
- ✅ Use strong JWT_SECRET (32+ chars)
- ✅ Enable HTTPS (automatic on Vercel)
- ✅ Set up CORS properly
- ✅ Validate all user inputs
- ✅ Hash passwords with bcrypt
- ✅ Protect admin routes
- ✅ Use environment variables for secrets
- ✅ Enable rate limiting (add if needed)
- ✅ Set up error monitoring

---

## Cost Estimation

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ 100GB serverless function execution
- ✅ Automatic SSL

**MongoDB Atlas Free Tier:**
- ✅ 512MB storage
- ✅ Shared RAM
- ✅ Shared vCPU
- ✅ No credit card required

**Total Cost: $0/month** (for hobby/small projects)

---

Your project is now ready for production deployment! 🚀
