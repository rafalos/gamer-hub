import React from 'react';

const ButtonLoader = () => {
  return (
    <div className='h-6 flex gap-1 items-center justify-center'>
      <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
      <div className='w-2 h-2 bg-white rounded-full animate-pulse delay-75'></div>
      <div className='w-2 h-2 bg-white rounded-full animate-pulse delay-100'></div>
    </div>
  );
};

export default ButtonLoader;
