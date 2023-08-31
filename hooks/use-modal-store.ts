import { create } from "zustand";

export type ModalStyle = "createServer";

interface ModalStore {
  type: ModalStyle | null;
  isOpen: boolean;
  onOpen: (type: ModalStyle) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));
