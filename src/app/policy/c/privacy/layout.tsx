import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'プライバシーに関する声明 | Wave App by Wing',
  description: 'このアプリをご利用なさる場合は，このページに記載している「プライバシーに関する声明」に同意していただく必要があります．'
}

export default function PolicyContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}