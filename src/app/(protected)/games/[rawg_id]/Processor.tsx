'use client';

import { getGameByRawgId } from '@/lib/api';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  rawg_id: string;
};

const Processor = ({ rawg_id }: Props) => {
  const [retries, setRetries] = useState(0);
  const timeoutID = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (retries < 5) {
      timeoutID.current = setTimeout(() => {
        getGameByRawgId(rawg_id).then((data) => {
          if (data?.name && timeoutID.current) {
            clearTimeout(timeoutID.current);
            router.refresh();
          }
          setRetries((prevRetries) => prevRetries + 1);
        });
      }, 5000);
    }

    return () => {
      if (timeoutID.current) {
        clearTimeout(timeoutID.current);
      }
    };
  }, [retries, rawg_id, router]);

  return (
    <div className='flex items-center flex-col h-full justify-center gap-4'>
      {retries === 5 ? (
        <p>
          Fetching game details is taking more time than expected. Please come
          back to that site after several minutes.
        </p>
      ) : (
        <p>
          <LoaderCircle className='animate-spin text-primary w-10 h-10 mx-auto mb-2' />
          Game details are currently being processed. Page will refresh
          automatically when after it is finished.
        </p>
      )}
    </div>
  );
};

export default Processor;
