import { getUserLibrary } from '@/db/queries';
import { auth } from '@/lib/auth';
import { Game } from '@/types/db';
import { headers } from 'next/headers';
import React, { ReactNode } from 'react';

type Props<
  T extends {
    id: number;
  }
> = {
  data: T[];
  render: (item: T, index: number, library: Game[]) => ReactNode;
};

const ItemGrid = async <
  T extends {
    id: number;
  }
>({
  data,
  render,
}: Props<T>) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const library = session ? await getUserLibrary(session.user.id) : [];

  return (
    <div
      className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-items-center gap-2`}
    >
      {data.map((item) => render(item, item.id, library))}
    </div>
  );
};

export default ItemGrid;
