import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "리프레시 토큰이 없습니다." },
      { status: 401 }
    );
  }

  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET) as {
      userId: string;
    };

    // 새 access token 발급
    const newAccessToken = jwt.sign(
      { userId: payload.userId, type: "access" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const accessCookie = serialize("access_token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1시간
    });

    const response = NextResponse.json({ success: true });
    response.headers.append("Set-Cookie", accessCookie);

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: "리프레시 토큰이 유효하지 않습니다." },
      { status: 403 }
    );
  }
}
