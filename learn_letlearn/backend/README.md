# Learn & Let Learn - Backend API

Complete production-ready backend for a peer-to-peer learning platform.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.IO
- **File Upload**: Multer + Cloudinary (optional)
- **Security**: Helmet, CORS, bcryptjs
- **Validation**: express-validator
- **Rate Limiting**: express-rate-limit

## 📁 Project Structure

```
backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── cloudinary.js        # Cloudinary config
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User management
│   ├── postController.js    # Social posts
│   ├── skillController.js   # Skill verification
│   ├── messageController.js # Chat functionality
│   ├── notificationController.js
│   ├── teachingController.js
│   └── adminController.js   # Admin panel
├── middleware/
│   ├── auth.js              # JWT & role verification
│   ├── upload.js            # File upload handling
│   ├── errorHandler.js      # Error handling
│   └── rateLimiter.js       # Rate limiting
├── models/
│   ├── User.js              # User schema
│   ├── Post.js              # Post schema
│   ├── Message.js           # Message schema
│   ├── Conversation.js      # Conversation schema
│   ├── Notification.js      # Notification schema
│   ├── SkillTest.js         # Skill test schema
│   ├── SkillResult.js       # Test results schema
│   ├── TimeSlot.js          # Teaching slots schema
│   └── Session.js           # Learning session schema
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── postRoutes.js
│   ├── skillRoutes.js
│   ├── messageRoutes.js
│   ├── notificationRoutes.js
│   ├── teachingRoutes.js
│   └── adminRoutes.js
├── socket/
│   └── socketHandler.js     # Socket.IO logic
├── utils/
│   ├── fileUpload.js        # File upload utilities
│   └── seedSkillTests.js    # Database seeding
├── uploads/                 # Local file storage
├── .env                     # Environment variables
├── .env.example             # Environment template
├── .gitignore
├── package.json
├── server.js                # Main server file
└── README.md
```

## 🔧 Installation & Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

### 3. Start MongoDB

Make sure MongoDB is running locally or update `MONGODB_URI` in `.env` with your MongoDB connection string.

```bash
# For local MongoDB
mongod
```

### 4. Seed Database

```bash
npm run seed
```

This will:
- Create skill test questions (React, Node.js, Python, JavaScript, MongoDB)
- Create admin user with credentials from `.env`

### 5. Start Server

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5001`

## 📚 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/me` | Get current user | Yes |
| POST | `/auth/logout` | Logout user | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/:id` | Get user by ID | Yes |
| PUT | `/users/:id` | Update user profile | Yes |
| GET | `/users/search` | Search users | Yes |
| GET | `/users/suggestions` | Get connection suggestions | Yes |
| POST | `/users/connect` | Send connection request | Yes |
| POST | `/users/accept` | Accept connection | Yes |
| POST | `/users/reject` | Reject connection | Yes |
| GET | `/users/connections` | Get connections | Yes |

### Post Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/posts` | Create post | Yes |
| GET | `/posts/feed` | Get feed | Yes |
| GET | `/posts/saved` | Get saved posts | Yes |
| GET | `/posts/:id` | Get post by ID | Yes |
| POST | `/posts/:id/like` | Like/unlike post | Yes |
| POST | `/posts/:id/comment` | Comment on post | Yes |
| POST | `/posts/:id/save` | Save/unsave post | Yes |
| POST | `/posts/:id/report` | Report post | Yes |
| DELETE | `/posts/:id` | Delete post | Yes |

### Skill Verification Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/skills/tests` | Get all available tests | Yes |
| GET | `/skills/tests/:skillName` | Get specific test | Yes |
| POST | `/skills/submit` | Submit test answers | Yes |
| GET | `/skills/results/:userId` | Get user results | Yes |

### Message Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/messages/conversations` | Get all conversations | Yes |
| GET | `/messages/:userId` | Get messages with user | Yes |
| POST | `/messages/send` | Send message | Yes |
| GET | `/messages/unread` | Get unread count | Yes |

### Notification Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/notifications` | Get notifications | Yes |
| GET | `/notifications/unread` | Get unread count | Yes |
| POST | `/notifications/read/:id` | Mark as read | Yes |
| POST | `/notifications/read-all` | Mark all as read | Yes |
| DELETE | `/notifications/:id` | Delete notification | Yes |

