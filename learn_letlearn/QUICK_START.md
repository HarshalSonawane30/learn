# 🚀 Quick Start Guide - Learn & Let Learn Platform

## Welcome! 👋

This guide will help you get the platform up and running in minutes.

---

## ⚡ Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v18 or higher) - [Download](https://nodejs.org/)
- ✅ npm (comes with Node.js)
- ✅ MongoDB - Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- ✅ A code editor (VS Code recommended)

---

## 📦 Installation Steps

### 1. Navigate to Project Directory
```bash
cd c:\Users\ASUS\Desktop\learn\learn_letlearn
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

---

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend` folder:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/learn-letlearn
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/learn-letlearn

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Socket.IO
SOCKET_PORT=5001
```

### Frontend Configuration

Create a `.env` file in the root folder (learn_letlearn):

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5001
```

---

## 🎯 Running the Application

### Option 1: Run Both Servers Simultaneously (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 2: Using Concurrently (if installed)

```bash
npm install -g concurrently
concurrently "cd backend && npm start" "npm run dev"
```

---

## 🌐 Access the Application

Once both servers are running:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Socket.IO:** http://localhost:5001

---

## 🎮 Test the Platform

### Quick Test with Demo Credentials

1. Go to http://localhost:5173
2. Click **Login**
3. Use test credentials:
   - **Email:** test@test.com
   - **Password:** test123
4. You're in! 🎉

### Create Your Own Account

1. Go to http://localhost:5173
2. Click **Sign Up**
3. Fill in your details
4. Login with your new credentials

---

## ✨ Explore New Features

### 1. **Skill Verification Test** 🏆
- Go to your profile
- Click "Take Skill Test"
- Choose a skill (React, Node.js, Python)
- Complete the MCQ test
- Earn verification badges!

**Direct Link:** http://localhost:5173/skill-test/React

### 2. **Skill Matching** 🤝
- Click the ⭐ star icon in the navigation bar
- Or visit: http://localhost:5173/skill-matching
- Find mentors who teach what you want to learn
- Connect with learners who want your skills
- Filter by user type and skills

### 3. **Real-Time Notifications** 🔔
- Click the bell icon in navigation
- View all notifications at: http://localhost:5173/notifications
- Get notified about:
  - Connection requests
  - Skill verifications
  - Post interactions
  - Messages

### 4. **Enhanced Feed** 📱
- Visit: http://localhost:5173/home
- Create posts with rich content
- Like, comment, and share
- Instagram + LinkedIn style interface

### 5. **Professional Profiles** 👤
- Go to: http://localhost:5173/profile
- Edit your profile
- Add skills offered and wanted
- Show verification badges
- Upload projects and portfolio

---

## 🛠️ Troubleshooting

### Issue: MongoDB Connection Error

**Solution:**
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Start MongoDB service (Mac/Linux)
sudo systemctl start mongod
```

### Issue: Port Already in Use

**Solution:**
```bash
# Kill process on port 5173 (Windows)
npx kill-port 5173

# Kill process on port 5000 (Windows)
npx kill-port 5000
```

### Issue: Module Not Found

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Same for backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Issue: Cannot Find 'AppContext'

**Solution:**
The AppContext is now available! If you see errors:
```bash
# Restart the dev server
# Press Ctrl+C to stop
npm run dev
```

---

## 📚 Key Routes Reference

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Landing/Signup redirect | No |
| `/signup` | User registration | No |
| `/login` | User login | No |
| `/home` | Main feed | No (limited features) |
| `/profile` | User profile | Yes |
| `/user/:id` | View other profiles | Yes |
| `/connections` | Network page | Yes |
| `/messages` | Chat interface | Yes |
| `/skill-test/:skill` | Take skill test | Yes |
| `/skill-matching` | Find mentors/learners | Yes |
| `/notifications` | Notifications page | Yes |
| `/create-community` | Create communities | Yes |

---

## 🎨 UI/UX Features

### Modern Design Elements
- ✨ Smooth animations and transitions
- 🎨 Gradient backgrounds
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔄 Loading states and skeleton screens
- 💬 Toast notifications
- 🎯 Hover effects and micro-interactions

### Mobile Responsive
- Bottom tab navigation on mobile
- Touch-friendly buttons and cards
- Optimized layouts for all screen sizes

---

## 🔐 Default Admin Access

For admin panel access:
- URL: http://localhost:5173/secure-admin-panel-l2
- Check backend/controllers/userController.js for admin credentials

---

## 📖 Documentation

For detailed documentation, see:
- **Main README:** [README.md](README.md)
- **API Documentation:** See README.md API section
- **Component Documentation:** Check each component file

---

## 🆘 Need Help?

### Common Questions

**Q: How do I add more skills to the test?**
A: Edit `src/pages/SkillTest.jsx` and add more questions to the `skillQuestions` object.

**Q: How do I customize colors?**
A: Edit CSS files in each component folder or update the global `src/index.css`.

**Q: Can I deploy this?**
A: Yes! See deployment guides for:
- Frontend: Vercel, Netlify
- Backend: Heroku, Render, Railway
- Database: MongoDB Atlas

**Q: Is Socket.IO required?**
A: For real-time features (chat, notifications), yes. But the app works without it with limited features.

---

## 🎉 You're All Set!

You now have a fully functional peer-to-peer learning platform with:
- ✅ User authentication
- ✅ Profile management
- ✅ Skill verification tests
- ✅ Smart skill matching
- ✅ Real-time notifications
- ✅ Social feed
- ✅ Chat system (when backend Socket.IO is configured)

### Next Steps:
1. Customize the UI to match your brand
2. Add more skill tests
3. Integrate real backend APIs
4. Deploy to production
5. Add more features!

---

## 📞 Support

For issues or questions:
- Check [README.md](README.md) for detailed docs
- Review component files for implementation details
- Check browser console for errors
- Review backend logs for API issues

---

**Happy Learning! 🚀📚**

*Built with ❤️ using React, Vite, Node.js, and MongoDB*
