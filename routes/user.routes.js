const express = require('express');
const { User, Todo, Post, Comment } = require('../models/models');
const { authMiddleware } = require('../middleware');

const userRouter = express.Router();

userRouter.get('/:id', authMiddleware, async (req, res) => {
  // ...
});

userRouter.post('/:id/comment', authMiddleware, async (req, res) => {
  // ...
});

userRouter.get('/:id/todos', authMiddleware, async (req, res) => {
  // ...
});

module.exports = userRouter;