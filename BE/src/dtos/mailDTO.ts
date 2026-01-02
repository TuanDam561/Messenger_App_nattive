export interface CreateMailDTO {
  userID: string;
  content: "REGISTER" | "RESET_PASSWORD";
  verifyCode: string;
  expiredAt: Date;
}

export interface VerifyMailDTO {
  userID: string;
  code: string;
}
