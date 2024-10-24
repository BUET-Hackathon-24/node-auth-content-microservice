import { Router } from 'express';
import AuthController from '../../controllers/Auth/auth.controller';

const router = Router();
const authController = new AuthController();

//router.get('/callback', authController.callback);
router.post('/exchange-token', authController.exchangeToken);
router.get('/google', authController.signInWithGoogle);
router.get('/github', authController.signInWithGithub);
//router.get('/facebook', authController.signInWithFacebook);

export default router;