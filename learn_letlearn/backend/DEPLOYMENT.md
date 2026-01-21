# LetLearn Backend - Deployment & Setup Guide

## 📋 Quick Setup

### 1. Local Development

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env with your MongoDB credentials
MONGODB_URI=mongodb+srv://letlearn_user:Letlearn%402026@cluster0.ljqghzy.mongodb.net/letlearn?retryWrites=true&w=majority

# Initialize database (create collections & indexes)
node utils/initializeDB.js

# Start development server
npm run dev
```

### 2. Verify Connection

```bash
# Test MongoDB connection
node -e "import('./test-mongodb.js')"

# Check API health
curl http://localhost:5001/api/health
```

---

## 🚀 Vercel Deployment

### Step 1: Prepare Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Configure production environment"
git push origin main
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel Dashboard**
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `learn_letlearn/backend`
   - **Framework**: Other
   - **Build Command**: `npm install`
   - **Output Directory**: (leave empty)
   - **Install Command**: `npm install`

**Option B: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd learn_letlearn/backend
vercel --prod
```

### Step 3: Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

```
MONGODB_URI = mongodb+srv://letlearn_user:Letlearn%402026@cluster0.ljqghzy.mongodb.net/letlearn?retryWrites=true&w=majority
JWT_SECRET = your_production_secret_key_here
NODE_ENV = production
FRONTEND_URL = https://your-frontend-domain.vercel.app
USE_CLOUDINARY = true
CLOUDINARY_CLOUD_NAME = your_cloudinary_name
CLOUDINARY_API_KEY = your_cloudinary_key
CLOUDINARY_API_SECRET = your_cloudinary_secret
ADMIN_EMAIL = admin@letlearn.com
ADMIN_PASSWORD = your_secure_password
```

### Step 4: Redeploy After Adding Variables

```bash
# Trigger new deployment
vercel --prod
```

---

## 📊 Database Management

### Initialize Collections (First Time Only)
```bash
node utils/initializeDB.js
```

### MongoDB Atlas Dashboard
1. Go to https://cloud.mongodb.com
2. View your cluster: `cluster0`
3. Browse Collections under `letlearn` database
4. Manage data as needed

### MongoDB VS Code Extension
1. Install "MongoDB for VS Code"
2. Connect with:
   ```
   mongodb+srv://letlearn_user:Letlearn%402026@cluster0.ljqghzy.mongodb.net/letlearn
   ```
3. Create playgrounds and query data

---

## 🔐 Security Checklist

- ✅ Never commit `.env` file (it's in .gitignore)
- ✅ Use environment variables for all secrets
- ✅ Change `JWT_SECRET` in production
- ✅ Keep `ADMIN_PASSWORD` secure
- ✅ Whitelist IP in MongoDB Atlas (set to "Allow Anywhere" for Vercel)
- ✅ Use HTTPS only in production
- ✅ Enable CORS only for your frontend domain

---

## 📝 Environment Variables Summary

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGODB_URI` | Database connection | `mongodb+srv://user:pass@cluster.net/db` |
| `JWT_SECRET` | JWT signing key | `your_secret_key_here` |
| `NODE_ENV` | Environment mode | `production` or `development` |
| `PORT` | Server port | `5001` or `3001` |
| `FRONTEND_URL` | Frontend domain | `http://localhost:5173` |
| `USE_CLOUDINARY` | Enable image upload | `true` or `false` |
| `CLOUDINARY_*` | Image service keys | (Cloudinary credentials) |

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "MongoDB connection failed" | Check `MONGODB_URI` is correct and IP is whitelisted |
| "JWT_SECRET is not set" | Add `JWT_SECRET` to environment variables |
| "CORS error" | Update `FRONTEND_URL` in environment variables |
| "Collection not found" | Run `node utils/initializeDB.js` |
| "Port already in use" | Change `PORT` or kill process on that port |

---

## 📚 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Health check |
| `POST /api/auth/register` | User registration |
| `POST /api/auth/login` | User login |
| `GET /api/users/:id` | Get user profile |
| `POST /api/posts` | Create new post |
| `GET /api/posts` | Get all posts |

---

## 🔄 Useful Commands

```bash
# Development
npm run dev              # Start with nodemon

# Production
npm start               # Start production server

# Database
node utils/initializeDB.js    # Initialize database

# Testing
npm test               # Run tests (if configured)

# Build
npm run build          # Build for production
```

---

## 📱 Frontend Configuration

Update `learn_letlearn/.env` (frontend):
```
VITE_API_URL=https://your-backend-domain.vercel.app
VITE_NODE_ENV=production
```

---

## 🎯 Next Steps

1. ✅ Configure MongoDB Atlas
2. ✅ Set up backend on Vercel
3. ✅ Deploy frontend to Vercel
4. ✅ Update CORS and environment variables
5. ✅ Test API endpoints
6. ✅ Monitor performance with Vercel Analytics

---

**Last Updated:** January 21, 2026  
**Status:** Ready for Production  
**Version:** 1.0.0
