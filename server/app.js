const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(cors());

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

app.post("/", (req, res) => {});

module.exports = app;
