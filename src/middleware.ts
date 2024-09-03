import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  if (!token || token !== "authenticated") {
    // 認証されていない場合はログインページにリダイレクト
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 認証された場合は通常通り処理を進める
  return NextResponse.next();
}

// ミドルウェアを適用するパス
export const config = {
  matcher: ["/admin/:path*"], // `/admin/` 以下のディレクトリのページに対して適用
};
