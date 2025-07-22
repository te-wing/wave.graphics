import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '自由端反射 | Wave App by Wing',
  description: '自由端反射について可視化してみましょう．'
};

export default function FreeEndWaveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h2>自由端反射</h2>
      {children}
    </>
  );
}