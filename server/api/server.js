const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const postRoutes = require('./controllers/posts')

app.use('/', postRoutes)

module.exports = app;
