import type { Metadata } from "next";
import "./globals.css";
import styles from './rootLayout.module.scss';

export const metadata: Metadata = {
  title: "Wave | Physics Simulator App by Wing",
  description: "物理の勉強で出てくるような，波の様子をオンラインで簡単に可視化できます．",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
