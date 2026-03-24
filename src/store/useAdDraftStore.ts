import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DraftState {
  drafts: Record<string, any>;
  setDraft: (id: string, data: any) => void;
  clearDraft: (id: string) => void;
  getDraft: (id: string) => any | null;
}

export const useAdDraftStore = create<DraftState>()(
  persist(
    (set, get) => ({
      drafts: {},
      setDraft: (id, data) => 
        set((state) => ({
          drafts: { ...state.drafts, [id]: data }
        })),
      clearDraft: (id) => 
        set((state) => {
          const newDrafts = { ...state.drafts };
          delete newDrafts[id];
          return { drafts: newDrafts };
        }),
      getDraft: (id) => get().drafts[id] || null,
    }),
    {
      name: 'ad-drafts-storage', 
    }
  )
);