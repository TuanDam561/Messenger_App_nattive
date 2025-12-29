// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/appError";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err instanceof AppError ? err.statusCode : 500;

  res.status(status).json({
    success: false,
    message: err.message || "Lỗi hệ thống",
  });
}
