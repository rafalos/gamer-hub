import type { Game } from '@/types/api';
import type { Game as DBGame } from '@/types/db';

export const mockDbGame: DBGame = {
  background_image: 'http://testimage.com',
  description: 'test description',
  id: 1,
  metacritic_score: 80,
  name: 'test game',
  rawg_id: '123',
  released: '2025-12-12'
}

export const mockDbGameWithoutName: DBGame = {
  background_image: 'http://testimage.com',
  description: 'test description',
  id: 1,
  metacritic_score: 80,
  name: '',
  rawg_id: '123',
  released: '2025-12-12'
}

export const mockRawgGame: Game = {
  id: 13536,
  slug: 'portal',
  name: 'Portal',
  description:
    '<p>Every single time you click your mouse while holding a gun, you expect bullets to fly and enemies to fall. But here you will try out the FPS game filled with environmental puzzles and engaging story. <br />\nSilent template for your adventures, Chell, wakes up in a testing facility. She’s a subject of experiments on instant travel device, supervised by snarky and hostile GLaDOS.<br />\nPlayers will have to complete the tests, room by room, expecting either reward, freedom or more tests. By using the gun, that shoots portals (Portal-Gun™), players will move blocks, travel great distance quickly and learn about your current situation, which is unraveled through environmental storytelling. What you will be told might be different from what you will see.<br />\nWhite environments will guide the player’s portal placement, forcing them to pay attention to the surroundings.  Portal creates tension, allowing either solving puzzles at your own leisure or moving quickly, due to the time limit or threats.</p>',
  metacritic: 90,
  released: '2007-10-09',
  tba: false,
  updated: '2025-08-23T12:34:41',
  background_image:
    'https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg',
  added: 17612,
  ratings: [
    { id: 5, title: 'exceptional', count: 2969, percent: 59.92 },
    { id: 4, title: 'recommended', count: 1677, percent: 33.84 },
    { id: 3, title: 'meh', count: 198, percent: 4.0 },
    { id: 1, title: 'skip', count: 111, percent: 2.24 },
  ],
  added_by_status: {
    yet: 467,
    owned: 11110,
    beaten: 5239,
    toplay: 288,
    dropped: 422,
    playing: 86,
  },
  esrb_rating: { id: 3, name: 'Teen', slug: 'teen' },
  playtime: 4,
  rating: 30,
  rating_top: 30,
  ratings_count: 120,
  reviews_text_count: '123',
  suggestions_count: 123,
  genres: [
    {
      id: 4,
      name: 'Action',
      slug: 'action',
      image_background:
        'https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg',
      games_count: 12,
    },
    {
      id: 7,
      name: 'Puzzle',
      slug: 'puzzle',
      image_background:
        'https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg',
      games_count: 12,
    },
  ],
  platforms: [
    {
      platform: {
        id: 5,
        name: 'macOS',
        slug: 'macos',
      },
      released_at: '2007-10-09',
      requirements: null,
    },
    {
      platform: {
        id: 4,
        name: 'PC',
        slug: 'pc',
      },
      released_at: '2007-10-09',
      requirements: null,
    },
    {
      platform: {
        id: 21,
        name: 'Android',
        slug: 'android',
      },
      released_at: '2007-10-09',
      requirements: null,
    },
    {
      platform: {
        id: 16,
        name: 'PlayStation 3',
        slug: 'playstation3',
      },
      released_at: '2007-10-09',
      requirements: null,
    },
    {
      platform: {
        id: 14,
        name: 'Xbox 360',
        slug: 'xbox360',
      },
      released_at: '2007-10-09',
      requirements: null,
    },
    {
      platform: {
        id: 6,
        name: 'Linux',
        slug: 'linux',
      },
      released_at: '2007-10-09',
      requirements: null,
    },
    {
      platform: {
        id: 7,
        name: 'Nintendo Switch',
        slug: 'nintendo-switch',
      },
      released_at: '2007-10-09',
      requirements: null,
    },
  ],
};
