export interface RegisterDTO {
  familyName: string;
  sureName: string;
  phoneNumber: string;
  email: string;
  password: string;
  birthday: Date;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface ForgorPasswordDTO {
  email: string;
}
export interface ResetPasswordDTO {
  email: string;
  verifyCode: string;
  newPassword: string;
}
