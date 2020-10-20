import express from 'express';

import { AuthController, MachineController } from './app/controllers';
import authMiddleware from './app/middlewares/Auth';

//#region Auth Routes
const authRoutes = express.Router();
const authController = new AuthController();

authRoutes.post('/register', authController.create);
authRoutes.post('/login', authController.show);
authRoutes.post('/forgot-pass', authController.forgotPass);
authRoutes.post('/reset-pass', authController.resetPass);
//#endregion

//#region Machine Routes
const machineRoutes = express.Router();
const machineController = MachineController;

machineRoutes.get('/list', authMiddleware, machineController.index);
//#endregion

export { authRoutes, machineRoutes };
