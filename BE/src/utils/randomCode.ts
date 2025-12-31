import { randomInt } from "node:crypto";

/**
 * Generate một mã OTP ngẫu nhiên chỉ chứa số.
 *
 * @param length Độ dài OTP (mặc định 6, phổ biến nhất)
 * @returns Chuỗi OTP dạng string (ví dụ: "483920")
 */
export function generateOTP(length: number = 6): string {
  if (length <= 0) {
    throw new Error("Độ dài OTP phải lớn hơn 0");
  }

  // Tính giá trị min và max để randomInt trả về số từ 0 đến 10^length - 1
  // Ví dụ length=6 → min=0, max=999999 → kết quả 0 đến 999999
  const min = 0;
  const max = Math.pow(10, length);

  // randomInt là synchronous và cryptographically secure
  const otpNumber = randomInt(min, max);

  // Pad left với '0' để đảm bảo luôn đủ độ dài (ví dụ 004839 → "004839")
  return otpNumber.toString().padStart(length, "0");
}

// Ví dụ sử dụng (có thể chạy thử bằng ts-node hoặc compile ra JS)
if (require.main === module) {
  console.log("OTP 4 chữ số:", generateOTP(4)); // ví dụ: 7421
  console.log("OTP 6 chữ số:", generateOTP(6)); // ví dụ: 039481
  console.log("OTP 8 chữ số:", generateOTP(8)); // ví dụ: 00194735
}
