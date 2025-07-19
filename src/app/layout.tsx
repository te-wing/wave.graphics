import type { Metadata } from "next";
import "./globals.scss";
import styles from './rootLayout.module.scss';
import Link from 'next/link';

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
        <h1><Link href='/' className={styles.titleLink}>Wave</Link> by Wing</h1>
        {children}
      </body>
    </html>
  );
}
