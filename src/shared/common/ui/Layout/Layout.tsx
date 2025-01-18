import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { Flex } from '@shared/common/ui';
import { theme } from '@shared/common/styles';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex>
      <Wrapper>{children}</Wrapper>
    </Flex>
  );
};

const Wrapper = styled.div`
  align-items: flex-start;
  min-height: 100vh;
  width: 100%;

  background-color: ${theme.palette.white};
  padding: 0px 20px 0px 20px;

  @media (min-width: 768px) {
    width: 375px;
  }
`;
