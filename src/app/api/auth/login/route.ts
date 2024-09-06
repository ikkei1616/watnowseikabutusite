import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabase/supabase";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  const { data, error } = await supabase
    .from("password")
    .select("correct_password")
    .single();

  if (error) {
    return NextResponse.json(
      { message: "Error retrieving password" },
      { status: 500 }
    );
  }
  const correctPassword = data.correct_password as string;

  if (password.trim() === correctPassword.trim()) {
    // JWTトークンの生成
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1m")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));

    const response = NextResponse.json({ message: "Logged in" });
    response.cookies.set("authToken", token, {
      httpOnly: true, //実装時はhttpsに指定する予定
      path: "/", //アプリケーション内のすべてのpathに対してcookieを適用
      maxAge: 60, // 1m
    });
    return response;
  } else {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }
}
