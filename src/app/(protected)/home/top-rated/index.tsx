import Box from '@/components/Box';
import GameItem from '@/components/GameItem';
import ItemGrid from '@/components/ItemGrid';
import { Game } from '@/types/api';
import axios from '@/lib/axios';

const TopRated = async () => {
  const popularGames = await axios.get<Game[]>(`/api/games/popular`);
  const games = popularGames.data.splice(1, 6);
  return (
    <Box title='Top rated games'>
      <ItemGrid
        data={games}
        render={(game, index, library) => {
          const isInLibrary = library.some(
            (libGame) => libGame.rawg_id === game.id.toString()
          );

          return <GameItem game={game} key={index} isInLibrary={isInLibrary} />;
        }}
      />
    </Box>
  );
};

export default TopRated;
