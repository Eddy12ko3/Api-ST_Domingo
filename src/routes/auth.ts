import { Router, Request, Response } from 'express';
import { authController } from '../controllers/auth';

const router = Router();

router.post('/register', authController.registerCtrl);
router.post('/login', authController.loginCtrl);

export { router };
