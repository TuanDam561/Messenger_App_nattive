import crypto from "crypto";

export interface GenerateOtpResult {
  code: string;
  expiredAt: Date;
}

/**
 * Sinh OTP số + thời gian hết hạn
 * @param length số chữ số OTP (mặc định 6)
 * @param expireMinutes thời gian hết hạn (mặc định 5 phút)
 */
export function generateOtp(
  length: number = 6,
  expireMinutes: number = 5
): GenerateOtpResult {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const code = crypto.randomInt(min, max).toString();
  const expiredAt = new Date(Date.now() + expireMinutes * 60 * 1000);

  return { code, expiredAt };
}
