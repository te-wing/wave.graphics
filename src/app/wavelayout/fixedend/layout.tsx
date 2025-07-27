import type { Metadata } from "next";
import Link from 'next/link';
import styles from './fixedendlayout.module.scss';

export const metadata: Metadata = {
  title: '固定端反射 | Wave App by Wing',
  description: '固定端反射は，波が固定されている端点で反射するときに起こります．可視化してみましょう．'
};

export default function FixedEndWaveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <table className={styles.titleTable}>
        <tbody>
          <tr>
          <td><h2>固定端反射</h2></td>
          <td className={styles.linkToAnother}>
            <Link href='/wavelayout/freeend'>
              自由端反射へ
              <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
            </Link>
          </td>
          </tr>
        </tbody>
      </table>
      {children}
    </>
  );
}