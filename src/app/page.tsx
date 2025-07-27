import Link from 'next/link';
import styles from './homepage.module.scss';
import ErrorMark from './homepageListLogo/errormark';
import HomeCheck from './homepageListLogo/check';
import Beta from './homepageListLogo/beta';
import { getContentsInOrder, ContentMeta } from '../lib/contents';

export default function Home() {
  const contents: ContentMeta[] = getContentsInOrder(); 

  return (
    <>
      <section>
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
              <td><HomeCheck /></td>
              <td><Link href='/wavelayout/tanshindou'>単振動</Link></td>
              <td>：</td>
              <td>単振動は，波の基本です．さっそく可視化してみましょう．</td>
            </tr>
            <tr>
              <td><HomeCheck /></td>
              <td><Link href='/wavelayout/pulse'>パルス波</Link></td>
              <td>：</td>
              <td>ごく短い間の単独の波を，パルス波といいます．パルス波を用いて，波の伝わり方を観察しましょう．</td>
            </tr>
            <tr>
              <td><HomeCheck /></td>
              <td><Link href='/wavelayout/kasane'>波の重ね合わせ</Link></td>
              <td>：</td>
              <td>パルス波を使って，二つの波が重なったらどうなるか，観察してみましょう．</td>
            </tr>
            <tr>
              <td><HomeCheck /></td>
              <td><Link href='/wavelayout/freeend'>自由端反射</Link></td>
              <td>：</td>
              <td>自由端反射は，波が固定されていない端点で反射するときに起こります．</td>
            </tr>
            <tr>
              <td><HomeCheck /></td>
              <td><Link href='/wavelayout/fixedend'>固定端反射</Link></td>
              <td>：</td>
              <td>固定端反射は，波が固定されている端点で反射するときに起こります．</td>
            </tr>
            <tr>
              <td><ErrorMark /></td>
              <td><Link href='/wavelayout/sinwave'>正弦波</Link></td>
              <td>：</td>
              <td><Beta /></td>
            </tr>
            <tr>
              <td><ErrorMark /></td>
              <td><Link href='/wavelayout/tateyoko'>縦波と横波</Link></td>
              <td>：</td>
              <td>Coming Soon...</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content) => ( // map関数で content を使う
            <article key={content.slug} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              {/* 各コンテンツへのリンクは /contents/{slug} となります */}
              <Link href={`/wavelayout/${content.slug}`} className="block">
                <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-2">
                  {content.title}
                </h2>
              </Link>
              {content.description && <p className="text-gray-700 mb-4">{content.description}</p>}
            </article>
          ))}
        </div>
      </section>
      <section>
        <h3>このプログラムのソースコード</h3>
        <p>本サイトのソースコードは，全て<a href='https://r.wing.osaka/wavesrccode' target='_blank'>こちら</a>で公開しております．</p>
        <h3>利用したフレームワーク</h3>
        <ul>
          <li><strong><a href='https://r.wing.osaka/nextjs' target='_blank'>Next.js</a></strong>：Webアプリの構築を効率化し，高速で使いやすくする．</li>
          <li><strong><a href='https://r.wing.osaka/katex' target='_blank'>KaTeX</a></strong>：Webページ上に数式を記述できる．</li>
          <li><strong><a href='https://r.wing.osaka/sass' target='_blank'>Sass</a></strong>：CSSを拡張したスタイルシート言語．</li>
        </ul>
      </section>
    </>
  );
}
