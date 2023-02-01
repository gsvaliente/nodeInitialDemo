const { Router } = require('express');

const { registerUser } = require('../controllers/users.controllers');
const userValidation = require('../validators/register.validators');

const router = Router();

router.route('/register').post(userValidation, registerUser);

module.exports = router;
