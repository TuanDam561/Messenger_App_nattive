import { RegisterDTO } from "../dtos/authDTO";
import { RegisterResponse } from "../types/authTypes";
import { hashPassword } from "../utils/hashPassword";
import { IAuthRepository } from "../interface/IAuthRepository ";

export class AuthService {
  constructor(private readonly repo: IAuthRepository) {}

  async register(data: RegisterDTO): Promise<RegisterResponse> {
    const existingUser = await this.repo.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email đã tồn tại");
    }

    const user = await this.repo.createUser({
      ...data,
      hashPassword: await hashPassword(data.password),
    });

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
