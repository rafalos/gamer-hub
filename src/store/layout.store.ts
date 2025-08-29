import { create } from 'zustand';

export type Layout = 'default' | 'nintendo' | 'xbox' | 'pc' | 'playstation';

interface LayoutState {
  currentLayout: Layout;
  setCurrentLayout: (layout: Layout) => void;
}

export const useLayoutState = create<LayoutState>()((set) => ({
  currentLayout: 'default',
  setCurrentLayout: (layout) =>
    set(() => ({
      currentLayout: layout,
    })),
}));
