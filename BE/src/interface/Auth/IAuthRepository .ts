// interface/IAuthRepository.ts
import { RegisterDTO } from "@dtos/authDTO";
import { User } from "@prisma/client";

//Đăng nhập và đăng ký
export interface IAuthRepository {
  findByID(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  createUser(data: RegisterDTO & { hashPassword: string }): Promise<User>;
  updateVerifyUser(data: { isVerify: boolean }, userId: string): Promise<User>;
  updatePassword(hashedPassword: string, userId: string): Promise<User>;
}
