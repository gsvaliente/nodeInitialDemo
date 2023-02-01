const { validationResult } = require('express-validator');

const validationMsg = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    return res.status(403).json({ success: false, msg: error.array() });
  }
};

module.exports = validationMsg;
