const parseJwt = require('../helpers/jwt-decode.helper');

const { getAllRooms, createRoom, globalChat } = require('../utils/rooms.utils');
const { userJoinRoom } = require('../utils/users.utils');

const listen = async (io) => {
  io.use((socket, next) => {
    const queryToken = socket.handshake.query.accessToken;
    socket.decoded = parseJwt(queryToken);

    next();
  });

  io.on('connection', async (socket) => {
    const currentUser = {
      userID: socket.decoded.userID,
      username: socket.decoded.username,
    };
    try {
      console.log(`${currentUser.username} connected`);
      globalChat();

      socket.broadcast.emit(
        'message',
        `${currentUser.username} has joined the chat`
      );

      socket.on('joinRoom', async (room) => {
        console.log(room);
        const currentRoom = await userJoinRoom(currentUser, room);
        console.log(currentRoom);
      });

      socket.on('getRooms', async () => {
        const list = await getAllRooms();
        const { roomList } = list;
        console.log(roomList);
        for (const room of roomList) {
          io.to(socket.id).emit('renderRoom', room);
        }
      });

      socket.on('createRoom', async (name) => {
        const room = await createRoom(name);
        const { newRoom } = room;
        io.emit('renderRoom', newRoom);
        // io.to(socket.id).emit(`room ${newRoom.name} was created`);
      });

      socket.on('disconnect', () => {
        io.emit('message', `${currentUser.username} has left`);
      });
    } catch (error) {
      console.log(error.message);
    }
  });
};

module.exports = { listen };
