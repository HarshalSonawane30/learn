# LetLearn - Peer-to-Peer Learning Platform

A modern, responsive P2P skill learning platform built with React, Vite, and Tailwind CSS. Connect with teachers and learners, share knowledge, and grow together!

## 🌟 Features

### Role-Based System
- **Teacher**: Share your expertise and teach others
- **Learner**: Find mentors and learn new skills
- **Both**: Teach what you know and learn what you don't!

### Core Features
- 🔐 **Authentication**: Secure login/register with role selection
- 🏠 **Home Feed**: Suggested profiles based on your interests with 70-95% match scores
- 🔍 **Smart Search**: Find teachers and learners by skills and role
- 💬 **Real-Time Chat**: Message with emoji support and file sharing
- 📝 **Create Posts**: Share text, images, and videos
- 👤 **Rich Profiles**: View skills, certificates, posts, and availability

### Teaching Features
- 📅 **Time Slot Management**: Set and display your available teaching times
- 🎥 **Video Sessions**: Conduct and record video teaching sessions
- 📄 **Assignments & Documentation**: Share learning materials
- ⭐ **Ratings & Reviews**: Track your teaching performance

### Profile Features
- 🎓 **Skills Showcase**: Display what you can teach and want to learn
- 🏆 **Certificates**: Upload and verify your certificates
- 📊 **Stats Dashboard**: View ratings, students count, and courses completed
- 📍 **Location & Bio**: Share your location and background

### Additional Features
- 📱 **Bottom Navigation**: Easy mobile-first navigation (hidden on auth pages)
- 🎨 **Modern UI**: Clean Tailwind CSS design with smooth animations
- 🌓 **Responsive**: Works perfectly on desktop and mobile devices
- 🚀 **Fast**: Built with Vite for lightning-fast performance

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.x with @tailwindcss/postcss
- **Routing**: React Router DOM 7.9.4
- **Icons**: Lucide React
- **HTTP Client**: Axios 1.13.2
- **Real-Time**: Socket.IO Client (ready for backend integration)

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project
cd learn_letlearn

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Usage

1. **Start the app**: `npm run dev` - Opens at http://localhost:5173

2. **Register**: Create an account and select your role (Teacher/Learner/Both)

3. **Complete Profile**: Add your skills, location, and bio

4. **Explore**: Browse the home feed for suggested connections

5. **Connect**: Search for users, view profiles, and start messaging

6. **Share**: Create posts to share your learning journey

7. **Teach**: Set your availability and start teaching sessions

## 📱 Pages Overview

### Auth Pages (No Bottom Nav)
- **/login**: User login
- **/register**: User registration with role selection

### Main Pages (With Bottom Nav)
- **/home**: Feed with suggestions and posts
- **/search**: Find teachers and learners
- **/chat**: Real-time messaging
- **/create-post**: Share content
- **/profile**: Your profile
- **/profile/:userId**: View other user profiles

## 🎨 Design Features

### Tailwind CSS Configuration
- **Custom Colors**:
  - Primary: Blue (#3B82F6)
  - Secondary: Purple (#8B5CF6)
- **Custom Components**: Buttons, cards, badges, inputs
- **Animations**: Fade in, slide up, bounce
- **Responsive**: Mobile-first approach

### Component Structure
```
src/
├── components/
│   ├── common/
│   │   └── BottomNav.jsx
│   ├── auth/
│   ├── profile/
│   ├── chat/
│   └── teaching/
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── Home.jsx
│   ├── Search.jsx
│   ├── Chat.jsx
│   ├── CreatePost.jsx
│   └── UserProfile.jsx
├── services/
├── hooks/
├── context/
│   └── AppContext.jsx
└── utils/
```

## 🔐 Authentication Flow

1. User visits `/login` or `/register`
2. After successful registration, user selects role (Teacher/Learner/Both)
3. Token stored in localStorage
4. User redirected to `/home`
5. Bottom navigation appears on all pages except auth pages
6. Protected routes check for token

## 🎯 Matching Algorithm

The platform suggests users based on:
- **Skills Match**: Comparing your learning interests with teacher expertise
- **Role Compatibility**: Teachers matched with learners
- **Location**: Nearby users for in-person sessions (optional)
- **Match Score**: 70-95% compatibility displayed on profiles

## 📊 Profile Tabs

1. **About**: Bio and introduction
2. **Skills**: What you teach and want to learn
3. **Certificates**: Uploaded and verified certificates
4. **Posts**: Your shared content
5. **Availability** (Teachers): Time slots for teaching

## 💬 Chat Features

- Real-time messaging (Socket.IO ready)
- Emoji picker with popular emojis
- File and image sharing
- Message timestamps
- Online/offline status indicators
- Conversation list
- File preview and download

## 🔄 State Management

Using React Context API (`AppContext.jsx`) for:
- User authentication state
- Profile data
- Notifications
- Messages
- Skills and connections

## 🌐 API Integration

The app is ready for backend integration. Replace mock data in:
- `/pages/auth/Login.jsx` - Line 30
- `/pages/auth/Register.jsx` - Line 69
- `/pages/Home.jsx` - Lines 26, 48
- `/pages/Search.jsx` - Line 13
- `/pages/Chat.jsx` - Lines 33, 54
- `/pages/UserProfile.jsx` - Line 24

API endpoints expected:
```
POST /api/auth/login
POST /api/auth/register
GET /api/users/suggestions
GET /api/users/search
GET /api/messages
GET /api/profiles/:userId
POST /api/posts
```

## 🎓 Backend Requirements

For full functionality, implement:
1. **Authentication API**: JWT-based auth
2. **User Management**: CRUD operations
3. **Real-Time Chat**: Socket.IO server
4. **File Upload**: Multer or similar
5. **Database**: MongoDB/PostgreSQL for user data
6. **Matching Algorithm**: Skill-based matching logic

## 📝 Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 🐛 Troubleshooting

### Tailwind CSS not working
- Ensure `@tailwindcss/postcss` is installed
- Check `postcss.config.js` configuration
- Restart dev server

### Bottom nav showing on auth pages
- BottomNav component checks location.pathname
- Ensure routes match: '/login', '/register'

### Profile images not loading
- Using dicebear.com API for avatar generation
- Replace with actual uploads in production

## 🚧 Future Enhancements

- [ ] Video call integration (WebRTC)
- [ ] Payment integration for paid courses
- [ ] Advanced skill verification tests
- [ ] Booking and calendar system
- [ ] Rating and review system
- [ ] Push notifications
- [ ] Email verification
- [ ] Social media login
- [ ] Dark mode
- [ ] Multiple languages

## 📄 License

MIT License - feel free to use for personal and commercial projects!

## 👨‍💻 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

## 📧 Support

For support, email support@letlearn.com or create an issue in the repository.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for beautiful icons
- All open-source contributors

---

Built with ❤️ by the LetLearn Team

Happy Learning! 🎓✨
