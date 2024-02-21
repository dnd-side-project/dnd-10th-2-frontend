import { Space } from '@/components/Wrapper';
import { Button } from '@/components/common/Button';
import { Header } from '@/components/common/Header';
import { Input } from '@/components/common/Input';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      join: ''
    },
    mode: 'onChange'
  });
  const navigate = useNavigate();

  const handleJoin = async () => {
    try {
      await console.log(getValues('join'));
      navigate('/join/complete');
    } catch {
      console.log('error');
    }
  };
  return (
    <StyledContainer>
      <Header
        iconLeftId="arrow_left"
        title="개인정보 입력"
        onClickIconLeft={() => navigate('/onboarding')}
      />

      <Space height={22} />

      <StyledTitle>
        프로필 이름만 입력하면
        <br />
        가입이 완료됩니다.
      </StyledTitle>

      <Space height={30} />

      <Input
        {...register('join', {
          required: true,
          minLength: {
            message: '이름은 2글자 이상이어야 합니다',
            value: 2
          },
          maxLength: {
            message: '이름은 5글자 이하여야 합니다',
            value: 5
          }
        })}
        value={watch('join')}
        setValue={() => setValue('join', '')}
        type="join"
        placeholder="프로필 이름을 입력해주세요"
        isError={errors.join ? true : false}
        errorText={errors.join?.message as string}
        height={50}
      />

      <StyledButton>
        <Button
          size="lg"
          backgroundColor="main"
          disabled={errors.join || getValues('join').length < 2 ? true : false}
          onClick={handleJoin}>
          완료하기
        </Button>
      </StyledButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const StyledTitle = styled.div`
  ${(props) => props.theme.typo.T2}
  color: ${(props) => props.theme.palette.main};
`;

const StyledButton = styled.div`
  position: fixed;
  bottom: 1.6rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 37.5rem;
`;

export default Join;