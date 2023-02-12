import { check } from 'express-validator';

import validationMsg from '../helpers/validator-msg.helper.js';

const registerValidation = [
  check('email', 'Not a valid email').isEmail(),
  (req, res, next) => {
    validationMsg(req, res, next);
  },
];

export default registerValidation;
