// interface/IAuthRepository.ts
import { RegisterDTO } from "../dtos/authDTO";
import { User } from "../../generated/prisma/client";

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: RegisterDTO & { hashPassword: string }): Promise<User>;
}
