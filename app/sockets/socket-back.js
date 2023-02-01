const socketController = (socket) => {
  // console.log('user connected');

  socket.emit('message', 'Welcome to the chat app');

  //when user connects
  socket.broadcast.emit('message', 'User has connected');

  //when user disconnects
  socket.on('disconnect', () => {
    socket.broadcast.emit('message', 'User has disconnected');
  });

  //listen for messages from the chat
  socket.on('chatMessage', (message) => {
    // console.log(message);
    //TODO sender needs to see the msg
    socket.broadcast.emit('message', message);
  });
};

module.exports = { socketController };
