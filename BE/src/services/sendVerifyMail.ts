import { IAuthService } from "@interfaces/Auth/IAuthService";
import { VerifyMailRepository } from "@interfaces/Mail/IMailRepository";
import { SendVerifyMailResult } from "@dtos/mailDTO";
import { MailProvider } from "@interfaces/Mail/IMailProvider";
import { mailTemplates, MailTemplateType } from "@templates/indexTemples";
import { generateOtp } from "@utils/randomCode";
import { IAuthRepository } from "@interfaces/Auth/IAuthRepository ";

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
    private mailProvider: MailProvider,
    private authService: IAuthService,
    private userRepo: IAuthRepository
  ) {}

  /**
   * Gửi mail OTP (REGISTER / RESET_PASSWORD)
   */
  async sendVerifyMail(
    params: SendVerifyMailParams
  ): Promise<SendVerifyMailResult> {
    let userId = params.userId;

    // 👉 Nếu không có userId thì tìm bằng email
    if (!userId) {
      const user = await this.userRepo.findByEmail(params.email);

      if (!user) {
        throw new Error("Không tìm thấy người dùng với email này");
      }

      userId = user.userId;
    }

    // 1️⃣ Sinh OTP 6 số
    const { code, expiredAt } = generateOtp(6, 5);

    // 2️⃣ Lưu OTP vào DB
    const verifyRecord = await this.verifyMailRepo.create({
      userID: userId || params.userId,
      content: params.content,
      verifyCode: code,
      expiredAt,
    });

    // 3️⃣ Load template theo nghiệp vụ
    const html = mailTemplates[params.content](code);

    const subjectMap: Record<MailTemplateType, string> = {
      REGISTER: "Xác thực đăng ký tài khoản",
      RESET_PASSWORD: "Xác thực đặt lại mật khẩu",
      RE_SEND_CODE: "Mã xác thực của bạn",
    };

    // 4️⃣ Gửi mail
    await this.mailProvider.sendMail({
      to: params.email,
      subject: subjectMap[params.content],
      html,
    });
    return { userId: verifyRecord.userId, expiredAt: verifyRecord.expiredAt };
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
    // 3️⃣ Cập nhật trạng thái đã xác thực cho user (nếu là mail đăng ký)
    if (verifyRecord.content === "REGISTER") {
      await this.authService.verifyUser(params.userId);
    }
    return true;
  }
}
