import React from 'react';

const Heading = ({ className }: { className?: string }) => {
  return (
    <h1
      className={`text-5xl lg:text-8xl font-bold animate-in relative ${className}`}
    >
      <span className='bg-primary text-white rounded-md p-2 inline'>Gamer</span>
      <span className='relative top-4 lg:top-5'>HUB</span>
    </h1>
  );
};

export default Heading;
