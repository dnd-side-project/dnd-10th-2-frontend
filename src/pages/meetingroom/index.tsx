/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonWrapper, Flex, Space, Text } from '@/components/Wrapper';
import { Button } from '@/components/common/Button';
import { Header } from '@/components/common/Header';
import { MeetingCard } from '@/components/meetingRoom/MeetingCard';
import { TimeLineButton } from '@/components/meetingRoom/TimeLineButton';
import useBottomSheet from '@/hooks/useBottomSheet';
import { media, theme } from '@/styles';
import styled from '@emotion/styled';

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
    <Wrapper direction="column" justify="flex-start">
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
      <TimeLineButton />
      <Space height={14} />
      <Flex justify="space-between" align="flex-start">
        <Flex direction="column" align="flex-start" gap={6}>
          <ButtonWrapper width={78}>
            <Button
              size={'sm'}
              fullWidth
              backgroundColor={'main'}
              onClick={() => {}}>
              회의 종료
            </Button>
          </ButtonWrapper>
          <ExitButtonChip isHost={false}>
            회의 종료는 방장만 할 수 있어요!
          </ExitButtonChip>
        </Flex>
        <ExitButton>회의실 나가기</ExitButton>
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  background-color: #f2f4f6;
  min-height: 100vh;

  width: 375px;
  box-sizing: border-box;

  margin: 0px -20px;
  padding: 0px 20px;

  ${media.mobile} {
    width: 100vw;
  }
`;

const ExitButton = styled.button`
  color: ${theme.palette.dark_gray1};
  ${theme.typo.BS};
  padding: 11px 9px;
  border-radius: 8px;

  flex-shrink: 0;
`;

const ExitButtonChip = styled.div<{
  isHost: boolean;
}>`
  padding: 5px 12px;
  background-color: ${theme.palette.white};
  color: ${theme.palette.main_blue};
  ${theme.typo.BS};
  border-radius: 20px;
  display: ${({ isHost }) => (isHost ? 'none' : 'visible')};
`;
