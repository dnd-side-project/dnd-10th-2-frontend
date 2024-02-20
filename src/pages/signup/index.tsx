import { Space } from '@/components/Wrapper';
import styled from '@emotion/styled';

const Signup = () => {
  return (
    <StyledContainer>
      <Space height={22} />

      <StyledTitle>
        프로필 이름만 입력하면
        <br />
        가입이 완료됩니다.
      </StyledTitle>

      <Space height={30} />

      <StyledInput />
    </StyledContainer>
  );
};

export default Signup;

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 20px;
  background-color: white;
`;

const StyledTitle = styled.div`
  ${(props) => props.theme.typo.T2}
  color: ${(props) => props.theme.palette.main};
`;

const StyledInput = styled.div`
  height: 50px;
  background-color: ${(props) => props.theme.palette.light_white};
  border-radius: 8px;
`;
