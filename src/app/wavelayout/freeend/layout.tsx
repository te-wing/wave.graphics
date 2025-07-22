import type { Metadata } from "next";
import Link from 'next/link';
import styles from './freeendlayout.module.scss';

export const metadata: Metadata = {
  title: '自由端反射 | Wave App by Wing',
  description: '自由端反射について可視化してみましょう．'
};

export default function FreeEndWaveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <table className={styles.titleTable}>
        <tbody>
          <tr>
          <td><h2>自由端反射</h2></td>
          <td className={styles.linkToAnother}>
            <Link href='/wavelayout/fixedend'>固定端反射へ＞</Link>
          </td>
          </tr>
        </tbody>
      </table>
      {children}
    </>
  );
}