const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const mainRoute = require('./routes/');
const articlesRoute = require('./routes/articles');

app.use(mainRoute)
app.use(articlesRoute)

module.exports = app;