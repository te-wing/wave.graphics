import Link from 'next/link';

export default function PolicyContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Link href='/policy'>＜戻る</Link>
      {children}
    </>
  );
}