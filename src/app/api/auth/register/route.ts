// src/app/api/auth/register/route.ts
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "이메일과 비밀번호는 필수입니다." },
      { status: 400 }
    );
  }

  //   const supabase = createClient();

  // 이메일 중복 체크
  const { data: existingUsers } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .limit(1);

  if (existingUsers && existingUsers.length > 0) {
    return NextResponse.json(
      { error: "이미 가입된 이메일입니다." },
      { status: 400 }
    );
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 유저 등록
  const { error } = await supabase.from("users").insert({
    email,
    hashed_password: hashedPassword,
  });

  if (error) {
    return NextResponse.json(
      { error: "회원가입에 실패했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
