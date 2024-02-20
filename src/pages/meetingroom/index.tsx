/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex } from '@/components/Wrapper';
import useBottomSheet from '@/hooks/useBottomSheet';

export const MeetingRoom = () => {
  const { openGlobalSheet, closeGlobalSheet } = useBottomSheet();

  const modalData = {
    isOpen: true,
    content: (
      <Flex>
        <button onClick={closeGlobalSheet}>close</button>
      </Flex>
    )
  };
  //lasbe.tistory.com/148 [LasBe's Upgrade:티스토리]
  //   const { isOpen, openGlobalSheet, closeGlobalSheet } = useBottomSheet();
  return (
    <Flex direction="column">
      <button onClick={() => openGlobalSheet(modalData)}>OPEN MODAL</button>
    </Flex>
  );
};
