// shared/utils/hash.ts
// shared/utils/hash.ts
import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};
