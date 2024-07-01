import { create } from 'zustand';

import type { ModalStore } from '@shared/common/types';

export const useModal = create<ModalStore>((set) => ({
  modal: { isOpened: false, title: '' },
  openModal: ({
    title,
    description,
    textAlign = 'start',
    button,
    time,
    topContent,
    bottomContent
  }) => {
    set(() => ({
      modal: {
        isOpened: true,
        title,
        description,
        textAlign,
        button,
        time,
        topContent,
        bottomContent
      }
    }));
  },
  closeModal: () => {
    set(() => ({
      modal: { isOpened: false, title: '' }
    }));
  },
  updateTime: () =>
    set(({ modal }) => ({
      modal: {
        ...modal,
        ...(modal.time && modal.time > 0 && { time: modal.time - 1 })
      }
    }))
}));
