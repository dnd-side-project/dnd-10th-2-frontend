import { create } from 'zustand';

import type { DialogStore } from '@shared/common/types';

export const useDialog = create<DialogStore>((set) => ({
  dialog: { isOpen: false },
  openDialog: () => {
    set(() => ({
      dialog: { isOpen: true }
    }));
  },
  closeDialog: () => {
    set(() => ({
      dialog: { isOpen: false }
    }));
  }
}));
