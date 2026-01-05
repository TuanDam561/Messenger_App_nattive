import { RegisterDTO, LoginDTO } from "@dtos/authDTO";
import { RegisterResponse, LoginResponse } from "@app_types/authTypes";
import { hashPassword, verifyPassword } from "@utils/hashPassword";
import { IAuthRepository } from "@interfaces/Auth/IAuthRepository ";
import { ITokenService } from "@interfaces/Token/ITokenService";
import { VerifyMailService } from "@services/sendVerifyMail";

export class AuthService {
  constructor(
    private readonly repo: IAuthRepository,
    private readonly tokenService: ITokenService,
    private readonly verifyMailService: VerifyMailService
  ) {}
  //Đăng ký
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
  //Đăng nhập
  async login(data: LoginDTO): Promise<LoginResponse> {
    const user = await this.repo.findByEmail(data.email);
    if (!user) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }
    const isValidPassword = await verifyPassword(
      data.password,
      user.hashPassword
    );

    if (!isValidPassword) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }
    //Token thập
    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens({
        userId: user.userId,
        role: user.role,
      });

    return {
      userId: user.userId,
      gmail: user.gmail,
      familyName: user.familyName,
      sureName: user.sureName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      accessToken,
      refreshToken,
    };
  }
}
