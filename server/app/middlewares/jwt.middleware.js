const jwt = require('jsonwebtoken');

const jwtValidator = async (socket, next) => {
  const accessToken = socket.handshake.query.accessToken;
  if (accessToken) {
    jwt.verify(accessToken, process.env.JWT_KEY, (err, decoded) => {
      if (err) return next(new Error('Authentication Error'));
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error('Auth error'));
  }
};

module.exports = jwtValidator;
