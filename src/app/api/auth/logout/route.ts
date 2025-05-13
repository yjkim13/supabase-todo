// app/api/auth/logout/route.ts
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  const deleteAccess = serialize("access_token", "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
  });

  const deleteRefresh = serialize("refresh_token", "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
  });

  const response = NextResponse.json({ success: true });
  response.headers.append("Set-Cookie", deleteAccess);
  response.headers.append("Set-Cookie", deleteRefresh);
  return response;
}
