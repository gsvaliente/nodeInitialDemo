import bcryptjs from 'bcryptjs';

import generateJWT from '../config/generate-jwt.js';
import User from '../models/User.model.js';

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res
        .status(401)
        .json({ success: false, msg: 'Email or password not valid' });
    }

    const validPassword = bcryptjs.compareSync(password, userExists.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, msg: 'Email or password not valid' });
    }

    const token = await generateJWT(userExists._id, userExists.username);

    res.status(200).json({ success: true, user: userExists, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

export { loginUser };
