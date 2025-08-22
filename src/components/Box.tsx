import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
};

const Box = ({ children, title }: Props) => {
  return (
    <div className='border-t-4 border-b-4 border-primary p-4 '>
      <h2 className='text-2xl font-bold relative bottom-8 left-9 bg-white inline px-4'>
        {title.toUpperCase()}
      </h2>
      {children}
    </div>
  );
};

export default Box;
