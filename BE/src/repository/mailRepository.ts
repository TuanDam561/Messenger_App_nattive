import { prisma, Prisma } from "../configs/prisma";
import { VerifyMailRepository } from "../interface/IMailRepository";
import { CreateMailDTO, VerifyMailDTO } from "../dtos/mailDTO";
type VerificationCode = Prisma.Verify_CodeModel; //Gọi model ra từ Prisma Client

export class PrismaVerifyMailRepository implements VerifyMailRepository {
  async create(data: CreateMailDTO): Promise<VerificationCode> {
    return prisma.verify_Code.create({
      data: {
        userId: data.userID,
        content: data.content,
        verifyCode: data.verifyCode,
        isUsed: false,
        expiredAt: data.expiredAt,
      },
    });
  }

  async findValidCode(data: VerifyMailDTO): Promise<VerificationCode | null> {
    return prisma.verify_Code.findFirst({
      where: {
        userId: data.userID,
        verifyCode: data.code,
        isUsed: false,
        expiredAt: {
          gt: new Date(), // chưa hết hạn
        },
      },
    });
  }

  async markUsed(codeID: string): Promise<void> {
    await prisma.verify_Code.update({
      where: {
        codeId: codeID,
      },
      data: {
        isUsed: true,
      },
    });
  }
}
