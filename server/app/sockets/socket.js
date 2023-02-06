const parseJwt = require('../helpers/jwt-decode.helper');

const {
  getAllUsers,
  disconnectUser,
  joinRoom,
} = require('../utils/users.utils');

const { createRoom, getAllRooms } = require('../utils/room.utils');
const { getMessages, newMessage } = require('../utils/messages.utils');

async function listen(io) {
  io.use((socket, next) => {
    const queryToken = socket.handshake.query.accessToken;
    socket.decoded = parseJwt(queryToken);

    next();
  });

  io.on('connection', async (socket) => {
    try {
      const user = {
        username: socket.decoded.username,
        userID: socket.decoded.userID,
      };
      console.log(`${user.username} connected`);

      socket.on('message', async (message) => {
        let msg = await newMessage(message);

        if (msg.success) {
          socket.broadcast.to(message.room.roomID).emit('message', msg.message);
        }
      });

      socket.on('createRoom', async (roomName) => {});

      socket.on('disconnect', () => {
        io.emit('message', `${user.username} has left`);
        removeUser(socket.id);
      });
    } catch (error) {
      console.log(error.message);
    }
  });
}

module.exports = { listen };
