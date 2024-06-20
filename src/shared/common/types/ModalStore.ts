import { Modal } from './Modal';

export interface ModalStore {
  modal: Modal;
  openModal: ({
    title,
    description,
    textAlign,
    button,
    time,
    topContent,
    bottomContent
  }: {
    title: Modal['title'];
    description?: Modal['description'];
    textAlign?: Modal['textAlign'];
    button?: Modal['button'];
    time?: Modal['time'];
    topContent?: Modal['topContent'];
    bottomContent?: Modal['bottomContent'];
  }) => void;
  closeModal: () => void;
  updateTime: () => void;
}
