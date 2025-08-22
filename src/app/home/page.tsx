import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import MostPopular from './top-rated';
import { ItemGridSkeleton } from '@/components/Skeletons';

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/auth');
  }

  return (
    <Suspense fallback={<ItemGridSkeleton />}>
      <MostPopular />
    </Suspense>
  );
};

export default Page;
