import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  // Cookieを削除
  response.cookies.set("authToken", "", {
    httpOnly: true,
    path: "/",
    maxAge: -1,
  });

  return response;
}
