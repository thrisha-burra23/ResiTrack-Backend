import express from "express"
import { getCurrentUser, loginUser, logout, refreshAccessToken, registerUser } from "../controllers/auth.controller.js";
import {validate} from "../middleware/validate.middleware.js"
import { loginSchema, registerSchema } from "../validations/user.validation.js";
import verifyAccessToken from "../middleware/auth.middleware.js";

const authRouter=express.Router();

authRouter.post("/register",validate(registerSchema),registerUser);
authRouter.post("/login",validate(loginSchema),loginUser)
authRouter.post("/refresh",refreshAccessToken)
authRouter.post("/logout",verifyAccessToken, logout)
authRouter.get("/me",verifyAccessToken,getCurrentUser)

export default authRouter
