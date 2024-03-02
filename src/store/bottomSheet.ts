import { ReactNode } from 'react';
import { atom } from 'recoil';

export interface BottomSheetStateType {
  content: ReactNode;
  isOpen: boolean;
}

export const bottomSheetState = atom<BottomSheetStateType | null>({
  key: 'bottomSheetState',
  default: null
});
