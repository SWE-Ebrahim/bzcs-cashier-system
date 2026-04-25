const { verifyToken } = require('../utils/jwtHelper');
const { pool } = require('../config/database');

/**
 * Middleware: Verify JWT Access Token
 * Attaches user info to req.user
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies?.accessToken || 
                  req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'NO_TOKEN',
          message: 'Access denied. No token provided.',
        },
      });
    }

    // Verify token
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired token.',
        },
      });
    }

    // Check if user still exists and is active
    const result = await pool.query(
      'SELECT id, username, email, full_name, is_active FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0 || !result.rows[0].is_active) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found or account deactivated.',
        },
      });
    }

    // Attach user to request
    req.user = result.rows[0];
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Internal server error during authentication.',
      },
    });
  }
};

/**
 * Middleware: Check User Role
 * Must be used AFTER authenticateToken
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'NOT_AUTHENTICATED',
          message: 'Authentication required.',
        },
      });
    }

    // Get user roles from database
    pool.query(
      `SELECT r.name FROM roles r
       JOIN user_roles ur ON r.id = ur.role_id
       WHERE ur.user_id = $1`,
      [req.user.id]
    )
      .then((result) => {
        const userRoles = result.rows.map((row) => row.name);
        const hasRole = userRoles.some((role) => allowedRoles.includes(role));

        if (!hasRole) {
          return res.status(403).json({
            success: false,
            error: {
              code: 'INSUFFICIENT_PERMISSIONS',
              message: 'You do not have permission to access this resource.',
            },
          });
        }

        next();
      })
      .catch((error) => {
        console.error('Role check error:', error);
        res.status(500).json({
          success: false,
          error: {
            code: 'SERVER_ERROR',
            message: 'Error checking permissions.',
          },
        });
      });
  };
};

module.exports = { authenticateToken, authorizeRoles };