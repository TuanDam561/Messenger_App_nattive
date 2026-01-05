// interface/IAuthRepository.ts
import { RegisterDTO } from "@dtos/authDTO";
import { User } from "@prisma/client";

//Đăng nhập và đăng ký
export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: RegisterDTO & { hashPassword: string }): Promise<User>;
}
