import bcryptjs from 'bcryptjs';
import generateJWT from '../config/generate-jwt.js';
import User from '../models/User.model.js';

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        msg: 'a field is missing',
      });
    }

    const user = await User.create({ username, email, password });

    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync(password, salt);

    const token = await generateJWT(user._id, user.username);

    await user.save();

    res.status(201).json({
      success: true,
      msg: 'user created',
      user,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, msg: error.message });
  }
};

export { registerUser };
