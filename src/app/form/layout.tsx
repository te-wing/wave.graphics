import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "アンケートフォーム | Wave App by Wing",
  description: "このページで，フィードバック・お問い合わせなどをお送りいただけます．"
}

export default function FormMetadataLayout({
  children,
}:Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <>
      {children}
    </>
  )
}