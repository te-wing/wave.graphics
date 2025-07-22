import "./globals.scss";
import styles from './rootLayout.module.scss';
import Link from 'next/link';
import 'katex/dist/katex.min.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wave App by Wing',
  description: 'Wingが作成している，波のシミュレーションアプリです．',
  icons: [
    { rel: 'icon', url: '/wavewing.png' },
    { rel: 'apple-touch-icon', url: '/wavewing.png', sizes: '1600x1600' },
  ],
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
          <section className={styles.footerBox}>
            <p className={styles.footerContent}>&copy; 2025 Wing. Designed by <a href='https://wing.osaka' target='_blank'>wing.osaka</a>.</p>
            <p className={styles.footerContent}>必ず<Link href='/policy'>利用規約</Link>をご覧ください．</p>
          </section>
        </footer>
      </body>
    </html>
  );
}
