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
        <header className={styles.fixedHeader}>
          <h1 className={styles.mainTitleMini}>
            <Link href='/' className={styles.titleLink}>Wave</Link>by <a className={styles.mainTitleMini} href='https://wing.osaka' target='_blank'>Wing</a>
          </h1>
        </header>
        <section className={styles.children}>
          {children}
        </section>
        <footer className={styles.fixedFooter}>
          <p>&copy; 2025 Wing. Designed by <a href='https://wing.osaka' target='_blank'>wing.osaka</a>.</p>
          <p>転載・改変の条件等は，<Link href='/policy'>利用規約</Link>に記載しております．</p>
        </footer>
      </body>
    </html>
  );
}
