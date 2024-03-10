import { ReactNode } from 'react';
import { create } from 'zustand';

type ToastType = {
  isOpened: boolean;
  content: ReactNode;
  bottom: number;
};

type ToastStoreType = {
  toast: ToastType;
  showToast: ({
    content,
    bottom
  }: {
    content: ReactNode;
    bottom?: number;
  }) => void;
};

export const useToast = create<ToastStoreType>((set) => ({
  toast: { isOpened: false, content: null, bottom: 4 },
  showToast: ({ content, bottom = 4 }) => {
    set(() => ({ toast: { isOpened: true, content, bottom } }));
    setTimeout(
      () => set(() => ({ toast: { isOpened: false, content: null, bottom } })),
      3000
    );
  }
}));
