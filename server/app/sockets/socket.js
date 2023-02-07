const parseJwt = require('../helpers/jwt-decode.helper');

const { getAllRooms, createRoom, globalChat } = require('../utils/rooms.utils');

const listen = async (io) => {
  io.use((socket, next) => {
    const queryToken = socket.handshake.query.accessToken;
    socket.decoded = parseJwt(queryToken);

    next();
  });

  io.on('connection', async (socket) => {
    try {
      const { userID, username } = socket.decoded;
      console.log(`${username} connected`);
      globalChat();

      socket.broadcast.emit('message', `${username} has joined the chat`);

      socket.on('disconnect', () => {
        io.emit('message', `${username} has left`);
      });

      socket.on('getRooms', async () => {
        const roomList = getAllRooms();
      });
    } catch (error) {
      console.log(error.message);
    }
  });
};

module.exports = { listen };
