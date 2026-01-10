import { Request, Response, NextFunction } from "express";
import { AppError } from "@shared/appError";
import { RegisterDTO } from "@dtos/authDTO";

export function validateRegisterDTO(
  req: Request,
  _res: Response, //Khai báo để tránh lỗi unused variable
  next: NextFunction
) {
  const body = req.body as Partial<RegisterDTO>;

  const missingFields: string[] = [];

  if (!body.familyName) missingFields.push("familyName");
  if (!body.sureName) missingFields.push("sureName");
  if (!body.phoneNumber) missingFields.push("phoneNumber");
  if (!body.email) missingFields.push("email");
  if (!body.password) missingFields.push("password");
  if (!body.birthday) missingFields.push("birthday");

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

  // birthday từ client thường là string → convert
  const birthday = new Date(body.birthday as any);
  if (isNaN(birthday.getTime())) {
    throw new AppError("Ngày sinh không hợp lệ");
  }

  // Chuẩn hoá dữ liệu trước khi vào controller
  req.body = {
    ...body,
    birthday,
  };

  next();
}
