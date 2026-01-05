//Tạo Token mới khi login và xin lại mã mới khi mã cũ hết hạn service sài
export interface CreateAccessTokenDTO {
  userId: string;
  role: string;
  expiredDate: Date;
}
export interface CreateRefreshTokenDTO {
  authJWTId: string;
  expiredDate: Date;
}

//Mã này server tự sinh ra và gửi về client Controller sài để check
export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

//Mã này client gửi lên server để xin mã mới khi đăng nhập service sài
export interface TokenResponseDTO {
  accessToken: string;
  refreshToken: string;
}

//Lưu token vào DB lưu thông trong nội bộ hệ thống sài cho repository
export interface AccessTokenPersistenceDTO {
  userId: string;
  jwtToken: string;
  contentToken: "ACCESS";
  expiredDate: Date;
}

export interface RefreshTokenPersistenceDTO {
  authJWTId: string;
  refreshToken: string;
  contentToken: "REFRESH";
  expiredDate: Date;
}
