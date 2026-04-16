import app from './app.js';
import dotenv from 'dotenv';
import pool from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Test database connection
const testDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log(' Database connection successful');
    return true;
  } catch (error) {
    console.error(' Database connection failed:', error.message);
    return false;
  }
};

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      console.error('Cannot start server without database connection');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`\n Server running on port ${PORT}`);
      console.log(` Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log('\nAPI Endpoints:');
      console.log('  GET  /api/products');
      console.log('  GET  /api/products/:id');
      console.log('  GET  /api/cart');
      console.log('  POST /api/cart');
      console.log('  POST /api/orders');
      console.log('  GET  /api/orders/:id');
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n Shutting down server...');
  pool.end(() => {
    console.log('Database pool closed');
    process.exit(0);
  });
});
