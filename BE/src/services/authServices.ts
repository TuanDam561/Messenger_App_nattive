import { RegisterDTO, LoginDTO } from "@dtos/authDTO";
import { IAuthService } from "@interfaces/Auth/IAuthService";
import { RegisterResponse, LoginResponse } from "@app_types/authTypes";
import { hashPassword, verifyPassword } from "@utils/hashPassword";
import { IAuthRepository } from "@interfaces/Auth/IAuthRepository ";
import { ITokenService } from "@interfaces/Token/ITokenService";
import { AppError } from "@shared/appError";

export class AuthService implements IAuthService {
  constructor(
    private readonly repo: IAuthRepository,
    private readonly tokenService: ITokenService
  ) {}
  //Đăng ký
  async register(data: RegisterDTO): Promise<RegisterResponse> {
    const existingUser = await this.repo.findByEmail(data.email);
    if (existingUser) {
      throw AppError.conflict("Email đã tồn tại");
    }

    const user = await this.repo.createUser({
      ...data,
      hashPassword: await hashPassword(data.password),
    });

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
      throw AppError.unauthorized(
        "Email hoặc mật khẩu không đúng",
        "INVALID_CREDENTIALSl"
      );
    }
    //Kiểm tra tài khoản có bị xóa không
    if (user.isDelete) {
      throw AppError.notFound("Tài khoản không tồn tại");
    }
    //Kiểm tra tài khoản đã xác thực email chưa
    if (!user.isVerify) {
      throw AppError.unauthorized(
        "Vui lòng xác thực email trước khi đăng nhập"
      );
    }
    //Kiểm tra mật khẩu
    const isValidPassword = await verifyPassword(
      data.password,
      user.hashPassword
    );

    if (!isValidPassword) {
      throw AppError.unauthorized("Email hoặc mật khẩu không đúng");
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
  // Verify User
  async verifyUser(userId: string): Promise<void> {
    const user = await this.repo.findByID(userId);
    if (!user) {
      throw AppError.notFound("Người dùng không tồn tại");
    }
    await this.repo.updateVerifyUser({ isVerify: true }, userId);
  }
  //Đổi password
  async changePassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.repo.findByID(userId);
    if (!user) {
      throw AppError.notFound("Người dùng không tồn tại");
    }
    const hashedPassword = await hashPassword(newPassword);
    await this.repo.updatePassword(hashedPassword, userId);
  }
}