### Teaching Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/teaching/timeslots` | Create time slot | Yes (Teacher) |
| GET | `/teaching/timeslots/:userId` | Get time slots | Yes |
| POST | `/teaching/book` | Book time slot | Yes |
| GET | `/teaching/sessions` | Get sessions | Yes |
| PUT | `/teaching/sessions/:id/status` | Update session status | Yes |
| POST | `/teaching/sessions/:id/rate` | Rate session | Yes |

### Admin Endpoints (Admin Only)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/dashboard` | Get dashboard stats | Admin |
| GET | `/admin/users` | Get all users | Admin |
| PUT | `/admin/users/:id/block` | Block/unblock user | Admin |
| DELETE | `/admin/users/:id` | Delete user | Admin |
| GET | `/admin/posts` | Get all posts | Admin |
| DELETE | `/admin/posts/:id` | Delete post | Admin |
| GET | `/admin/analytics` | Get analytics | Admin |

## 🔌 Socket.IO Events

### Client → Server

| Event | Data | Description |
|-------|------|-------------|
| `user_connected` | `userId` | User connects to socket |
| `joinRoom` | `conversationId` | Join conversation room |
| `leaveRoom` | `conversationId` | Leave conversation room |
| `sendMessage` | Message data | Send real-time message |
| `typing` | User & conversation data | User typing indicator |
| `stopTyping` | User & conversation data | Stop typing indicator |
| `markAsRead` | `conversationId, userId` | Mark messages as read |
| `getOnlineUsers` | - | Request online users list |

### Server → Client

| Event | Data | Description |
|-------|------|-------------|
| `receiveMessage` | Message object | New message received |
| `newMessage` | Message & conversation | New message notification |
| `notification` | Notification object | Real-time notification |
| `userTyping` | User data | User is typing |
| `userStoppedTyping` | User data | User stopped typing |
| `user_online` | `userId` | User came online |
| `user_offline` | `userId` | User went offline |
| `onlineUsers` | Array of userIds | List of online users |
| `messagesRead` | `userId` | Messages marked as read |

## 🔐 Authentication

All protected routes require JWT token in header:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

## 👤 User Roles

- **learner**: Can learn skills, book sessions
- **teacher**: Can teach skills, create time slots
- **both**: Can both teach and learn
- **admin**: Full access to admin panel

## 🎯 Default Admin Credentials

After seeding:
- **Email**: admin@letlearn.com
- **Password**: admin123456

⚠️ **Change these in production!**

## 📊 Skill Tests Available

After seeding, the following skill tests are available:
- React (5 questions)
- Node.js (5 questions)
- Python (5 questions)
- JavaScript (5 questions)
- MongoDB (5 questions)

**Pass Mark**: 60%
**Duration**: 5 minutes each

## 🛡️ Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Rate limiting
- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ Input validation
- ✅ SQL injection protection (MongoDB)
- ✅ XSS protection

## 📦 File Upload

Supports both local and Cloudinary storage.

**Local Storage** (default):
- Files saved to `/uploads` directory
- Accessible via `/uploads/filename`

**Cloudinary**:
- Set `USE_CLOUDINARY=true` in `.env`
- Configure Cloudinary credentials

## 🔄 Rate Limiting

- **General API**: 100 requests per 15 minutes
- **Auth endpoints**: 5 requests per 15 minutes
- **File uploads**: 20 uploads per hour

## 🐛 Error Handling

All errors return consistent format:

```json
{
  "success": false,
  "message": "Error description"
}
```

## 🧪 Testing APIs

Use tools like:
- Postman
- Thunder Client (VS Code)
- cURL
- Insomnia

Import collection or test endpoints manually.

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5001 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection | mongodb://localhost:27017/letlearn |
| JWT_SECRET | JWT secret key | (required) |
| JWT_EXPIRE | Token expiry | 7d |
| FRONTEND_URL | Frontend URL | http://localhost:5173 |
| ADMIN_EMAIL | Admin email | admin@letlearn.com |
| ADMIN_PASSWORD | Admin password | admin123456 |
| USE_CLOUDINARY | Use cloud storage | false |

## 🚀 Deployment

### Heroku

```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Render / Railway

- Set environment variables
- Connect GitHub repo
- Deploy

## 📄 License

MIT

## 👨‍💻 Support

For issues or questions, contact: support@letlearn.com

---

**Built with ❤️ for the Learn & Let Learn Platform**
