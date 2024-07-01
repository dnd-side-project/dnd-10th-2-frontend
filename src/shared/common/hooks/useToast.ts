import { create } from 'zustand';
import type { ToastStore } from '@shared/common/types';

export const useToast = create<ToastStore>((set) => ({
  toast: { isOpened: false, content: null, bottom: 4 },
  showToast: ({ content, bottom = 4 }) => {
    set(() => ({ toast: { isOpened: true, content, bottom } }));
    setTimeout(
      () => set(() => ({ toast: { isOpened: false, content: null, bottom } })),
      3000
    );
  }
}));
