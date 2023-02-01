const { messageFormat } = require('../utils/message.utils');
const {
  userJoin,
  getCurrentUser,
  userLeaves,
  getRoomUsers,
} = require('../utils/users.utils');

// const socketController = (socket) => {
function listen(io) {
  io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);

      socket.join(user.room);

      socket.emit(
        'message',
        messageFormat('ChatBot', 'Welcome to the chat app')
      );

      //when user connects
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          messageFormat('ChatBot', `${user.username} has connected`)
        );

      io.to(user.room).emit('usersRoom', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    //listen for messages from the chat
    socket.on('chatMessage', (message) => {
      const user = getCurrentUser(socket.id);

      io.to(user.room).emit('message', messageFormat(user.username, message));
    });

    //when user disconnects
    socket.on('disconnect', () => {
      const user = userLeaves(socket.id);

      if (user) {
        socket.broadcast
          .to(user.room)
          .emit(
            'message',
            messageFormat('ChatBot', `${user.username} has disconnected`)
          );

        socket.broadcast.to(user.room).emit('usersRoom', {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });
}

module.exports = { listen };
