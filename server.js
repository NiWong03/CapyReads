const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Logging middleware to track requests
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// Custom route for /api to avoid redirection
app.get('/api', (req, res) => {
  res.json({
    message: "Welcome to the MangaDex API Proxy. Use /api/manga or other endpoints to access the MangaDex API.",
  });
});

// Proxy middleware for MangaDex API
app.use('/api', createProxyMiddleware({
  target: 'https://api.mangadex.org',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  onProxyRes: (proxyRes, req, res) => {
    // Ensure valid CORS response headers
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
}));

// Serve the React app for any route other than /api
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Add a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the MangaDex Proxy Server!');
});

// Define the port to listen on
const PORT = 3000;

// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

// Set the keep-alive timeout
server.keepAliveTimeout = 60000; // 60 seconds

app.get('/api/covers/:mangaId/:coverFileName', async (req, res) => {
    const { mangaId, coverFileName } = req.params;
    const imageUrl = `https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}`;

    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        console.error(`Error fetching cover: ${error.message}`);
        res.status(500).send('Error fetching cover image');
    }
});
