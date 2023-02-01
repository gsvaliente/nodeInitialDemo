const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('WELCOME HOME PAGE');
});

module.exports = app;
