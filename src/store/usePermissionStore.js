import { create } from "zustand";

const usePermissionStore = create((set) => ({
  adminPermission: false,
  ownerPermission: false,
  setAdminPermission: (val) => set({ adminPermission: val }),
  setOwnerPermission: (val) => set({ ownerPermission: val }),
}));

export default usePermissionStore;
