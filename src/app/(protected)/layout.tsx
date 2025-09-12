import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MainWrapper from '@/components/MainWrapper';
import Artifacts from '@/components/Artifacts';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainWrapper>
      <Navbar />
      <main className='max-w-[1440px] mx-auto py-4 px-2 2xl:px-0 min-h-[calc(100vh-128px)]'>
        <Artifacts />
        {children}
      </main>
      <Footer />
    </MainWrapper>
  );
}

export default Layout;
