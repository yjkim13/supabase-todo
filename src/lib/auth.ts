import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getUserFromToken() {
  const cookieStore = await cookies(); // ✅ await 붙이기
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };
    return decoded.userId;
  } catch (err) {
    console.error("❌ 인증 토큰 유효하지 않음:", err);
    return null;
  }
}
