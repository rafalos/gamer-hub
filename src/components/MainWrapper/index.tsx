'use client';

import { Layout, useLayoutState } from '@/store/layout.store';
import { usePathname } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

const MainWrapper = ({ children }: { children: ReactNode }) => {
  const { currentLayout, setCurrentLayout } = useLayoutState((state) => state);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes('platform')) {
      setCurrentLayout(pathname.split('/')[2] as Layout);
    } else {
      setCurrentLayout('default');
    }
  }, [pathname, setCurrentLayout]);

  return <div className={currentLayout}>{children}</div>;
};

export default MainWrapper;
