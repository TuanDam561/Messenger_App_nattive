export interface CreateMailDTO {
  userID: string;
  content: "REGISTER" | "RESET_PASSWORD" | "RE_SEND_CODE";
  verifyCode: string;
  expiredAt: Date;
}

export interface VerifyMailDTO {
  userID: string;
  code: string;
}

export interface SendVerifyMailResult {
  userId: string;
  expiredAt: Date;
}
