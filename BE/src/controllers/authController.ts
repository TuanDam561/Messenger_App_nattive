import { Request, Response, NextFunction } from "express";
import { AuthService } from "@services/authServices";
import { VerifyMailService } from "@services/sendVerifyMail";
import { ApiResponse } from "@shared/apiResponse";
import { RegisterDTO } from "@dtos/authDTO";

export class AuthController {
  constructor(
    private service: AuthService,
    private verifyMailService: VerifyMailService
  ) {}

  register = async (
    req: Request<{}, {}, RegisterDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.service.register(req.body);
      await this.verifyMailService.sendVerifyMail({
        userId: data.userId,
        email: data.gmail,
        content: "REGISTER",
      });
      res.status(201).json(ApiResponse.success("Đăng ký thành công", data));
    } catch (err) {
      next(err);
    }
  };
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.login(req.body);
      res.status(200).json(ApiResponse.success("Đăng nhập thành công", data));
    } catch (err) {
      next(err);
    }
  };
  verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, code } = req.body;
      await this.verifyMailService.verifyCode({ userId, code });
      res.status(200).json(ApiResponse.success("Xác thực email thành công"));
    } catch (err) {
      next(err);
    }
  };
  resendCodeVerify = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId, email } = req.body;
      await this.verifyMailService.sendVerifyMail({
        userId,
        email,
        content: "RE_SEND_CODE",
      });
      res
        .status(200)
        .json(ApiResponse.success("Gửi lại mã xác thực thành công"));
    } catch (err) {
      next(err);
    }
  };
  sendMailForgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;
      const data = await this.verifyMailService.sendVerifyMail({
        userId: "",
        email,
        content: "RESET_PASSWORD",
      });
      res
        .status(200)
        .json(
          ApiResponse.success("Gửi mail đặt lại mật khẩu thành công", data)
        );
    } catch (err) {
      next(err);
    }
  };
  changePassWord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, code, newPassword } = req.body;
      await this.verifyMailService.verifyCode({ userId, code });
      await this.service.changePassword(userId, newPassword);
      res.status(200).json(ApiResponse.success("Đổi mật khẩu thành công"));
    } catch (err) {
      next(err);
    }
  };
}
