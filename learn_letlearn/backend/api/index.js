import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Import configurations
import connectDB from '../config/database.js';

// Import middleware
import errorHandler from '../middleware/errorHandler.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

// Import routes
import authRoutes from '../routes/authRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import postRoutes from '../routes/postRoutes.js';
import skillRoutes from '../routes/skillRoutes.js';
import messageRoutes from '../routes/messageRoutes.js';
import notificationRoutes from '../routes/notificationRoutes.js';
import teachingRoutes from '../routes/teachingRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';

// Import socket handler
import setupSocketIO from '../socket/socketHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174'] : ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    maxHttpBufferSize: 1e6
  },
  transports: ['websocket', 'polling']
});

// Make io accessible globally
global.io = io;

// Setup Socket.IO handlers
setupSocketIO(io);

// Connect to Database (non-blocking for Vercel serverless)
(async () => {
  try {
    await connectDB();
    console.log('✓ Database connected successfully');
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    // Don't exit - allow serverless function to run
  }
})();

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// Rate limiting (apply BEFORE routes)
app.use('/api/', apiLimiter);

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      process.env.FRONTEND_URL,
      // Add frontend Vercel URL if available
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
      // Allow in-progress Vercel deployments
      /^https:.*\.vercel\.app$/ 
    ].filter(Boolean);
    
    // For browser requests without origin, allow them
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.some(allowed => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    })) {
      callback(null, true);
    } else {
      console.log('Origin not allowed by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Explicit preflight handling
app.options('*', cors(corsOptions));

// Health check endpoint for Vercel
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint (MUST be before routes)
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Learn & Let Learn API Server',
    version: '1.0.0',
    status: 'running'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/teaching', teachingRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  process.exit(0);
});

// Export for Vercel
export default app;
