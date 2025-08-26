import Artifacts from '@/components/Artifacts';
import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Artifacts />
      {children}
    </div>
  );
};

export default layout;
