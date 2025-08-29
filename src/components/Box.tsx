import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
};

const Box = ({ children, title }: Props) => {
  return (
    <div className='border-s2 border-primary rounded-lg p-4 bg-white shadow-md'>
      <h2 className='text-2xl font-bold bg-white inline'>
        {title}
      </h2>
      {children}
    </div>
  );
};

export default Box;
