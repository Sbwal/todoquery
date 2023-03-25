const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

// User authentication routes
const user = async (req, res) => {
  const { name, username, email, password } = req.body;
  const user = new User({ name, username, email, password });
  await user.save();
  res.send('User created successfully');
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).send('Invalid email or password');
  }
  const token = jwt.sign({ userId: user._id }, 'secret');
  res.send({ token });
}

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('No token provided');
  }
  try {
    const decoded = jwt.verify(token, 'secret');
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).send('Invalid token');
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send('Invalid token');
  }
};


module.exports = {
  user,
  login,
  authMiddleware
}