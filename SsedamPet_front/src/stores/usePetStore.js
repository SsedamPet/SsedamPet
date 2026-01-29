import { create } from "zustand";

const usePetStore = create((set) => ({
  selectedPetId: null,
  selectedPetName: "",
  // 펫을 선택/변경
  setPet: (id, name) => set({ selectedPetId: id, selectedPetName: name }),
}));

export default usePetStore;