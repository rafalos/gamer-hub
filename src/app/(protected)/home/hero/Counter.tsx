import { getGamesCount } from '@/lib/server/rawg-api';

const Counter = async () => {
  const gamesCount: number = await getGamesCount();
  const charArray = gamesCount.toString().split('');

  return (
    <div className='inline-flex gap-2'>
      {charArray.map((char, index) => (
        <div
          key={`${char}_${index}`}
          className='bg-white px-2 md:px-4 md:py-1 rounded-md text-lg md:text-2xl text-primary font-bold'
        >
          {char}
        </div>
      ))}
    </div>
  );
};

export default Counter;
