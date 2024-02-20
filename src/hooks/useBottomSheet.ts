import { BottomSheetStateType, bottomSheetState } from '@/store/bottomSheet';
import { useRecoilState } from 'recoil';

const useBottomSheet = () => {
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

export default useBottomSheet;
