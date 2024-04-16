import { create } from 'zustand';
import type { ReactNode } from 'react';

type ModalType = {
  isOpened: boolean;
  title: string;
  description?: string;
  textAlign?: 'start' | 'center' | string;
  button?: { text: string; onClick: () => void };
  time?: number;
  topContent?: ReactNode | JSX.Element;
  bottomContent?: ReactNode | JSX.Element;
};

interface ModalStoreType {
  modal: ModalType;
  openModal: ({
    title,
    description,
    textAlign,
    button,
    time,
    topContent,
    bottomContent
  }: {
    title: ModalType['title'];
    description?: ModalType['description'];
    textAlign?: ModalType['textAlign'];
    button?: ModalType['button'];
    time?: ModalType['time'];
    topContent?: ModalType['topContent'];
    bottomContent?: ModalType['bottomContent'];
  }) => void;
  closeModal: () => void;
  updateTime: () => void;
}

export const useModal = create<ModalStoreType>((set) => ({
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
