import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { SvgIcon } from '@shared/common/ui';

import { UserProfileIcon } from '@features/meeting/assets';
import { MyMeetingRoomIcon } from './MyMeetingRoomIcon';

export const HamburgerMenu = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <div
        css={css`
          width: 27rem;
          height: 100%;
        `}>
        <StyledProfile>
          <UserProfileIcon id={0} />
          <StyledProfileNickname>이동현</StyledProfileNickname>
        </StyledProfile>

        <div
          css={css`
            height: calc(100% - 11rem);
            background-color: #f7f8f9;
            padding-top: 3rem;
            padding-left: 1.6rem;
            padding-right: 1.6rem;
          `}>
          <StyledMyMeetingButton
            onClick={() => {
              navigate('/');
            }}>
            <MyMeetingRoomIcon />
            <StyledMyMeetingButtonText>나의 회의실</StyledMyMeetingButtonText>
            <SvgIcon id="arrow_right" />
          </StyledMyMeetingButton>

          <StyledCreateMeetingButton
            onClick={() => {
              navigate('/meeting/create');
            }}>
            회의 만들기
          </StyledCreateMeetingButton>
        </div>
      </div>

      <StyledDim onClick={onClose} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  height: 11rem;
  background-color: ${({ theme }) => theme.palette.white};
  padding-left: 1.6rem;
  padding-right: 1.6rem;
`;

const StyledProfileNickname = styled.div`
  color: #6a6a6a;
  ${({ theme }) => theme.typo.T5}
  margin-left: 1.5rem;
`;

const StyledMyMeetingButton = styled.div`
  display: flex;
  align-items: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.white};
  padding: 1rem 2rem;
`;

const StyledMyMeetingButtonText = styled.div`
  margin-left: 1.2rem;
  margin-right: 6rem;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.8rem;
  letter-spacing: -0.6px;
`;

const StyledCreateMeetingButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.8rem;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.palette.skyblue};
  color: ${({ theme }) => theme.palette.main_blue};
  ${({ theme }) => theme.typo.BM1}
  margin-top: 1rem;
`;

const StyledDim = styled.div`
  width: calc(100% - 27rem);
  height: 100%;
  background-color: rgba(10, 17, 28, 0.6);
`;
