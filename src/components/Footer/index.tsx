import React from 'react';
import { Progress } from '../ui/progress';

const Footer = () => {
  return (
    <footer className='fixed bottom-0 lg:right-12 w-full lg:w-lg'>
      <div className='flex bg-white p-4 justify-center flex-col rounded-t-md'>
        <div className='flex items-center gap-2'>
          <p className='text-md font-bold border-primary text-white bg-primary p-2 rounded-md'>14</p>
          <Progress value={50} className='h-6'/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
