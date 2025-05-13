import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_EXPIRY = "1h";
const REFRESH_TOKEN_EXPIRY = "1d";
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const supabaseClient = supabase;

    // 사용자 찾기
    const { data: users, error } = await supabaseClient
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    const user = users?.[0];

    if (!user || error) {
      return NextResponse.json(
        { error: "존재하지 않는 이메일입니다." },
        { status: 400 }
      );
    }

    // 비밀번호 검증
    const valid = await bcrypt.compare(password, user.hashed_password);
    if (!valid) {
      return NextResponse.json(
        { error: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    // JWT 발급
    const accessToken = jwt.sign(
      { sub: user.id, type: "access" }, // ✅ sub 필수!
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { sub: user.id, type: "refresh" }, // ✅ 동일하게 sub로 변경
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    // HttpOnly 쿠키 설정
    const accessCookie = serialize("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1시간
    });

    const refreshCookie = serialize("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1일
    });

    const response = NextResponse.json({ success: true });
    response.headers.append("Set-Cookie", accessCookie);
    response.headers.append("Set-Cookie", refreshCookie);

    return response;
  } catch (err) {
    console.error("❌ 로그인 API 내부 오류:", err);
    return NextResponse.json(
      { error: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
