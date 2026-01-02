import crypto from "crypto";
import { VerifyMailRepository } from "../interface/IMailRepository";
import { MailProvider } from "../interface/IMailProvider";
import { mailTemplates, MailTemplateType } from "../templates/indexTemples";

interface SendVerifyMailParams {
  userId: string;
  email: string;
  content: MailTemplateType; // "REGISTER" | "RESET_PASSWORD"
}

interface VerifyCodeParams {
  userId: string;
  code: string;
}

export class VerifyMailService {
  constructor(
    private verifyMailRepo: VerifyMailRepository,
    private mailProvider: MailProvider
  ) {}

  /**
   * Gửi mail OTP (REGISTER / RESET_PASSWORD)
   */
  async sendVerifyMail(params: SendVerifyMailParams): Promise<void> {
    // 1️⃣ Sinh OTP 6 số
    const code = crypto.randomInt(100000, 999999).toString();
    const expiredAt = new Date(Date.now() + 5 * 60 * 1000);

    // 2️⃣ Lưu OTP vào DB
    await this.verifyMailRepo.create({
      userID: params.userId,
      content: params.content,
      verifyCode: code,
      expiredAt,
    });

    // 3️⃣ Load template theo nghiệp vụ
    const html = mailTemplates[params.content](code);

    const subjectMap: Record<MailTemplateType, string> = {
      REGISTER: "Xác thực đăng ký tài khoản",
      RESET_PASSWORD: "Xác thực đặt lại mật khẩu",
    };

    // 4️⃣ Gửi mail
    await this.mailProvider.sendMail({
      to: params.email,
      subject: subjectMap[params.content],
      html,
    });
  }

  /**
   * Xác thực OTP
   */
  async verifyCode(params: VerifyCodeParams): Promise<boolean> {
    // 1️⃣ Check OTP hợp lệ
    const verifyRecord = await this.verifyMailRepo.findValidCode({
      userID: params.userId,
      code: params.code,
    });

    if (!verifyRecord) {
      throw new Error("Mã xác thực không hợp lệ hoặc đã hết hạn");
    }

    // 2️⃣ Đánh dấu OTP đã dùng
    await this.verifyMailRepo.markUsed(verifyRecord.codeId);

    return true;
  }
}
