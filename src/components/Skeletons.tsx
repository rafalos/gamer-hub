import { Skeleton } from './ui/skeleton';

export const ProfileSkeleton = () => (
  <div className='flex items-center space-x-4'>
    <Skeleton className='h-12 w-12 rounded-full' />
    <div className='space-y-2'>
      <Skeleton className='h-4 w-[250px]' />
      <Skeleton className='h-4 w-[200px]' />
    </div>
  </div>
);

export const ItemSkeleton = () => (
  <div className='flex flex-col w-full p-2 gap-2'>
    <div className='flex flex-row gap-2'>
      <Skeleton className='h-8 rounded-full w-10' />

      <div className='flex flex-col w-full justify-center gap-2'>
        <Skeleton className='h-2 w-full' />
        <Skeleton className='h-2 w-full' />
      </div>
    </div>
      <Skeleton className='h-36 w-full'/>
      <Skeleton className='h-8 w-full'/>
  </div>
);

export const ItemGridSkeleton = () => (
  <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-items-center gap-2'>
    <ItemSkeleton />
    <ItemSkeleton />
    <ItemSkeleton />
    <ItemSkeleton />
    <ItemSkeleton />
    <ItemSkeleton />
  </div>
);
