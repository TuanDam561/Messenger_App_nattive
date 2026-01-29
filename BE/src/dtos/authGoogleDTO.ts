// Token đưa lên xác thực
export interface GoogleLoginRequestDTO {
  idToken: string;
}

// Thông tin user lấy từ Google sau khi xác thực token
export interface GoogleProfileDTO {
  email: string;
  familyName?: string;
  sureName?: string;
  avatarURL?: string;
  providerId: string;
}

// Dữ liệu phản hồi sau khi đăng nhập/đăng ký thành công bằng Google
export interface AuthResponseDTO {
  accessToken: string;
  refreshToken?: string;
  user: {
    userId: string;
    gmail: string;
    familyName: string;
    sureName: string;
    avatarURL?: string;
    bannerURL?: string;
    role: string;
    isVerify: boolean;
  };
}
