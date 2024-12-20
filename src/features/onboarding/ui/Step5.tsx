import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Space } from '@shared/common/ui';

import Step5Image from '@features/onboarding/assets/Step5Image.png';

export const Step5 = () => {
  return (
    <StyledBackground>
      <StyledContent>
        <StyledType>회의 후</StyledType>

        <Space height={15} />

        <StyledTitle>공유 메모를 보고</StyledTitle>
        <StyledTitle>다음 회의를 준비해요</StyledTitle>

        <Space height={50} />

        <div
          css={css`
            width: 35vh;
          `}>
          <img
            src={Step5Image}
            alt="회의 후 이미지"
            css={css`
              width: 100%;
            `}
          />
        </div>
      </StyledContent>
    </StyledBackground>
  );
};

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.skyblue};
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 12rem);
  padding-top: 10vh;
  box-sizing: border-box;
`;

const StyledType = styled.div`
  padding: 1rem 2rem;
  background-color: #001377;
  border-radius: 5rem;
  color: ${({ theme }) => theme.palette.light_white};
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -0.6px;
`;

const StyledTitle = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 4.4rem;
  letter-spacing: -0.6px;
  color: ${({ theme }) => theme.palette.dark_gray2};
`;
