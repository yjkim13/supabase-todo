import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    console.warn("❌ access_token 없음");
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    return NextResponse.json({ user: { id: payload.userId } });
  } catch (err) {
    console.error("❌ JWT 오류:", err);
    return NextResponse.json({ user: null }, { status: 403 });
  }
}
