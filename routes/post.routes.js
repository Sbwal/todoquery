const express = require('express');
const { User, Todo, Post, Comment } = require('./models');
const { authMiddleware } = require('./user.routes');


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

// User routes
app.get('/user/:id', authMiddleware, async (req, res) => {
  // ...
});

app.post('/user/:id/comment', authMiddleware, async (req, res) => {
  // ...
});

app.get('/user/:id/todos', authMiddleware, async (req, res) => {
  // ...
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
