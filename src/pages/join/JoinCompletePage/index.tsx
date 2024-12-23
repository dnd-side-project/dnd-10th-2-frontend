import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { Space, Button, Header, SvgIcon } from '@shared/common/ui';
import { media } from '@shared/common/styles';
import { useResizeHeight } from '@shared/common/hooks';

import { JoinCompleteIcon } from '@features/join-complete/assets';

const JoinComplete = () => {
  const navigate = useNavigate();

  useResizeHeight();

  return (
    <StyledContainer>
      <Header>
        <Header.Center>가입 완료</Header.Center>
        <Header.Right>
          <SvgIcon id="x" onClick={() => navigate('/')} />
        </Header.Right>
      </Header>

      <Space height={55} />

      <StyledGraphic>
        <StyledTitle>
          가입을 축하드려요!
          <br />
          타이밋을 이용하러 가볼까요?
        </StyledTitle>

        <JoinCompleteIcon />
      </StyledGraphic>

      <Space height={30} />

      <StyledButton>
        <Button
          size="lg"
          backgroundColor="main"
          onClick={() => navigate('/meeting/create')}>
          회의 만들기
        </Button>
      </StyledButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: calc(var(--vh) * 100);
`;

const StyledGraphic = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 37.5rem;
  margin-left: -2rem;

  ${media.mobile} {
    width: 100vw;
  }
`;

const StyledTitle = styled.div`
  ${(props) => props.theme.typo.T2}
  color: ${(props) => props.theme.palette.main};
  position: absolute;
  top: 4.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
`;

const StyledButton = styled.div`
  position: absolute;
  bottom: 4rem;
  width: 100%;
  max-width: calc(37.5rem - 4rem);

  ${media.mobile} {
    max-width: calc(100% - 4rem);
  }
`;

export default JoinComplete;
