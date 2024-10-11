const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const http = require('http'); // Import the http module

const app = express();

// Allow requests from any origin (or specify your frontend URL for more security)
app.use(cors());

// Increase the maximum request body size limits
app.use(express.json({ limit: '2mb' })); // or more if needed
app.use(express.urlencoded({ limit: '2mb', extended: true })); // or more if needed

app.use('/api', createProxyMiddleware({
  target: 'https://api.mangadex.org',
  changeOrigin: true,
  pathRewrite: { '^/api': '' }, // Strips '/api' from the path
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // Allows requests from any origin
  },
}));

// Add a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the MangaDex Proxy Server!');
});

// Start the server on port 3000 (or change to port 80 if needed)
const PORT = 3000;

// Create the HTTP server
const server = http.createServer(app);

// Set the keep-alive timeout
server.keepAliveTimeout = 60000; // 60 seconds

// Start listening
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
