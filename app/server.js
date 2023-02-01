require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = require('./app');
const { listen } = require('./sockets/socket-back');

const server = http.createServer(app);
const io = new Server(server);

listen(io);
// io.on('connect', socketController);

server.listen(
  process.env.PORT,
  console.log(`listening on port ${process.env.PORT}...`)
);
