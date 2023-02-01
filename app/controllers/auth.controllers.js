const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const login = async (req, res) => {
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

    res.status(200).json({ success: true, msg: 'access granted' });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { login };
