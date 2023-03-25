const express = require('express');
const { User, Todo, Post, Comment } = require('../models/models');
const { authMiddleware } = require('../middleware');

const todoRouter = express.Router();

app.post('/todo', authMiddleware, async (req, res) => {
    // ...
});

app.put('/todo/:id', authMiddleware, async (req, res) => {
    // ...
});

app.delete('/todo/:id', authMiddleware, async (req, res) => {
    // ...
});

module.exports = todoRouter;