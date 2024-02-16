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
  width: 375px;

  background-color: ${theme.palette.white};
`;
