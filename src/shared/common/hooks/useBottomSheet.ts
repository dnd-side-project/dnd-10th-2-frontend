import { create } from 'zustand';
import { ReactNode } from 'react';

type BottomSheetType = {
  isOpened: boolean;
  dismissible?: boolean;
  content: ReactNode;
};

interface BotttomSheetStoreType {
  bottomSheet: BottomSheetType;
  openBottomSheet: ({
    content
  }: {
    content: BottomSheetType['content'];
  }) => void;
  closeBottomSheet: () => void;
  setDismissibleTrue: () => void;
  setDismissibleFalse: () => void;
}

export const useBottomSheet = create<BotttomSheetStoreType>((set) => ({
  bottomSheet: {
    isOpened: false,
    dismissible: true,
    content: null
  },
  openBottomSheet: ({ content }) => {
    set(() => ({
      bottomSheet: { isOpened: true, dismissible: true, content }
    }));
  },
  closeBottomSheet: () => {
    set((prev) => ({ bottomSheet: { ...prev.bottomSheet, isOpened: false } }));
    setTimeout(() => {
      set((prev) => ({ bottomSheet: { ...prev.bottomSheet, content: null } }));
    }, 100);
  },
  setDismissibleTrue: () => {
    set((prev) => ({
      bottomSheet: { ...prev.bottomSheet, dismissible: true }
    }));
  },
  setDismissibleFalse: () => {
    set((prev) => ({
      bottomSheet: { ...prev.bottomSheet, dismissible: false }
    }));
  }
}));
