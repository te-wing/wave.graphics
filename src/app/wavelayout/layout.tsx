import HomeButton from '@/app-shared/homebutton';

export default function WaveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomeButton />
      {children}
    </>
  );
}
