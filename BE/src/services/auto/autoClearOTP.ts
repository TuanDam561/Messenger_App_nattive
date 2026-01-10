import cron from "node-cron";
import { prisma } from "@configs/prisma";

export function startOtpCleanupJob() {
  cron.schedule("*/10 * * * *", async () => {
    await prisma.verify_Code.deleteMany({
      where: {
        expiredAt: { lt: new Date() },
      },
    });
    console.log("🧹 Cleaned expired OTP");
  });
}
