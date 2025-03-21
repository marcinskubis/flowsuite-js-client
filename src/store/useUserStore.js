import { create } from "zustand";

const useUserStore = create((set) => ({
  // Initialize userId from localStorage
  userId: localStorage.getItem("userId") ? JSON.parse(localStorage.getItem("userId")) : null,

  // Async function to set userId in localStorage and state
  setUserId: async (userId) => {
    return new Promise((resolve) => {
      localStorage.setItem("userId", JSON.stringify(userId)); // Store in localStorage
      set({ userId });
      resolve(userId);
    });
  },

  // Async function to clear userId from localStorage and state
  clearUserId: async () => {
    return new Promise((resolve) => {
      localStorage.removeItem("userId"); // Remove from localStorage
      set({ userId: null });
      resolve();
    });
  },

  // Async function to refresh userId from localStorage
  refreshUserId: async () => {
    return new Promise((resolve) => {
      const userIdFromLocalStorage = localStorage.getItem("userId")
        ? JSON.parse(localStorage.getItem("userId"))
        : null;
      set({ userId: userIdFromLocalStorage });
      resolve(userIdFromLocalStorage);
    });
  },
}));

export default useUserStore;
