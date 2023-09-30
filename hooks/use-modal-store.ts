import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalStyle = "createServer" | "invite" | 'editServer' | 'members'| 'createChannel' | 'leave' | 'deleteServer' | 'deleteChannel' | 'editChannel' | 'messageFile' | 'deleteMessage';

interface ModalData{
  server?: Server,
  channelType?: ChannelType,
  channel?: Channel,
  apiUrl?: string,
  query?: Record<string,any> 
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
