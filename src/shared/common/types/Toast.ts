import { ReactNode } from 'react';

export interface Toast {
  isOpened: boolean;
  content: ReactNode;
  bottom: number;
}
