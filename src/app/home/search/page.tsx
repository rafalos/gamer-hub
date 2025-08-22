import React, { Suspense } from 'react';
import Results from './Results';
import { ItemGridSkeleton } from '@/components/Skeletons';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;

  return (
    <Suspense fallback={<ItemGridSkeleton />}>
      <Results query={query} />
    </Suspense>
  );
};

export default Page;
