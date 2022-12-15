require('dotenv').config();
const cors = require('cors');

//lib imports
const express = require('express');
const { Server } = require('socket.io');

const sockets = require('./sockets/sockets.js')

const app = express();

// Connect to database
require('./utils/connectDB.js')();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/register', require('./routes/register.js'));
app.use('/login', require('./routes/login.js'));

//invalid route handling
app.use((req, res) => res.status(404).json({ status: "error", error: "PAGE NOT FOUND"}));

// starts http server
const server = app.listen(process.env.API_PORT, () => {
    console.log(`http server running on port ${process.env.API_PORT}`)
})
// Set up socket.io server

const io = new Server(server, {
    cors: {
        origin: '*'
    },
}) 

sockets(io);