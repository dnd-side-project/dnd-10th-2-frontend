import styled from '@emotion/styled';
import { Flex } from '../Wrapper';
import { ReactNode } from 'react';
import { theme } from '@/styles';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex>
      {/* Header */}
      <Wrapper align="flex-start">{children}</Wrapper>
    </Flex>
  );
};

const Wrapper = styled(Flex)`
  min-height: 100vh;
  width: 100%;

  background-color: ${theme.palette.white};
  padding: 0px 20px 0px 20px;

  box-sizing: border-box;

  @media (min-width: 768px) {
    width: 375px;
  }
`;
