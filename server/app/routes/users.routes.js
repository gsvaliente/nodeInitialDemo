const { Router } = require('express');

const {
  registerUser,
  loginUser,
  getUsers,
} = require('../controllers/users.controllers');
const jwtValidator = require('../middlewares/jwt.middleware');
const userValidation = require('../validators/register.validators');

const router = Router();

router.route('/register').post(userValidation, registerUser);
router.route('/login').post(loginUser);
router.route('/').get(jwtValidator, getUsers);

module.exports = router;
