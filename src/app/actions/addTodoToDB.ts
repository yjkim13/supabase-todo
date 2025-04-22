// src/app/actions/addTodoToDB.ts
"use server";

import { supabase } from "@/lib/supabase";

type FormState = {
  message: string;
};

export async function addTodoToDB(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const todo = formData.get("todo")?.toString();

  if (!todo || todo.trim().length < 2) {
    return { message: "❌ 두 글자 이상 입력해 주세요!" };
  }

  const { error } = await supabase
    .from("todos")
    .insert([{ text: todo, done: false }]);

  if (error) {
    console.error("❌ Supabase insert error:", error.message);
    return { message: "❌ 저장 중 에러가 발생했습니다." };
  }

  return { message: `✅ "${todo}"가 저장되었습니다.` };
}
