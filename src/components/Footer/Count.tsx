'use client';

import { useFooterStore } from '@/store/footer.store';
import { LibrarySquare } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type Props = {
  initialCount: number;
};

const Count = ({ initialCount }: Props) => {
  const localCount = useFooterStore((state) => state.localLibraryCount);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if(localCount == 0) return
    setAnimating(true);

    const timer = setTimeout(() => {
      setAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [localCount]);

  return (
    <div
      className={`text-md font-bold border-primary text-white bg-primary py-2 px-4 rounded-md`}
    >
      <div className={`flex gap-4 ${animating ? 'animate-scale-up' : ''}`}>
        <LibrarySquare />
        {initialCount}
      </div>
    </div>
  );
};

export default Count;
