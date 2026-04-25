const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

/**
 * DATABASE SCHEMA SETUP SCRIPT
 * Creates all 16 tables for the BZCS system
 */

async function setupDatabase() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log('\n🗄️  Starting database schema setup...\n');

    // Read the SQL schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

    console.log('📋 Executing schema.sql...');
    
    // Execute the entire schema
    await pool.query(schemaSQL);

    console.log('✅ Schema executed successfully!\n');

    // Verify tables were created
    const result = await pool.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);

    console.log('📊 Created Tables:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    result.rows.forEach((row, index) => {
      console.log(`   ${index + 1}. ${row.tablename}`);
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n✅ Total: ${result.rows.length} tables created\n`);

    // Check if test users exist
    const userCount = await pool.query('SELECT COUNT(*) FROM users');
    console.log(`👥 Existing users: ${userCount.rows[0].count}`);

    if (parseInt(userCount.rows[0].count) === 0) {
      console.log('\n💡 Tip: Run "node scripts/create-test-users.js" to create test accounts\n');
    }

    console.log('✨ Database setup complete!\n');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    console.error('Error details:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the setup
setupDatabase()
  .then(() => {
    console.log('✅ Schema setup finished successfully\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Schema setup failed:', error);
    process.exit(1);
  });
