import "./globals.scss";
import styles from './rootLayout.module.scss';
import Link from 'next/link';
import 'katex/dist/katex.min.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Wave App by Wing',
  description: 'Wingが作成している，波のシミュレーションアプリです．',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
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
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <body>
        <header className={styles.fixedHeader}>
          <h1 className={styles.mainTitleMini}>
            <Link href='/' className={styles.titleLink}>Wave</Link><Link className={styles.mainTitleMini} href='/'>.graphics</Link>
          </h1>
        </header>
        <p>このサイトには，<a href='https://wave.graphics'>新しいバージョン</a>があります．</p>
        <section className={styles.children}>
          {children}
        </section>
        <footer className={styles.fixedFooter}>
          <section className={styles.footerBox}>
            <p className={styles.footerContent}>&copy; 2025 Wing. Designed by <a href='https://wing.osaka' target='_blank'>wing.osaka</a>.</p>
            <p className={styles.footerContent}>必ず<Link href='/policy'>利用規約</Link>をご覧ください．</p>
          </section>
        </footer>
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      </body>
    </html>
  );
}
