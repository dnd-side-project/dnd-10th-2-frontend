import { Flex, Space, Text } from '@/components/Wrapper';
import { SvgIcon } from '@/components/common/SvgIcon';
import { theme } from '@/styles';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface MeetingCardProps {
  date: string;
  isHost: boolean;
  title: string;
  onClickUserList: () => void;
  description?: string;
  actualTotalDuration: string;
}

/**
 * @param {string} date 날짜
 * @param {boolean} isHost 방장 여부
 * @param {string} title 회의 제목
 * @param {() => void} onClickuserList 회의 참여자 목록 클릭 핸들러
 * @param {string} description? 회의 공지 사항
 * @param {string} actualTotalDuration 회의 시작 이후 흐른 시간
 */
export const MeetingCard = ({
  date,
  isHost,
  title,
  onClickUserList,
  description,
  actualTotalDuration
}: MeetingCardProps) => {
  return (
    <MeetingCardWrapper
      direction="column"
      align="flex-start"
      justify="flex-start">
      <Flex justify="flex-start" gap={6}>
        <Text typo="B3" color="white">
          {date}
        </Text>
        {isHost && <SvgIcon id="crown" width={18} height={18} />}
      </Flex>
      <Space height={10} />
      <Flex justify="space-between">
        <Text typo="T3" color="white">
          {title}
        </Text>
        <UserListButton onClick={onClickUserList}>참여자 목록</UserListButton>
      </Flex>
      <Space height={12} />
      {description && (
        <>
          <Flex justify="flex-start" gap={8}>
            <SvgIcon id="mega_phone" width={24} height={24} />
            <Marquee>
              <Description typo="B7" color="white">
                {description}
              </Description>
            </Marquee>
          </Flex>
          <Space height={12} />
        </>
      )}
      <TimeWrapper justify="space-between" gap={25}>
        <Text typo="BM3" color="white">
          회의가 시작한지
        </Text>
        <Text typo="T4" color="white">
          {actualTotalDuration}
        </Text>
        <Text typo="BM3" color="white">
          지났어요
        </Text>
      </TimeWrapper>
    </MeetingCardWrapper>
  );
};

const MeetingCardWrapper = styled(Flex)`
  border-radius: 16px;
  padding: 25px 15px;

  box-sizing: border-box;

  background-color: ${theme.palette.main_blue};
  color: ${theme.palette.white};
`;

const UserListButton = styled.button`
  background-color: ${theme.palette.white};
  color: ${theme.palette.main_blue};
  ${theme.typo.BS}

  padding: 5px 10px;
  border-radius: 8px;
`;

const TimeWrapper = styled(Flex)`
  background-color: ${theme.palette.main_blue_dark};

  height: 48px;
  border-radius: 12px;
  padding: 0px 20px;

  box-sizing: border-box;
`;

const marqueeAnimation = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const Marquee = styled.div`
  width: 100%;
  height: 24px;

  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
`;

const Description = styled(Text)`
  width: 100%;
  height: 20px;
  white-space: nowrap;
  display: inline-block;

  animation: ${marqueeAnimation} 10s linear infinite;
`;
