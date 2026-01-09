export const reSendTemplate = (code: string) => `
  <div style="font-family: Arial, sans-serif;">
    <h2>Mã xác thực gửi lại</h2>
    <p>Mã OTP để xác thực:</p>
    <h1 style="color: #eb5757;">${code}</h1>
    <p>Mã có hiệu lực trong <b>5 phút</b>.</p>
  </div>
`;
