const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const Post = require('../models/Post');

app.get("/", async (req, res) => {
    try {
        const posts = await Post.all;
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        let postData = await Post.findById(postId);
        res.status(200).send(postData);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post("/", async (req, res) => {
    try {
        let postData = req.body;
        let newPost = await Post.create(postData);
        res.status(201).send(newPost);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app;
