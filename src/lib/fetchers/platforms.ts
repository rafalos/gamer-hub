import axios from 'axios';
import { getResourceUrl } from '../gameApi';
import { Platform, PlatformResponse } from '@/types/api';
import db from '@/db';
import { platforms } from '@/db/schema';

const PLATFORMS_URL = getResourceUrl('platforms');

export const fetchPlatforms = async () => {
  const rawgResponse = await axios.get<PlatformResponse>(PLATFORMS_URL);

  const rawgPlatforms: Platform[] = rawgResponse.data.results;

  await db.insert(platforms).values(
    rawgPlatforms.map((platform) => ({
      ...platform,
      id: platform.id.toString(),
    }))
  );

  console.log(`${rawgPlatforms.length} records inserted`);
};
