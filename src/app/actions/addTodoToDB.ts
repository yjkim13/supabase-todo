"use server";

import { supabase } from "@/lib/supabase";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function addTodoToDB(formData: FormData) {
  const todo = formData.get("todo")?.toString() ?? "";
  const JWT_SECRET = process.env.JWT_SECRET!;
  // ✅ 1. access_token에서 user.id 추출
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return { message: "❌ 로그인 필요" };

  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_SECRET)
  );
  const userId = payload.sub; // 🔑 여기서 sub가 user.id임

  // ✅ 2. user_id 포함하여 DB insert
  const { error } = await supabase.from("todos").insert({
    content: todo,
    user_id: userId, // ✅ 필수
  });

  if (error) return { message: "❌ 저장 실패" };
  return { message: `✅ "${todo}" 추가 완료!` };
}
