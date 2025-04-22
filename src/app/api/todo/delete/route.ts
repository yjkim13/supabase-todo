// src/app/api/todo/delete/route.ts
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;

  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("❌ Supabase 삭제 오류:", error.message);
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}
