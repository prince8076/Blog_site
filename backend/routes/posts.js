const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific post by ID
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new post
router.post('/posts', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        excerpt: req.body.excerpt,
        image: req.body.image
    });
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an existing post
router.put('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }

        if (req.body.title != null) {
            post.title = req.body.title;
        }
        if (req.body.excerpt != null) {
            post.excerpt = req.body.excerpt;
        }
        if (req.body.image != null) {
            post.image = req.body.image;
        }

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a post
router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }

        await post.remove();
        res.json({ message: 'Deleted post' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
