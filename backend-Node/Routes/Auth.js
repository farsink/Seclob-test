const express = require('express');
const { body } = require('express-validator');
const authController = require('../Controller/UserController');
const router = express.Router();

// Register
router.post('/register', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
], authController.register);

// Login
router.post('/login', [
    body('email').isEmail(),
    body('password').exists(),
], authController.login);

module.exports = router;