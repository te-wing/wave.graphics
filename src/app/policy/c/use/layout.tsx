import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'ご利用規約 | Wave App by Wing',
  description: 'このアプリをご利用なさる場合は，このページに記載している「ご利用規約」に同意していただく必要があります．'
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