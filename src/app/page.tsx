import React from 'react';
import Hero from '../components/Hero';

const Page = async () => {
  return (
    <div className='h-dvh'>
      <main className='flex flex-col justify-center items-center h-full gap-4'>
        <Hero />
      </main>
    </div>
  );
};

export default Page;
