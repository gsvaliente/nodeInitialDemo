require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = require('./app');
const { dbConnection } = require('./config/db.config');
const { listen } = require('./sockets/socket.js');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5001',
  },
});

const startServer = async () => {
  try {
    await dbConnection();
    server.listen(
      process.env.PORT,
      console.log(`listening on port ${process.env.PORT}...`)
    );
    listen(io);
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
