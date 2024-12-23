import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { Flex, Space, Text, SvgIcon } from '@shared/common/ui';
import {
  useGetMeeting,
  useGetMeetingDuration,
  useGetMeetingMemberList
} from '@shared/meeting/apis';
import { getCookie } from '@shared/common/utils';
import { useBottomSheet } from '@shared/common/hooks';

import { formatDateString } from '@features/meeting/utils';
import { UserListSheet } from './UserListSheet';

export const MeetingCard = () => {
  const meetingId = useParams().meetingId || '';

  const navigate = useNavigate();

  const { openBottomSheet } = useBottomSheet();

  const { data: meetingData } = useGetMeeting({
    meetingId,
    token: getCookie('token')
  });

  const { data: meetingMemberListData } = useGetMeetingMemberList({
    meetingId,
    token: getCookie('token')
  });

  const { meetingDuration, sendGetMeetingDurationMessage } =
    useGetMeetingDuration(meetingId);

  useEffect(() => {
    const interval = setInterval(sendGetMeetingDurationMessage, 1000);
    return () => clearInterval(interval);
  }, [sendGetMeetingDurationMessage]);

  useEffect(() => {
    if (meetingData?.meetingStatus === 'COMPLETED') {
      navigate(`/meeting/${meetingId}/complete`);
    }
  });
  return (
    <MeetingCardWrapper
      direction="column"
      align="flex-start"
      justify="flex-start">
      <Flex justify="flex-start" gap={6}>
        <Text typo="B3" color="white">
          {formatDateString(meetingData?.startTime)}
        </Text>
        {meetingMemberListData?.host && <SvgIcon id="crown" size={18} />}
      </Flex>

      <Space height={10} />

      <Flex justify="space-between">
        <Text typo="T3" color="white">
          {meetingData?.title}
        </Text>

        <UserListButton
          onClick={() =>
            openBottomSheet({
              content: <UserListSheet memberList={meetingMemberListData} />
            })
          }>
          참여자 목록
        </UserListButton>
      </Flex>

      <Space height={12} />

      {meetingData?.description && (
        <>
          <Flex justify="flex-start" gap={8}>
            <SvgIcon id="mega_phone" width={24} height={24} />
            <Marquee>
              <Description typo="B7" color="white">
                {meetingData?.description}
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
          {meetingDuration}
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
  background-color: ${({ theme }) => theme.palette.main_blue};
  color: ${({ theme }) => theme.palette.white};
`;

const UserListButton = styled.button`
  background-color: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.main_blue};
  ${({ theme }) => theme.typo.BS}
  padding: 5px 10px;
  border-radius: 8px;
`;

const TimeWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.palette.main_blue_dark};
  height: 48px;
  border-radius: 12px;
  padding: 0px 20px;
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
`;

const Description = styled(Text)`
  width: 100%;
  height: 20px;
  white-space: nowrap;
  display: inline-block;
  animation: ${marqueeAnimation} 10s linear infinite;
`;
