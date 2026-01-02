export const resetPasswordTemplate = (code: string) => `
  <div style="font-family: Arial, sans-serif;">
    <h2>Yêu cầu đặt lại mật khẩu</h2>
    <p>Mã OTP để đặt lại mật khẩu:</p>
    <h1 style="color: #eb5757;">${code}</h1>
    <p>Mã có hiệu lực trong <b>5 phút</b>.</p>
  </div>
`;
