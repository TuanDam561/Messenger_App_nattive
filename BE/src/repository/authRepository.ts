import { prisma, Prisma } from "@configs/prisma";
import { IAuthRepository } from "@interfaces/Auth/IAuthRepository ";
import { RegisterDTO } from "@dtos/authDTO";
type User = Prisma.UserModel; //Gọi model ra từ Prisma Client
export class AuthRepository implements IAuthRepository {
  findByID(userId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { userId: userId },
    });
  }
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
  async updateVerifyUser(
    data: { isVerify: boolean },
    userId: string
  ): Promise<User> {
    return prisma.user.update({
      where: { userId: userId },
      data: {
        isVerify: data.isVerify,
      },
    });
  }
  async updatePassword(hashedPassword: string, userId: string): Promise<User> {
    return prisma.user.update({
      where: { userId: userId },
      data: {
        hashPassword: hashedPassword,
      },
    });
  }
}
