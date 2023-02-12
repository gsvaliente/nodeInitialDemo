import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

//TODO VALIDATE JWT
const validateJWT = async (req, res, next) => {
  const token = req.header('accessToken');

  if (!token) {
    return res.status(401).json({ success: false, msg: 'Token not provided' });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    console.log(
      '🚀 ~ file: verify-jwt.middleware.js:13 ~ validateJWT ~ id',
      id
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
  }
};

export { validateJWT };
