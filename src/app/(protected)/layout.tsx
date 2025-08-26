import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className='max-w-[1440px] mx-auto py-4 px-2 2xl:px-0'>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
