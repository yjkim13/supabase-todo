// src/app/page.tsx
"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import DeleteButton from "./components/DeleteButton";

type Todo = {
  id: string;
  text: string;
  done: boolean;
  created_at: string;
};

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTodos(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main style={{ padding: "2rem", maxWidth: "600px" }}>
      <h1>📋 Supabase Todo 목록</h1>

      {loading && <p>로딩 중...</p>}

      <ul style={{ marginTop: "1rem" }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
            🟢 {todo.text}
            <DeleteButton id={todo.id} onDeleted={fetchTodos} />
          </li>
        ))}
      </ul>
    </main>
  );
}
