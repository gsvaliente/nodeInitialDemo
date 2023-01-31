const express = require('express');

const pageNotFound = require('./middlewares/page-not-found');

const app = express();

app.use(express.static('public'));
app.use(pageNotFound);

module.exports = app;
