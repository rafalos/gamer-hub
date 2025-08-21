import React from 'react';

type Props = {
  className?: string;
  isBrand?: boolean;
};

const Heading = ({ className, isBrand = false }: Props) => {
  return (
    <h1
      className={`${isBrand ? 'text-lg' : 'text-5xl'}  ${
        isBrand ? 'text-xl' : ' lg:text-8xl'
      } font-bold animate-in relative ${className}`}
    >
      <span className='bg-primary text-white rounded-md p-2 inline'>Gamer</span>
      <span
        className={`relative ${isBrand ? 'top-1' : 'top-4'} ${
          isBrand ? 'lg:top-1' : 'lg:top-2'
        }`}
      >
        HUB
      </span>
    </h1>
  );
};

export default Heading;
