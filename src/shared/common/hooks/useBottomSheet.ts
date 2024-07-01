import { ReactNode } from 'react';
import { atom, useRecoilState } from 'recoil';

interface BottomSheetStateType {
  content: ReactNode;
  isOpen: boolean;
}

const bottomSheetState = atom<BottomSheetStateType | null>({
  key: 'bottomSheetState',
  default: null
});

export const useBottomSheet = () => {
  const [bottomSheet, setBottomSheet] = useRecoilState(bottomSheetState);
  const openGlobalSheet = ({
    content,
    isOpen = true
  }: BottomSheetStateType) => {
    setBottomSheet({ content, isOpen });
  };
  const closeGlobalSheet = () => {
    setBottomSheet({ ...bottomSheet!, isOpen: false });
    setTimeout(() => {
      setBottomSheet(null);
    }, 400);
  };
  const isOpen = bottomSheet?.isOpen || false;
  return { bottomSheet, isOpen, openGlobalSheet, closeGlobalSheet };
};
