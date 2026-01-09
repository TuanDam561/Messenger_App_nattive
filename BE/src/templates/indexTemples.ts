import { registerTemplate } from "@templates/registerTemplates";
import { resetPasswordTemplate } from "@templates/resetPasswordTemplates";
import { reSendTemplate } from "@templates/reSendTemplates";

export type MailTemplateType = "REGISTER" | "RESET_PASSWORD" | "RE_SEND_CODE";

export const mailTemplates = {
  REGISTER: registerTemplate,
  RESET_PASSWORD: resetPasswordTemplate,
  RE_SEND_CODE: reSendTemplate,
};
