import Link from 'next/link';
import HomeButton from '@/app-shared/homebutton'

export const runtime = "edge";

export default function NotFound() {
  return (
    <>
      <title>404: This page could not be found.</title>
      <p>お探しのページは見つかりませんでした．ページが削除されたか，移動した可能性もあります．<Link href='/'>こちら</Link>をクリックして，ホームに移動してください．</p>
      <HomeButton />
    </>
  );
}
