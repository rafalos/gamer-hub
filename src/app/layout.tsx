import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Gamers HUB',
  description: 'Explore thousands of games. Track completion and store in library.',
};

const Artifacts = () => (
  <>
    <div className='w-[50%] h-[70%] bg-primary/8 rounded-full absolute right-0 blur-3xl z-[-1]'></div>
    <div className='w-[50%] h-[70%] bg-black/8 rounded-full absolute left-0 bottom-0 blur-3xl z-[-1]'></div>
  </>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh`}
      >
        <Artifacts />
        {/* <LucideGamepad className='stroke-primary/3 w-[100%] h-[100%] left-[-24%] top-[20%] absolute overflow-hidden' /> */}
        {children}
      </body>
    </html>
  );
}
