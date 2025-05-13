"use client";

import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const user = useUserStore((s) => s.user);
  const isLoading = useUserStore((s) => s.isLoading);
  const router = useRouter();

  useEffect(() => {
    console.log("🧪 Zustand 상태 확인:", { user, isLoading });
    if (!isLoading && user === null) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <p>⏳ 사용자 확인 중...</p>;
  if (!user) return null;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>🔐 로그인된 사용자 전용 페이지</h1>
      <p>안녕하세요, 유저 ID: {user.id}</p>
    </main>
  );
}
