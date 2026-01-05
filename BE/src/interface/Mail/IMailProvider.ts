export interface MailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface MailProvider {
  sendMail(payload: MailPayload): Promise<void>;
}
