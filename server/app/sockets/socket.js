const parseJwt = require('../helpers/jwt-decode.helper');

const { saveMessage, getRoomMessages } = require('../utils/message.utils');
const { getAllRooms, createRoom, globalChat } = require('../utils/rooms.utils');
const {
  userJoinRoom,
  getAllUsers,
  disconnectUser,
} = require('../utils/users.utils');

const listen = async (io) => {
  io.use((socket, next) => {
    const queryToken = socket.handshake.query.accessToken;
    socket.decoded = parseJwt(queryToken);

    next();
  });

  io.on('connection', async (socket) => {
    try {
      const currentUser = {
        userID: socket.decoded.userID,
        username: socket.decoded.username,
      };
      console.log(`${currentUser.username} connected`);
      globalChat();

      socket.broadcast.emit(
        'message',
        `${currentUser.username} has joined the chat`
      );

      socket.on('chatMessage', async (data) => {
        const msg = await saveMessage(data);
        console.log(msg);
        io.to(data.roomData.roomID).emit('newMessage', msg.message);
      });

      socket.on('getRooms', async () => {
        const list = await getAllRooms();
        const { roomList } = list;

        for (const room of roomList) {
          io.to(socket.id).emit('renderRoom', room);
        }
      });

      socket.on('createRoom', async (name) => {
        const room = await createRoom(name);
        // console.log(room);
        if (!room.success) {
          console.error(room);
          io.to(socket.id).emit('error', 'Room already exists');
        }
        const { newRoom } = room;
        io.emit('renderRoom', newRoom);
      });

      socket.on('joinRoom', async (room) => {
        let joinedRoom = await userJoinRoom(currentUser, room);

        let currentUsers = await getAllUsers();
        io.emit('reloadUsers', currentUsers);

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
        allMessages.forEach((message) => {
          io.to(socket.id).emit('newMessage', message);
        });
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
