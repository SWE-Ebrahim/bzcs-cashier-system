const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

/**
 * SEED TEST USERS SCRIPT
 * Creates test accounts for Owner, Manager, and Cashier
 * This is for TESTING ONLY - will be deleted later
 */

async function seedTestUsers() {
  const client = await pool.connect();

  try {
    console.log('\n🔍 Starting test user creation...\n');

    // Step 1: Ensure roles exist
    console.log('📋 Checking/creating roles...');
    
    const roles = ['owner', 'manager', 'cashier'];
    const roleIds = {};

    for (const roleName of roles) {
      // Check if role exists
      const existingRole = await client.query(
        'SELECT id FROM roles WHERE name = $1',
        [roleName]
      );

      if (existingRole.rows.length > 0) {
        roleIds[roleName] = existingRole.rows[0].id;
        console.log(`   ✅ Role '${roleName}' already exists (ID: ${roleIds[roleName]})`);
      } else {
        // Create role
        const newRole = await client.query(
          'INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING id',
          [roleName, `${roleName.charAt(0).toUpperCase() + roleName.slice(1)} role`]
        );
        roleIds[roleName] = newRole.rows[0].id;
        console.log(`   ✅ Created role '${roleName}' (ID: ${roleIds[roleName]})`);
      }
    }

    // Step 2: Create test users
    console.log('\n👤 Creating test users...\n');

    // ── OWNER ACCOUNT ──
    console.log('1. Creating Owner account...');
    const ownerEmail = 'swe.ebrahim@gmail.com';
    const ownerPassword = 'EA123456';
    
    const existingOwner = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [ownerEmail]
    );

    if (existingOwner.rows.length > 0) {
      console.log(`   ⚠️  Owner already exists (ID: ${existingOwner.rows[0].id})`);
      console.log(`   ℹ️  Email: ${ownerEmail}`);
      console.log(`   ℹ️  Password: ${ownerPassword}\n`);
    } else {
      const hashedPassword = await bcrypt.hash(ownerPassword, 10);
      
      const newOwner = await client.query(
        `INSERT INTO users (username, email, password_hash, full_name, phone, is_active)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, email, full_name`,
        [null, ownerEmail, hashedPassword, 'System Owner', null, true]
      );

      // Assign owner role
      await client.query(
        'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)',
        [newOwner.rows[0].id, roleIds.owner]
      );

      console.log(`   ✅ Owner created successfully!`);
      console.log(`   📧 Email: ${ownerEmail}`);
      console.log(`   🔑 Password: ${ownerPassword}`);
      console.log(`   👤 Full Name: ${newOwner.rows[0].full_name}\n`);
    }

    // ── MANAGER ACCOUNT ──
    console.log('2. Creating Manager account...');
    const managerId = '197905';
    const managerPin = '2004';
    
    const existingManager = await client.query(
      'SELECT id FROM users WHERE username = $1',
      [managerId]
    );

    if (existingManager.rows.length > 0) {
      console.log(`   ⚠️  Manager already exists (ID: ${existingManager.rows[0].id})`);
      console.log(`   ℹ️  Employee ID: ${managerId}`);
      console.log(`   ℹ️  PIN: ${managerPin}\n`);
    } else {
      const hashedPin = await bcrypt.hash(managerPin, 10);
      
      const newManager = await client.query(
        `INSERT INTO users (username, email, password_hash, full_name, phone, is_active)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, full_name`,
        [managerId, null, hashedPin, 'Test Manager', null, true]
      );

      // Assign manager role
      await client.query(
        'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)',
        [newManager.rows[0].id, roleIds.manager]
      );

      console.log(`   ✅ Manager created successfully!`);
      console.log(`   🆔 Employee ID: ${managerId}`);
      console.log(`   🔐 PIN: ${managerPin}`);
      console.log(`   👤 Full Name: ${newManager.rows[0].full_name}\n`);
    }

    // ── CASHIER ACCOUNT ──
    console.log('3. Creating Cashier account...');
    const cashierId = '0000';
    const cashierPin = '0123';
    
    const existingCashier = await client.query(
      'SELECT id FROM users WHERE username = $1',
      [cashierId]
    );

    if (existingCashier.rows.length > 0) {
      console.log(`   ⚠️  Cashier already exists (ID: ${existingCashier.rows[0].id})`);
      console.log(`   ℹ️  Employee ID: ${cashierId}`);
      console.log(`   ℹ️  PIN: ${cashierPin}\n`);
    } else {
      const hashedPin = await bcrypt.hash(cashierPin, 10);
      
      const newCashier = await client.query(
        `INSERT INTO users (username, email, password_hash, full_name, phone, is_active)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, full_name`,
        [cashierId, null, hashedPin, 'Test Cashier', null, true]
      );

      // Assign cashier role
      await client.query(
        'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)',
        [newCashier.rows[0].id, roleIds.cashier]
      );

      console.log(`   ✅ Cashier created successfully!`);
      console.log(`   🆔 Employee ID: ${cashierId}`);
      console.log(`   🔐 PIN: ${cashierPin}`);
      console.log(`   👤 Full Name: ${newCashier.rows[0].full_name}\n`);
    }

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ TEST USER CREATION COMPLETE!\n');
    console.log('📝 LOGIN CREDENTIALS:\n');
    console.log('   OWNER:');
    console.log(`   • Email: ${ownerEmail}`);
    console.log(`   • Password: ${ownerPassword}\n`);
    console.log('   MANAGER:');
    console.log(`   • Employee ID: ${managerId}`);
    console.log(`   • PIN: ${managerPin}\n`);
    console.log('   CASHIER:');
    console.log(`   • Employee ID: ${cashierId}`);
    console.log(`   • PIN: ${cashierPin}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Error creating test users:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the script
seedTestUsers()
  .then(() => {
    console.log('✨ Script completed successfully\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
