import { create } from 'zustand';

interface FooterState {
  localLibraryCount: number;
  increaseLibraryCount: () => void;
}

export const useFooterStore = create<FooterState>()((set) => ({
  localLibraryCount: 0,
  increaseLibraryCount: () =>
    set((state) => ({
      localLibraryCount: state.localLibraryCount + 1,
    })),
}));
