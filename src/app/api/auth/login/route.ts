import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  const correctPassword = "admin123"; // 仮の登録パスワード(本来はlocal環境に記述、簡易化の為に直書き)

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
