import { ReactNode } from 'react';

export interface Modal {
  isOpened: boolean;
  title: string;
  description?: string;
  textAlign?: 'start' | 'center' | string;
  button?: { text: string; onClick: () => void };
  time?: number;
  topContent?: ReactNode | JSX.Element;
  bottomContent?: ReactNode | JSX.Element;
}
