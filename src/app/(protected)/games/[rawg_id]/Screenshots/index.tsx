'use client';

import Preview from '@/app/(protected)/games/[rawg_id]/Screenshots/Preview';
import type { Screenshot } from '@/types/db';
import Image from 'next/image';
import React, { useState } from 'react';

type Props = {
  images: Screenshot[];
  gameName: string;
};

const Screenshots = ({ images, gameName }: Props) => {
  const [previewImage, setPreviewImage] = useState<number | null>(null);

  const selectedImage = images.find(({ id }) => previewImage === id);

  return (
    <div className='flex gap-4 flex-wrap'>
      {images.map(({ id, url }) => (
        <div
          key={id}
          className='aspect-square w-49 h-38 overflow-hidden rounded-md hover:scale-105 transition-transform cursor-pointer'
          onClick={() => setPreviewImage(id)}
        >
          <Image
            height={500}
            width={500}
            src={url}
            alt={gameName}
            className='h-full w-full object-cover rounded-md hover:scale-105 transition-transform'
          />
        </div>
      ))}

      <Preview
        gameName={gameName}
        open={!!previewImage}
        onClose={() => setPreviewImage(null)}
        image={selectedImage}
      />
    </div>
  );
};

export default Screenshots;
