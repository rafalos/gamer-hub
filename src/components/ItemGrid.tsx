import React, { ReactNode } from 'react';

type Props<
  T extends {
    id: number;
  }
> = {
  data: T[];
  render: (item: T, index: number) => ReactNode;
};

const Showcase = <
  T extends {
    id: number;
  }
>({
  data,
  render,
}: Props<T>) => {
  return (
    <div
      className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-items-center gap-2`}
    >
      {data.map((item) => render(item, item.id))}
    </div>
  );
};

export default Showcase;
