import { Router } from 'express';
import { registerUser } from '../controllers/register.controller.js';
import registerValidation from '../validators/register.validators.js';

const router = Router();

router.route('/register').post(registerValidation, registerUser);

export { router };
