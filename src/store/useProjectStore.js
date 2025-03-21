import { create } from 'zustand';

const useProjectStore = create((set) => ({
    selectedProjectId: null,
    setSelectedProjectId: (id) => set({ selectedProjectId: id }),
    clearSelectedProjectId: () => set({ selectedProjectId: null }),
}));

export default useProjectStore;