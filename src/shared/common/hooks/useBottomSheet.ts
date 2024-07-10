import { create } from 'zustand';
import { ReactNode } from 'react';

type BottomSheetType = {
  isOpened: boolean;
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
}

export const useBottomSheet = create<BotttomSheetStoreType>((set) => ({
  bottomSheet: {
    isOpened: false,
    content: null
  },
  openBottomSheet: ({ content }) => {
    set(() => ({ bottomSheet: { isOpened: true, content } }));
  },
  closeBottomSheet: () => {
    set((prev) => ({ bottomSheet: { ...prev.bottomSheet, isOpened: false } }));
    setTimeout(() => {
      set((prev) => ({ bottomSheet: { ...prev.bottomSheet, content: null } }));
    }, 100);
  }
}));
