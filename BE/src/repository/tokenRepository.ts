import { prisma, Prisma } from "@configs/prisma";
import { ITokenRepository } from "@interfaces/Token/ITokenRepository";
import {
  AccessTokenPersistenceDTO,
  RefreshTokenPersistenceDTO,
} from "@dtos/tokenDTO";

type AccessTokenModel = Prisma.Authentication_JWTModel;
type RefreshTokenModel = Prisma.Authentication_RefreshTokenModel;

export class PrismaTokenRepository implements ITokenRepository {
  // ================= ACCESS TOKEN =================

  async createAccessToken(
    data: AccessTokenPersistenceDTO
  ): Promise<{ authJWTId: string }> {
    const token: AccessTokenModel = await prisma.authentication_JWT.create({
      data: {
        userId: data.userId,
        jwtToken: data.jwtToken,
        contentToken: data.contentToken, // "ACCESS"
        expiredDate: data.expiredDate,
      },
    });

    return {
      authJWTId: token.authJWTId,
    };
  }

  async findAccessTokenById(authJWTId: string): Promise<{
    authJWTId: string;
    jwtToken: string;
    expiredDate: Date;
    isUsed: boolean;
    userId: string;
  } | null> {
    const token = await prisma.authentication_JWT.findUnique({
      where: { authJWTId },
    });

    if (!token) return null;

    return {
      authJWTId: token.authJWTId,
      jwtToken: token.jwtToken,
      expiredDate: token.expiredDate,
      isUsed: token.isUsed,
      userId: token.userId,
    };
  }

  async markAccessTokenUsed(authJWTId: string): Promise<void> {
    await prisma.authentication_JWT.update({
      where: { authJWTId },
      data: { isUsed: true },
    });
  }

  // ================= REFRESH TOKEN =================

  async createRefreshToken(
    data: RefreshTokenPersistenceDTO
  ): Promise<{ authRefId: string }> {
    const token: RefreshTokenModel =
      await prisma.authentication_RefreshToken.create({
        data: {
          authJWTId: data.authJWTId,
          refreshToken: data.refreshToken,
          contentToken: data.contentToken, // "REFRESH"
          expiredDate: data.expiredDate,
        },
      });

    return {
      authRefId: token.authRefId,
    };
  }

  async findRefreshToken(refreshToken: string): Promise<{
    authRefId: string;
    refreshToken: string;
    expiredDate: Date;
    isUsed: boolean;
    authJWTId: string;
  } | null> {
    const token = await prisma.authentication_RefreshToken.findFirst({
      where: { refreshToken },
    });

    if (!token) return null;

    return {
      authRefId: token.authRefId,
      refreshToken: token.refreshToken,
      expiredDate: token.expiredDate,
      isUsed: token.isUsed,
      authJWTId: token.authJWTId,
    };
  }

  async markRefreshTokenUsed(authRefId: string): Promise<void> {
    await prisma.authentication_RefreshToken.update({
      where: { authRefId },
      data: { isUsed: true },
    });
  }
}
