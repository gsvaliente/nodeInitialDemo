const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const jwtValidator = async (req, res, next) => {
  const token = req.header('accessToken');

  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: 'no token was provided' });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(id);

    req.user = user;

    if (!user) {
      return res.status(400).json({ success: false, msg: 'user not found' });
    }

    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ success: false, msg: 'token not valid' });
  }
};

module.exports = jwtValidator;
