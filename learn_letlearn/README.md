# 🎓 Learn & Let Learn - Peer-to-Peer Skill Learning Platform

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--time-010101?style=for-the-badge&logo=socket.io)

**A modern, responsive platform for peer-to-peer skill sharing and learning**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [API](#-api-documentation)

</div>

---

## 🌟 Overview

**Learn & Let Learn** is a comprehensive social learning platform that connects people who want to learn skills with those who can teach them. Combining the best features of LinkedIn (professional networking) and Instagram (engaging content feed), users can share knowledge, verify skills, and grow together.

### 🎯 Key Highlights

- 🔐 **Secure Authentication** - JWT-based auth with email/password
- 👤 **Rich User Profiles** - LinkedIn + Instagram style profiles with skill badges
- ✅ **Skill Verification** - MCQ-based tests with certification badges
- 📱 **Social Feed** - Share posts, projects, and achievements
- 🤝 **Smart Matching** - AI-powered skill matching algorithm
- 💬 **Real-time Chat** - One-on-one messaging with Socket.IO
- 🔔 **Live Notifications** - Get notified of connections, messages, and requests
- 📱 **Fully Responsive** - Mobile-first design with modern UI/UX

---

## ✨ Features

### 🔐 Authentication System
- **Sign Up / Login** with email and password
- JWT token-based authentication
- Password encryption with bcryptjs
- Session management and auto-logout
- Protected routes with auth guards
- "Remember me" functionality

### 👤 User Profile (LinkedIn + Instagram Style)
- **Profile Photo** upload and crop
- **Bio & Description** - Tell your story
- **Skills Offered** - What you can teach
- **Skills Wanted** - What you want to learn
- **Verification Badges** - Show your verified skills
- **Portfolio Section** - Share projects, images, and links
- **Followers & Connections** count
- **Activity Feed** - All user posts and achievements
- **Edit Profile** - Update information anytime

### ✅ Skill Verification System
- **MCQ-based Tests** for each skill
- **Score Calculation** and instant results
- **Verification Badge** on passing
- **Cooldown Period** before retesting
- **Certificate Generation** for verified skills
- **Skill Level Tracking** (Beginner/Intermediate/Advanced)

### 📱 Social Feed (Instagram + LinkedIn Hybrid)
- **Create Posts** - Share projects, achievements, demos
- **Rich Media Support** - Images, videos, links
- **Like & Comment** system
- **Save Posts** for later
- **Share Posts** to social media
- **Hashtag Support** for discoverability
- **Post Analytics** - Views, engagement metrics
- **Trending Posts** section

### 🤝 Skill Matching & Suggestions
- **AI-Powered Matching** based on:
  - Skills user wants to learn
  - Skills others can teach
  - Mutual interests
  - Learning goals
- **Suggested Mentors** - Find teachers
- **Suggested Learners** - Find students
- **Connection Requests** system
- **Match Score** algorithm

### 💬 Real-Time Chat System
- **One-on-one Messaging** with Socket.IO
- **Text Messages** with emoji support
- **Online/Offline Status** indicators
- **Typing Indicators**
- **Message Read Receipts**
- **Chat History** persistence
- **Search Conversations**

### 🔔 Notifications System
- **Real-time Notifications** via Socket.IO
- **Notification Types:**
  - Skill request received
  - Connection request
  - New message
  - Post likes/comments
  - Skill verification results
- **In-app & Push Notifications**
- **Notification Settings** - Customize preferences

---

## 🛠 Tech Stack

### Frontend
- **React.js 19.1.1** - UI framework
- **Vite 7.1.7** - Build tool & dev server
- **React Router DOM 7.9.4** - Client-side routing
- **Bootstrap 5.3.8** - CSS framework
- **React Icons 5.5.0** - Icon library
- **Lucide React 0.562.0** - Modern icon set
- **Axios 1.13.2** - HTTP client
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.19.2** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs 3.0.2** - Password hashing
- **Socket.IO** - WebSocket server
- **CORS 2.8.5** - Cross-origin support
- **dotenv 17.2.3** - Environment variables

### Development Tools
- **ESLint** - Code linting
- **Vite Plugin React** - Fast refresh
- **Git** - Version control

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/learn-letlearn.git
cd learn-letlearn/learn_letlearn
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

4. **Set up environment variables**

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learn-letlearn
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
NODE_ENV=development
SOCKET_PORT=5001
```

Create a `.env` file in the root folder:
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5001
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

6. **Run the application**

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

7. **Access the application**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Socket.IO: `http://localhost:5001`

### Test Credentials

For quick testing, use these credentials:
- **Email:** test@test.com
- **Password:** test123

---

## 📁 Project Structure

```
learn_letlearn/
├── backend/                    # Backend server
│   ├── config/                # Configuration files
│   │   └── db.js             # MongoDB connection
│   ├── controllers/           # Route controllers
│   │   ├── userController.js
│   │   ├── courseController.js
│   │   └── communityController.js
│   ├── middleware/            # Express middleware
│   │   └── authMiddleware.js
│   ├── models/                # MongoDB models
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Community.js
│   │   ├── Post.js
│   │   └── Notification.js
│   ├── routes/                # API routes
│   │   ├── userRoutes.js
│   │   ├── courseRoutes.js
│   │   └── communityRoutes.js
│   ├── server.js             # Express server
│   └── package.json
├── src/                       # Frontend source
│   ├── assets/               # Static assets
│   ├── components/           # Reusable components
│   │   ├── BottomTabs/
│   │   │   ├── BottomTabs.jsx
│   │   │   └── BottomTabs.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/                # Page components
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── HomePage.jsx
│   │   ├── Profile.jsx
│   │   ├── UserProfile.jsx
│   │   ├── Network.jsx
│   │   ├── Messages.jsx
│   │   ├── CreateCommunity.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── utils/                # Utility functions
│   │   ├── authGuard.js
│   │   └── statusManager.js
│   ├── App.jsx               # Main app component
│   ├── App.css
│   ├── main.jsx              # Entry point
│   ├── index.css             # Global styles
│   ├── Navbar.jsx            # Navigation bar
│   └── Navbar.css
├── public/                    # Public assets
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

---

## 📱 Pages & Routes

| Route | Component | Description | Auth Required |
|-------|-----------|-------------|---------------|
| `/` | Redirect | Redirects to signup | No |
| `/signup` | Signup | User registration | No |
| `/login` | Login | User login | No |
| `/home` | HomePage | Main feed with posts | No (limited) |
| `/profile` | Profile | User's own profile | Yes |
| `/user/:userId` | UserProfile | Other user's profile | Yes |
| `/connections` | Network | Connections & suggestions | Yes |
| `/messages` | Messages | Chat interface | Yes |
| `/about` | About | About the platform | Yes |
| `/contact` | Contact | Contact form | Yes |
| `/create-community` | CreateCommunity | Create communities | Yes |
| `/secure-admin-panel-l2` | AdminLogin | Admin login | No |
| `/secure-admin-panel-l2/dashboard` | AdminDashboard | Admin panel | Admin only |

---

## 🎨 UI/UX Design Principles

### Design System
- **Modern & Clean** - Minimalist design with focus on content
- **Mobile-First** - Responsive design starting from 320px
- **Accessibility** - WCAG 2.1 AA compliant
- **Dark Mode Ready** - Toggle between themes
- **Smooth Animations** - CSS transitions and transforms
- **Consistent Spacing** - 8px grid system

### Color Palette
- **Primary:** #007bff (Blue)
- **Secondary:** #6c757d (Gray)
- **Success:** #28a745 (Green)
- **Danger:** #dc3545 (Red)
- **Warning:** #ffc107 (Yellow)
- **Info:** #17a2b8 (Cyan)

### Typography
- **Headings:** System font stack
- **Body:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Code:** 'Monaco', 'Courier New', monospace

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/users/me
Authorization: Bearer {token}
```

### User Endpoints

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "bio": "Full Stack Developer",
  "skillsOffered": ["React", "Node.js"],
  "skillsWanted": ["Python", "Machine Learning"]
}
```

#### Get User By ID
```http
GET /api/users/:userId
Authorization: Bearer {token}
```

### Course/Skill Endpoints

#### Create Course
```http
POST /api/courses
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "React Fundamentals",
  "description": "Learn React from scratch",
  "category": "Web Development"
}
```

#### Get All Courses
```http
GET /api/courses
```

### Community Endpoints

#### Create Community
```http
POST /api/communities
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Web Developers",
  "description": "Community for web developers"
}
```

---

## 🔧 Configuration

### Vite Configuration
See [vite.config.js](vite.config.js) for build and dev server settings.

### ESLint Configuration
See [eslint.config.js](eslint.config.js) for linting rules.

---

## 🧪 Testing

### Test Credentials
- Email: `test@test.com`
- Password: `test123`

### Manual Testing Checklist
- [ ] User registration
- [ ] User login/logout
- [ ] Profile creation and editing
- [ ] Post creation (text, images)
- [ ] Like and comment on posts
- [ ] Follow/unfollow users
- [ ] Send and receive messages
- [ ] Skill verification test
- [ ] Notifications

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [GitHub Profile](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- React and Vite teams for amazing tools
- Bootstrap team for the CSS framework
- MongoDB team for the database
- Socket.IO team for real-time capabilities
- All open-source contributors

---

## 📞 Support

For support, email support@learnletlearn.com or join our Discord community.

---

## 🗺 Roadmap

### Phase 1 (Current) ✅
- [x] Basic authentication
- [x] User profiles
- [x] Social feed
- [x] Basic messaging

### Phase 2 (In Progress) 🚧
- [ ] Skill verification tests
- [ ] Advanced matching algorithm
- [ ] Real-time notifications
- [ ] Video chat integration

### Phase 3 (Planned) 📋
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Gamification system
- [ ] Course marketplace
- [ ] Payment integration

---

<div align="center">

**Made with ❤️ by the Learn & Let Learn Team**

⭐ Star us on GitHub if you find this project helpful!

[Report Bug](https://github.com/yourusername/learn-letlearn/issues) • [Request Feature](https://github.com/yourusername/learn-letlearn/issues)

</div>
