import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './policylayout.module.scss';

export const metadata: Metadata = {
  title: 'ご利用規約一覧 | Wave App by Wing',
  description: 'このアプリをご利用なさる場合は，このページに記載している規約等に同意していただく必要があります．'
}

export default function PolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h2>ご利用規約</h2>
      {children}
      <div className={styles.homeButton}>
        <Link className={styles.homeLink} href='/'>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill='currentColor'><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
        </Link>
      </div>
    </>
  );
}
