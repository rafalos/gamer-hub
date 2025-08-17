import { create } from 'zustand';

type FavoriteStore = {
  favouries: number[];
  toggle: (id: number) => void;
};

export const useFavoriteStore = create<FavoriteStore>()((set) => ({
  favouries: [],
  toggle: (id) =>
    set((state) => ({
      favouries: state.favouries.includes(id)
        ? state.favouries.filter((favID) => favID !== id)
        : [...state.favouries, id],
    })),
}));
