import styled from '@emotion/styled';

import { Space } from '@shared/common/ui';

import { Step4Content } from '@features/onboarding/assets';

export const Step4 = () => {
  return (
    <StyledBackground>
      <StyledType>회의 중</StyledType>

      <Space height={15} />

      <StyledTitle>시간이 얼마나 지났을까요?</StyledTitle>
      <StyledTitle>안건 별로 시간을 관리해요</StyledTitle>

      <Space height={20} />

      <Step4Content />
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
  padding-top: 9rem;
  background-color: ${({ theme }) => theme.palette.skyblue};
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
