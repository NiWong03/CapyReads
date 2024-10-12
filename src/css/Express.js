const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // This will allow all origins

// Or specify a specific origin
// app.use(cors({ origin: 'http://yourdomain.com' }));

app.get('/your-endpoint', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});