export interface IJwtProvider {
  signAccessToken(payload: { userId: string; role: string }): string;

  verifyAccessToken(token: string): {
    userId: string;
    role: string;
    iat: number;
    exp: number;
  };
}
