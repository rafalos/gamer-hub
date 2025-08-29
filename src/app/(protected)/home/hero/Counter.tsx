import { getGamesCount } from '@/lib/server/rawg-api';

const Counter = async () => {
  const gamesCount: number = await getGamesCount();
  const charArray = gamesCount.toString().split('');

  return (
    <div className='flex gap-2'>
      {charArray.map((char, index) => (
        <div
          key={`${char}_${index}`}
          className='bg-white p-2 md:p-4 rounded-md text-lg md:text-2xl text-primary font-bold'
        >
          {char}
        </div>
      ))}
    </div>
  );
};

export default Counter;
