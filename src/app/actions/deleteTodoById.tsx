// src/app/actions/deleteTodo.ts
"use server";

import { supabase } from "@/lib/supabase";

export async function deleteTodoById(id: string) {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("❌ 삭제 실패:", error.message);
  }

  // 별도 상태 응답 없음
}
