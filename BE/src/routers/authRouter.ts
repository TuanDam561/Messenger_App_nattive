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

import { validateRegisterDTO } from "@middlewares/ValidateDataMiddleWare/validateRegister";

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
const verifyMailService = new VerifyMailService(
  verifyMailRepository,
  mailProvider
);
const tokenService = new TokenService(tokenRepository, jwtProvider);

const authService = new AuthService(
  authRepository,
  tokenService,
  verifyMailService
);
const authController = new AuthController(authService);
//router
authRouter.post("/register", validateRegisterDTO, authController.register);
authRouter.post("/login", authController.login);

export default authRouter;
