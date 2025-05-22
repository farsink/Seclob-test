// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'API running' });
});

// Auth Routes
app.use('/api/auth', require('./routes/auth'));

// Category Routes
app.use('/api/categories', require('./routes/category'));

// Product Routes
app.use('/api/products', require('./routes/product'));

// Wishlist Routes
app.use('/api/wishlist', require('./routes/wishlist'));

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Server Setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});