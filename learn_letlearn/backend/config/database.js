import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      family: 4 // Use IPv4
    });

    console.log(`
╔════════════════════════════════════════╗
║  ✓ MongoDB Connected Successfully     ║
║  Host: ${conn.connection.host.padEnd(30)}║
║  Status: Ready for operations         ║
╚════════════════════════════════════════╝
    `);

    // Log connection events
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB Disconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB Connection Error:', err.message);
    });

    return conn;
  } catch (error) {
    console.error(`
╔════════════════════════════════════════╗
║  ✗ MongoDB Connection Failed           ║
║  Error: ${error.message.padEnd(27)}║
║  Check .env file and credentials      ║
╚════════════════════════════════════════╝
    `);
    process.exit(1);
  }
};

export default connectDB;
