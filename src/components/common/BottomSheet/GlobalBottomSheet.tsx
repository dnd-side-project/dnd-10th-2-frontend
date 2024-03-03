/* eslint-disable @typescript-eslint/no-unused-vars */
import { BottomSheet } from 'react-spring-bottom-sheet';
import './customBottomSheet.css';
import useBottomSheet from '@/hooks/useBottomSheet';

export const GlobalBottomSheet = () => {
  const { isOpen, bottomSheet, closeGlobalSheet } = useBottomSheet();

  return (
    <>
      <BottomSheet
        className="bottom-sheet"
        open={isOpen}
        onDismiss={closeGlobalSheet}
        snapPoints={({ minHeight, maxHeight }) => [
          minHeight + 70,
          maxHeight - 120
        ]}>
        {bottomSheet?.content}
      </BottomSheet>
    </>
  );
};
