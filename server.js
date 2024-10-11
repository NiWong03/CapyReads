const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Allow requests from any origin (or specify your frontend URL for more security)
app.use(cors());

// Increase the maximum request body size limits
app.use(express.json({ limit: '2mb' })); // or more if needed
app.use(express.urlencoded({ limit: '2mb', extended: true })); // or more if needed

// Proxy middleware for MangaDex API
app.use('/api', createProxyMiddleware({
  target: 'https://api.mangadex.org',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    // Optional: Add User-Agent header
    proxyReq.setHeader('User-Agent', 'Your-Custom-User-Agent');
    // Optional: Remove Via header
    proxyReq.removeHeader('Via');
  },
  onProxyRes: (proxyRes, req, res) => {
    // Ensure valid CORS response headers
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
}));

// Add a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the MangaDex Proxy Server!');
});

// Start the server on port 3000 (or change to port 80 if needed)
const PORT = 3000; // Change to 80 if you want to run on port 80
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Set the keep-alive timeout
server.keepAliveTimeout = 60000; // 60 seconds
