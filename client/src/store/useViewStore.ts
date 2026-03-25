import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ViewState {
  viewMode: 'grid' | 'col';
  setViewMode: (mode: 'grid' | 'col') => void;
}

export const useViewStore = create<ViewState>()(
  persist(
    (set) => ({
      viewMode: 'grid', 
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: 'view-settings', 
    }
  )
);