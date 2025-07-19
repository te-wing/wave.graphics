import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  //環境変数からカスタムドメインを取得
  const customDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN;

  //リクエストのホスト名を取得
  const host = req.headers.get('host');

  // .pages.devのアクセスであり，かつカスタムドメインが設定されている場合
  if (host && customDomain && host.endsWith('.pages.dev')) {
    //カスタムドメインにパスとクエリパラメータは維持してリダイレクト
    const newUrl = new URL(req.nextUrl.pathname, `https://${customDomain}`);
    newUrl.search = req.nextUrl.search;

    // 301リダイレクトを返す
    return NextResponse.redirect(newUrl, 301);
  }

  // それ以外のアクセスは普通に通す
  return NextResponse.next();
}

// Middlewareを実行するパス
export const config = {
    matcher: '/:path*',
};