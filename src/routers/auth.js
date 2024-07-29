import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { createUserSchema, loginUserSchema } from '../validation/auth.js';
import { validator } from '../middlewares/validator.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validator(createUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validator(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default authRouter;
