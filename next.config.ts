import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import type { NextConfig } from "next";
import withMDX from "@next/mdx";

// Cloudflare の開発プラットフォーム設定
// 開発時 (`next dev`) にのみ有効
setupDevPlatform().catch(console.error);

const nextConfig: NextConfig = {
  // ページの拡張子にmdxとmdを追加
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // ReactのStrictModeを有効化
  reactStrictMode: true,

  // 他のNext.js設定...
};

// MDXの設定をNext.jsの設定と結合
const mdxConfig = withMDX({
  options: {
    // remark-gfmを使う場合、Next.jsの設定ファイルをmjsにする必要があるため注意
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default mdxConfig(nextConfig);
