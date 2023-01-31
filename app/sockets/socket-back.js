const socketController = (socket) => {
  // console.log('user connected');

  socket.emit('message', 'Welcome to the chat app');

  //when user connects
  socket.broadcast.emit('message', 'User has connected');

  //when user disconnects
  socket.on('disconnect', () => {
    socket.broadcast.emit('message', 'User has disconnected');
  });
};

module.exports = { socketController };
