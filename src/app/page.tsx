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
            <article className={styles.waveLayoutList} key={content.slug}>
              <div className={styles.titleBox}>
                {content.isAvailable === false ? (
                  <div className={styles.titleBox}>
                    <ErrorMark />
                    <Link href={`/wavelayout/${content.slug}`}>
                      <h3 className={styles.title}>
                        {content.title}
                      </h3>
                    </Link>
                  </div>
                ) : (
                  <div className={styles.titleBox}>
                    <HomeCheck />
                    <Link href={`/wavelayout/${content.slug}`}>
                      <h3 className={styles.title}>
                        {content.title}
                      </h3>
                    </Link>
                  </div>
                )}
              </div>
              {content.description && <p className={styles.indexDescription}>{content.description}</p>}
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2>このプログラムのソースコード</h2>
        <p>本サイトのソースコードは，全て<a href='https://r.wing.osaka/wavesrccode' target='_blank'>こちら</a>で公開しております．</p>
        <h2>利用したフレームワーク</h2>
        <ul>
          <li><strong><a href='https://r.wing.osaka/nextjs' target='_blank'>Next.js</a></strong>：Webアプリの構築を効率化し，高速で使いやすくする．</li>
          <li><strong><a href='https://r.wing.osaka/katex' target='_blank'>KaTeX</a></strong>：Webページ上に数式を記述できる．</li>
          <li><strong><a href='https://r.wing.osaka/sass' target='_blank'>Sass</a></strong>：CSSを拡張したスタイルシート言語．</li>
        </ul>
        <h2>アンケート・お問い合わせ</h2>
        <p>
          <a href='/form'>こちらのページ</a>に，アンケート・お問い合わせ用のフォームを設置しております．ぜひご利用ください．<br />
          なお，お問い合わせに関しては，メール<a href="mailto:wing@me.wing.osaka">wing@me.wing.osaka</a>からもご連絡いただけます．
        </p>
      </section>
    </>
  );
}
