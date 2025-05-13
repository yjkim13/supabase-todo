"use client";

import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export default function AuthLoader() {
  const setUser = useUserStore((s) => s.setUser);
  const setIsLoading = useUserStore((s) => s.setIsLoading);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me", { credentials: "include" });
        const data = await res.json();

        console.log("🔐 /me 응답:", res.status, data);

        if (res.ok && data?.user?.id) {
          setUser({ id: data.user.id });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("❌ 사용자 정보 불러오기 실패:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setUser, setIsLoading]);

  return null;
}
