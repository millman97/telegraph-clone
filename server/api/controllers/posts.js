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

app.get("/:id", (req, res) => {
    const postId = req.params.id;
});

app.post("/", (req, res) => { });

module.exports = app;
