import jwt from "jsonwebtoken";
import { IJwtProvider } from "@interfaces/Token/IJwtProvider";

export class JwtProvider implements IJwtProvider {
  signAccessToken(payload: { userId: string; role: string }): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!) as any;
  }
}
