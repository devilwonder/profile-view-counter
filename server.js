const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// In-memory storage (for Railway deployment)
let viewCount = 0;
let lastUpdated = new Date().toISOString();
let uniqueVisitors = new Set();

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Profile View Counter API',
    status: 'running',
    timestamp: new Date().toISOString(),
    viewCount: viewCount
  });
});

// Get current view count
app.get('/api/views', (req, res) => {
  res.json({
    count: viewCount,
    lastUpdated: lastUpdated,
    uniqueVisitors: uniqueVisitors.size
  });
});

// Increment view count
app.post('/api/views', (req, res) => {
  const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  
  // Increment total views
  viewCount++;
  lastUpdated = new Date().toISOString();
  
  // Track unique visitors (basic IP-based)
  uniqueVisitors.add(clientIP);
  
  console.log(`New view: ${clientIP} - Total: ${viewCount} - Unique: ${uniqueVisitors.size}`);
  
  res.json({
    count: viewCount,
    uniqueVisitors: uniqueVisitors.size,
    timestamp: lastUpdated,
    ip: clientIP
  });
});

// Get badge data (for GitHub README)
app.get('/api/badge', (req, res) => {
  const { label = 'Profile Views', color = '00D4FF', style = 'for-the-badge' } = req.query;
  
  // Generate SVG badge
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="138" height="28" role="img" aria-label="${label}: ${viewCount}">
      <title>${label}: ${viewCount}</title>
      <linearGradient id="s" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>
      <clipPath id="r">
        <rect width="138" height="28" rx="4" fill="#fff"/>
      </clipPath>
      <g clip-path="url(#r)">
        <rect width="83" height="28" fill="#555"/>
        <rect x="83" width="55" height="28" fill="#${color}"/>
        <rect width="138" height="28" fill="url(#s)"/>
      </g>
      <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
        <text aria-hidden="true" x="415" y="200" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="730">${label}</text>
        <text x="415" y="200" fill="#fff" transform="scale(.1)" textLength="730">${label}</text>
        <text aria-hidden="true" x="1105" y="200" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="350">${viewCount}</text>
        <text x="1105" y="200" fill="#fff" transform="scale(.1)" textLength="350">${viewCount}</text>
      </g>
    </svg>
  `;
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.send(svg);
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    viewCount: viewCount
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Profile View Counter API running on port ${PORT}`);
  console.log(`📊 View count: ${viewCount}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
