// types/authTypes.ts
export interface RegisterResponse {
  userId: string;
  gmail: string;
  familyName: string;
  sureName: string;
  phoneNumber: string;
  role: string;
}

export interface LoginResponse {
  userId: string;
  gmail: string;
  familyName: string;
  sureName: string;
  phoneNumber: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}
