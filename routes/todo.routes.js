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

        const savedTodo = await todo.save();

        res.status(201).json(savedTodo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

todoRouter.put('/:id', authMiddleware, async (req, res) => {
    try {
        const todoId = req.params.id;
        const userId = req.user._id;
        const update = req.body;

        const result = await Todo.updateOne(
            { _id: todoId, user: userId },
            { $set: update }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        return res.json({ message: 'Todo updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

todoRouter.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const todoId = req.params.id;
        const userId = req.user._id;

        const result = await Todo.deleteOne({ _id: todoId, user: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        return res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

todoRouter.patch(':id/complete', async (req, res) => {
    try {
        const todoId = req.params.id;
        const userId = req.user._id;
        const { completed } = req.body;

        if (completed !== 'incomplete' && completed !== 'complete') {
            return res.status(400).json({ error: 'Invalid value for completed' });
        }

        const result = await Todo.updateOne(
            { _id: todoId, user: userId },
            { $set: { completed: completed } }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        return res.json({ message: 'Todo completion status updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = todoRouter;