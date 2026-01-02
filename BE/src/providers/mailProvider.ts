import nodemailer from "nodemailer";
import { MailProvider, MailPayload } from "../interface/IMailProvider";

export class NodemailerMailProvider implements MailProvider {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(payload: MailPayload): Promise<void> {
    await this.transporter.sendMail({
      from: `"No Reply" <${process.env.MAIL_USER}>`,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    });
  }
}
