import Link from 'next/link';

export default function policyPage() {
  return (
    <>
      <h3>ご利用規約等一覧</h3>
      <p>
        このアプリをご利用になる方は，以下の規約に同意していただく必要があります．必ずご覧ください．<br />
        なお，この規約の適用範囲は，<Link href='/'>wave.app.wing.osaka</Link>内のコンテンツに限定されます．
      </p>
    </>
  )
}