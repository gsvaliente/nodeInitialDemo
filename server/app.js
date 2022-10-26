/*const express = require('express');
const app = express();
const port = 5000;
const socketIO = require('socket.io');*/


// TODO allow cors for localhost:3000 (la direcció del client)

// TODO middlewares

// TODO rutes

// TODO sockets
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 4000;

const cors = require("cors");
const connectDB = require("../app/helpers/connectDB");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const routes = require("../app/routes/routes")
const sockets = require("./sockets/sockets");
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

//Create data base if not exist
connectDB();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use(routes)

//Sockets
sockets(io);

//server
app.listen(port, () => {
  console.log(`Xat server running on http://localhost: ${port}`)
});