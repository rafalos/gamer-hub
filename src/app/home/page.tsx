import React from 'react';
export const dynamic = "force-dynamic";

const Page = async () => {
  const test = await Promise.resolve('test')

  console.log(test)
  return <div>Page</div>;
};

export default Page;
