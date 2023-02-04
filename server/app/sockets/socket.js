const parseJwt = require('../helpers/jwt-decode.helper');

async function listen(io) {
  io.use((socket, next) => {
    const queryToken = socket.handshake.query.accessToken;
    socket.decoded = parseJwt(queryToken);

    next();
  });

  io.on('connection', (socket) => {
    try {
      let user = {
        username: socket.decoded.username,
        userID: socket.decoded.userID,
      };

      console.log(`${user.username} connected`);

      socket.on('newMessage', async (message) => {
        io.emit('message', message);
        // console.log(message);
      });

      socket.emit('message', `welcome`);

      socket.broadcast.emit('message', `${user.username} connected`);

      socket.on('disconnect', () => {
        io.emit('message', `${user.username} has left`);
      });
    } catch (error) {
      console.log(error.message);
    }
  });
}

module.exports = { listen };
