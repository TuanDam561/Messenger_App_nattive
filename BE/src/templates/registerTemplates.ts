export const registerTemplate = (code: string) => `
  <div style="font-family: Arial, sans-serif;">
    <h2>Chào mừng bạn đăng ký tài khoản</h2>
    <p>Mã xác thực của bạn là:</p>
    <h1 style="color: #2f80ed;">${code}</h1>
    <p>Mã có hiệu lực trong <b>5 phút</b>.</p>
    <p>Nếu không phải bạn thực hiện, vui lòng bỏ qua email này.</p>
  </div>
`;
