const express = require('express');
const { User, Todo, Post, Comment } = require('./models');
const { authMiddleware } = require('./user.routes');


app.post('/todo', authMiddleware, async (req, res) => {
  // ...
});

app.put('/todo/:id', authMiddleware, async (req, res) => {
  // ...
});

app.delete('/todo/:id', authMiddleware, async (req, res) => {
  // ...
});
