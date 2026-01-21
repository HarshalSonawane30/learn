// MongoDB Playground
// Use Ctrl+Shift+P and select "MongoDB: Connect" to set active connection
// Use Ctrl+Enter to run a playground

// ============================================
// 1. SWITCH TO YOUR DATABASE
// ============================================
use('letlearn');

// ============================================
// 2. CREATE ALL COLLECTIONS
// ============================================

// Users Collection
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'name'],
      properties: {
        _id: { bsonType: 'objectId' },
        email: { bsonType: 'string' },
        name: { bsonType: 'string' },
        password: { bsonType: 'string' },
        phone: { bsonType: 'string' },
        role: { enum: ['user', 'teacher', 'admin'] },
        profileImage: { bsonType: 'string' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

// Conversations Collection
db.createCollection('conversations');

// Messages Collection
db.createCollection('messages');

// Notifications Collection
db.createCollection('notifications');

// Posts Collection
db.createCollection('posts');

// Skill Tests Collection
db.createCollection('skillTests');

// Skill Results Collection
db.createCollection('skillResults');

// Time Slots Collection
db.createCollection('timeslots');

// Sessions Collection
db.createCollection('sessions');

// ============================================
// 3. VERIFY ALL COLLECTIONS CREATED
// ============================================
show('collections');

// ============================================
// 4. TEST DATA - INSERT SAMPLE USER
// ============================================
db.users.insertOne({
  email: 'admin@letlearn.com',
  name: 'Admin User',
  password: 'hashed_password_here',
  phone: '+1234567890',
  role: 'admin',
  profileImage: 'https://example.com/admin.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert test teacher
db.users.insertOne({
  email: 'teacher@letlearn.com',
  name: 'John Teacher',
  password: 'hashed_password_here',
  phone: '+0987654321',
  role: 'teacher',
  profileImage: 'https://example.com/teacher.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert test student
db.users.insertOne({
  email: 'student@letlearn.com',
  name: 'Jane Student',
  password: 'hashed_password_here',
  phone: '+1122334455',
  role: 'user',
  profileImage: 'https://example.com/student.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
});

// ============================================
// 5. FIND AND VIEW DATA
// ============================================

// Find all users
db.users.find({});

// Find specific user
db.users.findOne({ email: 'admin@letlearn.com' });

// Count users
db.users.countDocuments({});

// Find all admin users
db.users.find({ role: 'admin' });

// ============================================
// 6. CREATE INDEXES
// ============================================

// Index for email (for faster lookups)
db.users.createIndex({ email: 1 }, { unique: true });

// Index for role (for faster filtering)
db.users.createIndex({ role: 1 });

// Index for createdAt (for sorting)
db.users.createIndex({ createdAt: -1 });

// ============================================
// 7. UPDATE DATA
// ============================================

// Update user
db.users.updateOne(
  { email: 'student@letlearn.com' },
  { $set: { phone: '+9999999999', updatedAt: new Date() } }
);

// ============================================
// 8. DELETE DATA (BE CAREFUL!)
// ============================================

// Delete specific user
// db.users.deleteOne({ email: 'test@letlearn.com' });

// Delete all collections
// db.users.deleteMany({});

// ============================================
// 9. AGGREGATION EXAMPLES
// ============================================

// Count users by role
db.users.aggregate([
  {
    $group: {
      _id: '$role',
      count: { $sum: 1 }
    }
  }
]);

// ============================================
// NOTES:
// ============================================
// - Use Ctrl+Enter to run a single line
// - Use Ctrl+Shift+Enter to run all commands
// - Right-click and select "Run All" to execute everything
// - Comment out dangerous operations (delete, drop)
// - Always test with test data first
