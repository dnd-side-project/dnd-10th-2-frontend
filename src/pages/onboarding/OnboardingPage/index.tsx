import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { SvgIcon } from '@shared/common/ui';
import { media } from '@shared/common/styles';
import {
  GOOGLE_LOGIN_URL,
  KAKAO_LOGIN_URL
} from '@shared/onboarding/constants';

import { BackgroundIcon } from '@features/onboarding/assets';

const OnboardingPage = () => {
  return (
    <StyledContainer>
      <StyledGraphic>
        <BackgroundIcon />
      </StyledGraphic>

      <Link to={GOOGLE_LOGIN_URL}>
        <div>
          <SvgIcon id="kakao" /> 구글로 계속하기
        </div>
      </Link>

      <Link to={KAKAO_LOGIN_URL}>
        <StyledButton>
          <SvgIcon id="kakao" /> 카카오로 계속하기
        </StyledButton>
      </Link>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const StyledGraphic = styled.div`
  width: 37.5rem;
  margin-left: -2rem;

  ${media.mobile} {
    width: 100vw;
  }
`;

const StyledButton = styled.button`
  position: fixed;
  bottom: 4.4rem;
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
