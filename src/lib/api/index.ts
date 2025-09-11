import axios from '@/lib/axios'
import { Game } from '@/types/db'

export const getGameByRawgId = async (rawg_id: string) => {
  try {
    const result = await axios.get<Game>(`/api/games/${rawg_id}`)

    return result.data
  } catch (error) {
    console.log(error)
  }
}
