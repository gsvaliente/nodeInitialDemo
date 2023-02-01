const { messageFormat } = require('../utils/message.utils');

const socketController = (socket) => {
  // console.log('user connected');

  socket.emit('message', messageFormat('ChatBot', 'Welcome to the chat app'));

  //when user connects
  socket.broadcast.emit(
    'message',
    messageFormat('ChatBot', 'User has connected')
  );

  //when user disconnects
  socket.on('disconnect', () => {
    socket.broadcast.emit(
      'message',
      messageFormat('ChatBot', 'User has connected')
    );
  });

  //listen for messages from the chat
  socket.on('chatMessage', (message) => {
    // console.log(message);
    //TODO sender needs to see the msg
    socket.broadcast.emit('message', messageFormat(message));
  });
};

module.exports = { socketController };
