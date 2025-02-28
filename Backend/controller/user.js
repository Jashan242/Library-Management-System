const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body; // Include role in request body

    // Validate request body
    if (!name || !email || !password) {
        return res.status(400).json({ 
            error: 'Name, email, and password are required' 
        });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                error: 'User already exists' 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Determine role (default to 'user' if no role is provided)
        const userRole = role || 'user';
        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: userRole
        });

        await user.save();

        // Generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Send response
        return res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            message: 'Registration successful'
        });

    } catch (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login request:", req.body);

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        console.log("User found:", user);
        console.log("Stored password:", user.password);

        // Ensure user.password exists before comparing
        if (!user.password) {
            return res.status(500).json({ error: 'Server error: Password missing in database' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: false,
        });

        return res.json({ token, user:user, message: 'User logged in' });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords for security
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateUserRole = async (req, res) => {
    const { userId, role } = req.body;

    if (!userId || !role) {
        return res.status(400).json({ error: 'User ID and role are required' });
    }

    try {
        const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ message: 'User role updated', user });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
