import { Request, Response, NextFunction } from "express";
import { AppError } from "@shared/appError";
import { LoginDTO } from "@dtos/authDTO";

export function validateLoginDTO(
  req: Request,
  _res: Response, //Khai báo để tránh lỗi không sài biến
  next: NextFunction
) {
  const body = req.body as Partial<LoginDTO>;

  const missingFields: string[] = [];

  if (!body.email) missingFields.push("email");
  if (!body.password) missingFields.push("password");

  if (missingFields.length > 0) {
    throw new AppError(
      `Thiếu dữ liệu bắt buộc: ${missingFields.join(", ")}`,
      400
    );
  }

  // Check kiểu dữ liệu nâng cao
  if (typeof body.email !== "string") {
    throw new AppError("Email không hợp lệ");
  }

  if (typeof body.password !== "string" || body.password.length < 6) {
    throw new AppError("Mật khẩu phải >= 6 ký tự");
  }

  // Chuẩn hoá dữ liệu trước khi vào controller
  req.body = {
    ...body,
  };

  next();
}
