import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';

import { Text, SvgIcon } from '@shared/common/ui';
import { theme } from '@shared/common/styles';

export const TimeLineButton = ({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <ButtonWrapper {...props}>
      <SvgIcon id="plus" width={10} height={10} />
      <Text typo="B2" color="main_blue">
        타임라인 추가하기
      </Text>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  border-radius: 16px;
  background-color: ${theme.palette.light_gray2};
  color: ${theme.palette.main_blue};
  ${theme.typo.B2};

  width: 100%;
  padding: 16px 0px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;
