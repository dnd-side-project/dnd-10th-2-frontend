// import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { SvgIcon } from '@shared/common/ui';
import { media } from '@shared/common/styles';
import {
  // GOOGLE_LOGIN_URL,
  KAKAO_LOGIN_URL
} from '@shared/onboarding/constants';

import { Step1, Step2 } from '@features/onboarding/ui';

const OnboardingPage = () => {
  // const [step, setStep] = useState(2);
  return (
    <StyledContainer>
      <Step1 />
      <Step2 />

      {/* <Link to={GOOGLE_LOGIN_URL}>
        <div>
          <SvgIcon id="kakao" /> 구글로 계속하기
        </div>
      </Link> */}

      <Link to={KAKAO_LOGIN_URL}>
        <StyledButton>
          <SvgIcon id="kakao" /> 카카오로 계속하기
        </StyledButton>
      </Link>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: absolute;
  width: 37.5rem;
  height: 100vh;
  margin-left: -2rem;
  overflow: hidden;

  ${media.mobile} {
    width: 100vw;
  }
`;

const StyledButton = styled.button`
  position: fixed;
  left: 50%;
  bottom: 4.4rem;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: calc(37.5rem - 4rem);
  padding: 1.8rem 0;
  border-radius: 1.2rem;
  background-color: ${(props) => props.theme.palette.kakao_yellow};
  ${(props) => props.theme.typo.BM3}
  color: ${(props) => props.theme.palette.black};
  gap: 1rem;
  transition: opacity 0.1s ease-in-out;
  &:hover,
  &:focus {
    opacity: 0.8;
  }

  ${media.mobile} {
    max-width: calc(100% - 4rem);
  }
`;

export default OnboardingPage;
