const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

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
