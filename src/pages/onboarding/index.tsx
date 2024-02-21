import { IconOnboardingBackground } from '@/assets/IconOnboardingBackground';
import { SvgIcon } from '@/components/common/SvgIcon';
import styled from '@emotion/styled';

const Onboarding = () => {
  return (
    <StyledContainer>
      <StyledGraphic>
        <IconOnboardingBackground />
      </StyledGraphic>

      <StyledButton>
        <SvgIcon id="kakao" /> 카카오로 계속하기
      </StyledButton>
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
  height: 300px;
`;

const StyledButton = styled.button`
  position: absolute;
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
`;

export default Onboarding;
