//https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module-es
const express = require('express');
const app = express();
const port = 5000;
const http = require('http').createServer(app);

//Para ejecutar la función de sockets
require('./sockets')(socketsio);
//const socketIO = require('socket.io');

const cors = require('cors');
const sockets = require('./sockets/sockets');
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


// TODO allow cors for localhost:3000 (la direcció del client)

// TODO middlewares

// TODO rutes

// TODO sockets
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 5000;

/*const cors = require("cors");
const connectDB = require("../app/helpers/conectarBDD");
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
sockets(io);*/

//server
app.listen(port, () => {
  console.log(`Xat server running on http://localhost: ${port}`)
});