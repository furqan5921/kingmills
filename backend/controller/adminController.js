const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = 'bunneybet';

router.post('/admin/signup', async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body)
  try {
    // Check if the user already exists
    const existingUser = await Admin.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser)

    await savedUser.save();

    // Respond with success
    res.status(201).json({
      message: 'User registered successfully',
      savedUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;