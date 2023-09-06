import { Server } from "@prisma/client";
import { create } from "zustand";

export type ModalStyle = "createServer" | "invite" | 'editServer' | 'members'| 'createChannel' | 'leave' | 'deleteServer';

interface ModalData{
  server?: Server
}

interface ModalStore {
  type: ModalStyle | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalStyle, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type ,data}),
  onClose: () => set({ type: null, isOpen: false }),
}));
