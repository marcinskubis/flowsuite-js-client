import { create } from "zustand";

const useDragAndDropStore = create((set) => ({
  draggedElement: null,
  setDraggedElement: (element) => set({ draggedElement: element }),
}));

export default useDragAndDropStore;
