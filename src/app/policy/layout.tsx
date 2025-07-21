import type { Metadata } from 'next';
import HomeButton from '@/app-shared/homebutton';

export const metadata: Metadata = {
  title: 'ご利用規約一覧 | Wave App by Wing',
  description: 'このアプリをご利用なさる場合は，このページに記載している規約等に同意していただく必要があります．'
}

export default function PolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h2>ご利用規約</h2>
      {children}
      <HomeButton />
    </>
  );
}
