import { Verify_Code } from "@prisma/client";
import { CreateMailDTO, VerifyMailDTO } from "@dtos/mailDTO";

export interface VerifyMailRepository {
  create(data: CreateMailDTO): Promise<Verify_Code>;

  findValidCode(data: VerifyMailDTO): Promise<Verify_Code | null>;

  markUsed(codeID: string): Promise<void>;
}
