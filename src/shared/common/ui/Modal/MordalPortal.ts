import { ReactNode } from 'react';
import reactDom from 'react-dom';

export const ModalPortal = ({ children }: { children: ReactNode }) => {
  const el = document.getElementById('modal');
  if (!el) return null;
  return reactDom.createPortal(children, el);
};
