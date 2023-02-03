function listen(io) {
  io.on('connection', (socket) => {
    console.log('Welcome');

    socket.emit('message', 'welcome to chatApp');

    socket.broadcast.emit('message', 'a user connected');

    socket.on('disconnect', () => {
      io.emit('message', 'user has left');
    });
  });
}

module.exports = { listen };
