import create from "zustand";

export const useDeskStore = create((set) => ({
  latestDesk: null,
  setLatestDesk: (desk) => set({ latestDesk: desk }),
  clearDesk: () => set({ latestDesk: null }),
}));
