import Artifacts, { Variant } from '@/components/Artifacts';
import React, { ReactNode } from 'react';

const layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ platform: string }>;
}) => {
  const { platform } = await params;

  return (
    <div>
      <Artifacts variant={platform as Variant} />
      {children}
    </div>
  );
};

export default layout;
