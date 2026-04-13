const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'BZCS Backend is running',
    timestamp: new Date().toISOString(),
  });
});

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to BZCS API',
    version: '1.0.0',
  });
});

module.exports = app;