import styled from '@emotion/styled';

import { Space } from '@shared/common/ui';

import { Step3Content } from '@features/onboarding/assets';

export const Step3 = () => {
  return (
    <StyledBackground>
      <StyledType>회의 전</StyledType>

      <Space height={15} />

      <StyledTitle>회의 전, 링크로 빠르게,</StyledTitle>
      <StyledTitle>회의에 대한 모든 정보를 공유하고</StyledTitle>

      <Space height={55} />

      <Step3Content />
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
