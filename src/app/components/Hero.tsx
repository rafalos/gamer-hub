'use client';

import { Button } from '@/components/ui/button';
import { LucideGamepad2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

const Hero = () => {
  const gamepadIconRef = useRef<SVGSVGElement | null>(null);
  const [gamepadSpinning, setGamepadSpinning] = useState(false);
  const router = useRouter();

  return (
    <div className='text-5xl lg:text-8xl font-bold animate-in relative flex flex-col items-center'>
      <h1>
        <span className='bg-primary text-white rounded-md p-2 inline'>
          Gamer
        </span>
        <span className='relative top-4 lg:top-5'>HUB</span>
      </h1>
      <div className='flex relative top-5 justify-center items-center gap-4 w-full'>
        <Button
          className='flex-1 font-bold h-16 text-2xl relative cursor-pointer'
          onClick={() => {
            setGamepadSpinning(true);

            setTimeout(() => {
              router.push('/home');
            }, 400);
          }}
        >
          Explore...
        </Button>
      </div>
      <LucideGamepad2
        ref={gamepadIconRef}
        className={`stroke-black w-12 h-12 mt-8 ${
          gamepadSpinning ? 'animate-spin' : 'animate-wiggle'
        }
`}
      />
    </div>
  );
};

export default Hero;
