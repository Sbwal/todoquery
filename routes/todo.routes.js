const express = require('express');
const { User, Todo, Post, Comment } = require('../models/models');
const { authMiddleware } = require('../middleware');

const todoRouter = express.Router();

todoRouter.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user._id; 

        const todo = new Todo({
            title,
            description,
            user: userId
        });

        await todo.save();

        res.status(201).json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

todoRouter.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const userId = req.user._id; 

        const todo = await Todo.findOne({ _id: id, user: userId });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.title = title || todo.title;
        todo.description = description || todo.description;

        await todo.save();

        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

todoRouter.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id; 

        const todo = await Todo.findOne({ _id: id, user: userId });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        await todo.remove();

        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

todoRouter.patch('/todo/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { completed } = req.body;
      const userId = req.user._id; 

      if (completed && !['pending', 'completed'].includes(completed)) {
        return res.status(400).json({ message: 'Invalid value for "completed" field' });
      }
  
      const todo = await Todo.findOne({ _id: id, user: userId });
  
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      todo.completed = completed || todo.completed;
  
      await todo.save();
  
      res.json(todo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = todoRouter;