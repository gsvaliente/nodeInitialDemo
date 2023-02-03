const express = require('express');

const userRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
// app.use('/api/auth', authRouter);

module.exports = app;
