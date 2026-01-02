import { registerTemplate } from "./registerTemplates";
import { resetPasswordTemplate } from "./resetPasswordTemplates";

export type MailTemplateType = "REGISTER" | "RESET_PASSWORD";

export const mailTemplates = {
  REGISTER: registerTemplate,
  RESET_PASSWORD: resetPasswordTemplate,
};
