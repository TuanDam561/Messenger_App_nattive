export interface CreateMailDTO {
  userID: string;
  content: "REGISTER" | "RESET_PASSWORD";
  verifyCode: string;
}

export interface VerifyMailDTO {
  userID: string;
  code: string;
}
