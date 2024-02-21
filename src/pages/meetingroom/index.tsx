/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex, Space, Text } from '@/components/Wrapper';
import { Header } from '@/components/common/Header';
import { MeetingCard } from '@/components/meetingRoom/MeetingCard';
import useBottomSheet from '@/hooks/useBottomSheet';

export const MeetingRoom = () => {
  const { openGlobalSheet } = useBottomSheet();

  const openUserList = {
    isOpen: true,
    content: (
      <Flex justify="flex-start">
        <Text typo="T5" color="dark_gray2">
          참여자 목록
        </Text>
        <Space height={16} />
        {/* <List ={} /> */}
      </Flex>
    )
  };

  // TODO page 전체 background-color
  return (
    <Flex direction="column">
      {/* TODO Header onClick 핸들러 연결, background-color */}
      <Header iconLeftId="hamburger_menu" title="회의실" iconRightId2="share" />
      <Space height={10} />
      {/* TODO props data */}
      <MeetingCard
        date={'2024년 2월 11일'}
        isHost={true}
        title={'DND 2조 3차 회의'}
        onClickUserList={() => openGlobalSheet(openUserList)}
        actualTotalDuration={'01:01:02'}
      />
      <Space height={20} />
    </Flex>
  );
};
