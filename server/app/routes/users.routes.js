const { Router } = require('express');

const { registerUser, loginUser } = require('../controllers/users.controllers');
const userValidation = require('../validators/register.validators');

const router = Router();

router.route('/register').post(userValidation, registerUser);
router.route('/login').post(loginUser);

module.exports = router;
