import { validationResult } from 'express-validator';

const validationMsg = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ success: false, msg: error });
  }
};

export default validationMsg;
