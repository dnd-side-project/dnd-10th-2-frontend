/* eslint-disable @typescript-eslint/no-unused-vars */

import styled from '@emotion/styled';
import { BottomSheet } from 'react-spring-bottom-sheet';
import './customBottomSheet.css';
import useBottomSheet from '@/hooks/useBottomSheet';

export const GlobalBottomSheet = () => {
  const { isOpen, bottomSheet, closeGlobalSheet } = useBottomSheet();
  return (
    <>
      <StyledSheet
        open={isOpen}
        onDismiss={closeGlobalSheet}
        snapPoints={({ maxHeight }) => [
          400, //최소
          maxHeight * 0.7 //최대
        ]}>
        {bottomSheet?.content}
      </StyledSheet>
    </>
  );
};

const StyledSheet = styled(BottomSheet)`
  width: 375px;
`;
