const bcrypt = require('bcryptjs');

const generateJWT = require('../config/generate-jwt.config');
const User = require('../models/user.model');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    const token = await generateJWT(user._id, user.username);

    await user.save();
    res.status(201).json({ success: true, msg: 'user created', user, token });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: 'email or password not valid' });
    }

    const validPass = bcrypt.compareSync(password, user.password);

    if (!validPass) {
      return res
        .status(400)
        .json({ success: false, msg: 'email or password not valid' });
    }

    const token = await generateJWT(user._id, user.username);

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const userList = await User.find();

    res.status(200).json({ success: true, userList });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
