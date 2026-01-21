/**
 * Database Initialization Script
 * Run this once to create collections and indexes
 * Command: node utils/initializeDB.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';

dotenv.config();

const initializeDatabase = async () => {
  try {
    console.log('🔄 Starting database initialization...\n');
    
    // Connect to database
    await connectDB();
    
    const db = mongoose.connection.db;
    
    // Collection creation with indexes
    const collections = [
      {
        name: 'users',
        indexes: [
          { email: 1 },
          { createdAt: -1 },
          { role: 1 }
        ]
      },
      {
        name: 'conversations',
        indexes: [
          { participants: 1 },
          { lastMessage: -1 }
        ]
      },
      {
        name: 'messages',
        indexes: [
          { conversationId: 1 },
          { createdAt: -1 }
        ]
      },
      {
        name: 'notifications',
        indexes: [
          { userId: 1 },
          { createdAt: -1 }
        ]
      },
      {
        name: 'posts',
        indexes: [
          { authorId: 1 },
          { createdAt: -1 }
        ]
      },
      {
        name: 'skillTests',
        indexes: [
          { skillName: 1 },
          { difficulty: 1 }
        ]
      },
      {
        name: 'skillResults',
        indexes: [
          { userId: 1 },
          { testId: 1 }
        ]
      },
      {
        name: 'timeslots',
        indexes: [
          { teacherId: 1 },
          { date: 1 }
        ]
      },
      {
        name: 'sessions',
        indexes: [
          { userId: 1 },
          { createdAt: -1 }
        ]
      }
    ];
    
    for (const collection of collections) {
      try {
        // Create collection
        await db.createCollection(collection.name);
        console.log(`✓ Created collection: ${collection.name}`);
        
        // Create indexes
        const col = db.collection(collection.name);
        for (const indexSpec of collection.indexes) {
          await col.createIndex(indexSpec);
        }
        console.log(`  └─ Created ${collection.indexes.length} indexes\n`);
      } catch (error) {
        if (error.codeName === 'NamespaceExists') {
          console.log(`ⓘ Collection already exists: ${collection.name}`);
          
          // Still create indexes
          const col = db.collection(collection.name);
          for (const indexSpec of collection.indexes) {
            try {
              await col.createIndex(indexSpec);
            } catch (indexError) {
              // Index might already exist
            }
          }
          console.log(`  └─ Ensured indexes exist\n`);
        } else {
          console.error(`✗ Error creating collection ${collection.name}:`, error.message);
        }
      }
    }
    
    console.log(`
╔════════════════════════════════════════╗
║  ✓ Database Initialization Complete   ║
║  All collections and indexes created  ║
╚════════════════════════════════════════╝
    `);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  }
};

// Run initialization
initializeDatabase();
