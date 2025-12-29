import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { AuthService } from "../services/authServices";
import { AuthRepository } from "../repository/authRepository";

const authRouter = Router();
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);
authRouter.post("/register", authController.register);

export default authRouter;
