import { create } from "zustand";

const useFilterStore = create((set) => ({
  filterOwnTasks: false,
  setFilterOwnTasks: (value) => set({ filterOwnTasks: value }),
}));

export default useFilterStore;
