import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  const correctPassword = process.env.WATNOW_LOGIN_CORRECT_PASSWORD; // 仮の登録パスワード(変更してlocal.envに記述済み)

  if (password === correctPassword) {
    // トークンの生成（今回は簡易的に固定文字列をトークンとする）(今後はJWTトークンを利用予定)
    const token = "authenticated";

    // Cookieをセット
    const response = NextResponse.json({ message: "Logged in" });
    response.cookies.set("authToken", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1日
    });
    return response;
  } else {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }
}
