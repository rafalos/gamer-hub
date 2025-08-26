import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import MostPopular from './top-rated';
import { ItemGridSkeleton } from '@/components/Skeletons';
import Genres from './genres';

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/auth');
  }

  return (
    <div>
      <Genres />
      <Suspense fallback={<ItemGridSkeleton />}>
        <MostPopular />
      </Suspense>
    </div>
  );
};

export default Page;
