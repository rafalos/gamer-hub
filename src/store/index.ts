import { create } from 'zustand';

type FavouriteStore = {
  favouries: number[];
  toggle: (id: number) => void;
};

export const useFavouriteStore = create<FavouriteStore>()((set) => ({
  favouries: [],
  toggle: (id) =>
    set((state) => ({
      favouries: state.favouries.includes(id)
        ? state.favouries.filter((favID) => favID !== id)
        : [...state.favouries, id],
    })),
}));
