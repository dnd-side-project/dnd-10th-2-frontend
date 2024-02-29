import { IconJoinComplete } from '@/assets/IconJoinComplete';
import { Space } from '@/components/Wrapper';
import { Button } from '@/components/common/Button/Button';
import { Header } from '@/components/common/Header/Header';
import { media } from '@/styles';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const JoinComplete = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <Header
        title="가입 완료"
        iconRightId1="x"
        onClickIconRight1={() => navigate('/')}
      />

      <Space height={55} />

      <StyledGraphic>
        <StyledTitle>
          가입을 축하드려요!
          <br />
          타이밋을 이용하러 가볼까요?
        </StyledTitle>

        <IconJoinComplete />
      </StyledGraphic>

      <Space height={30} />

      <StyledButton>
        <Button
          size="lg"
          backgroundColor="main"
          onClick={() => console.log('회의 만들기')}>
          회의 만들기
        </Button>
      </StyledButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
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
  bottom: 4.4rem;
  width: 100%;
  max-width: calc(37.5rem - 4rem);

  ${media.mobile} {
    max-width: calc(100% - 4rem);
  }
`;

export default JoinComplete;
