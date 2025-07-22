import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: '複製・転載・改変について | Wave App by Wing',
  description: 'このアプリを複製・転載・改変なさる前に，必ずこのページに記載している「複製・転載・改変について」をご覧ください．'
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