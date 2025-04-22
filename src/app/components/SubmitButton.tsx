"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        backgroundColor: pending ? "#ccc" : "#0070f3",
        color: "white",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
        cursor: pending ? "not-allowed" : "pointer",
        transition: "0.2s ease",
      }}
    >
      {pending ? "⏳ 추가 중..." : "➕ 추가"}
    </button>
  );
}
