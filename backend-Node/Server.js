// server.js
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { ConnectDB } = require('./config/dbconfig');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// CORS
app.use(cors({ origin: true, credentials: true }));

app.use('/uploads', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    next();
}, express.static('uploads'));


// Routes
app.get('/', (req, res) => {
    res.json({ message: 'API running' });
});


// // Auth Routes
app.use('/api/auth', require('./Routes/Auth'));

// // Category Routes
app.use('/api/categories', require('./Routes/categories'));

// // Product Routes
app.use('/api/products', require('./Routes/Product'));

// // Wishlist Routes
app.use('/api/wishlist', require('./Routes/Wishlist'));

// serve static files

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
// connect to database
ConnectDB();
// Server Setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
