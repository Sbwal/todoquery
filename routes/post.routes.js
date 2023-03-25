const express = require('express');
const { User, Todo, Post, Comment } = require('../models/models');
const { authMiddleware } = require('../middleware');

const postRouter = express.Router();

// Post routes
postRouter.post('/', authMiddleware, async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user._id;
        const post = new Post({
            text,
            user: userId
        });

        const savedPost = await post.save();

        res.json(savedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

postRouter.get('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('user', '_id name');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

postRouter.get('/', authMiddleware, async (req, res) => {
    try {
        const posts = await Post.find().populate('user', '_id name');
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Comment routes
postRouter.post('/:id/comment', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comment = new Comment({
            text: req.body.text,
            user: req.user._id,
            post: post._id,
        });

        const savedComment = await comment.save();

        return res.status(201).json(savedComment);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

postRouter.get('/:id/comment', authMiddleware, async (req, res) => {
    try {
        const postId = req.params.id;

        // Find all comments that have a matching post ID
        const comments = await Comment.find({ post: postId });

        if (!comments || comments.length === 0) {
            return res.status(404).json({ error: 'No comments found for the given post ID' });
        }

        // Return the comments as the response
        return res.json(comments);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

postRouter.patch('/comment/:id', authMiddleware, async (req, res) => {
    const commentId = req.params.id;
    const userId = req.user._id;
    const { text } = req.body;

    const updatedComment = await Comment.updateOne(
        { _id: commentId, user: userId },
        { text }
    );

    if (updatedComment.n === 0) {
        return res.status(404).json({ error: 'Comment not found' });
    }

    return res.json({ message: 'Comment updated successfully' });
});

module.exports = postRouter;