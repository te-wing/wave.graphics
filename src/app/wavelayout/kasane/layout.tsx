import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '波の重ね合わせ | Wave App by Wing',
  description: 'パルス波を使って，二つの波が重なったらどうなるか，観察してみましょう．'
};

export default function SuperpositionWaveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h2>波の重ね合わせ</h2>
      {children}
    </>
  );
}