import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: '波の重ね合わせ | Wave App by Wing',
  description: '先ほどのパルス波を使って，二つの波が重なったらどうなるか，観察してみましょう．'
};

export default function SuperpositionWaveLayout({
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