import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Screenshot } from '@/types/db';
import Image from 'next/image';
import React from 'react';

type Props = {
  gameName: string;
  open: boolean;
  onClose: () => void;
  image?: Screenshot;
};

const Preview = ({ open, onClose, image, gameName }: Props) => {
  if (!image) return null;

  const { height, id, url, width } = image;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className='w-full min-w-[50%] z-999'>
        <DialogTitle>{gameName}</DialogTitle>
        <Image
          alt={gameName}
          src={url}
          height={height ?? 300}
          width={width ?? 300}
          className='object-contain w-full'
        />
      </DialogContent>
    </Dialog>
  );
};

export default Preview;
