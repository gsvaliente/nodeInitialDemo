const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/users.routes');

const app = express();

app.use(cors('http://localhost:5001'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter);

module.exports = app;
