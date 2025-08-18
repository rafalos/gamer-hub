import { GamesResponse } from "@/types/api";

type Resource = 'games';

const getResourceUrl = (resource: Resource) =>
  `https://api.rawg.io/api/${resource}?key=${process.env.RAWG_APIKEY!}`;

export const getGames = async (query: string): Promise<GamesResponse> => {
  const url = getResourceUrl('games');

  const response = await fetch(`${url}&search=${query}`);
  const data = await response.json() as GamesResponse;

  return data;
};
