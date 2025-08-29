import Image from 'next/image';
import Counter from './Counter';

const Hero = () => {
  return (
    <div className='flex items-center justify-around p-8 md:p-4 '>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl md:text-4xl font-bold'>
          Your ultimate gaming <span> library</span>,<br /> organized.
        </h1>
        <p>
          Search amongst thousands of games, fulfill your library and track
          completion.
        </p>
        <Counter />
      </div>
      <Image
        className='hidden md:block'
        alt='Hero banner icons image'
        src='/hero-icons.png'
        width={440}
        height={440}
      />
    </div>
  );
};

export default Hero;
