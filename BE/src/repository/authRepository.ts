import { prisma, Prisma } from "../configs/prisma";
import { IAuthRepository } from "../interface/IAuthRepository ";
import { RegisterDTO } from "../dtos/authDTO";
type User = Prisma.UserModel; //Gọi model ra từ Prisma Client
export class AuthRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { gmail: email },
    });
  }

  async createUser(
    data: RegisterDTO & { hashPassword: string }
  ): Promise<User> {
    return prisma.user.create({
      data: {
        gmail: data.email,
        phoneNumber: data.phoneNumber,
        familyName: data.familyName,
        sureName: data.sureName,
        hashPassword: data.hashPassword,
        birthday: data.birthday,
        role: "USER",
        isDelete: false,
        isOnline: false,
      },
    });
  }
}
