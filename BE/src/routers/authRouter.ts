import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { AuthService } from "../services/authServices";
import { AuthRepository } from "../repository/authRepository";

import { PrismaVerifyMailRepository } from "../repository/mailRepository";
import { NodemailerMailProvider } from "../providers/mailProvider";
import { VerifyMailService } from "../services/sendVerifyMail";

import { validateRegisterDTO } from "../middlewares/ValidateDataMiddleWare/validateRegister";

const authRouter = Router();
//Khởi tạo repository
const authRepository = new AuthRepository();
const verifyMailRepository = new PrismaVerifyMailRepository();

//Khởi tạo Provider
const mailProvider = new NodemailerMailProvider();
//Khởi tạo Service
const verifyMailService = new VerifyMailService(
  verifyMailRepository,
  mailProvider
);
const authService = new AuthService(authRepository, verifyMailService);
const authController = new AuthController(authService);
authRouter.post("/register", validateRegisterDTO, authController.register);

export default authRouter;
