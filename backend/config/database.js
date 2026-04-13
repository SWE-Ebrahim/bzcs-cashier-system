const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

const testConnection = async () => {
  try {
    console.log('🔍 Testing database connection...');
    console.log(`   Connecting to: ${process.env.DB_NAME} on ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    
    // Create a new client for testing (not from pool)
    const { Client } = require('pg');
    const client = new Client({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    
    await client.connect();
    const result = await client.query('SELECT NOW() as current_time, current_database() as db_name;');
    console.log('✅ Database connection test successful!');
    console.log('   Database:', result.rows[0].db_name);
    console.log('   Server Time:', result.rows[0].current_time);
    await client.end();
    return true;
  } catch (err) {
    console.error('❌ Database connection test failed:', err.message);
    console.error('   Error Code:', err.code);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Restart PostgreSQL service in Windows Services');
    console.error('   2. Check if database name is correct in pgAdmin');
    console.error('   3. Verify database owner has proper permissions\n');
    return false;
  }
};

module.exports = { pool, testConnection };