import { registerTemplate } from "@templates/registerTemplates";
import { resetPasswordTemplate } from "@templates/resetPasswordTemplates";

export type MailTemplateType = "REGISTER" | "RESET_PASSWORD";

export const mailTemplates = {
  REGISTER: registerTemplate,
  RESET_PASSWORD: resetPasswordTemplate,
};
