type Resource = 'games' | 'platforms' | 'genres';
export const PLATFORMS = ['2', '187', '1', '18', '186', '7', '14', '16', '15'];

export const getResourceUrl = (
  resource: Resource,
  id?: string,
  ...segments: string[]
) =>
  `https://api.rawg.io/api/${resource}${id ? `/${id}` : ''}${
    segments.length ? `/${segments.join('/')}` : ''
  }?key=${process.env.RAWG_APIKEY!}`;

export const GAMES_URL = getResourceUrl('games');
export const getGameByIdUrl = (id: string) => getResourceUrl('games', id);
export const getScreenshotsUrl = (id: string) =>
  getResourceUrl('games', id, 'screenshots');
