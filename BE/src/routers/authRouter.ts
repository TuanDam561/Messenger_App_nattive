import { Router } from "express";
import { AuthController } from "@controllers/authController";
import { AuthService } from "@services/authServices";
import { AuthRepository } from "@repository/authRepository";

import { PrismaVerifyMailRepository } from "@repository/mailRepository";
import { NodemailerMailProvider } from "@providers/mailProvider";
import { VerifyMailService } from "@services/sendVerifyMail";

// ===== Token =====
import { PrismaTokenRepository } from "@repository/tokenRepository";
import { TokenService } from "@services/tokenServices";
import { JwtProvider } from "@providers/jwtProvider";

// ===== Validate Data MiddleWare =====
import { validateRegisterDTO } from "@middlewares/ValidateDataMiddleWare/validateRegister";
import { validateLoginDTO } from "@middlewares/ValidateDataMiddleWare/validateLogin";

//Khởi tạo router
const authRouter = Router();

//Khởi tạo repository
const authRepository = new AuthRepository();
const verifyMailRepository = new PrismaVerifyMailRepository();
const tokenRepository = new PrismaTokenRepository();

//Khởi tạo Provider
const mailProvider = new NodemailerMailProvider();
const jwtProvider = new JwtProvider();

//Khởi tạo Service

const tokenService = new TokenService(tokenRepository, jwtProvider);

const authService = new AuthService(authRepository, tokenService);

const verifyMailService = new VerifyMailService(
  verifyMailRepository,
  mailProvider,
  authService,
  authRepository
);

const authController = new AuthController(authService, verifyMailService);
//router
authRouter.post("/register", validateRegisterDTO, authController.register);
authRouter.post("/login", validateLoginDTO, authController.login);
authRouter.post("/verify-email", authController.verifyEmail);
authRouter.post("/resend-code-verify", authController.resendCodeVerify);
authRouter.post("/reset-password", authController.sendMailForgotPassword);
authRouter.post("/change-password", authController.changePassWord);

export default authRouter;
