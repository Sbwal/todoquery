const express = require('express');
const { User, Todo, Post, Comment } = require('../models/models');
const { authMiddleware } = require('../middleware');

const postRouter = express.Router();

// Post routes
postRouter.post('/', authMiddleware, async (req, res) => {
    // ...
});

postRouter.get('/:id', authMiddleware, async (req, res) => {
    // ...
});

postRouter.get('/', authMiddleware, async (req, res) => {
    // ...
});

// Comment routes
postRouter.post('/:id/comment', authMiddleware, async (req, res) => {
    // ...
});

postRouter.get('/:id/comment', authMiddleware, async (req, res) => {
    // ...
});

module.exports = postRouter;