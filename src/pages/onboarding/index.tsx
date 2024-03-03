import { userApi } from '@/apis/user';
import { IconOnboardingBackground } from '@/assets/IconOnboardingBackground';
import { SvgIcon } from '@/components/common';
import { media } from '@/styles';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Onboarding = () => {
  return (
    <StyledContainer>
      <StyledGraphic>
        <IconOnboardingBackground />
      </StyledGraphic>

      <Link to={userApi.GET_KAKAO_LOGIN}>
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

export default Onboarding;
