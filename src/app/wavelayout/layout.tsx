import HomeButton from '@/app-shared/homebutton';
import Link from 'next/link';
import styles from './wavelayoutstyles.module.scss';

export default function WaveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomeButton />
      <Link className={styles.menu} href='/'>
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
        一覧に戻る
      </Link>
      <p className={styles.menu}>※ビューが固まった場合は，ブラウザーのリロードボタンを押してください．</p>
      <noscript>この機能を利用するには，JavaScriptを有効にする必要があります．</noscript>
      {children}
    </>
  );
}
