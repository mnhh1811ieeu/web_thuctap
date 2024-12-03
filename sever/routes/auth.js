const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Route đăng ký người dùng
router.post('/register', async (req, res) => {
    const { name, phoneNumber, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email đã được sử dụng!' });

        const newUser = new User({ name, phoneNumber, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route đăng nhập người dùng
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại!' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Mật khẩu không đúng!' });

        // Tạo token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

        res.status(200).json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
