import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '固定端反射 | Wave App by Wing',
  description: '固定端反射について，可視化してみましょう．'
};

export default function FixedEndWaveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h2>固定端反射</h2>
      {children}
    </>
  );
}