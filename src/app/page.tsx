import Link from 'next/link';
import styles from './homepage.module.scss';

export default function Home() {
  return (
    <>
      <p>スクロールして，様々な波の模型を見てみましょう！</p>
      <table>
        <tbody>
          <tr>
            <td><Link className={styles.waveList} href='/wavelayout/tanshindou'>単振動</Link></td>
            <td>単振動は，波の</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
