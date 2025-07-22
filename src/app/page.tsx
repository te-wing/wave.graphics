import Link from 'next/link';
import styles from './homepage.module.scss';

export default function Home() {
  return (
    <>
      <h2>コンテンツ一覧</h2>
      <p>スクロールして，様々な波の模型を見てみましょう！</p>
      <table>
        <colgroup>
          <col className={styles.waveList}></col>
          <col className={styles.col1}/>
          <col />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill='var(--green-check)'><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></td>
            <td><Link href='/wavelayout/tanshindou'>単振動</Link></td>
            <td>：</td>
            <td>単振動は，波の基本です．さっそく可視化してみましょう．</td>
          </tr>
          <tr>
            <td><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill='var(--green-check)'><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></td>
            <td><Link href='/wavelayout/pulse'>パルス波</Link></td>
            <td>：</td>
            <td>ごく短い間の単独の波を，パルス波といいます．パルス波を用いて，波の伝わり方を観察しましょう．</td>
          </tr>
          <tr>
            <td><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill='var(--green-check)'><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></td>
            <td><Link href='/wavelayout/kasane'>波の重ね合わせ</Link></td>
            <td>：</td>
            <td>パルス波を使って，二つの波が重なったらどうなるか，観察してみましょう．</td>
          </tr>
          <tr>
            <td><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill='var(--green-check)'><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></td>
            <td><Link href='/wavelayout/freeend'>自由端反射</Link></td>
            <td>：</td>
            <td>自由端反射は，波が固定されていない端点で反射するときに起こります．</td>
          </tr>
          <tr>
            <td><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff2600"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></td>
            <td><Link href='/wavelayout/fixedend'>固定端反射</Link></td>
            <td>：</td>
            <td>Coming soon...</td>
          </tr>
          <tr>
            <td><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff2600"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></td>
            <td><Link href='/wavelayout/sinwave'>正弦波</Link></td>
            <td>：</td>
            <td>Coming soon...</td>
          </tr>
          <tr>
            <td><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff2600"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></td>
            <td><Link href='/wavelayout/tateyoko'>縦波と横波</Link></td>
            <td>：</td>
            <td>Coming Soon...</td>
          </tr>
        </tbody>
      </table>
      <h3>このプログラムのソースコード</h3>
      <p>本サイトのソースコードは，全て<a href='https://r.wing.osaka/wavesrccode' target='_blank'>こちら</a>で公開しております．</p>
      <h3>利用したフレームワーク</h3>
      <ul>
        <li><strong><a href='https://r.wing.osaka/nextjs' target='_blank'>Next.js</a></strong>：Webアプリの構築を効率化し，高速で使いやすくする．</li>
        <li><strong><a href='https://r.wing.osaka/katex' target='_blank'>KaTeX</a></strong>：Webページ上に数式を記述できる．</li>
        <li><strong><a href='https://r.wing.osaka/sass' target='_blank'>Sass</a></strong>：CSSを拡張したスタイルシート言語．</li>
      </ul>
    </>
  );
}
