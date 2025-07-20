import Link from 'next/link';

export default function policyPage() {
  return (
    <>
      <h3>ご利用規約等一覧</h3>
      <p>
        このアプリをご利用になる方は，以下の規約に同意していただく必要があります．必ずご覧ください．<br />
        なお，この規約の適用範囲は，<Link href='/'>wave.app.wing.osaka</Link>内のコンテンツに限定されます．
      </p>
      <section>
        <table>
          <tbody>
            <tr>
              <td><Link href='/policy/c/privacy'>プライバシーに関する声明</Link></td>
              <td>：</td>
              <td>当サイト及び運営者が取得する情報について</td>
            </tr>
            <tr>
              <td><Link href='/policy/c/use'>ご利用規約</Link></td>
              <td>：</td>
              <td>ご利用頂くための規則および確認事項</td>
            </tr>
            <tr>
              <td><Link href='/policy/c/copy'>複製・転載・改変について</Link></td>
              <td>：</td>
              <td>当サイトの複製・転載・改変の可否について</td>
            </tr>
          </tbody>
        </table>
      </section>
      <h3>連絡先</h3>
      <p>このサイトに関して何らかのトラブルが起きた場合で，特に解決を希望される場合，フィードバックは，<a href='mailto:wing@me.wing.osaka'>wing@me.wing.osaka</a>までご連絡ください．反応するかどうかは，知りません．</p>
    </>
  )
}