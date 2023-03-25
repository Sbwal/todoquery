const express = require('express');
const { User, Todo, Post, Comment } = require('../models/models');
const { authMiddleware } = require('../middleware');

const userRouter = express.Router();

app.get('/user/:id', authMiddleware, async (req, res) => {
  // ...
});

app.post('/user/:id/comment', authMiddleware, async (req, res) => {
  // ...
});

app.get('/user/:id/todos', authMiddleware, async (req, res) => {
  // ...
});

module.exports = userRouter;