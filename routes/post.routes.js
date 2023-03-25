const express = require('express');
const { User, Todo, Post, Comment } = require('../models/models');
const { authMiddleware } = require('../middleware');

const postRouter = express.Router();

// Post routes
app.post('/post', authMiddleware, async (req, res) => {
    // ...
});

app.get('/post/:id', authMiddleware, async (req, res) => {
    // ...
});

app.get('/posts', authMiddleware, async (req, res) => {
    // ...
});

// Comment routes
app.post('/post/:id/comment', authMiddleware, async (req, res) => {
    // ...
});

app.get('/post/:id/comment', authMiddleware, async (req, res) => {
    // ...
});

module.exports = postRouter;