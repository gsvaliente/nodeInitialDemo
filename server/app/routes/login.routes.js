import { Router } from 'express';
import { loginUser } from '../controllers/login.controllers.js';

const router = Router();

router.route('/login').post(loginUser);

export { router };
