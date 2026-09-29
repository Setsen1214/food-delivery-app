import { Router } from "express";
import {
    loginController,
    signUpController,
} from "../../controllers/auth/auth.js";

import { validateEmail, checkIfUserExist, validateEmailAndPassword } from "../../middleware/auth-middleware.js";
export const authrouter = Router();



export const authRouter = Router();
authRouter.post("/signUp", validateEmailAndPassword, checkIfUserExist, signUpController)
    .post("/login", validateEmailAndPassword, validateEmail, loginController)