import { css } from '@emotion/react';

import { GetMeetingMemberListResponse } from '@shared/meeting/apis/types';
import { Flex, Space, Text } from '@shared/common/ui';

import { CrownOrangeIcon, UserProfileIcon } from '@features/meeting/assets';

export const UserListSheet = ({
  memberList
}: {
  memberList: GetMeetingMemberListResponse['response'] | undefined;
}) => {
  return (
    <Flex
      direction="column"
      align="flex-start"
      css={css`
        max-height: 35rem;
      `}>
      <Text typo="T5" color="dark_gray2">
        참여자 목록
      </Text>

      <Space height={16} />

      <div
        css={css`
          overflow: auto;
          width: 100%;
        `}>
        <div
          css={css`
            display: flex;
            /* gap: 1.8rem; */
            align-items: center;
            width: 100%;
            height: 5.5rem;
          `}>
          <UserProfileIcon id={0} />
          <Text
            typo="T6"
            color="dark_gray2"
            css={css`
              margin-left: 1.8rem;
              margin-right: 1.2rem;
            `}>
            {memberList?.hostMember.nickname}
          </Text>
          <CrownOrangeIcon />
          <Text
            typo="BM3"
            color="orange"
            css={css`
              margin-left: 0.6rem;
            `}>
            방장
          </Text>
        </div>

        {memberList?.members.map((member, index) => (
          <div
            key={member.memberId}
            css={css`
              display: flex;
              gap: 1.8rem;
              align-items: center;
              width: 100%;
              height: 5.5rem;
              border-top: 1px solid #f6f7f9;
            `}>
            <UserProfileIcon id={index + 1} />
            <Text typo="T6" color="dark_gray2">
              {member.nickname}
            </Text>
          </div>
        ))}
      </div>
    </Flex>
  );
};
