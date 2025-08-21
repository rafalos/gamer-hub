import React from 'react';
import Navbar from '../../components/Navbar';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className='max-w-[1440px] mx-auto'>{children}</main>
    </div>
  );
}

export default Layout;
