import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import { Space, Button, Header, Input, SvgIcon } from '@shared/common/ui';
import { media } from '@shared/common/styles';
import { getUserInfo, updateNickname } from '@shared/join/apis';
import { setCookie } from '@shared/common/utils';
import { useResizeHeight } from '@shared/common/hooks';

const Join = () => {
  useResizeHeight();

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
  const [searchParams] = useSearchParams();
  const token = searchParams.get('code');

  const handleJoin = useCallback(async () => {
    const nickname = getValues('join');
    if (!token) {
      navigate('/onboarding');
      return;
    }

    try {
      await updateNickname(nickname, token);
      setCookie('token', token);
      navigate('/join/complete');
    } catch {
      navigate('/onboarding');
    }
  }, [token, getValues, navigate]);

  const getUserData = useCallback(async () => {
    if (!token) {
      navigate('/onboarding');
      return;
    }

    try {
      const { nickname } = await getUserInfo(token);
      setValue('join', nickname);
    } catch {
      navigate('/onboarding');
    }
  }, [token, setValue, navigate]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <StyledContainer>
      <Header>
        <Header.Left>
          <SvgIcon id="arrow_left" onClick={() => navigate('/onboarding')} />
        </Header.Left>
        <Header.Center>개인정보 입력</Header.Center>
      </Header>

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
  height: calc(var(--vh) * 100);
`;

const StyledTitle = styled.div`
  ${(props) => props.theme.typo.T2}
  color: ${(props) => props.theme.palette.main};
`;

const StyledButton = styled.div`
  position: fixed;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: calc(37.5rem - 4rem);

  ${media.mobile} {
    max-width: calc(100% - 4rem);
  }
`;

export default Join;
