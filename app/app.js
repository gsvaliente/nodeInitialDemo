const express = require('express');

const userRouters = require('./routes/users.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouters);

module.exports = app;
