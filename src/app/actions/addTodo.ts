"use server";

import { FormState } from "@/types/todos";

export async function addTodoWithMessage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const todo = formData.get("todo")?.toString() ?? "";

  if (todo.trim().length < 2) {
    return {
      message: "❌ 두 글자 이상 입력해 주세요!",
      todos: prevState.todos,
    };
  }

  console.log("📥 추가된 할 일:", todo);

  return {
    message: `✅ "${todo}" 추가 완료!`,
    todos: [...prevState.todos, todo],
  };
}
