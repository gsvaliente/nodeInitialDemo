const { check } = require('express-validator');

const validationMsg = require('../helpers/validator-msg');

const userValidation = [
  check('password', 'Password needs min 6 characters').isLength({ min: 6 }),
  check('email', 'Not a valid email').isEmail(),
  (req, res, next) => {
    validationMsg(req, res, next);
  },
];

module.exports = userValidation;
