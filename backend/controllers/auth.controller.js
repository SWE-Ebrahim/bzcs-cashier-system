const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/jwtHelper');

/**
 * REGISTER - Create new user (Cashier/Manager)
 * POST /api/auth/register
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password, full_name, phone, role_name = 'cashier' } = req.body;

    // Validation
    if ((!username && !email) || !password || !full_name) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Username or email, password, and full name are required.',
        },
      });
    }

    // Check if username/email already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'USER_EXISTS',
          message: 'Username or email already exists.',
        },
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Get role ID
    const roleResult = await pool.query('SELECT id FROM roles WHERE name = $1', [role_name]);
    if (roleResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ROLE',
          message: 'Invalid role specified.',
        },
      });
    }

    const roleId = roleResult.rows[0].id;

    // Insert user
    const userResult = await pool.query(
      `INSERT INTO users (username, email, password_hash, full_name, phone)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, full_name, phone, is_active, created_at`,
      [username || null, email || null, password_hash, full_name, phone || null]
    );

    const newUser = userResult.rows[0];

    // Assign role
    await pool.query(
      'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)',
      [newUser.id, roleId]
    );

    // Generate tokens
    const accessToken = generateAccessToken({ userId: newUser.id });
    const refreshToken = generateRefreshToken({ userId: newUser.id });

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          full_name: newUser.full_name,
          role: role_name,
          is_active: newUser.is_active,
        },
        tokens: { accessToken, refreshToken },
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Error creating user.',
      },
    });
  }
};

/**
 * LOGIN - Cashier/Manager (Username + Password)
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Username and password are required.',
        },
      });
    }

    // Find user
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid username or password.',
        },
      });
    }

    const user = result.rows[0];

    // Check if active
    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'ACCOUNT_INACTIVE',
          message: 'Your account has been deactivated.',
        },
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid username or password.',
        },
      });
    }

    // Get user roles
    const rolesResult = await pool.query(
      `SELECT r.name FROM roles r
       JOIN user_roles ur ON r.id = ur.role_id
       WHERE ur.user_id = $1`,
      [user.id]
    );

    const roles = rolesResult.rows.map((row) => row.name);

    // Update last login
    await pool.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);

    // Generate tokens
    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      message: 'Login successful.',
      data: {
        user: {
          id: user.id,
          username: user.username,
          full_name: user.full_name,
          roles: roles,
          is_active: user.is_active,
        },
        tokens: { accessToken },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Error during login.',
      },
    });
  }
};

/**
 * LOGIN - Owner (Email + Password)
 * POST /api/auth/login/owner
 */
exports.loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Email and password are required.',
        },
      });
    }

    // Find owner
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password.',
        },
      });
    }

    const user = result.rows[0];

    // Check if owner role
    const rolesResult = await pool.query(
      `SELECT r.name FROM roles r
       JOIN user_roles ur ON r.id = ur.role_id
       WHERE ur.user_id = $1`,
      [user.id]
    );

    const roles = rolesResult.rows.map((row) => row.name);
    if (!roles.includes('owner')) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'NOT_OWNER',
          message: 'This account does not have owner privileges.',
        },
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password.',
        },
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: 'Owner login successful.',
      data: {
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          roles: roles,
          is_active: user.is_active,
        },
        tokens: { accessToken },
      },
    });
  } catch (error) {
    console.error('Owner login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Error during owner login.',
        details: error.message
      },
    });
  }
};

/**
 * REFRESH TOKEN
 * POST /api/auth/refresh
 */
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'NO_TOKEN',
          message: 'Refresh token not found.',
        },
      });
    }

    const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired refresh token.',
        },
      });
    }

    const newAccessToken = generateAccessToken({ userId: decoded.userId });

    res.json({
      success: true,
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Error refreshing token.',
      },
    });
  }
};

/**
 * LOGOUT
 * POST /api/auth/logout
 */
exports.logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({
    success: true,
    message: 'Logged out successfully.',
  });
};