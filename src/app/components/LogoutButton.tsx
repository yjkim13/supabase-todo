"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
  };

  return (
    <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
      🚪 로그아웃
    </button>
  );
}
