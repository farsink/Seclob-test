const jwt = require('jsonwebtoken');
const User = require('../Model/usermodel');
const dotenv = require('dotenv');
const validationResult = require('express-validator').validationResult;
const bcrypt = require('bcryptjs');

dotenv.config();

// Register
exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(405).json({ errors: errors.array() });
    }
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).json({ error: 'Please fill in all fields' });


        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).json({ error: 'Email already exists' });
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({ name, email, password: hashedPassword });

        await user.save();

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { name, email } });
    } catch (err) {
        console.log(err);

        next(err);
    }
};

// Login
exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(405).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { name: user.name, email } });
    } catch (err) {
        console.log(err);
        next(err);
    }
};