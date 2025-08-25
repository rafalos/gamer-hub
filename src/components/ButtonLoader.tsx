import React from 'react';

const ButtonLoader = () => {
  return (
    <>
      <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
      <div className='w-2 h-2 bg-white rounded-full animate-pulse delay-75'></div>
      <div className='w-2 h-2 bg-white rounded-full animate-pulse delay-100'></div>
    </>
  );
};

export default ButtonLoader;
