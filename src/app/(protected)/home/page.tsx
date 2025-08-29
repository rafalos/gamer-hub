import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import MostPopular from './top-rated';
import { ItemGridSkeleton } from '@/components/Skeletons';
import Genres from './genres';
import Hero from './hero';

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
      <Hero />
      <Suspense fallback={<ItemGridSkeleton />}>
        <MostPopular />
      </Suspense>
    </div>
  );
};

export default Page;
