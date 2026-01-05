import { TokenResponseDTO } from "@dtos/tokenDTO";

export interface ITokenService {
  generateTokens(user: {
    userId: string;
    role: string;
  }): Promise<TokenResponseDTO>;

  refreshTokens(refreshToken: string): Promise<TokenResponseDTO>;

  revokeTokensByRefreshToken(refreshToken: string): Promise<void>;
}
