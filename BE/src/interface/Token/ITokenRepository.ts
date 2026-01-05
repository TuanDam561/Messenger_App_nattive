import {
  AccessTokenPersistenceDTO,
  RefreshTokenPersistenceDTO,
} from "@dtos/tokenDTO";

export interface ITokenRepository {
  // ===== ACCESS TOKEN =====
  createAccessToken(
    data: AccessTokenPersistenceDTO
  ): Promise<{ authJWTId: string }>;

  findAccessTokenById(authJWTId: string): Promise<{
    authJWTId: string;
    jwtToken: string;
    expiredDate: Date;
    isUsed: boolean;
    userId: string;
  } | null>;

  markAccessTokenUsed(authJWTId: string): Promise<void>;

  // ===== REFRESH TOKEN =====
  createRefreshToken(
    data: RefreshTokenPersistenceDTO
  ): Promise<{ authRefId: string }>;

  findRefreshToken(refreshToken: string): Promise<{
    authRefId: string;
    refreshToken: string;
    expiredDate: Date;
    isUsed: boolean;
    authJWTId: string;
  } | null>;

  markRefreshTokenUsed(authRefId: string): Promise<void>;
}
