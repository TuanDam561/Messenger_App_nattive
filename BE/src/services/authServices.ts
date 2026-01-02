import { RegisterDTO } from "../dtos/authDTO";
import { RegisterResponse } from "../types/authTypes";
import { hashPassword } from "../utils/hashPassword";
import { IAuthRepository } from "../interface/IAuthRepository ";
import { VerifyMailService } from "./sendVerifyMail";

export class AuthService {
  constructor(
    private readonly repo: IAuthRepository,
    private readonly verifyMailService: VerifyMailService
  ) {}

  async register(data: RegisterDTO): Promise<RegisterResponse> {
    const existingUser = await this.repo.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email đã tồn tại");
    }

    const user = await this.repo.createUser({
      ...data,
      hashPassword: await hashPassword(data.password),
    });

    //Gửi mail xác thực đăng ký

    try {
      await this.verifyMailService.sendVerifyMail({
        userId: user.userId,
        email: user.gmail,
        content: "REGISTER",
      });
    } catch (err) {
      console.error("❌ Lỗi gửi mail xác thực:", err);
      throw err;
    }

    //Response gửi về client
    return {
      userId: user.userId,
      gmail: user.gmail,
      familyName: user.familyName,
      sureName: user.sureName,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
  }
}
