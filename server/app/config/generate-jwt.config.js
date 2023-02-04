const jwt = require('jsonwebtoken');

const generateJWT = (userID, user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userID: userID,
      username: user,
    };

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) {
          console.log(err.message);
          reject('could not generate token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generateJWT;
