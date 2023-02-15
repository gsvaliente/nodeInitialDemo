const jwt = require('jsonwebtoken');
const jwtValidator = require('../middlewares/jwt.middleware');

const { saveMessage, getRoomMessages } = require('../utils/message.utils');
const { getAllRooms, createRoom, globalChat } = require('../utils/rooms.utils');
const {
  userJoinRoom,
  getAllUsers,
  disconnectUser,
} = require('../utils/users.utils');

const listen = async (io) => {
  io.use((socket, next) => {
    jwtValidator(socket, next);
  });

  io.on('connection', async (socket) => {
    try {
      const currentUser = {
        userID: socket.decoded.userID,
        username: socket.decoded.username,
      };

      // console.log(`${currentUser.username} connected`);
      globalChat();

      socket.on('chatMessage', async (msgObject) => {
        const msg = await saveMessage(msgObject);
        // console.log(msg);
        io.to(msgObject.roomData.roomID).emit('newMessage', msg.message);
      });

      socket.on('getRooms', async () => {
        const list = await getAllRooms();
        const { roomList } = list;
        // console.log(list);

        for (const room of roomList) {
          io.to(socket.id).emit('renderRoom', room);
        }
      });

      socket.on('createRoom', async (name) => {
        const room = await createRoom(name);
        // console.log(room);
        if (!room.success) {
          console.error(room);
          io.to(socket.id).emit('error', 'Error while creating room');
        }
        const { newRoom } = room;
        io.emit('renderRoom', newRoom);
      });

      socket.on('joinRoom', async (room) => {
        let joinedRoom = await userJoinRoom(currentUser, room);

        let currentUsers = await getAllUsers();
        io.emit('reloadUsers', currentUsers);

        // console.log(room);
        // console.log(joinedRoom);

        if (joinedRoom.previousRoom.roomID) {
          socket.leave(joinedRoom.previousRoom.roomID);

          socket.broadcast
            .to(joinedRoom.previousRoom.roomID)
            .emit(
              'botNotifications',
              `BotChat: ${joinedRoom.user.username} left the room`
            );
        }

        socket.join(room.roomID);

        socket.broadcast
          .to(room.roomID)
          .emit(
            'botNotifications',
            `BotChat: ${joinedRoom.user.username} joined the room`
          );

        let allMessages = await getRoomMessages(room);
        for (const message of allMessages) {
          io.to(socket.id).emit('newMessage', message);
        }
      });

      socket.on('disconnect', async () => {
        let disconnectedUser = await disconnectUser(currentUser);

        socket.leave(disconnectedUser.room.roomID);

        socket.broadcast
          .to(disconnectedUser.room.roomID)
          .emit(
            'botNotifications',
            `BotChat: ${disconnectedUser.user.username} is now offline`
          );

        let currentUsers = await getAllUsers();

        io.emit('reloadUsers', currentUsers);
      });
    } catch (error) {
      console.log(error.message);
    }
  });
};

module.exports = { listen };
