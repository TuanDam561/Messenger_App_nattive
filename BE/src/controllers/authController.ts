// controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import { AuthService } from "@services/authServices";
import { ApiResponse } from "@shared/apiResponse";
import { RegisterDTO } from "@dtos/authDTO";

export class AuthController {
  constructor(private service: AuthService) {}

  register = async (
    req: Request<{}, {}, RegisterDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.service.register(req.body);
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
}
