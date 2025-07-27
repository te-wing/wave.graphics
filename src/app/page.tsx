import Link from 'next/link';
import styles from './homepage.module.scss';
import ErrorMark from './homepageListLogo/errormark';
import HomeCheck from './homepageListLogo/check';
import { getContentsInOrder, ContentMeta } from '../lib/contents';

export default function Home() {
  const contents: ContentMeta[] = getContentsInOrder(); 

  return (
    <>
      <h2>コンテンツ一覧</h2>
      <p>スクロールして，様々な波の模型を見てみましょう！</p>
      <section>
        <div>
          {contents.map((content) => ( // map関数で content を使う
            <article key={content.slug}>
              {/* 各コンテンツへのリンクは /contents/{slug} となります */}
              <Link href={`/wavelayout/${content.slug}`}>
                <h3>
                  {content.title}
                </h3>
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
