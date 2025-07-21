import Link from 'next/link';
import styles from './homepage.module.scss';

export default function Home() {
  return (
    <>
      <p>スクロールして，様々な波の模型を見てみましょう！</p>
      <table>
        <colgroup>
          <col className={styles.col1}/>
          <col />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td><Link className={styles.waveList} href='/wavelayout/tanshindou'>単振動</Link></td>
            <td>：</td>
            <td>単振動は，波の基本です．さっそく可視化してみましょう．</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
