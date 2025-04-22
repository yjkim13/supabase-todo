import { supabase } from "./supabase";

export async function fetchTodos() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ fetchTodos error:", error.message);
    return [];
  }

  return data ?? [];
}
