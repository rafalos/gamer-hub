import axios from 'axios';
import { getResourceUrl } from '../gameApi';
import { Genre, GenresResponse } from '@/types/api';
import db from '@/db';
import { genres } from '@/db/schema';

const GENRES_URL = getResourceUrl('genres');

export const fetchGenres = async () => {
  const rawgResponse = await axios.get<GenresResponse>(GENRES_URL);

  const rawgGenres: Genre[] = rawgResponse.data.results;

  await db.insert(genres).values(
    rawgGenres.map(({ id, name }) => ({
      id: id.toString(),
      name,
    }))
  );

  console.log(`${rawgGenres.length} records inserted`);
};
