import crypto from "crypto";
import { ITokenService } from "@interfaces/Token/ITokenService";
import { ITokenRepository } from "@interfaces/Token/ITokenRepository";
import { IJwtProvider } from "@interfaces/Token/IJwtProvider";
import { TokenResponseDTO } from "@dtos/tokenDTO";

export class TokenService implements ITokenService {
  constructor(
    private readonly tokenRepo: ITokenRepository,
    private readonly jwtProvider: IJwtProvider
  ) {}

  async generateTokens(user: {
    userId: string;
    role: string;
  }): Promise<TokenResponseDTO> {
    // 1. Sign access JWT
    const accessToken = this.jwtProvider.signAccessToken({
      userId: user.userId,
      role: user.role,
    });

    // 2. Generate refresh token
    const refreshToken = crypto.randomBytes(64).toString("hex");

    const accessExpired = new Date(Date.now() + 15 * 60 * 1000);
    const refreshExpired = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // 3. Save access token
    const { authJWTId } = await this.tokenRepo.createAccessToken({
      userId: user.userId,
      jwtToken: accessToken,
      contentToken: "ACCESS",
      expiredDate: accessExpired,
    });

    // 4. Save refresh token
    await this.tokenRepo.createRefreshToken({
      authJWTId,
      refreshToken,
      contentToken: "REFRESH",
      expiredDate: refreshExpired,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string): Promise<TokenResponseDTO> {
    const stored = await this.tokenRepo.findRefreshToken(refreshToken);

    if (!stored || stored.isUsed) {
      throw new Error("Refresh token không hợp lệ");
    }

    if (stored.expiredDate < new Date()) {
      throw new Error("Refresh token đã hết hạn");
    }

    await this.tokenRepo.markRefreshTokenUsed(stored.authRefId);
    await this.tokenRepo.markAccessTokenUsed(stored.authJWTId);

    const oldAccess = await this.tokenRepo.findAccessTokenById(
      stored.authJWTId
    );
    if (!oldAccess) {
      throw new Error("Access token không tồn tại");
    }

    return this.generateTokens({
      userId: oldAccess.userId,
      role: "USER",
    });
  }

  async revokeTokensByRefreshToken(refreshToken: string): Promise<void> {
    const stored = await this.tokenRepo.findRefreshToken(refreshToken);
    if (!stored) return;

    await this.tokenRepo.markRefreshTokenUsed(stored.authRefId);
    await this.tokenRepo.markAccessTokenUsed(stored.authJWTId);
  }
}
